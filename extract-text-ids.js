const fs = require('fs').promises;
const path = require('path');

const ROOT = __dirname;
const PAGES_DIR = path.join(ROOT, 'src', 'pages');
const ELEMENT_MAP_FILE = path.join(ROOT, 'src', 'public', 'elementMap.js');
const OUTPUT_FILE = path.join(ROOT, 'text-id-extraction.json');

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
    const keyRegex = /(?:['"]?([\w$]+)['"]?)\s*:/gm;
    let keyMatch;
    while ((keyMatch = keyRegex.exec(body))) {
      const key = keyMatch[1];
      const valueStart = keyMatch.index + keyMatch[0].length;
      const tail = body.slice(valueStart);
      const valueMatch = /^\s*([^,\n]+)/.exec(tail);
      const rawValue = valueMatch ? valueMatch[1].trim().replace(/,$/, '') : '';
      entries[key] = rawValue;
    }
    exports[name] = entries;
  }
  return exports;
}

function extractSetTextIds(source) {
  const direct = new Set();
  const variable = new Set();
  const applyTexts = new Set();

  const directRegex = /setText\(\s*(['"`])([^'")`]+)\1/g;
  const variableRegex = /setText\(\s*([A-Z_][A-Z0-9_]*(?:\.[A-Za-z0-9_]+)+)\s*,/g;
  const applyRegex = /applyTexts\(\s*([A-Z_][A-Z0-9_]*)\s*\)/g;

  let match;
  while ((match = directRegex.exec(source))) {
    direct.add(match[2]);
  }
  while ((match = variableRegex.exec(source))) {
    variable.add(match[1]);
  }
  while ((match = applyRegex.exec(source))) {
    applyTexts.add(match[1]);
  }

  return {
    direct: Array.from(direct).sort(),
    variable: Array.from(variable).sort(),
    applyTexts: Array.from(applyTexts).sort(),
  };
}

function resolveVariable(varName, exports) {
  const parts = varName.split('.');
  const root = parts.shift();
  const obj = exports[root];
  if (!obj) return null;

  let current = obj;
  for (const part of parts) {
    if (current && typeof current === 'object' && current[part] !== undefined) {
      current = current[part];
    } else {
      return null;
    }
  }
  return typeof current === 'string' ? current : null;
}

(async function main() {
  try {
    const elementMapSource = await readFile(ELEMENT_MAP_FILE);
    const exports = parseObjectBlocks(elementMapSource);

    const pageFiles = (await fs.readdir(PAGES_DIR)).filter((file) => file.endsWith('.js'));
    const result = {
      pages: {},
      elementMapObjects: Object.keys(exports).sort(),
      resolvedVariables: {},
    };

    for (const fileName of pageFiles) {
      const filePath = path.join(PAGES_DIR, fileName);
      const content = await readFile(filePath);
      const extracted = extractSetTextIds(content);
      const resolved = {};

      for (const variable of extracted.variable) {
        const resolvedId = resolveVariable(variable, exports);
        resolved[variable] = resolvedId || null;
      }

      const applied = {};
      for (const objectName of extracted.applyTexts) {
        applied[objectName] = Object.keys(exports[objectName] || {}).sort();
      }

      result.pages[fileName] = {
        directTextIds: extracted.direct,
        variableTextRefs: extracted.variable,
        resolvedTextIds: resolved,
        applyTextsObjects: applied,
      };
    }

    await fs.writeFile(OUTPUT_FILE, JSON.stringify(result, null, 2), 'utf8');
    console.log(`Extracción completada. Resultado guardado en: ${OUTPUT_FILE}`);
    console.log('Resumen de páginas:');
    for (const [page, data] of Object.entries(result.pages)) {
      console.log(`\n${page}`);
      console.log(`  IDs directos: ${data.directTextIds.join(', ') || '(ninguno)'}`);
      console.log(`  Referencias variables: ${Object.keys(data.resolvedTextIds).length ? Object.entries(data.resolvedTextIds).map(([key, val]) => `${key} -> ${val || 'NO_RESUELTO'}`).join(', ') : '(ninguno)'}`);
      if (Object.keys(data.applyTextsObjects).length) {
        console.log(`  applyTexts: ${Object.entries(data.applyTextsObjects).map(([key, val]) => `${key} [${val.join(', ')}]`).join('; ')}`);
      }
    }
  } catch (error) {
    console.error('Error al extraer IDs:', error);
    process.exit(1);
  }
})();
