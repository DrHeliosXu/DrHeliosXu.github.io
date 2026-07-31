/* 生产环境默认静默。地址追加 ?debug=1 可开启开发日志。 */
(function configureSiteDebug() {
  const parameters = new URLSearchParams(window.location.search);
  const enabled = parameters.get('debug') === '1' || window.localStorage.getItem('site-debug') === '1';

  window.SITE_DEBUG = enabled;
  window.siteDebug = function siteDebug(...argumentsList) {
    if (window.SITE_DEBUG) console.log(...argumentsList);
  };
}());
