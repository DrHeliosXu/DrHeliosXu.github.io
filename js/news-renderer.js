/* 多语言新闻页：从 data/news.json 渲染时间线，加载失败时保留页面内置内容。 */
(function () {
  'use strict';

  window.__newsFetchRenderer = true;

  const bootstrap = document.currentScript || document.querySelector('script[data-news-locale]');
  const locale = bootstrap?.dataset.newsLocale;
  const organizationNames = {
    cn: '联合国', en: 'UN', de: 'UN', fr: 'ONU',
    it: 'ONU', es: 'ONU', jp: '国連', kr: '유엔',
    th: 'UN', ru: 'ООН', ar: 'الأمم المتحدة', vi: 'LHQ'
  };

  if (!locale) return;

  function element(tagName, className, text) {
    const node = document.createElement(tagName);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function isPastOrToday(date) {
    const eventDate = new Date(`${date}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return !Number.isNaN(eventDate.getTime()) && eventDate <= today;
  }

  function getPlace(event, translation) {
    const city = event.city?.names?.[locale] || event.city?.names?.en || '';
    const country = event.city?.country?.names?.[locale] || event.city?.country?.names?.en || '';
    const cityAndCountry = locale === 'cn' ? `${country}${city}` : [city, country].filter(Boolean).join(', ');
    return [cityAndCountry, translation.venue].filter(Boolean).join(' / ');
  }

  function getCountryName(code, events) {
    if (code === 'un') return organizationNames[locale] || organizationNames.en;
    const event = events.find((item) => item.country === code);
    return event?.city?.country?.shortNames?.[locale]
      || event?.city?.country?.names?.[locale]
      || event?.city?.country?.names?.en
      || code.toUpperCase();
  }

  function renderYear(year) {
    const translation = year.translations?.[locale];
    const item = element('li', 'timeline-item period');
    item.dataset.newsYear = String(year.year);
    if (locale === 'ar') item.style.textAlign = 'right';
    item.append(element('div', 'timeline-info'));
    const content = element('div', 'timeline-content');
    if (locale === 'ar') content.dir = 'rtl';
    if (!translation) return null;
    const title = element('h3', 'timeline-title', translation.title);
    if (year.icon) {
      const icon = document.createElement('img');
      icon.src = year.icon;
      icon.alt = '';
      icon.style.cssText = 'height: 47px; position: relative; top: -3px;';
      title.append(' ', icon);
    }
    content.append(title);
    if (translation.summaryHtml) {
      const summary = document.createElement('h6');
      summary.innerHTML = translation.summaryHtml;
      content.append(summary);
    }
    item.append(content);
    return item;
  }

  function renderEvent(event) {
    const translation = event.translations[locale];
    if (!translation) return null;
    const item = element('li', 'timeline-item');
    item.dataset.newsId = event.id;
    item.dataset.newsDate = event.date;
    item.dataset.newsCountry = event.country;

    const info = element('div', 'timeline-info');
    if (event.flag) {
      const flag = document.createElement('img');
      flag.className = 'timeline-flag';
      flag.src = event.flag;
      flag.alt = '';
      flag.style.cssText = 'height: 17px; position: relative; top: 1.5px; z-index: 99;';
      info.append(flag);
    }
    const date = element('span', '', translation.dateLabel);
    info.append(date);

    const content = element('div', 'timeline-content');
    if (locale === 'ar') content.dir = 'rtl';
    content.append(element('h5', 'timeline-title', translation.title));
    const details = element('p');
    const place = getPlace(event, translation);
    const labels = window.__newsLocaleLabels || {};
    if (translation.topic) details.append(document.createTextNode(`${labels.topic || 'Topic'}: ${translation.topic}`), document.createElement('br'));
    if (place) details.append(document.createTextNode(`${labels.location || 'Location'}: ${place}`));
    if (translation.organizer) details.append(document.createTextNode(`${place ? ' ｜ ' : ''}${labels.organizer || 'Organizer'}: ${translation.organizer}`));
    if (details.textContent) content.append(details);
    content.append(document.createComment('预留：每条新闻可在 data/news.json 的 media 中配置 2-3 张图片。'));

    item.append(info, element('div', 'timeline-marker'), content);
    return item;
  }

  function buildGroupsFromData(data) {
    const visibleEvents = data.events
      .filter((event) => event.translations?.[locale]?.visible && isPastOrToday(event.date))
      .sort((left, right) => right.date.localeCompare(left.date));
    const fragment = document.createDocumentFragment();
    const groups = [];

    data.years
      .filter((year) => year.translations?.[locale]?.visible)
      .sort((left, right) => right.year - left.year)
      .forEach((year) => {
        const events = visibleEvents.filter((event) => event.yearId === year.id);
        if (!events.length) return;
        const divider = document.createElement('hr');
        const heading = renderYear(year);
        if (!heading) return;
        fragment.append(divider, heading);
        const group = { divider, node: heading, events: [] };
        events.forEach((event) => {
          const node = renderEvent(event);
          if (!node) return;
          group.events.push({ node, country: event.country });
          fragment.append(node);
        });
        groups.push(group);
      });
    return { fragment, groups };
  }

  function populateSelector(selector, groups, data) {
    const counts = new Map();
    groups.forEach((group) => group.events.forEach((event) => {
      counts.set(event.country, (counts.get(event.country) || 0) + 1);
    }));
    selector.replaceChildren();
    const initial = new Option(data.locales?.[locale]?.filterLabel || 'Select Country', 'default', true, true);
    initial.style.color = '#000';
    selector.add(initial);
    [...counts.entries()]
      .sort(([leftCode, leftCount], [rightCode, rightCount]) => rightCount - leftCount
        || getCountryName(leftCode, data.events || []).localeCompare(getCountryName(rightCode, data.events || []), locale))
      .forEach(([code, count]) => {
        const option = new Option(`[${count}] ${getCountryName(code, data.events || [])}`, code);
        option.style.color = '#000';
        selector.add(option);
      });

    selector.onchange = () => {
      const selected = selector.value;
      groups.forEach((group) => {
        let visible = false;
        group.events.forEach((event) => {
          const match = selected === 'default' || event.country === selected;
          event.node.style.display = match ? '' : 'none';
          visible ||= match;
        });
        group.node.style.display = visible ? '' : 'none';
        group.divider.style.display = visible ? '' : 'none';
      });
    };
  }

  async function initializeNews() {
    const timeline = document.getElementById('news-timeline') || document.querySelector('ul.timeline');
    const selector = document.getElementById('event-selector');
    if (!timeline || !selector) return;

    if (locale === 'ar') {
      timeline.classList.add('timeline--rtl');
      timeline.dir = 'rtl';
    }

    try {
      // 使用浏览器的正常缓存校验：首屏保留内置时间线，数据到达后再无缝替换。
      const response = await fetch('data/news.json', { cache: 'default' });
      if (!response.ok) throw new Error(`新闻数据请求失败：${response.status}`);
      const data = await response.json();
      window.__newsLocaleLabels = data.locales?.[locale]?.labels || {};
      const rendered = buildGroupsFromData(data);
      if (!rendered.groups.length) throw new Error('没有可显示的新闻数据。');
      timeline.replaceChildren(rendered.fragment);
      populateSelector(selector, rendered.groups, data);
    } catch (error) {
      console.warn('新闻数据加载失败，保留页面内置内容。', error);
      selector.querySelectorAll('option').forEach((option) => { option.style.color = '#000'; });
    } finally {
      timeline.setAttribute('aria-busy', 'false');
    }
  }

  // 此脚本以 defer 方式加载，解析完成后即可开始请求，不必额外等待 DOMContentLoaded。
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeNews, { once: true });
  } else {
    initializeNews();
  }
}());
