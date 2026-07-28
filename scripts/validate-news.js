#!/usr/bin/env node

/** 构建前校验 data/news.json 的核心契约。 */
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const data = JSON.parse(fs.readFileSync(path.join(root, 'data', 'news.json'), 'utf8'));
const errors = [];
const locales = Object.keys(data.locales || {});

if (data.schemaVersion !== 2) errors.push('news.json 必须使用 schemaVersion 2。');

for (const event of data.events || []) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(event.date || '')) errors.push(`${event.id}: date 必须是 YYYY-MM-DD。`);
  if (!/^[a-z]{2,5}$/.test(event.country || '')) errors.push(`${event.id}: country 必须是小写国家或组织代码。`);
  if (!event.flag) errors.push(`${event.id}: 缺少 flag。`);
  if (!event.city || !Object.hasOwn(event.city, 'id') || !event.city.names) errors.push(`${event.id}: city 必须包含 id 与 names。`);

  for (const locale of locales) {
    const translation = event.translations?.[locale];
    if (!translation) {
      errors.push(`${event.id}: 缺少 ${locale} 翻译对象。`);
      continue;
    }
    for (const field of ['visible', 'dateLabel', 'title', 'topic', 'venue', 'organizer']) {
      if (!Object.hasOwn(translation, field)) errors.push(`${event.id}: ${locale} 缺少字段 ${field}。`);
    }
    if (event.city.id && !event.city.names[locale]) errors.push(`${event.id}: 城市 ${event.city.id} 缺少 ${locale} 名称。`);
    if (!translation.dateLabel || !translation.title) errors.push(`${event.id}: ${locale} 缺少日期或标题翻译。`);
    for (const field of ['topic', 'venue', 'organizer']) {
      const hasSource = Object.values(event.translations || {}).some((item) => typeof item?.[field] === 'string' && item[field].trim());
      if (hasSource && !translation[field]) errors.push(`${event.id}: ${locale} 缺少 ${field} 翻译。`);
    }
  }
}

for (const year of data.years || []) {
  if (!year.id || !year.year) errors.push('年度新闻必须包含 id 与 year。');
  for (const locale of locales) {
    const translation = year.translations?.[locale];
    if (!translation) {
      errors.push(`${year.id}: 缺少 ${locale} 年度翻译对象。`);
      continue;
    }
    for (const field of ['title', 'summaryHtml']) {
      if (typeof translation[field] !== 'string' || !translation[field].trim()) {
        errors.push(`${year.id}: ${locale} 缺少 ${field} 翻译。`);
      }
    }
  }
}

if (errors.length) {
  console.error(`新闻数据校验失败（${errors.length} 项）：`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log(`新闻数据校验通过：${data.events.length} 条事件，${locales.length} 种语言。`);
}
