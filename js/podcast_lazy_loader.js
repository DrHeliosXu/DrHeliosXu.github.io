"use strict";

const podcastAssets = {
  styles: [
    "https://public.codepenassets.com/css/normalize-5.0.0.min.css",
    "https://cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.6/mediaelementplayer.css",
    "https://cdnjs.cloudflare.com/ajax/libs/mediaelement-plugins/2.5.0/speed/speed.min.css",
    "https://cdnjs.cloudflare.com/ajax/libs/mediaelement-plugins/2.5.0/skip-back/skip-back.min.css",
    "https://cdnjs.cloudflare.com/ajax/libs/mediaelement-plugins/2.5.0/jump-forward/jump-forward.min.css",
    "./css/style_podcast.css"
  ],
  scripts: [
    "https://cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.6/mediaelement-and-player.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/mediaelement-plugins/2.5.0/skip-back/skip-back.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/mediaelement-plugins/2.5.0/jump-forward/jump-forward.min.js",
    "https://cdn.jsdelivr.net/gh/ivorpad/mediaelement-changespeed/changespeed.js",
    "./js/script_podcast.js"
  ]
};

let podcastAssetsLoaded = false;

function loadPodcastStyles() {
  podcastAssets.styles.forEach((href) => {
    if (document.querySelector(`link[href="${href}"]`)) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  });
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

async function loadPodcastAssets() {
  if (podcastAssetsLoaded) return;
  podcastAssetsLoaded = true;
  loadPodcastStyles();
  const audio = document.querySelector(".podcast-container audio");
  if (audio) {
    audio.preload = "metadata";
    audio.load();
  }
  for (const src of podcastAssets.scripts) {
    await loadScript(src);
  }
}

function initPodcastLazyLoading() {
  const podcast = document.querySelector(".podcast-container");
  if (!podcast) return;

  podcast.addEventListener("pointerenter", loadPodcastAssets, { once: true });
  podcast.addEventListener("focusin", loadPodcastAssets, { once: true });
  podcast.addEventListener("click", loadPodcastAssets, { once: true });

  if (!("IntersectionObserver" in window)) {
    window.addEventListener("scroll", loadPodcastAssets, { once: true, passive: true });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      observer.disconnect();
      loadPodcastAssets();
    }
  }, {
    rootMargin: "900px 0px"
  });
  observer.observe(podcast);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPodcastLazyLoading);
} else {
  initPodcastLazyLoading();
}
