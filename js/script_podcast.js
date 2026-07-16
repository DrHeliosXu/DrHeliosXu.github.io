"use strict";

const options = {
  defaultSpeed: "1.00",
  speeds: ["1.25", "1.50", "2.00", "0.75"],
  loop: true,
  skipBackInterval: 15,
  jumpForwardInterval: 15,
  features: [
    "playpause",
    "progress",
    "current",
    "duration",
    "skipback",
    "changespeed",
    "volume",
    "jumpforward",
  ],
};

const audioPlayer = document.querySelector(".podcast-container audio");
const cnSubtitle = document.getElementById("cn-subtitles");
const enSubtitle = document.getElementById("en-subtitles");
const lang_1 = (cnSubtitle?.dataset.language || cnSubtitle?.textContent || "cn").trim();
const lang_2 = (enSubtitle?.dataset.language || enSubtitle?.textContent || "en").trim();

let cnCues = [];
let enCues = [];

if (cnSubtitle) cnSubtitle.textContent = " ";
if (enSubtitle) enSubtitle.textContent = " ";

if (audioPlayer) {
  audioPlayer.preload = "metadata";
  audioPlayer.load();
}

initMediaElementPlayer();
initSubtitlesWhenReady();

function initMediaElementPlayer() {
  if (!audioPlayer || typeof MediaElementPlayer !== "function") return;

  try {
    new MediaElementPlayer(audioPlayer, options);
    window.setTimeout(reflowMediaElementControls, 0);
    window.setTimeout(bindPodcastSeekRail, 0);
  } catch (error) {
    console.warn("播放器增强初始化失败，保留原生 audio 控件:", error);
  }
}

function reflowMediaElementControls() {
  const controls = document.querySelector(".mejs__controls");
  if (!controls || controls.dataset.reflowed === "true") return;

  controls.dataset.reflowed = "true";
  const elementTop = document.createElement("div");
  const elementBottom = document.createElement("div");
  elementTop.classList.add("mejs-prepended-buttons");
  elementBottom.classList.add("mejs-appended-buttons");

  controls.prepend(elementTop);
  controls.append(elementBottom);

  const controlsChildren = Array.from(controls.childNodes).filter((node) => {
    return node.className && String(node.className).startsWith("mejs_");
  });

  controlsChildren.slice(0, 3).forEach((element) => elementTop.append(element));
  controlsChildren.slice(3).forEach((element) => elementBottom.append(element));
}

function bindPodcastSeekRail() {
  if (!audioPlayer) return;
  const rail = document.querySelector(".podcast-container .mejs__time-total");
  if (!rail || rail.dataset.seekBound === "true") return;

  rail.dataset.seekBound = "true";
  createPodcastNativeSeekOverlay(rail);
  let isSeeking = false;

  function seekToClientX(clientX) {
    if (!Number.isFinite(clientX)) return;
    const duration = audioPlayer.duration;
    if (!Number.isFinite(duration) || duration <= 0) return;

    const rect = rail.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    audioPlayer.currentTime = ratio * duration;
    audioPlayer.dataset.lastManualSeek = String(audioPlayer.currentTime);
    updateSubtitles(audioPlayer.currentTime);
    audioPlayer.dispatchEvent(new Event("timeupdate"));
  }

  function getEventClientX(event) {
    if (event.touches && event.touches.length) return event.touches[0].clientX;
    if (event.changedTouches && event.changedTouches.length) return event.changedTouches[0].clientX;
    if (Number.isFinite(event.clientX) && event.clientX > 0) return event.clientX;
    if (Number.isFinite(event.pageX) && event.pageX > 0) return event.pageX - window.scrollX;
    if (Number.isFinite(event.offsetX)) {
      return rail.getBoundingClientRect().left + event.offsetX;
    }
    return null;
  }

  function startSeeking(event) {
    const clientX = getEventClientX(event);
    isSeeking = true;
    rail.setPointerCapture?.(event.pointerId);
    seekToClientX(clientX);
    event.preventDefault();
    event.stopPropagation();
  }

  function moveSeeking(event) {
    if (!isSeeking) return;
    const clientX = getEventClientX(event);
    seekToClientX(clientX);
    event.preventDefault();
    event.stopPropagation();
  }

  function stopSeeking(event) {
    if (!isSeeking) return;
    isSeeking = false;
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  function clickSeeking(event) {
    const clientX = getEventClientX(event);
    seekToClientX(clientX);
    event.preventDefault();
    event.stopPropagation();
  }

  rail.addEventListener("pointerdown", startSeeking, true);
  rail.addEventListener("pointermove", moveSeeking, true);
  rail.addEventListener("pointerup", stopSeeking, true);
  rail.addEventListener("pointercancel", stopSeeking, true);
  rail.addEventListener("mousedown", startSeeking, true);
  rail.addEventListener("mousemove", moveSeeking, true);
  rail.addEventListener("mouseup", stopSeeking, true);
  rail.addEventListener("touchstart", startSeeking, { capture: true, passive: false });
  rail.addEventListener("touchmove", moveSeeking, { capture: true, passive: false });
  rail.addEventListener("touchend", stopSeeking, { capture: true, passive: false });
  rail.addEventListener("click", clickSeeking, true);
}

function createPodcastNativeSeekOverlay(rail) {
  const timeRail = document.querySelector(".podcast-container .mejs__time-rail");
  if (!timeRail || timeRail.querySelector(".podcast-native-seek")) return;

  const seekInput = document.createElement("input");
  seekInput.type = "range";
  seekInput.className = "podcast-native-seek";
  seekInput.min = "0";
  seekInput.max = "1000";
  seekInput.step = "1";
  seekInput.value = "0";
  const podcastProgressLabel = document.documentElement.lang === "vi"
    ? "Tiến trình podcast"
    : "Podcast progress";
  seekInput.setAttribute("aria-label", podcastProgressLabel);
  timeRail.appendChild(seekInput);

  function setAudioFromInput() {
    const duration = audioPlayer.duration;
    if (!Number.isFinite(duration) || duration <= 0) return;
    audioPlayer.currentTime = (Number(seekInput.value) / 1000) * duration;
    audioPlayer.dataset.lastManualSeek = String(audioPlayer.currentTime);
    updateSubtitles(audioPlayer.currentTime);
    audioPlayer.dispatchEvent(new Event("timeupdate"));
  }

  function updateInputFromAudio() {
    const duration = audioPlayer.duration;
    if (!Number.isFinite(duration) || duration <= 0) {
      seekInput.value = "0";
      seekInput.disabled = true;
      return;
    }
    seekInput.disabled = false;
    seekInput.value = String(Math.round(((audioPlayer.currentTime || 0) / duration) * 1000));
  }

  seekInput.addEventListener("input", setAudioFromInput);
  seekInput.addEventListener("change", setAudioFromInput);
  audioPlayer.addEventListener("loadedmetadata", updateInputFromAudio);
  audioPlayer.addEventListener("durationchange", updateInputFromAudio);
  audioPlayer.addEventListener("timeupdate", updateInputFromAudio);
  audioPlayer.addEventListener("seeked", updateInputFromAudio);
  updateInputFromAudio();
}

function initSubtitlesWhenReady() {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSubtitles);
  } else {
    initSubtitles();
  }
}

async function loadSubtitles(lang) {
  try {
    const response = await fetch(`video/Xu-Expertise-Interview-${lang}.vtt`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const vttText = await response.text();
    return parseVtt(vttText);
  } catch (error) {
    console.error("字幕加载失败:", error);
    return [];
  }
}

function parseVtt(text) {
  const lines = text.split("\n").filter((line) => line.trim() !== "");
  const cues = [];
  let currentCue = null;

  lines.forEach((line, index) => {
    if (line.startsWith("WEBVTT")) return;

    if (/^\d{2}:\d{2}:\d{2}[.,]\d{3}/.test(line)) {
      const [start, end] = line.split(" --> ").map((time) => time.replace(",", "."));
      currentCue = { start: parseTime(start), end: parseTime(end), text: "" };
    } else if (currentCue) {
      currentCue.text += (currentCue.text ? " " : "") + line;
      currentCue.text = currentCue.text.replace(/\d{1,4}$/, "").trim();

      if (index === lines.length - 1 || /^\d{2}:\d{2}:\d{2}[.,]\d{3}/.test(lines[index + 1])) {
        cues.push(currentCue);
        currentCue = null;
      }
    }
  });

  return cues;
}

function parseTime(timeStr) {
  const [hours, minutes, seconds] = timeStr.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

async function initSubtitles() {
  if (!audioPlayer) return;

  cnCues = await loadSubtitles(lang_1);
  enCues = await loadSubtitles(lang_2);
  updateSubtitles(audioPlayer.currentTime || 0);
  bindAudioEvents();
}

function findActiveCue(cues, currentTime) {
  let low = 0;
  let high = cues.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (currentTime < cues[mid].start) {
      high = mid - 1;
    } else if (currentTime > cues[mid].end) {
      low = mid + 1;
    } else {
      return cues[mid];
    }
  }

  return null;
}

function updateSubtitles(currentTime) {
  const activeCn = findActiveCue(cnCues, currentTime);
  const activeEn = findActiveCue(enCues, currentTime);

  if (cnSubtitle) cnSubtitle.textContent = activeCn ? activeCn.text : " ";
  if (enSubtitle) enSubtitle.textContent = activeEn ? activeEn.text : " ";
}

function bindAudioEvents() {
  if (audioPlayer.dataset.subtitleEventsBound === "true") return;
  audioPlayer.dataset.subtitleEventsBound = "true";

  audioPlayer.addEventListener("loadedmetadata", () => {
    updateSubtitles(audioPlayer.currentTime || 0);
  });

  audioPlayer.addEventListener("timeupdate", () => {
    if (!audioPlayer.seeking) updateSubtitles(audioPlayer.currentTime);
  });

  audioPlayer.addEventListener("seeked", () => {
    updateSubtitles(audioPlayer.currentTime);
  });
}
