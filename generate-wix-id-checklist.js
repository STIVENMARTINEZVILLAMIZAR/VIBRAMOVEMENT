const fs = require('fs').promises;
const path = require('path');

const ROOT = __dirname;
const ELEMENT_MAP_FILE = path.join(ROOT, 'src', 'public', 'elementMap.js');
const WIX_TYPES_DIR = path.join(ROOT, '.wix', 'types');
const OUTPUT_CSV = path.join(ROOT, 'wix-id-checklist.csv');

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
  // common Wix element id prefixes used in this project
  return /^(text|button|section|imageX|image|repeater|form|vectorImage|shoppingCartIcon|page|box|hamburger|horizontalMenu|serviceListWidget)\w*/i.test(v);
}

(async function main() {
  try {
    const elementMapSource = await readFile(ELEMENT_MAP_FILE);
    const exports = parseObjectBlocks(elementMapSource);
    const wixIds = await collectWixIds();

    const rows = [];
    rows.push(['object','key','expectedId','exists'].join(','));

    for (const [objectName, entries] of Object.entries(exports)) {
      for (const [key, rawValue] of Object.entries(entries)) {
        const sanitized = rawValue.replace(/^['"`]|['"`]$/g, '');
        if (!looksLikeId(sanitized)) continue; // only element IDs
        const exists = wixIds.includes(sanitized);
        rows.push([objectName, key, sanitized, exists ? 'YES' : 'NO'].map((s) => `"${String(s).replace(/"/g,'""')}"`).join(','));
      }
    }

    await fs.writeFile(OUTPUT_CSV, rows.join('\n'), 'utf8');
    console.log(`Checklist generado: ${OUTPUT_CSV}`);
  } catch (error) {
    console.error('Error generando checklist:', error);
    process.exit(1);
  }
})();
