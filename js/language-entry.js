(function () {
  'use strict';

  const CONFIG_URL = 'js/language-selection.json?v=20260715-entry-language';
  const GEO_CACHE_KEY = 'user_device_info';
  const GEO_REFRESH_KEY = 'entry_geo_refresh_requested_at';
  const GEO_WARMUP_BUDGET = 180;
  const FALLBACK_CONFIG = {
    fallbackLanguage: 'en',
    languages: {
      cn: { enabled: true, pages: { home: 'cn.html' } },
      en: { enabled: true, pages: { home: 'en.html' } },
      es: { enabled: true, pages: { home: 'es.html' } },
      fr: { enabled: true, pages: { home: 'fr.html' } },
      ru: { enabled: true, pages: { home: 'ru.html' } },
      ar: { enabled: true, pages: { home: 'ar.html' } },
      de: { enabled: true, pages: { home: 'de.html' } },
      it: { enabled: true, pages: { home: 'it.html' } },
      jp: { enabled: true, pages: { home: 'jp.html' } },
      kr: { enabled: true, pages: { home: 'kr.html' } },
      th: { enabled: true, pages: { home: 'th.html' } },
      vi: { enabled: true, pages: { home: 'vi.html' } }
    },
    browserLocaleMap: {
      zh: { language: 'cn', variant: 'simplified' },
      'zh-cn': { language: 'cn', variant: 'simplified' },
      'zh-sg': { language: 'cn', variant: 'simplified' },
      'zh-my': { language: 'cn', variant: 'simplified' },
      'zh-hant': { language: 'cn', variant: 'traditional' },
      'zh-tw': { language: 'cn', variant: 'traditional' },
      'zh-hk': { language: 'cn', variant: 'traditional' },
      'zh-mo': { language: 'cn', variant: 'traditional' },
      en: { language: 'en' },
      es: { language: 'es' },
      fr: { language: 'fr' },
      ru: { language: 'ru' },
      ar: { language: 'ar' },
      de: { language: 'de' },
      it: { language: 'it' },
      ja: { language: 'jp' },
      ko: { language: 'kr' },
      th: { language: 'th' },
      vi: { language: 'vi' }
    }
  };

  function isAvailable(config, language, pageType) {
    const meta = config.languages && config.languages[language];
    return Boolean(meta && meta.enabled !== false && meta.pages && meta.pages[pageType]);
  }

  function resolveBrowserLocale(config) {
    const locales = navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language || navigator.userLanguage || ''];

    for (const rawLocale of locales) {
      const normalized = String(rawLocale || '').replace(/_/g, '-').toLowerCase();
      const segments = normalized.split('-');
      const candidates = [normalized];
      if (segments.length >= 2) candidates.push(segments.slice(0, 2).join('-'));
      candidates.push(segments[0]);

      for (const locale of candidates) {
        const mapped = config.browserLocaleMap && config.browserLocaleMap[locale];
        if (mapped && isAvailable(config, mapped.language, 'home')) return mapped;
      }
    }
    return null;
  }

  function resolveSavedLanguage(config) {
    try {
      const language = localStorage.getItem('preferredLanguage');
      if (isAvailable(config, language, 'home')) {
        return { language: language, variant: localStorage.getItem('chineseScript') || localStorage.getItem('langMode') };
      }
    } catch (error) {}
    return null;
  }

  function saveChineseVariant(variant) {
    if (!variant) return;
    try {
      localStorage.setItem('chineseScript', variant);
      localStorage.setItem('langMode', variant === 'traditional' ? '繁体' : '简体');
    } catch (error) {}
  }

  // 入口页并行预热 IP 信息。语言跳转不依赖该请求，最多只给缓存写入 180ms 的机会。
  function warmGeoCache() {
    try {
      // 每次经过入口页都强制刷新，不因既有缓存跳过 IP 查询。
      sessionStorage.setItem(GEO_REFRESH_KEY, String(Date.now()));
    } catch (error) {}

    return fetch('https://ipinfo.io/json?token=228a7bb192c4fc', { cache: 'no-store' })
      .then(function (response) {
        if (!response.ok) throw new Error('无法获取 IP 信息');
        return response.json();
      })
      .then(function (geoInfo) {
        try {
          const cache = JSON.parse(localStorage.getItem(GEO_CACHE_KEY)) || {};
          cache.geoInfo = geoInfo;
          cache.geoTimestamp = Date.now();
          localStorage.setItem(GEO_CACHE_KEY, JSON.stringify(cache));
        } catch (error) {}
        try { sessionStorage.removeItem(GEO_REFRESH_KEY); } catch (error) {}
        return geoInfo;
      })
      .catch(function () { return null; });
  }

  function waitForGeoWarmup(warmup) {
    return Promise.race([
      warmup,
      new Promise(function (resolve) { window.setTimeout(resolve, GEO_WARMUP_BUDGET); })
    ]);
  }

  async function redirectFromEntry() {
    const geoWarmup = warmGeoCache();
    let config;
    try {
      const response = await fetch(CONFIG_URL);
      if (!response.ok) throw new Error('配置文件无法读取');
      config = await response.json();
    } catch (error) {
      config = FALLBACK_CONFIG;
    }

    // 入口页只根据浏览器语言选择版本；已在具体语言页的用户选择不会被强制跳转。
    const target = resolveBrowserLocale(config)
      || { language: config.fallbackLanguage || 'en' };
    const language = isAvailable(config, target.language, 'home')
      ? target.language
      : (config.fallbackLanguage || 'en');
    if (language === 'cn') saveChineseVariant(target.variant || 'simplified');

    await waitForGeoWarmup(geoWarmup);
    window.location.replace(config.languages[language].pages.home);
  }

  redirectFromEntry();
})();
