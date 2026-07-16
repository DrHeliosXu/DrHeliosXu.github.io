#!/usr/bin/env node

/*
 * 使用 GeoNames 的城市和 alternateNamesV2 数据补充站点所需的城市名称。
 * 既有的简体中文、日语、韩语名称不会被覆盖；未收录的名称保留规范英文名作为回退。
 *
 * 用法：
 * node scripts/enrich-city-names.js /tmp/geonames-city-i18n
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const sourceDirectory = process.argv[2];
const projectRoot = path.resolve(__dirname, '..');
const cityFile = path.join(projectRoot, 'js', 'city_name.json');

if (!sourceDirectory) {
  throw new Error('请提供包含 cities500.txt 和 alternateNamesV2.txt 的 GeoNames 数据目录。');
}

const citiesSource = path.join(sourceDirectory, 'cities500.txt');
const alternateNamesSource = path.join(sourceDirectory, 'alternateNamesV2.txt');

for (const source of [citiesSource, alternateNamesSource]) {
  if (!fs.existsSync(source)) {
    throw new Error(`缺少 GeoNames 数据文件：${source}`);
  }
}

const requiredLocales = ['ZH-CN', 'ZH-TW', 'EN', 'DE', 'FR', 'IT', 'ES', 'JA', 'KO', 'TH', 'VI', 'RU', 'AR'];
const geoNamesLocaleMap = {
  'zh': 'ZH-CN',
  'zh-CN': 'ZH-CN',
  'zh-Hans': 'ZH-CN',
  'zh-TW': 'ZH-TW',
  'zh-HK': 'ZH-TW',
  'zh-Hant': 'ZH-TW',
  'de': 'DE',
  'fr': 'FR',
  'it': 'IT',
  'es': 'ES',
  'ja': 'JA',
  'ko': 'KO',
  'th': 'TH',
  'vi': 'VI',
  'ru': 'RU',
  'ar': 'AR'
};

const normalise = (value) => String(value || '')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[’'`]/g, '')
  .replace(/[^\p{L}\p{N}]+/gu, ' ')
  .trim()
  .toLocaleLowerCase('en');

const readLines = async (file, onLine) => {
  const stream = fs.createReadStream(file, { encoding: 'utf8' });
  const lines = readline.createInterface({ input: stream, crlfDelay: Infinity });
  for await (const line of lines) onLine(line);
};

const main = async () => {
  const fileContent = JSON.parse(fs.readFileSync(cityFile, 'utf8'));
  const dictionary = Array.isArray(fileContent) ? fileContent[0] : fileContent;
  const namesByNormalisedKey = new Map();

  Object.keys(dictionary).forEach((city) => {
    const key = normalise(city);
    if (!namesByNormalisedKey.has(key)) namesByNormalisedKey.set(key, []);
    namesByNormalisedKey.get(key).push(city);
  });

  const candidates = new Map();
  await readLines(citiesSource, (line) => {
    const fields = line.split('\t');
    if (fields[6] !== 'P') return;

    const id = fields[0];
    const population = Number(fields[14]) || 0;
    const names = [fields[1], fields[2]];

    for (const name of names) {
      const matchedCities = namesByNormalisedKey.get(normalise(name));
      if (!matchedCities) continue;
      for (const city of matchedCities) {
        const previous = candidates.get(city);
        if (!previous || population > previous.population) {
          candidates.set(city, { id, population });
        }
      }
    }
  });

  const cityByGeoId = new Map();
  candidates.forEach((candidate, city) => cityByGeoId.set(candidate.id, city));
  const translatedNames = new Map();

  await readLines(alternateNamesSource, (line) => {
    const fields = line.split('\t');
    const city = cityByGeoId.get(fields[1]);
    const locale = geoNamesLocaleMap[fields[2]];
    const name = fields[3] && fields[3].trim();
    if (!city || !locale || !name) return;

    const perCity = translatedNames.get(city) || {};
    const current = perCity[locale];
    const preferred = fields[4] === '1';
    if (!current || (preferred && !current.preferred)) {
      perCity[locale] = { name, preferred };
      translatedNames.set(city, perCity);
    }
  });

  const statistics = Object.fromEntries(requiredLocales.map((locale) => [locale, { source: 0, fallback: 0, existing: 0 }]));
  for (const city of Object.keys(dictionary)) {
    const names = dictionary[city] || {};
    const aliases = translatedNames.get(city) || {};

    names.EN = city;
    statistics.EN.source += 1;

    for (const locale of requiredLocales) {
      if (locale === 'EN') continue;
      if (names[locale]) {
        statistics[locale].existing += 1;
        continue;
      }
      if (aliases[locale]) {
        names[locale] = aliases[locale].name;
        statistics[locale].source += 1;
      } else {
        names[locale] = city;
        statistics[locale].fallback += 1;
      }
    }
    dictionary[city] = names;
  }

  // 该文件在每个页面首次进入时加载，保持紧凑格式以避免无意义的传输体积。
  fs.writeFileSync(cityFile, `${JSON.stringify([dictionary])}\n`);
  console.log(`城市总数：${Object.keys(dictionary).length}`);
  console.log(`GeoNames 匹配：${candidates.size}`);
  for (const locale of requiredLocales) {
    const stat = statistics[locale];
    console.log(`${locale}: 来源 ${stat.source}，保留 ${stat.existing}，英文回退 ${stat.fallback}`);
  }
};

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
