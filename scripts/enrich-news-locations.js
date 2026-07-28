#!/usr/bin/env node

/* 为新闻城市补齐国家与完整地点的本地化字段，可重复执行。 */
const fs = require('node:fs');
const path = require('node:path');

const filePath = path.resolve(__dirname, '..', 'data', 'news.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
const countryNames = {
  at: { cn: '奥地利', en: 'Austria', de: 'Österreich', fr: 'Autriche', it: 'Austria', es: 'Austria', jp: 'オーストリア', kr: '오스트리아', th: 'ออสเตรีย', ru: 'Австрия', ar: 'النمسا', vi: 'Áo' },
  ch: { cn: '瑞士', en: 'Switzerland', de: 'Schweiz', fr: 'Suisse', it: 'Svizzera', es: 'Suiza', jp: 'スイス', kr: '스위스', th: 'สวิตเซอร์แลนด์', ru: 'Швейцария', ar: 'سويسرا', vi: 'Thụy Sĩ' },
  cn: { cn: '中国', en: 'China', de: 'China', fr: 'Chine', it: 'Cina', es: 'China', jp: '中国', kr: '중국', th: 'จีน', ru: 'Китай', ar: 'الصين', vi: 'Trung Quốc' },
  cz: { cn: '捷克', en: 'Czech Republic', de: 'Tschechien', fr: 'Tchéquie', it: 'Repubblica Ceca', es: 'República Checa', jp: 'チェコ', kr: '체코', th: 'เช็ก', ru: 'Чехия', ar: 'التشيك', vi: 'Cộng hòa Séc' },
  de: { cn: '德国', en: 'Germany', de: 'Deutschland', fr: 'Allemagne', it: 'Germania', es: 'Alemania', jp: 'ドイツ', kr: '독일', th: 'เยอรมนี', ru: 'Германия', ar: 'ألمانيا', vi: 'Đức' },
  fr: { cn: '法国', en: 'France', de: 'Frankreich', fr: 'France', it: 'Francia', es: 'Francia', jp: 'フランス', kr: '프랑스', th: 'ฝรั่งเศส', ru: 'Франция', ar: 'فرنسا', vi: 'Pháp' },
  gb: { cn: '英国', en: 'United Kingdom', de: 'Vereinigtes Königreich', fr: 'Royaume-Uni', it: 'Regno Unito', es: 'Reino Unido', jp: 'イギリス', kr: '영국', th: 'สหราชอาณาจักร', ru: 'Великобритания', ar: 'المملكة المتحدة', vi: 'Vương quốc Anh' },
  it: { cn: '意大利', en: 'Italy', de: 'Italien', fr: 'Italie', it: 'Italia', es: 'Italia', jp: 'イタリア', kr: '이탈리아', th: 'อิตาลี', ru: 'Италия', ar: 'إيطاليا', vi: 'Ý' },
  jp: { cn: '日本', en: 'Japan', de: 'Japan', fr: 'Japon', it: 'Giappone', es: 'Japón', jp: '日本', kr: '일본', th: 'ญี่ปุ่น', ru: 'Япония', ar: 'اليابان', vi: 'Nhật Bản' },
  lu: { cn: '卢森堡', en: 'Luxembourg', de: 'Luxemburg', fr: 'Luxembourg', it: 'Lussemburgo', es: 'Luxemburgo', jp: 'ルクセンブルク', kr: '룩셈부르크', th: 'ลักเซมเบิร์ก', ru: 'Люксембург', ar: 'لوكسمبورغ', vi: 'Luxembourg' },
  th: { cn: '泰国', en: 'Thailand', de: 'Thailand', fr: 'Thaïlande', it: 'Thailandia', es: 'Tailandia', jp: 'タイ', kr: '태국', th: 'ไทย', ru: 'Таиланд', ar: 'تايلاند', vi: 'Thái Lan' },
  un: { cn: '联合国', en: 'United Nations', de: 'Vereinte Nationen', fr: 'Nations Unies', it: 'Nazioni Unite', es: 'Naciones Unidas', jp: '国際連合', kr: '유엔', th: 'สหประชาชาติ', ru: 'ООН', ar: 'الأمم المتحدة', vi: 'Liên Hợp Quốc' }
};
const cityCountryOverrides = {
  bonn: 'de',
  geneva: 'ch',
  geneve: 'ch'
};

for (const event of data.events) {
  const countryCode = cityCountryOverrides[event.city?.id] || event.country;
  const country = countryNames[countryCode];
  if (!event.city || !country) continue;
  event.city.country = { code: countryCode.toUpperCase(), names: country };
  delete event.city.locationNames;
}

fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`);
console.log(`已补齐 ${data.events.length} 条新闻的城市国家翻译。`);
