#!/usr/bin/env node

/**
 * 将早期按语言分组的 news.json 转为按事件分组的版本。
 * 该脚本只用于本次迁移；今后直接维护 data/news.json。
 */
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const file = path.join(root, 'data', 'news.json');
const legacy = JSON.parse(fs.readFileSync(file, 'utf8'));

if (legacy.schemaVersion !== 1) throw new Error('仅支持从 news.json schemaVersion 1 迁移。');

const localeCodes = Object.keys(legacy.locales);
const labels = {
  cn: { topic: '主题', location: '地点', organizer: '主办' },
  en: { topic: 'Theme', location: 'Location', organizer: 'Organizer' },
  de: { topic: 'Thema', location: 'Ort', organizer: 'Veranstalter' },
  fr: { topic: 'Thème', location: 'Lieu', organizer: 'Organisateur' },
  it: { topic: 'Tema', location: 'Luogo', organizer: 'Organizzatore' },
  es: { topic: 'Tema', location: 'Lugar', organizer: 'Organizador' },
  jp: { topic: 'テーマ', location: '場所', organizer: '主催' },
  kr: { topic: '주제', location: '장소', organizer: '주최' },
  th: { topic: 'หัวข้อ', location: 'สถานที่', organizer: 'ผู้จัด' },
  ru: { topic: 'Тема', location: 'Место', organizer: 'Организатор' },
  ar: { topic: 'الموضوع', location: 'المكان', organizer: 'المنظم' },
  vi: { topic: 'Chủ đề', location: 'Địa điểm', organizer: 'Đơn vị tổ chức' }
};

const months = {
  january: 1, february: 2, march: 3, april: 4, may: 5, june: 6, july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
  januar: 1, februar: 2, märz: 3, maerz: 3, april: 4, mai: 5, juni: 6, juli: 7, august: 8, september: 9, oktober: 10, november: 11, dezember: 12,
  janvier: 1, février: 2, fevrier: 2, mars: 3, avril: 4, mai: 5, juin: 6, juillet: 7, août: 8, aout: 8, septembre: 9, octobre: 10, novembre: 11, décembre: 12, decembre: 12,
  gennaio: 1, febbraio: 2, marzo: 3, aprile: 4, maggio: 5, giugno: 6, luglio: 7, agosto: 8, settembre: 9, ottobre: 10, novembre: 11, dicembre: 12,
  enero: 1, febrero: 2, marzo: 3, abril: 4, mayo: 5, junio: 6, julio: 7, agosto: 8, septiembre: 9, octubre: 10, noviembre: 11, diciembre: 12,
  tháng: null
};

function clean(value = '') {
  return value.replace(/<br\s*\/?\s*>/gi, '\n').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/gi, ' ').replace(/\s+/g, ' ').trim();
}

function dateToIso(locale, value) {
  const text = clean(value);
  let match = text.match(/(\d{4})\D+(\d{1,2})\D+(\d{1,2})/);
  if (match) return `${match[1]}-${match[2].padStart(2, '0')}-${match[3].padStart(2, '0')}`;
  match = text.match(/(\d{1,2})\.?\s+([\p{L}.]+)\s+(\d{4})/iu) || text.match(/(\d{1,2})\s+de\s+([\p{L}.]+)\s+de\s+(\d{4})/iu);
  if (match) {
    const month = months[match[2].toLowerCase().replaceAll('.', '')];
    if (month) return `${match[3]}-${String(month).padStart(2, '0')}-${match[1].padStart(2, '0')}`;
  }
  match = text.match(/([\p{L}.]+)\s+(\d{1,2}),?\s+(\d{4})/iu);
  if (match) {
    const month = months[match[1].toLowerCase().replaceAll('.', '')];
    if (month) return `${match[3]}-${String(month).padStart(2, '0')}-${match[2].padStart(2, '0')}`;
  }
  return '';
}

function splitDetails(locale, html = '') {
  const plain = html.replace(/<br\s*\/?\s*>/gi, '\n').replace(/<[^>]+>/g, ' ').replace(/\s*\n\s*/g, '\n').trim();
  const result = { topic: '', location: '', organizer: '', details: plain };
  const aliases = labels[locale] || labels.en;
  const fieldMap = [
    ['topic', aliases.topic], ['location', aliases.location], ['organizer', aliases.organizer]
  ];
  for (const [field, label] of fieldMap) {
    const expression = new RegExp(`(?:^|[\\n/])\\s*${label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*[:：]\\s*([^\\n]+)`, 'i');
    const match = plain.match(expression);
    if (match) result[field] = match[1].trim().replace(/\s*\/\s*$/, '');
  }
  return result;
}

function localizedEvent(locale, event) {
  const fields = splitDetails(locale, event.detailsHtml);
  return {
    visible: Boolean(event.visible),
    dateLabel: event.dateLabel,
    title: clean(event.titleHtml),
    topic: fields.topic,
    venue: fields.location,
    organizer: fields.organizer
  };
}

function blankTranslation() {
  return { visible: false, dateLabel: '', title: '', topic: '', venue: '', organizer: '' };
}

const secondaryIndex = new Map();
for (const locale of localeCodes.filter((code) => code !== 'cn')) {
  for (const year of legacy.timelines[locale]?.years || []) {
    for (const event of year.events || []) {
      const date = dateToIso(locale, event.dateLabel);
      if (!date || !event.country) continue;
      const key = `${locale}|${date}|${event.country.toLowerCase()}`;
      if (!secondaryIndex.has(key)) secondaryIndex.set(key, event);
    }
  }
}

const years = (legacy.timelines.cn?.years || []).map((cnYear, yearIndex) => {
  const translations = {};
  for (const locale of localeCodes) {
    const source = locale === 'cn'
      ? cnYear
      : (legacy.timelines[locale]?.years || []).find((year) => String(year.year) === String(cnYear.year));
    translations[locale] = source
      ? { visible: Boolean(source.visible), title: clean(source.titleHtml), summaryHtml: source.summaryHtml || '' }
      : { visible: false, title: '', summaryHtml: '' };
  }
  return {
    id: `year-${cnYear.year}-${yearIndex + 1}`,
    year: cnYear.year,
    icon: cnYear.icon,
    translations
  };
});

const events = [];
for (const [yearIndex, cnYear] of (legacy.timelines.cn?.years || []).entries()) {
  for (const [eventIndex, cnEvent] of cnYear.events.entries()) {
    const date = dateToIso('cn', cnEvent.dateLabel);
    if (!date) continue;
    const country = cnEvent.country.toLowerCase();
    const translations = {};
    for (const locale of localeCodes) {
      const source = locale === 'cn' ? cnEvent : secondaryIndex.get(`${locale}|${date}|${country}`);
      translations[locale] = source ? localizedEvent(locale, source) : blankTranslation();
    }
    events.push({
      id: `news-${date}-${country || 'global'}-${eventIndex + 1}`,
      yearId: years[yearIndex].id,
      date,
      country,
      city: { id: null, names: Object.fromEntries(localeCodes.map((locale) => [locale, ''])) },
      flag: country ? `images/wflags/${country}.png` : '',
      media: [],
      translations
    });
  }
}

const migrated = {
  schemaVersion: 2,
  description: '以中文新闻为主记录。每条新闻的通用字段只保存一次；translations 存放各语言内容和是否显示。未来日期由页面运行时按 date 自动隐藏。',
  defaultLocale: 'cn',
  locales: Object.fromEntries(localeCodes.map((locale) => [locale, {
    ...legacy.locales[locale],
    labels: labels[locale] || labels.en
  }])),
  years,
  events
};

fs.writeFileSync(file, `${JSON.stringify(migrated, null, 2)}\n`);
console.log(`已迁移 ${events.length} 条中文新闻至 schemaVersion 2`);
