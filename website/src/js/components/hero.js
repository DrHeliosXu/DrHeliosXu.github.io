export async function initVideoHero() {
  const hero = document.querySelector('[data-video-hero]');
  const video = document.getElementById('home-hero-video');
  if (!hero || !video) return;

  initHomeHeroHeader(hero);

  const sources = Array.from(video.querySelectorAll('source')).map((source) => source.src);
  if (sources.length <= 1) return;

  let index = 0;
  const playNext = () => {
    index = (index + 1) % sources.length;
    video.src = sources[index];
    video.currentTime = 0;
    video.play().catch(() => {});
  };

  video.addEventListener('timeupdate', () => {
    if (video.currentTime >= 5) playNext();
  });
  video.addEventListener('ended', playNext);
}

function initHomeHeroHeader(hero) {
  const header = document.getElementById('site-header');
  if (!header) return;

  const updateHeaderState = () => {
    const threshold = hero.offsetHeight / 2;
    header.classList.toggle('site-header--solid', window.scrollY >= threshold);
  };

  updateHeaderState();
  window.addEventListener('scroll', updateHeaderState, { passive: true });
  window.addEventListener('resize', updateHeaderState);
}
