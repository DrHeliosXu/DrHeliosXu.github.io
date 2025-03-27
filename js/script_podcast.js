"use strict";

const options = {
  defaultSpeed: '1.00',
  speeds: ['1.25','1.50', '2.00', '0.75'],
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
  ]
}

new MediaElementPlayer(
  document.querySelector("audio"),
  options
 );

// Separate the audio controls so I can style them better.
(() => {
	const elementTop = document.createElement('div');
  const elementBottom = document.createElement('div');
	elementTop.classList.add('mejs-prepended-buttons');
  elementBottom.classList.add('mejs-appended-buttons');

	const controls = document.querySelector('.mejs__controls');
	controls.prepend(elementTop);
  controls.append(elementBottom);
  
	const controlsChildren = Array.from(controls.childNodes).filter(v => v.className.startsWith("mejs_"));

  controlsChildren.slice(0, 3).forEach(elem => {
     elementTop.append(elem)
  });
  
  controlsChildren.slice(3, controlsChildren.length).forEach(elem => {
    elementBottom.append(elem)
  })
})()


// 加载并解析VTT文件// 加载并解析VTT文件// 加载并解析VTT文件// 加载并解析VTT文件// 加载并解析VTT文件// 加载并解析VTT文件// 加载并解析VTT文件


let cnCues = []; // 中文字幕数组
let enCues = []; // 英文字幕数组
const audioPlayer = document.querySelector('audio');
const cnSubtitle = document.getElementById('cn-subtitles');
const enSubtitle = document.getElementById('en-subtitles');

// 加载并解析VTT文件
async function loadSubtitles(lang) {
  try {
    const response = await fetch(`video/Xu-Expertise-Interview-${lang}.vtt`);
    const vttText = await response.text();
    return parseVtt(vttText);
  } catch (error) {
    console.error('字幕加载失败:', error);
    return [];
  }
}

// VTT解析函数
function parseVtt(text) {
  const lines = text.split('\n').filter(line => line.trim() !== '');
  const cues = [];
  let currentCue = null;

  lines.forEach((line, index) => {
    if (line.startsWith('WEBVTT')) return;

    if (/^\d{2}:\d{2}:\d{2}.\d{3}/.test(line)) {
      const [start, end] = line.split(' --> ').map(t => t.replace(',', '.'));
      currentCue = { start: parseTime(start), end: parseTime(end), text: '' };
    } else if (currentCue) {
      currentCue.text += (currentCue.text ? ' ' : '') + line;
      currentCue.text = currentCue.text.replace(/\d{1,4}$/, '').trim();

      if (index === lines.length - 1 || /^\d{2}:\d{2}:\d{2}.\d{3}/.test(lines[index + 1])) {
        cues.push(currentCue);
        currentCue = null;
      }
    }
  });

  return cues;
}

// 时间字符串转秒数
function parseTime(timeStr) {
  const [h, m, s] = timeStr.split(':').map(Number);
  return h * 3600 + m * 60 + s;
}

// 初始化字幕
// 获取 <div> 元素中的内容
const lang_1 = document.getElementById('cn-subtitles').textContent.trim();
const lang_2 = document.getElementById('en-subtitles').textContent.trim();
// 输出到控制台（可选）
console.log('Language 1:', lang_1);
console.log('Language 2:', lang_2);

async function initSubtitles() {
  cnCues = await loadSubtitles(lang_1);
  enCues = await loadSubtitles(lang_2);
  updateSubtitles(audioPlayer.currentTime);
}

// 二分查找当前字幕
function findActiveCue(cues, currentTime) {
  let low = 0, high = cues.length - 1;
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

// 更新字幕
function updateSubtitles(currentTime) {
  const activeCn = findActiveCue(cnCues, currentTime);
  cnSubtitle.textContent = activeCn ? activeCn.text : ' ';

  const activeEn = findActiveCue(enCues, currentTime);
  enSubtitle.textContent = activeEn ? activeEn.text : ' ';
}

// 绑定播放器事件
audioPlayer.addEventListener('timeupdate', () => {
  if (!audioPlayer.seeking) {
    updateSubtitles(audioPlayer.currentTime);
  }
});

// 修复进度条拖动问题
let isSeeking = false;

// 开始拖动
audioPlayer.addEventListener('seeking', () => {
  isSeeking = true;
});

// 拖动结束
audioPlayer.addEventListener('seeked', () => {
  isSeeking = false;
  updateSubtitles(audioPlayer.currentTime); // 拖动结束后更新字幕
});

// 确保播放状态不会干扰拖动
audioPlayer.addEventListener('play', () => {
  isSeeking = false;
});

audioPlayer.addEventListener('pause', () => {
  isSeeking = false;
});

// 加载字幕
document.addEventListener('DOMContentLoaded', initSubtitles);