"use strict";

function loadClustrmaps() {
  const container = document.getElementById("clustrmap-container");
  if (!container || document.getElementById("clustrmaps")) return;

  const isMobile = /Android|iPhone|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
  if (isMobile) return;

  const script = document.createElement("script");
  script.type = "text/javascript";
  script.id = "clustrmaps";
  script.src = "//cdn.clustrmaps.com/map_v2.js?cl=cdcdcd&w=470&t=n&d=gc2-AlxTT663gKH7alVmw473v-UaHg1VjiT7VOUhfhs&co=f8f9fa&ct=ffffff&cmo=0312c8&cmn=f35b12";
  script.onload = function () {
    const fallback = document.getElementById("clustrmap-fallback-link");
    if (fallback) fallback.style.display = "none";
  };
  container.appendChild(script);
}

function initClustrmapsLazyLoading() {
  const container = document.getElementById("clustrmap-container");
  if (!container) return;

  if (!("IntersectionObserver" in window)) {
    window.addEventListener("scroll", loadClustrmaps, { once: true, passive: true });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      observer.disconnect();
      loadClustrmaps();
    }
  }, {
    rootMargin: "700px 0px"
  });
  observer.observe(container);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initClustrmapsLazyLoading);
} else {
  initClustrmapsLazyLoading();
}
