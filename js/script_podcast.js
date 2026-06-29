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
const lang_1 = (cnSubtitle && cnSubtitle.textContent ? cnSubtitle.textContent : "cn").trim();
const lang_2 = (enSubtitle && enSubtitle.textContent ? enSubtitle.textContent : "en").trim();

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
