#!/usr/bin/env node

/** 将既有 JSON 的详情字符串规范为主题、地点、主办方三个独立字段。 */
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const file = path.join(root, 'data', 'news.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const labels = {
  cn: ['主题', '地点', '主办'], en: ['Theme', 'Location', 'Organizer'], de: ['Thema', 'Ort', 'Veranstalter'],
  fr: ['Thème', 'Lieu', 'Organisateur'], it: ['Tema', 'Luogo', 'Organizzatore'], es: ['Tema', 'Lugar', 'Organizador'],
  jp: ['テーマ', '場所', '主催'], kr: ['주제', '장소', '주최'], th: ['หัวข้อ', 'สถานที่', 'ผู้จัด'],
  ru: ['Тема', 'Место', 'Организатор'], ar: ['الموضوع', 'المكان', 'المنظم'], vi: ['Chủ đề', 'Địa điểm', 'Đơn vị tổ chức']
};
const labelAliases = {
  es: { location: ['Ubicación'] }
};

function escape(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

for (const event of data.events) {
  for (const [locale, translation] of Object.entries(event.translations)) {
    if (!translation.details) {
      delete translation.location;
      delete translation.details;
      continue;
    }
    const [topicLabel, locationLabel, organizerLabel] = labels[locale] || labels.en;
    const locationMarkers = [locationLabel, ...(labelAliases[locale]?.location || [])];
    const marker = new RegExp(`(?:^|[\\n/|])\\s*(${escape(topicLabel)}|${locationMarkers.map(escape).join('|')}|${escape(organizerLabel)})\\s*[:：]\\s*`, 'gi');
    const details = translation.details.replace(/<br\s*\/?\s*>/gi, '\n');
    const matches = [...details.matchAll(marker)];
    if (!matches.length) continue;
    const fields = { [topicLabel]: '', [locationLabel]: '', [organizerLabel]: '' };
    matches.forEach((match, index) => {
      const start = match.index + match[0].length;
      const end = index + 1 < matches.length ? matches[index + 1].index : details.length;
      const key = locationMarkers.includes(match[1]) ? locationLabel : match[1];
      fields[key] = details.slice(start, end).replace(/^\s*\/\s*|\s*\/\s*$/g, '').trim();
    });
    translation.topic = fields[topicLabel] || translation.topic || '';
    translation.venue = fields[locationLabel] || translation.venue || translation.location || '';
    delete translation.location;
    translation.organizer = fields[organizerLabel] || translation.organizer || '';
    delete translation.details;
  }
}

fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
console.log('已规范新闻详情字段。');
