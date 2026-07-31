#!/usr/bin/env node

/**
 * 对多语言静态页面执行可重复的机械维护：
 * - 移除未使用的 Flaticon；
 * - 仅在没有实际图标调用的页面移除 Font Awesome；
 * - 将 About 页播放器依赖统一改为懒加载；
 * - 将新闻地图替换为压缩后的 WebP 静态预览。
 * - 将开发日志置于统一 debug 开关之下。
 */
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const locales = ['cn', 'en', 'de', 'es', 'fr', 'it', 'jp', 'kr', 'ru', 'th', 'ar', 'vi'];
const pages = ['home', 'about', 'research', 'projects', 'news'];

function ensureDebugBootstrap(html) {
  if (/js\/site-debug\.js/.test(html)) return html;
  return html.replace(/<head(\s[^>]*)?>/i, (match) => `${match}\n  <script src="js/site-debug.js"></script>`);
}

function fileFor(locale, page) {
  return page === 'home' ? `${locale}.html` : `${locale}-${page}.html`;
}

function writeIfChanged(file, content) {
  const previous = fs.readFileSync(file, 'utf8');
  if (previous !== content) fs.writeFileSync(file, content);
}

for (const locale of locales) {
  for (const page of pages) {
    const file = path.join(root, fileFor(locale, page));
    if (!fs.existsSync(file)) continue;

    let html = fs.readFileSync(file, 'utf8');
    html = ensureDebugBootstrap(html);
    html = html.replace(/href=(["'])www\.linkedin\.com\/in\/xuhong\/?\1/gi, 'href="https://www.linkedin.com/in/xuhong/"');
    html = html.replace(/\s*<link\b[^>]*\bhref=["']fonts\/flaticon\/font\/flaticon\.css["'][^>]*>\s*/gi, '\n');
    html = html.replace(/images\/visited_map\.gif/g, 'images/visited_map.optimized.webp');

    // Font Awesome 只保留在实际使用 fa-* 图标类的页面。
    if (!/\bfa-[a-z0-9-]+\b/i.test(html)) {
      html = html.replace(/\s*<link\b[^>]*\bhref=["']https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/font-awesome\/[^"']+["'][^>]*>\s*/gi, '\n');
    }

    html = html.replace(/\bconsole\.log\s*\(/g, 'window.siteDebug(');

    if (page === 'about') {
      html = html.replace(/\s*<link\b[^>]*\bhref=["'][^"']*(?:public\.codepenassets|mediaelement|style_podcast)[^"']*["'][^>]*>\s*/gi, '\n');
      html = html.replace(/\s*<script\b[^>]*\bsrc=["'][^"']*(?:mediaelement|changespeed|script_podcast)[^"']*["'][^>]*>\s*<\/script>\s*/gi, '\n');

      if (!/podcast_lazy_loader\.js/.test(html)) {
        html = html.replace(/<\/body>/i, '  <script defer src="./js/podcast_lazy_loader.js?v=20260731-lazy"></script>\n</body>');
      }
    }

    writeIfChanged(file, html);
  }
}

const javascriptDirectory = path.join(root, 'js');
for (const name of fs.readdirSync(javascriptDirectory)) {
  if (!name.endsWith('.js') || name.endsWith('.min.js') || name === 'site-debug.js') continue;
  const file = path.join(javascriptDirectory, name);
  const source = fs.readFileSync(file, 'utf8');
  writeIfChanged(file, source.replace(/\bconsole\.log\s*\(/g, 'window.siteDebug('));
}

const entry = path.join(root, 'index.html');
if (fs.existsSync(entry)) {
  let html = fs.readFileSync(entry, 'utf8');
  html = ensureDebugBootstrap(html).replace(/\bconsole\.log\s*\(/g, 'window.siteDebug(');
  writeIfChanged(entry, html);
}

const legacyChinese = path.join(root, 'zh.html');
if (fs.existsSync(legacyChinese)) {
  let html = fs.readFileSync(legacyChinese, 'utf8');
  html = ensureDebugBootstrap(html)
    .replace(/href=(["'])www\.linkedin\.com\/in\/xuhong\/?\1/gi, 'href="https://www.linkedin.com/in/xuhong/"')
    .replace(/\bconsole\.log\s*\(/g, 'window.siteDebug(');
  writeIfChanged(legacyChinese, html);
}
