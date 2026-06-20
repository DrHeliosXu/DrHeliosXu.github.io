import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const srcDir = path.join(root, 'src');
const publicDir = path.join(root, 'public');
const distDir = path.join(root, 'dist');

const pageMap = {
  home: { template: 'home.html', output: 'index.html' },
  about: { template: 'about.html', output: 'about.html' },
  research: { template: 'research.html', output: 'research.html' },
  projects: { template: 'projects.html', output: 'projects.html' },
  news: { template: 'news.html', output: 'news.html' },
  video: { template: 'video.html', output: 'video.html' }
};

function readText(file) {
  return fs.readFileSync(file, 'utf8');
}

function readJson(file) {
  return JSON.parse(readText(file));
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyDir(source, target) {
  if (!fs.existsSync(source)) return;
  ensureDir(target);
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const sourcePath = path.join(source, entry.name);
    const targetPath = path.join(target, entry.name);
    if (entry.isDirectory()) copyDir(sourcePath, targetPath);
    else fs.copyFileSync(sourcePath, targetPath);
  }
}

function removeDir(dir) {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
}

function getPath(object, dottedPath) {
  return dottedPath.split('.').reduce((node, key) => node && node[key], object);
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function interpolate(template, values) {
  return String(template ?? '').replace(/\{\{(\w+)\}\}/g, (_, key) => values[key] ?? '');
}

function assetUrl(assetPath) {
  if (!assetPath) return '';
  return `../${assetPath.replace(/^\//, '')}`;
}

function pageUrl(language, pageId) {
  const output = pageMap[pageId].output;
  return output === 'index.html' ? `../${language}/` : `../${language}/${output}`;
}

function toFlagAsset(countryCode) {
  if (!countryCode) return '';
  if (countryCode === 'ARAB_LEAGUE') return '../assets/flags/Arab_League.svg';
  return `../assets/flags/${countryCode.toLowerCase()}.svg`;
}

function sortLanguages(languages) {
  const groupOrder = new Map([
    ['eastAsian', 1],
    ['latin', 2],
    ['complex', 3]
  ]);
  return [...languages].sort((a, b) => {
    const groupDiff = (groupOrder.get(a.sortGroup) || 99) - (groupOrder.get(b.sortGroup) || 99);
    if (groupDiff) return groupDiff;
    const orderDiff = (a.sortOrder || 999) - (b.sortOrder || 999);
    if (orderDiff) return orderDiff;
    return String(a.nativeName || a.label).localeCompare(String(b.nativeName || b.label), 'en', { sensitivity: 'base' });
  });
}

function getAvailableLanguages(languageSelection, i18n) {
  return sortLanguages(languageSelection.languages.filter((language) => i18n[language.code]));
}

function renderNavigation(i18n, language) {
  const pages = ['home', 'research', 'news', 'projects', 'about'];
  const links = pages.map((pageId) => {
    return `<li><a class="site-navigation__link" href="${pageUrl(language, pageId)}">${escapeHtml(i18n.navigation[pageId])}</a></li>`;
  }).join('');
  return `<ul class="site-navigation__list">${links}</ul>`;
}

function renderLanguageSwitcher(languages, currentLanguage, currentPage) {
  const current = languages.find((language) => language.code === currentLanguage) || languages[0];
  const options = languages.flatMap((language) => {
    if (language.code === 'cn' && currentLanguage === 'cn') {
      return [
        `<option value="${pageUrl('cn', currentPage)}" data-chinese-variant="simplified" selected>${escapeHtml(language.variants?.[0]?.label || '简体中文')}</option>`,
        `<option value="${pageUrl('cn', currentPage)}?variant=traditional" data-chinese-variant="traditional">${escapeHtml(language.variants?.[1]?.label || '繁体中文')}</option>`
      ];
    }
    const selected = language.code === currentLanguage ? ' selected' : '';
    const label = language.code === 'cn' ? '中文' : language.label;
    return [`<option value="${pageUrl(language.code, currentPage)}"${selected}>${escapeHtml(label)}</option>`];
  }).join('');
  return `
    <span class="language-switcher__flags"
      data-language-flags
      data-language-code="${escapeHtml(current.code)}"
      data-default-flag="${escapeHtml(current.defaultFlag)}"
      data-used-countries="${escapeHtml((current.usedCountries || []).join(','))}"
      data-single-flag-only="${current.singleFlagOnly ? 'true' : 'false'}"
      data-replace-default-flag="${current.replaceDefaultFlagWithVisitorCountry ? 'true' : 'false'}">
      <img class="language-switcher__flag" data-source-flag src="${toFlagAsset(current.defaultFlag)}" alt="">
    </span>
    <select class="language-switcher__select" data-language-switcher aria-label="Language">${options}</select>
  `;
}

function renderMetrics(metrics, i18n) {
  const items = [
    ['papers', metrics.papers, '▤'],
    ['citations', metrics.citations, '”'],
    ['patents', metrics.patents, '⚒'],
    ['reviews', metrics.reviews, '✎'],
    ['students', metrics.students, '▰'],
    ['grants', metrics.grants, '▣'],
    ['thesisDownloads', metrics.thesisDownloads, '⇩'],
    ['countriesVisited', metrics.countriesVisited, '◉']
  ];
  return items.map(([key, value, icon]) => `
    <div id="home-metric-${key}" class="metric-item">
      <span class="metric-item__icon" aria-hidden="true">${icon}</span>
      <span class="metric-item__value">${escapeHtml(value)}</span>
      <span class="metric-item__label">${escapeHtml(i18n.home.metrics[key])}</span>
    </div>
  `).join('');
}

function renderCards(items, type, i18n, assets, cardTemplate) {
  return items.map((item) => {
    if (type === 'paper') {
      return cardTemplate
        .replaceAll('{{cardId}}', `paper-card-${item.id}`)
        .replaceAll('{{title}}', escapeHtml(item.title))
        .replaceAll('{{journal}}', escapeHtml(item.journal))
        .replaceAll('{{year}}', escapeHtml(item.year))
        .replaceAll('{{authors}}', escapeHtml(item.authors.join(', ')))
        .replaceAll('{{doi}}', escapeHtml(item.doi))
        .replaceAll('{{linkLabel}}', escapeHtml(i18n.papers.linkLabel || 'DOI'));
    }
    if (type === 'project') {
      const image = getPath(assets, item.imageKey);
      return cardTemplate
        .replaceAll('{{cardId}}', `project-card-${item.id}`)
        .replaceAll('{{image}}', assetUrl(image?.src))
        .replaceAll('{{imageAlt}}', escapeHtml(getPath(i18n, image?.altKey || '') || ''))
        .replaceAll('{{title}}', escapeHtml(getPath(i18n, item.titleKey)))
        .replaceAll('{{period}}', escapeHtml(item.period))
        .replaceAll('{{summary}}', escapeHtml(getPath(i18n, item.summaryKey)));
    }
    return cardTemplate
      .replaceAll('{{cardId}}', `news-card-${item.id}`)
      .replaceAll('{{date}}', escapeHtml(item.date))
      .replaceAll('{{dateLabel}}', escapeHtml(item.date))
      .replaceAll('{{title}}', escapeHtml(getPath(i18n, item.titleKey)))
      .replaceAll('{{location}}', escapeHtml(getPath(i18n, item.locationKey)))
      .replaceAll('{{summary}}', escapeHtml(getPath(i18n, item.summaryKey)));
  }).join('');
}

function renderContactLinks(data, i18n) {
  return data.contacts.map((item) => {
    return `<p><strong>${escapeHtml(getPath(i18n, item.labelKey))}</strong> | <a href="${escapeHtml(item.href)}">${escapeHtml(item.value)}</a></p>`;
  }).join('');
}

function renderVisitorStats(stats) {
  const top = stats.topCountries.slice(0, 3).map((item) => `${escapeHtml(item.country)} ${escapeHtml(item.visitors)}`).join(' · ');
  return `<p data-visitor-stats>${escapeHtml(stats.totalVisitors)}</p><p>${top}</p>`;
}

function renderVideoSources(videos) {
  return videos.heroVideos.map((video) => `<source src="${assetUrl(video.src)}" type="${escapeHtml(video.type)}">`).join('');
}

function renderVideoList(videos, i18n) {
  return `<div class="video-list">${videos.videos.map((video) => `
    <article id="video-card-${video.id}" class="video-card">
      <video controls preload="metadata" src="${assetUrl(video.src)}"></video>
      <h3>${escapeHtml(getPath(i18n, video.titleKey))}</h3>
    </article>
  `).join('')}</div>`;
}

function renderPage(language, pageId, context) {
  const i18n = context.i18n[language];
  const logoForLanguage = context.assets.logo.byLanguage[language] || context.assets.logo.byLanguage.cn;
  const assets = JSON.parse(JSON.stringify(context.assets));
  assets.logo.current.src = logoForLanguage;

  const replacements = {
    language,
    pageId,
    assetBase: '../assets',
    homeUrl: pageUrl(language, 'home'),
    researchUrl: pageUrl(language, 'research'),
    contactUrl: 'mailto:h.xu@tum.de',
    navigation: renderNavigation(i18n, language),
    languageSwitcher: renderLanguageSwitcher(context.languages, language, pageId),
    heroVideoSources: renderVideoSources(context.videos),
    metrics: renderMetrics(context.metrics, i18n),
    contactLinks: renderContactLinks(context.socialLinks, i18n),
    visitorStats: renderVisitorStats(context.visitorStats),
    footerWelcome: interpolate(i18n.footer.welcomeMessage, { country: 'Earth' }),
    footerCopyright: interpolate(i18n.footer.copyright, { year: new Date().getFullYear() })
  };

  const componentHtml = {
    header: readText(path.join(srcDir, 'components/header.html')),
    hero: readText(path.join(srcDir, 'components/hero.html')),
    metrics: readText(path.join(srcDir, 'components/metrics.html')),
    footer: readText(path.join(srcDir, 'components/footer.html')),
    researchOverview: `<section><h2 class="section-title">${escapeHtml(i18n.home.sections.researchTitle)}</h2><img class="research-overview__image" src="${assetUrl(assets.research.renewableEnergy.src)}" alt="${escapeHtml(getPath(i18n, assets.research.renewableEnergy.altKey))}"><h3>${escapeHtml(i18n.home.research.title)}</h3><p>${escapeHtml(i18n.home.research.summary)}</p></section>`,
    newsPreview: `<section><h2 class="section-title">${escapeHtml(i18n.home.sections.newsTitle)}</h2><div class="content-list">${renderCards(context.news.news.slice(0, 3), 'news', i18n, assets, readText(path.join(srcDir, 'components/news-card.html')))}</div></section>`,
    paperList: `<section><h2 class="section-title">${escapeHtml(i18n.papers.title)}</h2><div class="content-list">${renderCards(context.papers.papers, 'paper', i18n, assets, readText(path.join(srcDir, 'components/paper-card.html')))}</div></section>`,
    patentList: `<section><h2 class="section-title">${escapeHtml(i18n.patents.title)}</h2><div class="content-list">${context.patents.patents.map((item) => `<article class="content-card"><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.region)} · ${escapeHtml(item.year)} · ${escapeHtml(item.status)}</p></article>`).join('')}</div></section>`,
    projectList: `<h1 class="section-title">${escapeHtml(i18n.projects.title)}</h1><div class="content-list">${renderCards(context.projects.projects, 'project', i18n, assets, readText(path.join(srcDir, 'components/project-card.html')))}</div>`,
    newsList: `<h1 class="section-title">${escapeHtml(i18n.news.title)}</h1><div class="content-list">${renderCards(context.news.news, 'news', i18n, assets, readText(path.join(srcDir, 'components/news-card.html')))}</div>`,
    aboutProfile: `<h1 class="section-title">${escapeHtml(i18n.about.title)}</h1><img class="research-overview__image" src="${assetUrl(assets.profile.main.src)}" alt="${escapeHtml(getPath(i18n, assets.profile.main.altKey))}"><div class="article-content">${i18n.about.body.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}</div>`,
    researchDetail: `<h1 class="section-title">${escapeHtml(i18n.research.title)}</h1><h2>${escapeHtml(i18n.research.subtitle)}</h2><div class="article-content">${i18n.research.body.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}</div>`,
    videoList: renderVideoList(context.videos, i18n)
  };

  let pageContent = readText(path.join(srcDir, 'templates', pageMap[pageId].template));
  pageContent = pageContent.replace(/\{\{component:(\w+)\}\}/g, (_, name) => componentHtml[name] || '');

  let html = readText(path.join(srcDir, 'templates/base.html'));
  html = html.replace('{{pageContent}}', pageContent);
  html = html.replace(/\{\{component:(\w+)\}\}/g, (_, name) => componentHtml[name] || '');

  const tokenContext = { ...replacements, meta: i18n.meta };
  html = html.replace(/\{\{meta\.(\w+)\}\}/g, (_, key) => escapeHtml(i18n.meta[key]));
  html = html.replace(/\{\{t:([^}]+)\}\}/g, (_, key) => escapeHtml(getPath(i18n, key)));
  html = html.replace(/\{\{asset:([^}]+)\}\}/g, (_, key) => {
    const asset = getPath(assets, key);
    return escapeHtml(typeof asset === 'string' ? assetUrl(asset) : assetUrl(asset?.src));
  });
  html = html.replace(/\{\{(\w+)\}\}/g, (_, key) => tokenContext[key] ?? '');
  return html;
}

function main() {
  removeDir(distDir);
  ensureDir(distDir);
  copyDir(path.join(publicDir, 'assets'), path.join(distDir, 'assets'));
  copyDir(path.join(publicDir, 'data'), path.join(distDir, 'data'));
  copyDir(path.join(srcDir, 'css'), path.join(distDir, 'assets/css'));
  copyDir(path.join(srcDir, 'js'), path.join(distDir, 'assets/js'));
  fs.copyFileSync(path.join(root, 'config.yml'), path.join(distDir, 'config.yml'));

  const context = {
    languageSelection: readJson(path.join(publicDir, 'data/language-selection.json')),
    assets: readJson(path.join(publicDir, 'data/assets-registry.json')),
    metrics: readJson(path.join(publicDir, 'data/metrics.json')),
    papers: readJson(path.join(publicDir, 'data/papers.json')),
    projects: readJson(path.join(publicDir, 'data/projects.json')),
    news: readJson(path.join(publicDir, 'data/news.json')),
    patents: readJson(path.join(publicDir, 'data/patents.json')),
    videos: readJson(path.join(publicDir, 'data/videos.json')),
    socialLinks: readJson(path.join(publicDir, 'data/social-links.json')),
    visitorStats: readJson(path.join(publicDir, 'data/visitor-stats.json')),
    i18n: Object.fromEntries(fs.readdirSync(path.join(srcDir, 'i18n')).filter((file) => file.endsWith('.json')).map((file) => [path.basename(file, '.json'), readJson(path.join(srcDir, 'i18n', file))]))
  };
  context.languages = getAvailableLanguages(context.languageSelection, context.i18n);

  for (const language of context.languages) {
    const languageDir = path.join(distDir, language.code);
    ensureDir(languageDir);
    for (const pageId of Object.keys(pageMap)) {
      const html = renderPage(language.code, pageId, context);
      fs.writeFileSync(path.join(languageDir, pageMap[pageId].output), html);
    }
  }
  console.log(`built ${context.languages.length} languages into ${distDir}`);
}

main();
