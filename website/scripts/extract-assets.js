import fs from 'node:fs';

const registry = JSON.parse(fs.readFileSync('public/data/assets-registry.json', 'utf8'));
fs.writeFileSync('public/data/assets-extraction-summary.json', JSON.stringify({
  generatedAt: new Date().toISOString(),
  registryGroups: Object.keys(registry)
}, null, 2) + '\n');
console.log('asset registry summary generated');
