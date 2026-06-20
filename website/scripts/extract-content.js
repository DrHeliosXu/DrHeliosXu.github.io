import fs from 'node:fs';

const htmlFiles = fs.readdirSync('..').filter((file) => file.endsWith('.html'));
fs.writeFileSync('public/data/extraction-summary.json', JSON.stringify({
  generatedAt: new Date().toISOString(),
  htmlFiles,
  note: 'This scaffold records source HTML files. Detailed text migration should continue by moving remaining legacy text into src/i18n/*.json.'
}, null, 2) + '\n');
console.log(`recorded ${htmlFiles.length} source HTML files`);
