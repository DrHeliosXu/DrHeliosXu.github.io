// Get modal, preview images, and close button
const modal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const videoSource = document.getElementById('videoSource');
const closeModal = document.getElementById('closeModal');
const previewImages = document.querySelectorAll('.preview-image');
const subtitleDisplay = document.querySelector('.subtitle-display');
let currentSubtitles = [];
let customPlayer = null;

function formatVideoTime(seconds) {
  if (!Number.isFinite(seconds)) return '0:00';
  const safeSeconds = Math.max(0, Math.floor(seconds));
  const minutes = Math.floor(safeSeconds / 60);
  const secs = safeSeconds % 60;
  return `${minutes}:${String(secs).padStart(2, '0')}`;
}

function ensureCustomVideoPlayer() {
  if (customPlayer || !modalVideo) return customPlayer;

  modalVideo.removeAttribute('controls');
  modalVideo.classList.add('hx-video-player__media');

  const frame = document.createElement('div');
  frame.className = 'hx-video-player';
  modalVideo.parentNode.insertBefore(frame, modalVideo);
  frame.appendChild(modalVideo);

  const controls = document.createElement('div');
  controls.className = 'hx-video-player__controls';
  controls.innerHTML = `
    <button type="button" class="hx-video-player__button hx-video-player__play" aria-label="播放">▶</button>
    <div class="hx-video-player__progress" role="slider" tabindex="0" aria-label="视频进度" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
      <div class="hx-video-player__progress-track">
        <div class="hx-video-player__progress-fill"></div>
        <span class="hx-video-player__progress-handle"></span>
      </div>
    </div>
    <span class="hx-video-player__time">0:00 / 0:00</span>
    <button type="button" class="hx-video-player__button hx-video-player__mute" aria-label="静音">🔊</button>
    <button type="button" class="hx-video-player__button hx-video-player__fullscreen" aria-label="全屏">⛶</button>
  `;
  frame.appendChild(controls);

  customPlayer = {
    frame,
    controls,
    playButton: controls.querySelector('.hx-video-player__play'),
    muteButton: controls.querySelector('.hx-video-player__mute'),
    fullscreenButton: controls.querySelector('.hx-video-player__fullscreen'),
    progress: controls.querySelector('.hx-video-player__progress'),
    fill: controls.querySelector('.hx-video-player__progress-fill'),
    handle: controls.querySelector('.hx-video-player__progress-handle'),
    time: controls.querySelector('.hx-video-player__time'),
    isSeeking: false
  };

  bindCustomVideoPlayer();
  return customPlayer;
}

function seekVideoFromClientX(clientX) {
  const player = ensureCustomVideoPlayer();
  const duration = modalVideo.duration;
  if (player) player.progress.dataset.lastSeekX = String(clientX);
  if (!player || !Number.isFinite(duration) || duration <= 0 || !Number.isFinite(clientX)) return;

  const rect = player.progress.getBoundingClientRect();
  const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
  player.progress.dataset.lastSeekRatio = String(ratio);
  modalVideo.currentTime = ratio * duration;
  updateCustomVideoPlayer();
  showSubtitle(currentSubtitles, modalVideo.currentTime || 0);
}

function getSeekClientX(event) {
  if (event.touches && event.touches.length) return event.touches[0].clientX;
  if (event.changedTouches && event.changedTouches.length) return event.changedTouches[0].clientX;
  if (Number.isFinite(event.clientX) && event.clientX > 0) return event.clientX;
  if (Number.isFinite(event.pageX) && event.pageX > 0) return event.pageX - window.scrollX;
  if (Number.isFinite(event.offsetX) && event.target && event.target.getBoundingClientRect) {
    return event.target.getBoundingClientRect().left + event.offsetX;
  }
  return null;
}

function updateCustomVideoPlayer() {
  const player = ensureCustomVideoPlayer();
  if (!player) return;

  const duration = modalVideo.duration;
  const currentTime = modalVideo.currentTime || 0;
  const ratio = Number.isFinite(duration) && duration > 0 ? Math.max(0, Math.min(1, currentTime / duration)) : 0;

  player.fill.style.width = `${ratio * 100}%`;
  player.handle.style.left = `${ratio * 100}%`;
  player.time.textContent = `${formatVideoTime(currentTime)} / ${formatVideoTime(duration)}`;
  player.playButton.textContent = modalVideo.paused ? '▶' : 'Ⅱ';
  player.playButton.setAttribute('aria-label', modalVideo.paused ? '播放' : '暂停');
  player.muteButton.textContent = modalVideo.muted || modalVideo.volume === 0 ? '🔇' : '🔊';
  player.muteButton.setAttribute('aria-label', modalVideo.muted || modalVideo.volume === 0 ? '取消静音' : '静音');
  player.progress.setAttribute('aria-valuenow', String(Math.round(ratio * 100)));
}

function bindCustomVideoPlayer() {
  const player = customPlayer;
  if (!player || player.controls.dataset.bound === 'true') return;
  player.controls.dataset.bound = 'true';

  player.playButton.addEventListener('click', () => {
    if (modalVideo.paused) {
      modalVideo.play().catch(() => {});
    } else {
      modalVideo.pause();
    }
  });

  player.muteButton.addEventListener('click', () => {
    modalVideo.muted = !modalVideo.muted;
    updateCustomVideoPlayer();
  });

  player.fullscreenButton.addEventListener('click', () => {
    const target = player.frame;
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    } else {
      target.requestFullscreen?.();
    }
  });

  player.progress.addEventListener('pointerdown', (event) => {
    player.isSeeking = true;
    player.progress.setPointerCapture?.(event.pointerId);
    seekVideoFromClientX(event.clientX);
    event.preventDefault();
  });

  player.progress.addEventListener('pointermove', (event) => {
    if (!player.isSeeking) return;
    seekVideoFromClientX(event.clientX);
    event.preventDefault();
  });

  function stopSeeking(event) {
    if (!player.isSeeking) return;
    player.isSeeking = false;
    if (event && Number.isFinite(event.clientX)) seekVideoFromClientX(event.clientX);
  }

  player.progress.addEventListener('pointerup', stopSeeking);
  player.progress.addEventListener('pointercancel', stopSeeking);

  function seekFromProgressEvent(event) {
    const target = event.target;
    if (!target || !target.closest || !target.closest('.hx-video-player__progress')) return;
    const clientX = getSeekClientX(event);
    seekVideoFromClientX(clientX);
    event.preventDefault();
    event.stopPropagation();
  }

  player.frame.addEventListener('click', seekFromProgressEvent, true);
  player.controls.addEventListener('click', seekFromProgressEvent, true);
  player.progress.addEventListener('click', seekFromProgressEvent, true);

  player.progress.addEventListener('mousedown', (event) => {
    player.isSeeking = true;
    seekVideoFromClientX(getSeekClientX(event));
    event.preventDefault();
  });

  player.controls.addEventListener('mousedown', (event) => {
    const target = event.target;
    if (!target || !target.closest || !target.closest('.hx-video-player__progress')) return;
    player.isSeeking = true;
    seekVideoFromClientX(getSeekClientX(event));
    event.preventDefault();
    event.stopPropagation();
  }, true);

  document.addEventListener('mousemove', (event) => {
    if (!player.isSeeking) return;
    seekVideoFromClientX(getSeekClientX(event));
  });

  document.addEventListener('mouseup', (event) => {
    if (!player.isSeeking) return;
    player.isSeeking = false;
    seekVideoFromClientX(getSeekClientX(event));
  });

  player.progress.addEventListener('touchstart', (event) => {
    player.isSeeking = true;
    seekVideoFromClientX(getSeekClientX(event));
    event.preventDefault();
  }, { passive: false });

  player.progress.addEventListener('touchmove', (event) => {
    if (!player.isSeeking) return;
    seekVideoFromClientX(getSeekClientX(event));
    event.preventDefault();
  }, { passive: false });

  player.progress.addEventListener('touchend', (event) => {
    if (!player.isSeeking) return;
    player.isSeeking = false;
    seekVideoFromClientX(getSeekClientX(event));
    event.preventDefault();
  }, { passive: false });

  player.progress.addEventListener('keydown', (event) => {
    const duration = modalVideo.duration;
    if (!Number.isFinite(duration) || duration <= 0) return;
    const step = event.shiftKey ? 30 : 5;
    if (event.key === 'ArrowLeft') {
      modalVideo.currentTime = Math.max(0, (modalVideo.currentTime || 0) - step);
      event.preventDefault();
    } else if (event.key === 'ArrowRight') {
      modalVideo.currentTime = Math.min(duration, (modalVideo.currentTime || 0) + step);
      event.preventDefault();
    } else {
      return;
    }
    updateCustomVideoPlayer();
    showSubtitle(currentSubtitles, modalVideo.currentTime || 0);
  });

  ['loadedmetadata', 'durationchange', 'timeupdate', 'play', 'pause', 'volumechange', 'seeked'].forEach((eventName) => {
    modalVideo.addEventListener(eventName, updateCustomVideoPlayer);
  });
}

// Parse VTT file and return an array of subtitle entries
async function parseVTT(subtitleUrl) {
  try {
    const response = await fetch(subtitleUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch subtitle file: ${response.status} ${response.statusText}`);
    }

    const text = await response.text();

    // Check if this is a VTT file by looking for WEBVTT header
    const isVTT = text.trim().startsWith('WEBVTT');

    if (!isVTT) {
      // Fallback handling for non-VTT subtitles
      const subtitles = [];
      const lines = text.split('\n');

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.includes('-->')) {
          const times = line.split('-->').map(time => time.trim());
          const startTime = timeToSeconds(times[0]);
          const endTime = timeToSeconds(times[1]);

          let subtitleText = '';
          i++;
          while (i < lines.length && lines[i].trim() !== '') {
            subtitleText += lines[i] + '\n';
            i++;
          }

          if (subtitleText) {
            subtitles.push({
              startTime,
              endTime,
              text: subtitleText.trim()
            });
          }
        }
      }

      window.siteDebug(`Parsed ${subtitles.length} subtitles in non-VTT format`);
      return subtitles;
    }

    // Standard VTT parsing
    const lines = text.split('\n');
    const subtitles = [];
    let currentSubtitle = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Skip empty lines and WEBVTT header
      if (!line || line === 'WEBVTT') continue;

      // Check if line contains timestamps (00:00:00.000 --> 00:00:00.000)
      if (line.includes('-->')) {
        const times = line.split('-->').map(time => time.trim());
        const startTime = timeToSeconds(times[0]);
        const endTime = timeToSeconds(times[1]);

        currentSubtitle = { startTime, endTime, text: '' };
        subtitles.push(currentSubtitle);
      }
      // If we have a current subtitle and this line isn't a timestamp or cue identifier, it's subtitle text
      else if (currentSubtitle && !line.match(/^\d+$/) && !line.includes(':')) {
        currentSubtitle.text += (currentSubtitle.text ? '\n' : '') + line;
      }
    }

    window.siteDebug(`Parsed ${subtitles.length} subtitles in VTT format`);
    return subtitles;
  } catch (error) {
    console.error('Error parsing subtitle file:', error);
    return [];
  }
}

// Convert VTT timestamp to seconds
function timeToSeconds(timeString) {
  // Handle different timestamp formats
  if (!timeString) return 0;
  
  const parts = timeString.split(':');
  let seconds = 0;
  
  if (parts.length === 3) {
    // Handle hours, minutes, seconds format (00:00:00.000)
    const hoursMinSec = parts[2].split('.');
    seconds = parseFloat(parts[0]) * 3600 + parseFloat(parts[1]) * 60 + parseFloat(hoursMinSec[0]);
    
    if (hoursMinSec.length > 1) {
      seconds += parseFloat('0.' + hoursMinSec[1]);
    }
  } else if (parts.length === 2) {
    // Handle minutes, seconds format (00:00.000)
    const minSec = parts[1].split('.');
    seconds = parseFloat(parts[0]) * 60 + parseFloat(minSec[0]);
    
    if (minSec.length > 1) {
      seconds += parseFloat('0.' + minSec[1]);
    }
  }
  
  return seconds;
}

// Show subtitles based on current video time
function showSubtitle(subtitles, currentTime) {
  const currentSubtitle = subtitles.find(
    subtitle => currentTime >= subtitle.startTime && currentTime <= subtitle.endTime
  );

  if (currentSubtitle) {
    // Check if the subtitle is a single line or multi-line
    const subtitleLines = currentSubtitle.text.split('\n');
    
    // Clear existing content and create new multi-line subtitle display
    subtitleDisplay.innerHTML = '';
    subtitleLines.forEach(line => {
      const span = document.createElement('span');
      span.textContent = line;
      subtitleDisplay.appendChild(span);
      subtitleDisplay.appendChild(document.createElement('br')); // Add line breaks for multi-line
    });

    subtitleDisplay.style.visibility = 'visible'; // Show subtitle
  } else {
    subtitleDisplay.innerHTML = '&nbsp;'; // Non-breaking space for hidden subtitles
    subtitleDisplay.style.visibility = 'hidden'; // Hide subtitle
  }
}

// Style the subtitle display to appear below the video
function styleSubtitleDisplay() {
  modalVideo.style.pointerEvents = 'auto';

  subtitleDisplay.style.position = 'relative';
  subtitleDisplay.style.bottom = 'auto';
  subtitleDisplay.style.left = 'auto';
  subtitleDisplay.style.width = '100%';
  subtitleDisplay.style.minHeight = '40px';
  subtitleDisplay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
  subtitleDisplay.style.color = 'white';
  subtitleDisplay.style.textAlign = 'center';
  subtitleDisplay.style.marginTop = '8px';
  subtitleDisplay.style.padding = '0 5px';
  subtitleDisplay.style.fontSize = '15px';
  subtitleDisplay.style.zIndex = '1';
  subtitleDisplay.style.textShadow = '1px 1px 1px rgba(0, 0, 0, 0)';
  subtitleDisplay.style.border = 'none';
  subtitleDisplay.style.boxShadow = 'none';
  subtitleDisplay.style.height = 'auto';
  subtitleDisplay.style.display = 'block';
  subtitleDisplay.style.pointerEvents = 'none';
  subtitleDisplay.textContent = '\u00A0';
  subtitleDisplay.style.visibility = 'hidden';
}

// Show modal when a preview image is clicked
previewImages.forEach(image => {
  image.addEventListener('click', async function () {
    const videoUrl = this.getAttribute('data-video');
    const subtitleUrl = this.getAttribute('data-subtitle');
    
    videoSource.src = videoUrl; // Set the video source based on clicked image
    modal.style.display = 'flex'; // Show the modal
    ensureCustomVideoPlayer();
    modalVideo.setAttribute('playsinline', '');
    modalVideo.setAttribute('webkit-playsinline', '');
    modalVideo.load(); // Reload the video in the modal
    const playPromise = modalVideo.play(); // Start immediately while the click gesture is still active.
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(function () {
        // Mobile browsers can still block playback in low-power mode or strict media settings.
        // In that case the native play button remains available.
      });
    }
    
    // Style the subtitle display
    styleSubtitleDisplay();
    
    // If there's a subtitle file, parse it
    let subtitles = [];
    if (subtitleUrl) {
      window.siteDebug("Loading subtitles from:", subtitleUrl);
      subtitles = await parseVTT(subtitleUrl);
      currentSubtitles = subtitles;
      window.siteDebug("Loaded subtitles:", subtitles.length);
      
      // Set up subtitle tracking
      modalVideo.ontimeupdate = () => {
        showSubtitle(subtitles, modalVideo.currentTime);
        updateCustomVideoPlayer();
      };
    } else {
      window.siteDebug("No subtitle URL provided for this video");
      // No subtitles for this video - hide subtitle area
      subtitleDisplay.style.display = 'none';
      modalVideo.ontimeupdate = null;
      currentSubtitles = [];
    }
  });
});

// Media query for smaller screens (mobile devices)
const mobileMediaQuery = window.matchMedia('(max-width: 768px)');
function adjustSubtitleFontSize() {
  if (mobileMediaQuery.matches) {
    // On mobile, reduce font size
    subtitleDisplay.style.fontSize = '10px';
  } else {
    // Default font size
    subtitleDisplay.style.fontSize = '16px';
  }
}

// Add event listener to adjust subtitle font size when window size changes
mobileMediaQuery.addEventListener('change', adjustSubtitleFontSize);

// Initially adjust the font size when the page loads
adjustSubtitleFontSize();


// Close modal when the close button is clicked
closeModal.addEventListener('click', function () {
  modal.style.display = 'none'; // Hide the modal
  modalVideo.pause(); // Pause the video
  modalVideo.currentTime = 0; // Reset the video to the beginning
  
  // Clear subtitle display
  subtitleDisplay.textContent = '';
  subtitleDisplay.style.display = 'none';
  currentSubtitles = [];
  updateCustomVideoPlayer();
  
  // Remove timeupdate event handler
  modalVideo.ontimeupdate = null;
});

// Close modal when clicking outside the modal content
window.addEventListener('click', function (event) {
  if (event.target === modal) {
    modal.style.display = 'none'; // Hide the modal
    modalVideo.pause(); // Pause the video
    modalVideo.currentTime = 0; // Reset the video to the beginning
    
    // Clear subtitle display
    subtitleDisplay.textContent = '';
    subtitleDisplay.style.display = 'none';
    currentSubtitles = [];
    updateCustomVideoPlayer();
    
    // Remove timeupdate event handler
    modalVideo.ontimeupdate = null;
  }
});
