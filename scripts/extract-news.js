#!/usr/bin/env node

/**
 * 一次性将现有新闻页的时间线迁移至 data/news.json。
 * 后续内容维护应直接编辑 JSON，而不是重复执行本脚本。
 */
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const outputPath = path.join(root, 'data', 'news.json');
const locales = {
  cn: { file: 'cn-news.html', filterLabel: '选择国家' },
  en: { file: 'en-news.html', filterLabel: 'Select Country' },
  de: { file: 'de-news.html', filterLabel: 'Land auswählen' },
  fr: { file: 'fr-news.html', filterLabel: 'Sélectionner un pays' },
  it: { file: 'it-news.html', filterLabel: 'Seleziona un Paese' },
  es: { file: 'es-news.html', filterLabel: 'Seleccionar país' },
  jp: { file: 'jp-news.html', filterLabel: '国を選択' },
  kr: { file: 'kr-news.html', filterLabel: '국가 선택' },
  th: { file: 'th-news.html', filterLabel: 'เลือกประเทศ' },
  ru: { file: 'ru-news.html', filterLabel: 'Выберите страну' },
  ar: { file: 'ar-news.html', filterLabel: 'اختر الدولة' },
  vi: { file: 'vi-news.html', filterLabel: 'Chọn quốc gia' }
};

function normalizeHtml(value) {
  return value
    .replace(/\r\n/g, '\n')
    .replace(/\s*\n\s*/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function extractTagContent(markup, tagName, className) {
  const expression = className
    ? new RegExp(`<${tagName}[^>]*class=["'][^"']*${className}[^"']*["'][^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i')
    : new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i');
  const match = markup.match(expression);
  return match?.[1] ? normalizeHtml(match[1]) : '';
}

function stripTags(value) {
  return value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function removeDuplicateImages(value) {
  const seen = new Set();
  return value.replace(/<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi, (image, source) => {
    if (seen.has(source)) return '';
    seen.add(source);
    return image;
  }).replace(/\s{2,}/g, ' ').trim();
}

function extractTimeline(html, locale) {
  const timelineMatch = html.match(/<ul class=["']timeline["'][^>]*>([\s\S]*?)<\/ul>/i);
  if (!timelineMatch) throw new Error(`${locale}: 未找到 .timeline`);

  const markup = timelineMatch[1].replace(/<!--[\s\S]*?-->/g, '');
  const itemExpression = /<li class=["']timeline-item(\s+period)?["'][^>]*>([\s\S]*?)<\/li>/gi;
  const years = [];
  let currentYear = null;
  let match;
  let eventIndex = 0;

  while ((match = itemExpression.exec(markup))) {
    const isPeriod = Boolean(match[1]);
    const itemMarkup = match[2];
    if (isPeriod) {
      const titleHtml = removeDuplicateImages(extractTagContent(itemMarkup, 'h3', 'timeline-title'));
      const summaryHtml = extractTagContent(itemMarkup, 'h6', '');
      const icon = itemMarkup.match(/<img[^>]+src=["']([^"']+12-[^"']+)["']/i)?.[1] || '';
      const year = stripTags(titleHtml).match(/\d{4}/)?.[0] || `year-${years.length + 1}`;
      currentYear = {
        id: `${locale}-${year}-${years.length + 1}`,
        year: Number(year) || year,
        visible: true,
        titleHtml,
        icon,
        summaryHtml,
        events: []
      };
      years.push(currentYear);
      continue;
    }

    if (!currentYear) continue;
    const dateHtml = extractTagContent(itemMarkup, 'span', '');
    const titleHtml = extractTagContent(itemMarkup, 'h5', 'timeline-title');
    const detailsHtml = extractTagContent(itemMarkup, 'p', '');
    const country = itemMarkup.match(/images\/wflags\/([\w-]+)\.png/i)?.[1] || '';
    if (!stripTags(dateHtml) && !stripTags(titleHtml) && !stripTags(detailsHtml)) continue;
    currentYear.events.push({
      id: `${locale}-event-${++eventIndex}`,
      visible: true,
      country,
      dateLabel: stripTags(dateHtml),
      titleHtml,
      detailsHtml,
      media: []
    });
  }

  return years;
}

const data = {
  schemaVersion: 1,
  description: '新闻内容唯一数据源。每个语言的 visible 可独立控制该年度或事件是否输出。',
  locales: {},
  timelines: {}
};

for (const [locale, config] of Object.entries(locales)) {
  const sourcePath = path.join(root, config.file);
  if (!fs.existsSync(sourcePath)) continue;
  const source = fs.readFileSync(sourcePath, 'utf8');
  data.locales[locale] = {
    sourceFile: config.file,
    filterLabel: config.filterLabel,
    enabled: true
  };
  data.timelines[locale] = { years: extractTimeline(source, locale) };
}

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(data, null, 2)}\n`);
console.log(`已写入 ${path.relative(root, outputPath)}`);
