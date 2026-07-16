(function () {
  'use strict';

  const pageLanguage = (location.pathname.match(/(?:^|\/)(ar|de|en|es|fr|it|jp|kr|ru|th|vi)-projects\.html$/) || [])[1] || 'en';
  const labels = {
    de: { title: 'Thema (Alle)', country: 'Land (Alle)', topics: ['Erneuerbare Energien', 'Bildgebung', 'Funktionsmaterialien', 'Datenvisualisierung'], countries: ['Schweiz', 'Belgien', 'Deutschland', 'China', 'Frankreich'] },
    en: { title: 'Topic (All)', country: 'Country (All)', topics: ['Renewable Energy', 'Imaging', 'Functional Materials', 'Data Visualisation'], countries: ['Switzerland', 'Belgium', 'Germany', 'China', 'France'] },
    es: { title: 'Tema (Todos)', country: 'País (Todos)', topics: ['Energía renovable', 'Imagen', 'Materiales funcionales', 'Visualización de datos'], countries: ['Suiza', 'Bélgica', 'Alemania', 'China', 'Francia'] },
    fr: { title: 'Thème (Tous)', country: 'Pays (Tous)', topics: ['Énergies renouvelables', 'Imagerie', 'Matériaux fonctionnels', 'Visualisation des données'], countries: ['Suisse', 'Belgique', 'Allemagne', 'Chine', 'France'] },
    it: { title: 'Tema (Tutti)', country: 'Paese (Tutti)', topics: ['Energia rinnovabile', 'Imaging', 'Materiali funzionali', 'Visualizzazione dati'], countries: ['Svizzera', 'Belgio', 'Germania', 'Cina', 'Francia'] },
    vi: { title: 'Chủ đề (Tất cả)', country: 'Quốc gia (Tất cả)', topics: ['Năng lượng tái tạo', 'Hình ảnh', 'Vật liệu chức năng', 'Trực quan hóa dữ liệu'], countries: ['Thụy Sĩ', 'Bỉ', 'Đức', 'Trung Quốc', 'Pháp'] }
  };

  function normalise(value) {
    return String(value || '').replace(/\s+/g, '').trim();
  }

  function countryFromArticle(article) {
    const span = article.querySelector('span');
    if (!span) return '';
    const locationLine = span.innerHTML
      .split(/<br\s*\/?>/i)
      .find(part => part.includes('‧') || part.includes('・'));
    const country = locationLine && locationLine.match(/([^‧・<]+?)[‧・]/);
    return country ? country[1].trim() : '';
  }

  function resizeSelect(select) {
    const option = select.options[select.selectedIndex];
    if (!option) return;
    const measure = document.createElement('span');
    measure.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap;font:14px Arial,sans-serif;';
    measure.textContent = option.textContent;
    document.body.appendChild(measure);
    select.style.width = Math.min(Math.max(measure.offsetWidth + 30, 110), 350) + 'px';
    measure.remove();
  }

  function fillSelect(select, counts, selectedValue) {
    const placeholder = select.dataset.placeholder || select.options[0].textContent;
    select.dataset.placeholder = placeholder;
    select.replaceChildren(new Option(placeholder, ''));
    Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .forEach(([value, count]) => select.add(new Option(`[${count}] ${value}`, value)));
    if (selectedValue && !counts.has(selectedValue)) {
      select.add(new Option(`[0] ${selectedValue}`, selectedValue));
    }
    select.value = selectedValue || '';
    resizeSelect(select);
  }

  function addControls(band) {
    const translation = labels[pageLanguage];
    if (!translation) return null;
    const heading = Array.from(band.parentElement.children).find(element => element.tagName === 'H1');
    if (!heading) return null;

    const wrapper = document.createElement('div');
    wrapper.id = 'project-title-selecter';
    wrapper.style.cssText = 'display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;';
    heading.parentNode.insertBefore(wrapper, heading);
    wrapper.appendChild(heading);

    const controls = document.createElement('div');
    controls.style.cssText = 'display:flex;gap:10px;align-items:center;flex-wrap:wrap;';
    controls.innerHTML = `<select id="filter-topic" style="height:24px;margin-bottom:-7px"><option value="">${translation.title}</option></select><select id="filter-country" style="height:24px;margin-bottom:-7px"><option value="">${translation.country}</option></select>`;
    wrapper.appendChild(controls);
    return translation;
  }

  function addFallbackMetadata(records, translation) {
    if (!translation) return;
    const topicIndexes = [[0], [0], [0, 1], [2], [0], [1], [3]];
    const countryIndexes = [0, 1, 0, 2, 3, 2, 4];
    records.forEach((record, index) => {
      if (!record.topics.length) record.topics = (topicIndexes[index] || [0]).map(item => translation.topics[item]);
      if (!record.country) record.country = translation.countries[countryIndexes[index] || 0];
    });
  }

  function initialise() {
    const band = document.querySelector('.band');
    if (!band) return;
    const translation = document.getElementById('filter-topic') ? null : addControls(band);
    const topicSelect = document.getElementById('filter-topic');
    const countrySelect = document.getElementById('filter-country');
    if (!topicSelect || !countrySelect) return;

    // 旧页面会绑定 onchange；改由这一份联动逻辑统一处理。
    topicSelect.onchange = null;
    countrySelect.onchange = null;

    const records = Array.from(band.children)
      .map(item => {
        const article = item.querySelector('article');
        if (!article) return null;
        return {
          item,
          topics: (article.dataset.projectTopics || article.getAttribute('topic') || '').split(/[;；]/).map(value => value.trim()).filter(Boolean),
          country: article.dataset.projectCountry || countryFromArticle(article)
        };
      })
      .filter(Boolean);
    addFallbackMetadata(records, translation);

    function matchesTopic(record, topic) {
      return !topic || record.topics.some(value => normalise(value) === normalise(topic));
    }
    function matchesCountry(record, country) {
      return !country || normalise(record.country) === normalise(country);
    }
    function count(recordsToCount, field) {
      return recordsToCount.reduce((map, record) => {
        const values = field === 'topics' ? record.topics : [record.country];
        values.filter(Boolean).forEach(value => map.set(value, (map.get(value) || 0) + 1));
        return map;
      }, new Map());
    }
    function render() {
      const topic = topicSelect.value;
      const country = countrySelect.value;
      records.forEach((record, index) => {
        const visible = matchesTopic(record, topic) && matchesCountry(record, country);
        record.item.style.display = visible ? '' : 'none';
        record.item.classList.remove('item-1', 'item-2');
        if (visible) record.item.classList.add(index === records.findIndex(candidate => matchesTopic(candidate, topic) && matchesCountry(candidate, country)) ? 'item-1' : 'item-2');
      });
    }
    function updateMenus() {
      const topic = topicSelect.value;
      const country = countrySelect.value;
      fillSelect(topicSelect, count(records.filter(record => matchesCountry(record, country)), 'topics'), topic);
      fillSelect(countrySelect, count(records.filter(record => matchesTopic(record, topic)), 'country'), country);
    }

    updateMenus();
    render();
    [topicSelect, countrySelect].forEach(select => select.addEventListener('change', () => {
      updateMenus();
      render();
    }));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialise);
  } else {
    initialise();
  }
})();
