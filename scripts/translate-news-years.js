#!/usr/bin/env node

/**
 * 为 data/news.json 中缺失的年度新闻标题和概述创建、导入翻译批次。
 * 已有译文不会覆盖，HTML 链接会作为原文的一部分传递并保留。
 *
 * 用法：
 *   node scripts/translate-news-years.js export
 *   curl --config /tmp/news-year-translation-batches/curl.conf --parallel --parallel-max 4
 *   node scripts/translate-news-years.js import
 */
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const newsPath = path.join(root, 'data', 'news.json');
const batchDir = path.join('/tmp', 'news-year-translation-batches');
const locales = ['en', 'de', 'fr', 'it', 'es', 'jp', 'kr', 'th', 'ru', 'ar', 'vi'];
const localeMap = { en: 'en', de: 'de', fr: 'fr', it: 'it', es: 'es', jp: 'ja', kr: 'ko', th: 'th', ru: 'ru', ar: 'ar', vi: 'vi' };
const fields = ['title', 'summaryHtml'];

function hasText(value) {
  return typeof value === 'string' && value.trim() !== '';
}

function protectLinks(html) {
  const links = [];
  const text = html.replace(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi, (match, attributes, label) => {
    const index = links.length;
    links.push({ attributes, index });
    return `ZZNEWSLINK${index}STARTZZ${label}ZZNEWSLINK${index}ENDZZ`;
  });
  return { text, links };
}

function restoreLinks(text, links = []) {
  return links.reduce((result, link) => {
    const pattern = new RegExp(`ZZNEWSLINK${link.index}STARTZZ([\\s\\S]*?)ZZNEWSLINK${link.index}ENDZZ`, 'g');
    return result.replace(pattern, `<a${link.attributes}>$1</a>`);
  }, text);
}

function getSource(year, field) {
  for (const locale of ['cn', 'en']) {
    const value = year.translations?.[locale]?.[field];
    if (hasText(value)) return { locale, value };
  }
  return null;
}

function exportBatches() {
  const data = JSON.parse(fs.readFileSync(newsPath, 'utf8'));
  fs.rmSync(batchDir, { recursive: true, force: true });
  fs.mkdirSync(batchDir, { recursive: true });
  const batches = new Map();

  for (const year of data.years || []) {
    for (const locale of locales) {
      for (const field of fields) {
        const refreshProtectedLinks = process.argv.includes('--refresh-links') && year.id === 'year-2026-1' && field === 'summaryHtml';
        if (!refreshProtectedLinks && hasText(year.translations?.[locale]?.[field])) continue;
        const source = getSource(year, field);
        if (!source) throw new Error(`${year.id} 缺少 ${field} 的中文或英文源文本。`);
        const key = `${locale}-${source.locale}`;
        if (!batches.has(key)) batches.set(key, []);
        const protectedValue = field === 'summaryHtml' ? protectLinks(source.value) : { text: source.value, links: [] };
        batches.get(key).push({ yearId: year.id, field, value: protectedValue.text, links: protectedValue.links });
      }
    }
  }

  const config = [];
  let first = true;
  for (const [key, entries] of batches) {
    const [locale, source] = key.split('-');
    const inputFile = path.join(batchDir, `${key}.txt`);
    const outputFile = path.join(batchDir, `${key}.json`);
    fs.writeFileSync(inputFile, entries.map((entry, index) => `[[ITEM_${String(index).padStart(3, '0')}]]${entry.value}`).join('\n'));
    fs.writeFileSync(path.join(batchDir, `${key}.manifest.json`), JSON.stringify(entries, null, 2));
    if (!first) config.push('next');
    first = false;
    config.push('url = "https://translate.googleapis.com/translate_a/single"');
    config.push('request = "POST"');
    config.push('data-urlencode = "client=gtx"');
    config.push(`data-urlencode = "sl=${source === 'cn' ? 'zh-CN' : 'en'}"`);
    config.push(`data-urlencode = "tl=${localeMap[locale]}"`);
    config.push('data-urlencode = "dt=t"');
    config.push(`data-urlencode = "q@${inputFile}"`);
    config.push(`output = "${outputFile}"`);
    config.push('fail-with-body');
  }
  fs.writeFileSync(path.join(batchDir, 'curl.conf'), `${config.join('\n')}\n`);
  console.log(`已生成 ${batches.size} 个年度翻译批次。`);
}

function importBatches() {
  const data = JSON.parse(fs.readFileSync(newsPath, 'utf8'));
  const years = new Map((data.years || []).map((year) => [year.id, year]));
  let applied = 0;
  for (const manifestName of fs.readdirSync(batchDir).filter((file) => file.endsWith('.manifest.json'))) {
    const stem = manifestName.replace('.manifest.json', '');
    const locale = stem.split('-')[0];
    const manifest = JSON.parse(fs.readFileSync(path.join(batchDir, manifestName), 'utf8'));
    const response = JSON.parse(fs.readFileSync(path.join(batchDir, `${stem}.json`), 'utf8'));
    const result = (response[0] || []).map((part) => part[0] || '').join('');
    const values = new Map();
    const pattern = /\[\[ITEM_(\d{3})\]\]([\s\S]*?)(?=\[\[ITEM_\d{3}\]\]|$)/g;
    let match;
    while ((match = pattern.exec(result))) values.set(Number(match[1]), match[2].trim());
    manifest.forEach((entry, index) => {
      const value = values.get(index);
      const year = years.get(entry.yearId);
      if (!year || !hasText(value)) throw new Error(`${stem}: 无法读取第 ${index + 1} 条翻译。`);
      year.translations[locale][entry.field] = entry.field === 'summaryHtml' ? restoreLinks(value, entry.links) : value;
      applied += 1;
    });
  }
  fs.writeFileSync(newsPath, `${JSON.stringify(data, null, 2)}\n`);
  console.log(`已导入 ${applied} 条年度字段翻译。`);
}

if (process.argv[2] === 'export') exportBatches();
else if (process.argv[2] === 'import') importBatches();
else throw new Error('请使用 export 或 import 参数。');
