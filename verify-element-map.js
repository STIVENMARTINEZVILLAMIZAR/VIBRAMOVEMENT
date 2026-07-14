const fs = require('fs').promises;
const path = require('path');

const ROOT = __dirname;
const ELEMENT_MAP_FILE = path.join(ROOT, 'src', 'public', 'elementMap.js');
const WIX_TYPES_DIR = path.join(ROOT, '.wix', 'types');

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
  const pageIds = {};

  for (const dirent of pageDirs) {
    if (!dirent.isDirectory()) continue;
    const dirPath = path.join(WIX_TYPES_DIR, dirent.name);
    const files = await fs.readdir(dirPath);
    const dtsFile = files.find((file) => file.endsWith('.d.ts'));
    if (!dtsFile) continue;
    const content = await readFile(path.join(dirPath, dtsFile));
    const ids = parseWixTypes(content);
    ids.forEach((id) => allIds.add(id));
    pageIds[dirent.name] = ids;
  }

  return { allIds: Array.from(allIds).sort(), pageIds };
}

(async function main() {
  try {
    const elementMapSource = await readFile(ELEMENT_MAP_FILE);
    const exports = parseObjectBlocks(elementMapSource);
    const wixIds = await collectWixIds();

    const missing = [];
    const report = {};

    for (const [objectName, entries] of Object.entries(exports)) {
      report[objectName] = {};
      for (const [key, rawValue] of Object.entries(entries)) {
        const sanitized = rawValue.replace(/^['"`]|['"`]$/g, '');
        const exists = wixIds.allIds.includes(sanitized);
        report[objectName][key] = {
          value: sanitized,
          exists,
        };
        if (!exists) {
          missing.push({ objectName, key, value: sanitized });
        }
      }
    }

    const outputFile = path.join(ROOT, 'element-map-verify.json');
    await fs.writeFile(outputFile, JSON.stringify({ report, missing }, null, 2), 'utf8');

    console.log(`Verificación completada. Resultado guardado en: ${outputFile}`);
    if (missing.length === 0) {
      console.log('✅ Todos los IDs de elementMap.js existen en los tipos de Wix.');
    } else {
      console.log('⚠️ IDs faltantes encontrados:');
      for (const item of missing) {
        console.log(`- ${item.objectName}.${item.key} -> ${item.value}`);
      }
    }
  } catch (error) {
    console.error('Error al verificar elementMap.js:', error);
    process.exit(1);
  }
})();
