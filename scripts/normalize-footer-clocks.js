#!/usr/bin/env node

/* 将根目录语言页面中的旧时钟链接统一替换为主脚本使用的标准占位符。 */

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const pages = fs.readdirSync(root)
  .filter((name) => name.endsWith('.html') && name !== 'index.html');

const isInsideComment = (content, index) => content.lastIndexOf('<!--', index) > content.lastIndexOf('-->', index);

const replaceActiveMatches = (content, expression) => {
  let count = 0;
  const result = content.replace(expression, (match, offset) => {
    if (isInsideComment(content, offset)) return match;
    count += 1;
    const role = count === 1 ? 'owner' : 'visitor';
    return `<span class="footer-time" data-footer-time="${role}" aria-live="off"></span>`;
  });
  return { content: result, count };
};

for (const page of pages) {
  const file = path.join(root, page);
  const original = fs.readFileSync(file, 'utf8');
  const clockLink = /<a\b(?=[^>]*\bclass="clock24")[\s\S]*?<\/a>/g;
  const digitalClock = /<span\b(?=[^>]*\bstyle="[^"]*color:\s*#ed7d31;[^"]*")[^>]*>[\s\S]*?<\/span>\s*-\s*<span\b(?=[^>]*\bclass="digitalTime")[^>]*><\/span>/g;

  let result;
  if (original.includes('class="clock24"')) {
    result = replaceActiveMatches(original, clockLink);
  } else {
    result = replaceActiveMatches(original, digitalClock);
  }

  if (result.count !== 2) {
    throw new Error(`${page}: 预期 2 个活动页脚时钟，实际找到 ${result.count} 个。`);
  }
  fs.writeFileSync(file, result.content);
}

console.log(`已标准化 ${pages.length} 个页面的页脚时钟。`);
