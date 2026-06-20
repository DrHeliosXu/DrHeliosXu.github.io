import fs from 'node:fs';
import path from 'node:path';

const registryPath = path.resolve('public/data/assets-registry.json');
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
const missing = [];

function visit(value, keyPath = []) {
  if (!value || typeof value !== 'object') return;
  for (const [key, child] of Object.entries(value)) {
    if ((key === 'src' || key === 'poster') && typeof child === 'string' && child.startsWith('/assets/')) {
      const filePath = path.resolve('public', child.replace(/^\//, ''));
      if (!fs.existsSync(filePath)) missing.push(`${keyPath.concat(key).join('.')} -> ${child}`);
    } else {
      visit(child, keyPath.concat(key));
    }
  }
}

visit(registry);

if (missing.length) {
  console.error('asset validation failed:');
  missing.forEach((item) => console.error(`  ${item}`));
  process.exit(1);
}

console.log('asset validation passed');
