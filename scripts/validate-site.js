#!/usr/bin/env node

/** 校验公开页面的本地资源、链接及 SEO 基础标签。 */
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const locales = { cn: 'zh-CN', en: 'en', de: 'de', es: 'es', fr: 'fr', it: 'it', jp: 'ja', kr: 'ko', ru: 'ru', th: 'th', ar: 'ar', vi: 'vi' };
const pages = ['home', 'about', 'research', 'projects', 'news'];
const errors = [];

function pageFile(locale, page) {
  return page === 'home' ? `${locale}.html` : `${locale}-${page}.html`;
}

function isExternal(reference) {
  return /^(?:https?:|\/\/|mailto:|tel:|javascript:|#|data:)/i.test(reference);
}

function localFileExists(page, reference) {
  const clean = reference.replace(/[?#].*$/, '');
  if (!clean || isExternal(clean)) return true;
  const target = clean.startsWith('/') ? path.join(root, clean) : path.resolve(path.dirname(page), clean);
  return fs.existsSync(target);
}

for (const [locale, lang] of Object.entries(locales)) {
  for (const page of pages) {
    const name = pageFile(locale, page);
    const file = path.join(root, name);
    if (!fs.existsSync(file)) {
      errors.push(`${name}: 页面缺失`);
      continue;
    }
    const html = fs.readFileSync(file, 'utf8');
    const executableHtml = html.replace(/<!--[\s\S]*?-->/g, '');
    if (!/<title>\s*[^<]+/i.test(html)) errors.push(`${name}: 缺少 title`);
    if (!/<meta\s+name=["']description["']\s+content=["'][^"']+/i.test(html)) errors.push(`${name}: 缺少 description`);
    if (!new RegExp(`<html\\s+lang=["']${lang}["']`, 'i').test(html)) errors.push(`${name}: lang 应为 ${lang}`);
    if (!new RegExp(`<link\\s+rel=["']canonical["']\\s+href=["']https://dr\\.h-xu\\.com/${name.replace('.', '\\.')}`, 'i').test(html)) errors.push(`${name}: canonical 缺失或错误`);

    for (const [alternateLocale, alternateLang] of Object.entries(locales)) {
      const alternateName = pageFile(alternateLocale, page);
      const expected = `<link rel="alternate" hreflang="${alternateLang}" href="https://dr.h-xu.com/${alternateName}">`;
      if (!html.includes(expected)) errors.push(`${name}: 缺少 hreflang ${alternateLang}`);
    }
    const defaultName = pageFile('en', page);
    if (!html.includes(`<link rel="alternate" hreflang="x-default" href="https://dr.h-xu.com/${defaultName}">`)) {
      errors.push(`${name}: 缺少页面类型对应的 x-default`);
    }

    const references = [...executableHtml.matchAll(/(?:src|href|poster|data-video|data-subtitle)=["']([^"']+)["']/gi)].map((match) => match[1].trim());
    for (const reference of references) {
      if (!localFileExists(file, reference)) errors.push(`${name}: 找不到本地资源 ${reference}`);
    }
  }
}

if (errors.length) {
  console.error(`站点校验失败（${errors.length} 项）：`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log(`站点校验通过：${Object.keys(locales).length} 种语言，${pages.length} 类页面。`);
}
