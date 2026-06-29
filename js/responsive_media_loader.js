"use strict";

(function initResponsiveMediaLoader() {
  const mobileQuery = window.matchMedia("(max-width: 575.98px)");

  function applyResponsiveMedia() {
    document.querySelectorAll("img[data-desktop-src], img[data-mobile-src]").forEach((image) => {
      const targetSrc = mobileQuery.matches ? image.dataset.mobileSrc : image.dataset.desktopSrc;

      if (!targetSrc) {
        image.removeAttribute("src");
        return;
      }

      if (image.getAttribute("src") !== targetSrc) {
        image.setAttribute("src", targetSrc);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyResponsiveMedia);
  } else {
    applyResponsiveMedia();
  }

  if (typeof mobileQuery.addEventListener === "function") {
    mobileQuery.addEventListener("change", applyResponsiveMedia);
  } else {
    mobileQuery.addListener(applyResponsiveMedia);
  }
})();
