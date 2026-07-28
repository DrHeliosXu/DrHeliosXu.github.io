#!/usr/bin/env node

/**
 * 将新闻地点拆成可复用的城市与场地字段。
 * 城市仅在中文原始地点可明确判定时写入，避免把机构或线上活动误识别为城市。
 */
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const newsFile = path.join(root, 'data', 'news.json');
const cityFile = path.join(root, 'js', 'city_name.json');
const news = JSON.parse(fs.readFileSync(newsFile, 'utf8'));
const cityDictionary = JSON.parse(fs.readFileSync(cityFile, 'utf8'))[0];

const localeToDictionaryKey = {
  cn: 'ZH-CN', en: 'EN', de: 'DE', fr: 'FR', it: 'IT', es: 'ES',
  jp: 'JA', kr: 'KO', th: 'TH', ru: 'RU', ar: 'AR', vi: 'VI'
};

const cityRules = [
  { match: /巴黎/i, id: 'paris', city: 'Paris' },
  { match: /慕尼黑|München|Munich/i, id: 'munich', city: 'Munich' },
  { match: /都灵/i, id: 'turin', city: 'Turin' },
  { match: /嘉兴/i, id: 'jiaxing', city: 'Jiaxing' },
  { match: /曼谷/i, id: 'bangkok', city: 'Bangkok' },
  { match: /日内瓦|日內瓦|Geneva|Genève/i, id: 'geneva', city: 'Genève' },
  { match: /萨尔茨堡|Salzburg|Leopoldskron/i, id: 'salzburg', city: 'Salzburg' },
  { match: /大阪/i, id: 'osaka', city: 'Osaka' },
  { match: /汉诺威|Hanover|Hannover/i, id: 'hannover', city: 'Hannover' },
  { match: /阿劳|Aarau/i, id: 'aarau', city: 'Aarau' },
  { match: /牛津|Oxford/i, id: 'oxford', city: 'Oxford' },
  { match: /波恩|Bonn/i, id: 'bonn', city: 'Bonn' },
  { match: /芜湖/i, id: 'wuhu', city: 'Wuhu' },
  { match: /圣加仑|St\. Gallen/i, id: 'st-gallen', city: 'St. Gallen' }
];

// 旧新闻中部分地点仅以会场名或中文简称出现，显式映射可避免不可靠的模糊匹配。
const cityByEventId = {
  'news-2026-03-23-fr-1': 'Paris',
  'news-2026-02-14-de-2': 'Munich',
  'news-2026-01-27-it-3': 'Turin',
  'news-2026-01-08-fr-4': 'Paris',
  'news-2025-12-17-cn-1': 'Jiaxing',
  'news-2025-10-25-th-2': 'Bangkok',
  'news-2025-10-01-un-3': 'Genève',
  'news-2025-09-24-un-4': 'Genève',
  'news-2025-08-23-at-5': 'Salzburg',
  'news-2025-07-27-de-6': 'Munich',
  'news-2025-06-27-de-7': 'Munich',
  'news-2025-06-26-un-8': 'Genève',
  'news-2025-05-08-de-9': 'Munich',
  'news-2025-04-24-jp-11': 'Osaka',
  'news-2025-01-28-de-17': 'Munich',
  'news-2024-10-20-at-3': 'Salzburg',
  'news-2024-09-07-cn-5': 'Wuhu',
  'news-2024-08-14-de-6': 'Munich',
  'news-2024-06-11-un-7': 'Bonn',
  'news-2024-05-29-un-9': 'Genève',
  'news-2024-05-02-ch-10': 'St. Gallen',
  'news-2024-04-22-de-11': 'Hannover',
  'news-2024-04-17-ch-12': 'Aarau',
  'news-2024-03-07-un-13': 'Genève',
  'news-2023-12-05-gb-1': 'Oxford',
  'news-2023-10-31-ch-2': 'Genève',
  'news-2023-06-11-un-5': 'Bonn',
  'news-2023-05-04-ch-7': 'St. Gallen'
};

function emptyCity() {
  return { id: null, names: Object.fromEntries(Object.keys(localeToDictionaryKey).map((locale) => [locale, ''])) };
}

function cityForEvent(event) {
  const source = event.translations.cn?.location || event.translations.cn?.venue || '';
  const explicitCity = cityByEventId[event.id];
  const rule = cityRules.find(({ match }) => match.test(source));
  const city = explicitCity || rule?.city;
  if (!city || !cityDictionary[city]) return event.city?.id ? event.city : emptyCity();
  const id = rule?.city === city ? rule.id : city.toLowerCase().replace(/[èé]/g, 'e').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const dictionaryEntry = cityDictionary[city];
  return {
    id,
    names: Object.fromEntries(Object.entries(localeToDictionaryKey).map(([locale, dictionaryKey]) => [
      locale,
      dictionaryEntry[dictionaryKey] || dictionaryEntry.EN || city
    ]))
  };
}

function localeTag(locale) {
  return { cn: 'zh-CN', jp: 'ja-JP', kr: 'ko-KR', th: 'th-TH', vi: 'vi-VN', ar: 'ar', ru: 'ru-RU' }[locale] || locale;
}

function cleanVenue(value, event, locale) {
  if (!value || !event.city.id) return value || '';
  let result = value;
  const cityNames = Object.values(event.city.names).filter(Boolean).sort((a, b) => b.length - a.length);
  for (const cityName of cityNames) result = result.replaceAll(cityName, '');

  try {
    const countryName = new Intl.DisplayNames([localeTag(locale)], { type: 'region' }).of(event.country.toUpperCase());
    if (countryName) result = result.replaceAll(countryName, '');
  } catch {
    // 不支持 Intl.DisplayNames 的旧版 Node 环境不影响构建。
  }

  // 旧页面把国家、省份与场地写在同一个文本字段内；这些前缀不应重复出现在 venue 中。
  result = result.replace(/^(?:中国|法国|德国|意大利|泰国|瑞士|奥地利|日本|英国|美国|浙江省?|广东省?|线上)\s*/u, '');

  return result
    .replace(/^\s*(?:[,，/、·\-|])\s*/g, '')
    .replace(/\s*(?:[,，/、·\-|])\s*$/g, '')
    .replace(/^（\s*|\s*）$/g, '')
    .replace(/^\(\s*|\s*\)$/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function splitOrganizer(translation, locale) {
  const label = {
    cn: '主办', en: 'Organizer', de: 'Veranstalter', fr: 'Organisateur', it: 'Organizzatore',
    es: 'Organizador', jp: '主催', kr: '주최', th: 'ผู้จัด', ru: 'Организатор', ar: 'المنظم', vi: 'Đơn vị tổ chức'
  }[locale];
  if (!label || !translation.venue) return;
  const expression = new RegExp(`(?:\\||/|\\n)\\s*${label.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&')}\\s*[:：]\\s*`, 'i');
  const parts = translation.venue.split(expression);
  if (parts.length < 2) return;
  translation.venue = parts[0].trim();
  if (!translation.organizer) translation.organizer = parts.slice(1).join(' ').trim();
}

for (const event of news.events) {
  event.city = cityForEvent(event);
  for (const [locale, translation] of Object.entries(event.translations)) {
    if (Object.hasOwn(translation, 'location')) {
      translation.venue = translation.location;
      delete translation.location;
    } else if (!Object.hasOwn(translation, 'venue')) {
      translation.venue = '';
    }
    splitOrganizer(translation, locale);
    translation.venue = cleanVenue(translation.venue, event, locale);
  }
}

news.description = '以中文新闻为主记录。每条新闻保存日期、国家、城市、旗帜、主题、场地与主办方；translations 存放各语言内容和是否显示。未来日期由页面运行时按 date 自动隐藏。';
fs.writeFileSync(newsFile, `${JSON.stringify(news, null, 2)}\n`);
console.log(`已拆分 ${news.events.length} 条新闻的城市与场地字段。`);
