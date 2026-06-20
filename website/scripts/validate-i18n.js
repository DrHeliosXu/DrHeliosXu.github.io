import fs from 'node:fs';
import path from 'node:path';

const i18nDir = path.resolve('src/i18n');
const files = fs.readdirSync(i18nDir).filter((file) => file.endsWith('.json')).sort();

if (!files.includes('cn.json')) {
  throw new Error('i18n validation failed: missing src/i18n/cn.json baseline');
}

function flattenKeys(value, prefix = '') {
  if (Array.isArray(value)) return [prefix];
  if (!value || typeof value !== 'object') return [prefix];
  return Object.keys(value).flatMap((key) => flattenKeys(value[key], prefix ? `${prefix}.${key}` : key));
}

const baseline = JSON.parse(fs.readFileSync(path.join(i18nDir, 'cn.json'), 'utf8'));
const baselineKeys = flattenKeys(baseline).sort();
let failed = false;

for (const file of files) {
  const languageData = JSON.parse(fs.readFileSync(path.join(i18nDir, file), 'utf8'));
  const languageKeys = flattenKeys(languageData).sort();
  const missing = baselineKeys.filter((key) => !languageKeys.includes(key));
  const extra = languageKeys.filter((key) => !baselineKeys.includes(key));
  if (missing.length || extra.length) {
    failed = true;
    console.error(`i18n key mismatch: ${file}`);
    if (missing.length) console.error(`  missing: ${missing.slice(0, 20).join(', ')}`);
    if (extra.length) console.error(`  extra: ${extra.slice(0, 20).join(', ')}`);
  }
}

if (failed) {
  process.exit(1);
}

console.log(`i18n validation passed: ${files.length} languages, ${baselineKeys.length} keys`);
