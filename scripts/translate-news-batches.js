#!/usr/bin/env node

/**
 * 为新闻数据生成和导入多语言翻译批次。
 *
 * 用法：
 *   node scripts/translate-news-batches.js export
 *   curl --config /tmp/news-translation-batches/curl.conf --parallel --parallel-max 4
 *   node scripts/translate-news-batches.js import
 *
 * 仅翻译缺失的标题、主题、主办方和场地。已有译文绝不覆盖；没有源数据的字段统一写为 null。
 */
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const newsPath = path.join(root, 'data', 'news.json');
const batchDir = path.join('/tmp', 'news-translation-batches');
const targetLocales = ['en', 'de', 'fr', 'it', 'es', 'jp', 'kr', 'th', 'ru', 'ar', 'vi'];
const translateLocale = { en: 'en', de: 'de', fr: 'fr', it: 'it', es: 'es', jp: 'ja', kr: 'ko', th: 'th', ru: 'ru', ar: 'ar', vi: 'vi' };
const sourceLocale = { zh: 'zh-CN', en: 'en' };
const fields = ['title', 'topic', 'organizer', 'venue'];

function nonEmpty(value) {
  return typeof value === 'string' && value.trim() !== '';
}

function dateLabel(date, locale) {
  const localeMap = { cn: 'zh-CN', en: 'en-US', de: 'de-DE', fr: 'fr-FR', it: 'it-IT', es: 'es-ES', jp: 'ja-JP', kr: 'ko-KR', th: 'th-TH', ru: 'ru-RU', ar: 'ar', vi: 'vi-VN' };
  return new Intl.DateTimeFormat(localeMap[locale] || 'en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  }).format(new Date(`${date}T12:00:00Z`));
}

function canonicalValue(event, field) {
  const chinese = event.translations.cn?.[field];
  if (nonEmpty(chinese)) return { source: 'zh', value: chinese };
  const english = event.translations.en?.[field];
  if (nonEmpty(english)) return { source: 'en', value: english };
  return null;
}

function exportBatches() {
  const data = JSON.parse(fs.readFileSync(newsPath, 'utf8'));
  fs.rmSync(batchDir, { recursive: true, force: true });
  fs.mkdirSync(batchDir, { recursive: true });
  const batches = new Map();

  for (const event of data.events) {
    for (const locale of Object.keys(data.locales)) {
      const translation = event.translations[locale];
      if (!translation) continue;
      if (!nonEmpty(translation.dateLabel)) translation.dateLabel = dateLabel(event.date, locale);

      for (const field of fields) {
        if (nonEmpty(translation[field])) continue;
        const canonical = canonicalValue(event, field);
        if (!canonical) {
          translation[field] = null;
          continue;
        }
        if (locale === 'cn' && canonical.source === 'zh') continue;
        if (locale === 'en' && canonical.source === 'en') continue;
        const key = `${locale}:${canonical.source}`;
        if (!batches.has(key)) batches.set(key, []);
        batches.get(key).push({ eventId: event.id, field, value: canonical.value });
      }
    }
  }

  const config = [];
  let isFirstBatch = true;
  for (const [key, entries] of batches) {
    const [locale, source] = key.split(':');
    const input = entries.map((entry, index) => `[[ITEM_${String(index).padStart(3, '0')}]]${entry.value}`).join('\n');
    const inputFile = path.join(batchDir, `${locale}-${source}.txt`);
    const outputFile = path.join(batchDir, `${locale}-${source}.json`);
    const manifestFile = path.join(batchDir, `${locale}-${source}.manifest.json`);
    fs.writeFileSync(inputFile, input);
    fs.writeFileSync(manifestFile, JSON.stringify(entries, null, 2));
    if (!isFirstBatch) config.push('next');
    isFirstBatch = false;
    config.push('url = "https://translate.googleapis.com/translate_a/single"');
    config.push('request = "POST"');
    config.push('data-urlencode = "client=gtx"');
    config.push(`data-urlencode = "sl=${sourceLocale[source]}"`);
    config.push(`data-urlencode = "tl=${translateLocale[locale]}"`);
    config.push('data-urlencode = "dt=t"');
    config.push(`data-urlencode = "q@${inputFile}"`);
    config.push(`output = "${outputFile}"`);
    config.push('fail-with-body');
  }
  fs.writeFileSync(path.join(batchDir, 'curl.conf'), `${config.join('\n')}\n`);
  fs.writeFileSync(newsPath, `${JSON.stringify(data, null, 2)}\n`);
  console.log(`已生成 ${batches.size} 个翻译批次，目录：${batchDir}`);
}

function importBatches() {
  const data = JSON.parse(fs.readFileSync(newsPath, 'utf8'));
  const events = new Map(data.events.map((event) => [event.id, event]));
  const files = fs.readdirSync(batchDir).filter((file) => file.endsWith('.manifest.json'));
  let applied = 0;

  for (const manifestName of files) {
    const stem = manifestName.replace('.manifest.json', '');
    const [locale] = stem.split('-');
    const manifest = JSON.parse(fs.readFileSync(path.join(batchDir, manifestName), 'utf8'));
    const response = JSON.parse(fs.readFileSync(path.join(batchDir, `${stem}.json`), 'utf8'));
    const translated = (response[0] || []).map((part) => part[0] || '').join('');
    const values = new Map();
    const pattern = /\[\[ITEM_(\d{3})\]\]([\s\S]*?)(?=\[\[ITEM_\d{3}\]\]|$)/g;
    let match;
    while ((match = pattern.exec(translated))) values.set(Number(match[1]), match[2].trim());

    manifest.forEach((entry, index) => {
      const event = events.get(entry.eventId);
      const value = values.get(index);
      if (!event || !nonEmpty(value)) throw new Error(`${stem}: 无法读取第 ${index + 1} 条翻译。`);
      event.translations[locale][entry.field] = value;
      applied += 1;
    });
  }

  fs.writeFileSync(newsPath, `${JSON.stringify(data, null, 2)}\n`);
  console.log(`已导入 ${applied} 条字段翻译。`);
}

if (process.argv[2] === 'export') exportBatches();
else if (process.argv[2] === 'import') importBatches();
else throw new Error('请使用 export 或 import 参数。');
