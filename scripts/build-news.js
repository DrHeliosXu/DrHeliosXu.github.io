#!/usr/bin/env node

/**
 * 从 data/news.json 构建新闻时间线。
 * 当前先输出中文页；其他语言可在确认内容后传入对应语言代码。
 */
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const data = JSON.parse(fs.readFileSync(path.join(root, 'data', 'news.json'), 'utf8'));
const locale = process.argv[2] || 'cn';
const pageByLocale = Object.fromEntries(Object.entries(data.locales).map(([code, config]) => [code, config.sourceFile]));
const page = pageByLocale[locale];
const localeConfig = data.locales[locale];

if (data.schemaVersion !== 2 || !page || !localeConfig) throw new Error(`未配置语言：${locale}`);

function renderYear(year) {
  const translation = year.translations[locale];
  if (!translation?.visible) return '';
  const events = data.events
    .filter((event) => event.yearId === year.id && event.translations[locale]?.visible)
    .map(renderEvent)
    .join('\n');
  if (!events) return '';
  return `
      <li class="timeline-item period" data-news-year="${year.year}">
        <div class="timeline-info"></div>
        <div class="timeline-content">
          <h3 class="timeline-title">${translation.title}${year.icon ? ` <img src="${year.icon}" alt="flag" style="height: 47px; position: relative; top: -3px;" />` : ''}</h3>
          ${translation.summaryHtml ? `<h6>${translation.summaryHtml}</h6>` : ''}
        </div>
      </li>
      ${events}`.trim();
}

function renderEvent(event) {
  const translation = event.translations[locale];
  const flag = event.flag ? `<img src="${event.flag}" alt="flag" style="height: 17px; margin-left: -43px; position: relative; top: 1.5px; z-index: 99;" />` : '';
  const text = localeConfig.labels || {};
  const city = event.city?.names?.[locale] || event.city?.names?.en || '';
  const country = event.city?.country?.names?.[locale] || event.city?.country?.names?.en || '';
  const place = locale === 'cn' ? `${country}${city}` : [city, country].filter(Boolean).join(', ');
  const location = [place, translation.venue].filter(Boolean).join(' / ');
  const placeAndOrganizer = [
    location && `${text.location}: ${location}`,
    translation.organizer && `${text.organizer}: ${translation.organizer}`
  ].filter(Boolean).join(' ｜ ');
  const metadata = [
    translation.topic && `${text.topic}: ${translation.topic}`,
    placeAndOrganizer
  ].filter(Boolean).join('<br>');
  const content = [
    `<h5 class="timeline-title">${translation.title}</h5>`,
    metadata ? `<p>${metadata}</p>` : '',
    '<!-- 预留：每条新闻可在 data/news.json 的 media 中配置 2-3 张图片。 -->'
  ].filter(Boolean).join('\n          ');
  return `
      <li class="timeline-item" data-news-id="${event.id}" data-news-date="${event.date}" data-news-country="${event.country}">
        <div class="timeline-info">${flag}<span style="margin-left: 15px;">${translation.dateLabel}</span></div>
        <div class="timeline-marker"></div>
        <div class="timeline-content">
          ${content}
        </div>
      </li>`.trim();
}

const generated = `<!-- NEWS_TIMELINE_START: 由 data/news.json 自动生成，请勿直接编辑 -->\n<hr>${data.years.map(renderYear).join('\n')}\n<!-- NEWS_TIMELINE_END -->`;
const pagePath = path.join(root, page);
const html = fs.readFileSync(pagePath, 'utf8');
const listMatch = html.match(/(<ul class=["']timeline["'][^>]*>)([\s\S]*?)(<\/ul>)/i);
if (!listMatch) throw new Error(`${page}: 未找到 .timeline`);

const output = html.replace(listMatch[0], `${listMatch[1]}\n${generated}\n${listMatch[3]}`);
fs.writeFileSync(pagePath, output);
console.log(`已构建 ${page}`);
