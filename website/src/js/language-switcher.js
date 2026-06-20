const DEFAULT_SWITCHER_CONFIG = {
  configPath: '/data/language-selection.json',
  flagBasePath: '/assets/flags',
  visitorCountryCacheKey: 'drhelios.visitorCountry',
  visitorCountryCacheMinutes: 10,
  ipCountryServices: ['https://ipapi.co/json/', 'https://ipwho.is/']
};

export function initLanguageSwitcher() {
  applyChineseVariantFromUrl();

  document.querySelectorAll('[data-language-switcher]').forEach((select) => {
    syncChineseVariantSelection(select);
    select.addEventListener('change', () => {
      const selectedOption = select.options[select.selectedIndex];
      const variant = selectedOption && selectedOption.dataset.chineseVariant;
      if (variant) {
        applyChineseVariant(variant);
        return;
      }
      const targetUrl = selectedOption ? selectedOption.value : '';
      if (targetUrl) window.location.href = targetUrl;
    });
  });

  initLanguageFlags();
}

function applyChineseVariantFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const variant = params.get('variant');
  if (variant === 'traditional') {
    applyChineseVariant('traditional');
  }
}

function syncChineseVariantSelection(select) {
  const params = new URLSearchParams(window.location.search);
  const variant = params.get('variant') === 'traditional' ? 'traditional' : 'simplified';
  const option = Array.from(select.options).find((item) => item.dataset.chineseVariant === variant);
  if (option) option.selected = true;
}

function applyChineseVariant(variant) {
  const scriptId = 'chinese-variant-converter';
  const oldScript = document.getElementById(scriptId);
  if (oldScript) oldScript.remove();

  const script = document.createElement('script');
  script.id = scriptId;
  script.src = variant === 'traditional' ? '../assets/js/vendor/bookmarklet_tw.js' : '../assets/js/vendor/bookmarklet_cn.js';
  script.defer = true;
  document.body.appendChild(script);
}

async function initLanguageFlags() {
  const flagContainers = Array.from(document.querySelectorAll('[data-language-flags]'));
  if (!flagContainers.length) return;

  renderCachedFlagsFromDataset(flagContainers);

  const config = await loadSwitcherConfig();
  const languageSelection = await loadLanguageSelection(config.configPath);
  if (!languageSelection) return;

  renderLanguageFlags(flagContainers, languageSelection, config);
  getVisitorCountryCode(config).then((countryCode) => {
    if (countryCode) renderLanguageFlags(flagContainers, languageSelection, config, countryCode);
  });
}

function renderCachedFlagsFromDataset(containers) {
  const cached = readCachedCountry(DEFAULT_SWITCHER_CONFIG);
  if (!cached) return;
  containers.forEach((container) => {
    const language = {
      defaultFlag: container.dataset.defaultFlag,
      usedCountries: String(container.dataset.usedCountries || '').split(',').filter(Boolean),
      singleFlagOnly: container.dataset.singleFlagOnly === 'true',
      replaceDefaultFlagWithVisitorCountry: container.dataset.replaceDefaultFlag === 'true'
    };
    renderContainerFlags(container, language, DEFAULT_SWITCHER_CONFIG, cached);
  });
}

async function loadSwitcherConfig() {
  try {
    const response = await fetch('/config.yml', { cache: 'no-store' });
    if (!response.ok) return DEFAULT_SWITCHER_CONFIG;
    const text = await response.text();
    return { ...DEFAULT_SWITCHER_CONFIG, ...parseSwitcherConfigYaml(text) };
  } catch {
    return DEFAULT_SWITCHER_CONFIG;
  }
}

function parseSwitcherConfigYaml(text) {
  const config = {};
  let inLanguageSwitcher = false;
  let activeListKey = '';

  text.split('\n').forEach((rawLine) => {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) return;
    if (line === 'languageSwitcher:') {
      inLanguageSwitcher = true;
      return;
    }
    if (!inLanguageSwitcher) return;

    const listMatch = line.match(/^([A-Za-z0-9_-]+):\s*$/);
    if (listMatch) {
      activeListKey = listMatch[1];
      config[activeListKey] = [];
      return;
    }

    const listItemMatch = line.match(/^-\s*(.+)$/);
    if (listItemMatch && activeListKey) {
      config[activeListKey].push(coerceConfigValue(listItemMatch[1]));
      return;
    }

    const pairMatch = line.match(/^([A-Za-z0-9_-]+):\s*(.+)$/);
    if (pairMatch) {
      activeListKey = '';
      config[pairMatch[1]] = coerceConfigValue(pairMatch[2]);
    }
  });

  return config;
}

function coerceConfigValue(value) {
  const trimmed = String(value).trim().replace(/^["']|["']$/g, '');
  if (/^\d+$/.test(trimmed)) return Number(trimmed);
  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;
  return trimmed;
}

async function loadLanguageSelection(configPath) {
  try {
    const response = await fetch(configPath, { cache: 'no-store' });
    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
}

async function getVisitorCountryCode(config) {
  const cached = readCachedCountry(config);
  if (cached) return cached;

  const countryCode = await fetchVisitorCountryCode(config.ipCountryServices || []);
  if (countryCode) {
    localStorage.setItem(config.visitorCountryCacheKey, JSON.stringify({
      countryCode,
      fetchedAt: Date.now()
    }));
  }
  return countryCode;
}

function readCachedCountry(config) {
  try {
    const cached = JSON.parse(localStorage.getItem(config.visitorCountryCacheKey) || 'null');
    if (!cached || !cached.countryCode || !cached.fetchedAt) return '';
    const maxAge = Number(config.visitorCountryCacheMinutes || 10) * 60 * 1000;
    if (Date.now() - Number(cached.fetchedAt) > maxAge) return '';
    return normalizeCountryCode(cached.countryCode);
  } catch {
    return '';
  }
}

async function fetchVisitorCountryCode(services) {
  for (const service of services) {
    const countryCode = await fetchCountryFromService(service);
    if (countryCode) return countryCode;
  }
  return '';
}

async function fetchCountryFromService(service) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000);
  try {
    const response = await fetch(service, { signal: controller.signal, cache: 'no-store' });
    if (!response.ok) return '';
    const data = await response.json();
    return normalizeCountryCode(data.country_code || data.countryCode || data.country);
  } catch {
    return '';
  } finally {
    clearTimeout(timeoutId);
  }
}

function renderLanguageFlags(containers, languageSelection, config, visitorCountryCode = '') {
  const languages = new Map((languageSelection.languages || []).map((language) => [language.code, language]));

  containers.forEach((container) => {
    const language = languages.get(container.dataset.languageCode);
    if (!language) return;
    renderContainerFlags(container, language, config, visitorCountryCode);
  });
}

function renderContainerFlags(container, language, config, visitorCountryCode = '') {
  const visitorCountry = normalizeCountryCode(visitorCountryCode);
  const defaultFlag = normalizeCountryCode(language.defaultFlag);
  const shouldUseVisitorFlag = visitorCountry && isLanguageUsedInCountry(language, visitorCountry);
  const sourceFlag = getSourceFlag(language, shouldUseVisitorFlag ? visitorCountry : '');
  const flags = [sourceFlag];

  if (!language.singleFlagOnly && shouldUseVisitorFlag && visitorCountry !== defaultFlag) {
    flags.push(visitorCountry);
  }

  container.innerHTML = flags.map((flagCode) => renderFlagImage(flagCode, config.flagBasePath)).join('');
}

function getSourceFlag(language, visitorCountry) {
  if (language.replaceDefaultFlagWithVisitorCountry && visitorCountry) return visitorCountry;
  return normalizeCountryCode(language.defaultFlag);
}

function isLanguageUsedInCountry(language, countryCode) {
  return (language.usedCountries || []).map(normalizeCountryCode).includes(countryCode);
}

function normalizeCountryCode(value) {
  return String(value || '').trim().toUpperCase();
}

function renderFlagImage(flagCode, flagBasePath) {
  const src = flagCode === 'ARAB_LEAGUE'
    ? `${flagBasePath}/Arab_League.svg`
    : `${flagBasePath}/${flagCode.toLowerCase()}.svg`;
  const squareFlags = new Set(['CH', 'VA']);
  const squareClass = squareFlags.has(flagCode) ? ' language-switcher__flag--square' : '';
  return `<img class="language-switcher__flag${squareClass}" src="${src}" alt="">`;
}
