/* 多语言首页新闻：从 data/news.json 渲染各语言已启用且已发生的最新事件。 */
(function () {
  'use strict';

  const script = document.querySelector('script[data-home-news-locale]');
  const locale = script?.dataset.homeNewsLocale;
  /* 首页日期沿用各语言旧页面的缩写习惯，避免 Intl 在不同浏览器中产生不一致的布局。 */
  const dateFormats = {
    cn: { months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'], year: 'full' },
    en: { months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], year: 'short', stacked: true },
    de: { months: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'], year: 'short', stacked: true },
    fr: { months: ['Jan', 'Fév', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'], year: 'short', stacked: true },
    it: { months: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'], year: 'short', stacked: true },
    es: { months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'], year: 'short', stacked: true },
    jp: { months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'], year: 'full' },
    kr: { months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'], year: 'full' },
    th: { months: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'], year: 'short', reverse: true, stacked: true },
    ru: { months: ['ЯНВ', 'ФЕВ', 'МАР', 'АПР', 'МАЙ', 'ИЮН', 'ИЮЛ', 'АВГ', 'СЕН', 'ОКТ', 'НОЯ', 'ДЕК'], year: 'short', stacked: true, monthFontSize: 20 },
    ar: { months: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'], year: 'full', stacked: true },
    vi: { months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], year: 'short', stacked: true }
  };

  if (!locale) return;

  function createElement(tagName, className, text) {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
  }

  function getDateParts(date) {
    const value = new Date(`${date}T12:00:00Z`);
    const format = dateFormats[locale] || dateFormats.en;
    const fullYear = String(value.getUTCFullYear());
    return {
      month: format.months[value.getUTCMonth()],
      year: format.year === 'full' ? fullYear : fullYear.slice(-2),
      reverse: Boolean(format.reverse),
      stacked: Boolean(format.stacked)
    };
  }

  function getLocationName(event) {
    return event.city?.names?.[locale] || event.city?.names?.en || '';
  }

  function getEventSource(translation) {
    return translation.organizer || translation.venue || translation.topic || '';
  }

  function renderEvent(event) {
    const translation = event.translations[locale];
    const date = getDateParts(event.date);
    const entry = createElement('div', 'trend-entry d-flex');
    entry.dataset.newsId = event.id;

    const number = createElement('div', 'number align-self-start');
    number.style.cssText = 'text-align: left; padding-right: 0;';
    const dateSmall = createElement('small');
    dateSmall.style.cssText = 'vertical-align: top; display: inline-block; position: relative; top: -1px;';
    const month = createElement('span', '', date.month);
    month.style.cssText = date.stacked
      ? `display: block; font-size: ${date.monthFontSize || 24}px; line-height: 0.95;`
      : 'font-size: 0.9em; margin-right: 2px;';
    const year = createElement('span', '', date.year);
    year.style.cssText = date.stacked
      ? 'display: block; font-size: 24px; line-height: 1.05; margin-top: 1px;'
      : 'font-size: 0.7em;';
    dateSmall.append(...(date.reverse ? [year, month] : [month, year]));
    number.append(dateSmall);

    const contents = createElement('div', 'trend-contents');
    const heading = createElement('h2');
    const title = createElement('small');
    title.style.fontSize = '0.9em';
    title.append(createElement('strong', '', translation.title));
    heading.append(title);
    contents.append(heading);

    const meta = createElement('div', 'post-meta');
    const sourceAndLocation = createElement('span', 'date-read');
    const source = getEventSource(translation);
    if (source) sourceAndLocation.append(document.createTextNode(`${source} @ `));
    sourceAndLocation.append(document.createTextNode(getLocationName(event)));
    if (event.flag) {
      const flag = document.createElement('img');
      flag.src = event.flag;
      flag.alt = '';
      flag.style.cssText = 'height: 11px; margin-right: 0; position: relative; top: -2px;';
      sourceAndLocation.append(' ', flag);
    }
    meta.append(sourceAndLocation);
    contents.append(meta);
    entry.append(number, contents);
    return entry;
  }

  async function renderHomeNews() {
    const section = document.getElementById('home-news-section');
    if (!section) return;

    try {
      const response = await fetch('data/news.json', { cache: 'no-cache' });
      if (!response.ok) throw new Error(`新闻数据请求失败：${response.status}`);
      const data = await response.json();
      const limit = data.locales?.[locale]?.homeNewsLimit || 4;
      const today = new Date();
      today.setHours(23, 59, 59, 999);
      const events = (data.events || [])
        .filter((event) => {
          const translation = event.translations?.[locale];
          const eventDate = new Date(`${event.date}T00:00:00`);
          return translation?.visible && !Number.isNaN(eventDate.getTime()) && eventDate <= today;
        })
        .sort((left, right) => right.date.localeCompare(left.date))
        .slice(0, limit);
      if (!events.length) return;

      const moreLink = section.querySelector('a.more')?.closest('p');
      section.querySelectorAll('.trend-entry').forEach((entry) => entry.remove());
      const fragment = document.createDocumentFragment();
      events.forEach((event) => fragment.append(renderEvent(event)));
      section.insertBefore(fragment, moreLink || null);
    } catch (error) {
      console.warn('首页新闻未更新，保留页面内置新闻。', error);
    }
  }

  document.addEventListener('DOMContentLoaded', renderHomeNews);
}());
