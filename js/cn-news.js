/* 中文新闻页：从 data/news.json 渲染时间线并保持国家筛选。 */
(function () {
  'use strict';

  window.__cnNewsFetchRenderer = true;

  const locale = 'cn';
  const countryMap = {
    at: { name: '奥地利', color: '#ED2939' }, ch: { name: '瑞士', color: '#D52B1E' },
    cn: { name: '中国', color: '#EE1C25' }, cz: { name: '捷克', color: '#D7141A' },
    de: { name: '德国', color: '#000000' }, fr: { name: '法国', color: '#0055A4' },
    gb: { name: '英国', color: '#012169' }, it: { name: '意大利', color: '#009246' },
    jp: { name: '日本', color: '#BC002D' }, lu: { name: '卢森堡', color: '#00A1DE' },
    th: { name: '泰国', color: '#A51931' }, un: { name: '联合国', color: '#4B92C3' }
  };

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
    const cityAndCountry = `${country}${city}`;
    return [cityAndCountry, translation.venue].filter(Boolean).join(' / ');
  }

  function renderYear(year) {
    const translation = year.translations?.[locale];
    const item = element('li', 'timeline-item period');
    item.dataset.newsYear = String(year.year);
    item.append(element('div', 'timeline-info'));
    const content = element('div', 'timeline-content');
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
    const item = element('li', 'timeline-item');
    item.dataset.newsId = event.id;
    item.dataset.newsDate = event.date;
    item.dataset.newsCountry = event.country;

    const info = element('div', 'timeline-info');
    if (event.flag) {
      const flag = document.createElement('img');
      flag.src = event.flag;
      flag.alt = '';
      flag.style.cssText = 'height: 17px; margin-left: -43px; position: relative; top: 1.5px; z-index: 99;';
      info.append(flag);
    }
    const date = element('span', '', translation.dateLabel);
    date.style.marginLeft = '15px';
    info.append(date);

    const content = element('div', 'timeline-content');
    content.append(element('h5', 'timeline-title', translation.title));
    const details = element('p');
    const place = getPlace(event, translation);
    if (translation.topic) details.append(document.createTextNode(`主题: ${translation.topic}`), document.createElement('br'));
    if (place) details.append(document.createTextNode(`地点: ${place}`));
    if (translation.organizer) details.append(document.createTextNode(`${place ? ' ｜ ' : ''}主办: ${translation.organizer}`));
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
        fragment.append(divider, heading);
        const group = { divider, node: heading, events: [] };
        events.forEach((event) => {
          const node = renderEvent(event);
          group.events.push({ node, country: event.country });
          fragment.append(node);
        });
        groups.push(group);
      });
    return { fragment, groups };
  }

  function populateSelector(selector, groups) {
    const counts = new Map();
    groups.forEach((group) => group.events.forEach((event) => {
      counts.set(event.country, (counts.get(event.country) || 0) + 1);
    }));
    selector.replaceChildren();
    const initial = new Option('选择国家', 'default', true, true);
    selector.add(initial);
    [...counts.entries()]
      .sort(([leftCode, leftCount], [rightCode, rightCount]) => rightCount - leftCount
        || (countryMap[leftCode]?.name || leftCode).localeCompare(countryMap[rightCode]?.name || rightCode, 'zh-CN'))
      .forEach(([code, count]) => {
        const option = new Option(`[${count}] ${countryMap[code]?.name || code.toUpperCase()}`, code);
        option.style.color = countryMap[code]?.color || '#333';
        option.style.fontWeight = '500';
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

  function buildGroupsFromStatic(timeline) {
    const groups = [];
    let group;
    timeline.querySelectorAll(':scope > .timeline-item').forEach((node) => {
      if (node.classList.contains('period')) {
        group = { divider: node.previousElementSibling, node, events: [] };
        groups.push(group);
      } else if (group && isPastOrToday(node.dataset.newsDate || '')) {
        group.events.push({ node, country: node.dataset.newsCountry || '' });
      } else {
        node.style.display = 'none';
      }
    });
    groups.forEach((group) => {
      group.node.style.display = group.events.length ? '' : 'none';
      if (group.divider) group.divider.style.display = group.events.length ? '' : 'none';
    });
    return groups.filter((group) => group.events.length);
  }

  async function initializeNews() {
    const timeline = document.getElementById('cn-news-timeline');
    const selector = document.getElementById('event-selector');
    if (!timeline || !selector) return;

    try {
      const response = await fetch('data/news.json', { cache: 'no-store' });
      if (!response.ok) throw new Error(`新闻数据请求失败：${response.status}`);
      const data = await response.json();
      const rendered = buildGroupsFromData(data);
      if (!rendered.groups.length) throw new Error('没有可显示的新闻数据。');
      timeline.replaceChildren(rendered.fragment);
      populateSelector(selector, rendered.groups);
    } catch (error) {
      console.warn('新闻数据加载失败，保留页面内置内容。', error);
      populateSelector(selector, buildGroupsFromStatic(timeline));
    } finally {
      timeline.setAttribute('aria-busy', 'false');
    }
  }

  initializeNews();
}());
