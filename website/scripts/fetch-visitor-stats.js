import fs from 'node:fs';
import https from 'node:https';

const targetFile = 'public/data/visitor-stats.json';
const source = 'https://s01.flagcounter.com/countries/D897/1';

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      let body = '';
      response.on('data', (chunk) => {
        body += chunk;
      });
      response.on('end', () => resolve(body));
    }).on('error', reject);
  });
}

function parseStats(html) {
  const rows = [...html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)];
  const topCountries = [];
  for (const row of rows) {
    const cells = [...row[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map((cell) => cell[1].replace(/<[^>]+>/g, '').trim()).filter(Boolean);
    if (cells.length >= 2 && /^\d/.test(cells[0])) {
      topCountries.push({
        rank: topCountries.length + 1,
        country: cells[0].replace(/^\d+\s*/, ''),
        visitors: Number(String(cells[1]).replace(/[^\d]/g, '')) || 0,
        lastVisitor: cells[2] || ''
      });
    }
    if (topCountries.length >= 10) break;
  }
  return topCountries;
}

try {
  const html = await fetchText(source);
  const topCountries = parseStats(html);
  if (!topCountries.length) throw new Error('no visitor rows parsed');
  const oldData = fs.existsSync(targetFile) ? JSON.parse(fs.readFileSync(targetFile, 'utf8')) : {};
  fs.writeFileSync(targetFile, JSON.stringify({
    ...oldData,
    source,
    fetchedAt: new Date().toISOString(),
    topCountries
  }, null, 2) + '\n');
  console.log(`visitor stats updated: ${topCountries.length} countries`);
} catch (error) {
  console.warn(`visitor stats fetch failed, keeping existing data: ${error.message}`);
}
