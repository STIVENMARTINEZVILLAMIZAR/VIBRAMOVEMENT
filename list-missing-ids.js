const fs = require('fs').promises;
const path = require('path');

const filePath = path.join(__dirname, 'element-map-verify.json');

function looksLikeId(value) {
  return /^[A-Za-z0-9_]+$/.test(value) && /\d$/.test(value);
}

async function main() {
  try {
    const data = JSON.parse(await fs.readFile(filePath, 'utf8'));
    const missing = [];
    for (const [objectName, entries] of Object.entries(data.report || {})) {
      for (const [key, entry] of Object.entries(entries)) {
        const raw = String(entry.value || '');
        if (!looksLikeId(raw)) continue;
        if (!entry.exists) {
          missing.push({ objectName, key, id: raw });
        }
      }
    }
    if (missing.length === 0) {
      console.log('No faltan IDs reales. Todos los IDs que el código usa existen en los tipos de Wix.');
      return;
    }
    console.log('IDs reales faltantes automáticos:');
    missing.forEach((item) => {
      console.log(`- ${item.objectName}.${item.key} -> ${item.id}`);
    });
  } catch (err) {
    console.error('Error leyendo element-map-verify.json:', err.message);
    process.exit(1);
  }
}

main();
