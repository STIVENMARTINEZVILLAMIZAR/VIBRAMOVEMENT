const fs = require('fs').promises;
const path = require('path');

const ROOT = __dirname;
const ELEMENT_MAP_FILE = path.join(ROOT, 'src', 'public', 'elementMap.js');
const WIX_TYPES_DIR = path.join(ROOT, '.wix', 'types');
const OUTPUT_FILE = path.join(ROOT, 'src', 'public', 'autoIdFallbacks.js');

async function readFile(filePath) {
  return (await fs.readFile(filePath, 'utf8')).replace(/\r\n/g, '\n');
}

function parseObjectBlocks(source) {
  const exports = {};
  const exportRegex = /export const\s+([A-Z_][A-Z0-9_]*)\s*=\s*{([\s\S]*?)^};/gim;
  let match;
  while ((match = exportRegex.exec(source))) {
    const name = match[1];
    const body = match[2];
    const entries = {};
    const keyRegex = /(?:['"]?([\w$]+)['"]?)\s*:\s*([^,\n]+)/gm;
    let keyMatch;
    while ((keyMatch = keyRegex.exec(body))) {
      const key = keyMatch[1];
      const value = keyMatch[2].trim().replace(/,$/, '');
      entries[key] = value;
    }
    exports[name] = entries;
  }
  return exports;
}

function parseWixTypes(source) {
  const ids = new Set();
  const regex = /#([A-Za-z0-9_$-]+)/g;
  let match;
  while ((match = regex.exec(source))) {
    ids.add(match[1]);
  }
  return Array.from(ids);
}

async function collectWixIds() {
  const pageDirs = await fs.readdir(WIX_TYPES_DIR, { withFileTypes: true });
  const allIds = new Set();

  for (const dirent of pageDirs) {
    if (!dirent.isDirectory()) continue;
    const dirPath = path.join(WIX_TYPES_DIR, dirent.name);
    const files = await fs.readdir(dirPath);
    const dtsFile = files.find((file) => file.endsWith('.d.ts'));
    if (!dtsFile) continue;
    const content = await readFile(path.join(dirPath, dtsFile));
    const ids = parseWixTypes(content);
    ids.forEach((id) => allIds.add(id));
  }

  return Array.from(allIds).sort();
}

function looksLikeId(rawValue) {
  const v = rawValue.replace(/^['"`]|['"`]$/g, '');
  return /^[a-zA-Z]+\d+/.test(v);
}

function prefixOf(id) {
  return id.replace(/\d+$/, '');
}

(async function main() {
  try {
    const elementMapSource = await readFile(ELEMENT_MAP_FILE);
    const exports = parseObjectBlocks(elementMapSource);
    const wixIds = await collectWixIds();

    const candidates = {};

    // collect all literal id-like values from elementMap
    for (const entries of Object.values(exports)) {
      for (const rawValue of Object.values(entries)) {
        const v = rawValue.replace(/^['"`]|['"`]$/g, '');
        if (!v) continue;
        if (!looksLikeId(v)) continue;
        if (candidates[v]) continue;
        // base candidates: include v plus wixIds with same prefix
        const pref = prefixOf(v);
        const matches = wixIds.filter((id) => id.startsWith(pref)).slice(0, 5);
        const list = Array.from(new Set([v, ...matches]));
        candidates[v] = list;
      }
    }

    const fileContent = `// Auto-generated fallback IDs. Do not edit by hand.\nexport const AUTO_ID_FALLBACKS = ${JSON.stringify(candidates, null, 2)};\n`;
    await fs.mkdir(path.dirname(OUTPUT_FILE), { recursive: true });
    await fs.writeFile(OUTPUT_FILE, fileContent, 'utf8');

    console.log('Auto fallback file written to', OUTPUT_FILE);
  } catch (err) {
    console.error('Error generating fallbacks:', err);
    process.exit(1);
  }
})();
