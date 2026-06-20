import { initLanguageSwitcher } from './language-switcher.js';
import { initVideoHero } from './components/hero.js';
import { renderVisitorStats } from './visitor-stats.js';

document.addEventListener('DOMContentLoaded', () => {
  initLanguageSwitcher();
  initVideoHero();
  renderVisitorStats();
});
