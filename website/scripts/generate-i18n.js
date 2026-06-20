import fs from 'node:fs';

const baseline = JSON.parse(fs.readFileSync('src/i18n/cn.json', 'utf8'));
const target = process.argv[2];

if (!target) {
  console.error('usage: node scripts/generate-i18n.js <language-code>');
  process.exit(1);
}

const file = `src/i18n/${target}.json`;
if (fs.existsSync(file)) {
  console.error(`${file} already exists`);
  process.exit(1);
}

baseline.meta.language = target;
fs.writeFileSync(file, JSON.stringify(baseline, null, 2) + '\n');
console.log(`created ${file}`);
