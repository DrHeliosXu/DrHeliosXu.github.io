// Get modal, preview images, and close button
const modal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const videoSource = document.getElementById('videoSource');
const closeModal = document.getElementById('closeModal');
const previewImages = document.querySelectorAll('.preview-image');
const subtitleDisplay = document.querySelector('.subtitle-display');

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
    
    // If it's not a VTT file, try to parse it as a simple subtitle format
    if (!isVTT) {
      // Fallback handling: try to extract timestamps and text in a more lenient way
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
      
      console.log(`Parsed ${subtitles.length} subtitles in non-VTT format`);
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
    
    console.log(`Parsed ${subtitles.length} subtitles in VTT format`);
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
    subtitleDisplay.textContent = currentSubtitle.text;
    subtitleDisplay.style.visibility = 'visible'; // Use visibility instead of display
  } else {
    subtitleDisplay.textContent = '\u00A0'; // Non-breaking space to maintain height
    subtitleDisplay.style.visibility = 'hidden'; // Hide text but keep the space
  }
}

// Style the subtitle display to appear below the video
function styleSubtitleDisplay() {
    
  const video = document.getElementById('modalVideo');

  // Position the subtitle display below the video with padding
  // Style the subtitle display to appear below the video (inside the same container)
  subtitleDisplay.style.position = 'absolute';
  subtitleDisplay.style.bottom = (-105) + 'px'; // 10px below the video
  subtitleDisplay.style.left = '0';
  subtitleDisplay.style.width = '100%';
  subtitleDisplay.style.minHeight = '40px';
  subtitleDisplay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
  subtitleDisplay.style.color = 'white';
  subtitleDisplay.style.textAlign = 'center';
  subtitleDisplay.style.padding = '5px';
  subtitleDisplay.style.fontSize = '16px';
  subtitleDisplay.style.zIndex = '1001';
  subtitleDisplay.style.textShadow = '1px 1px 1px rgba(0, 0, 0, 0)';
  subtitleDisplay.style.border = 'none';
  subtitleDisplay.style.boxShadow = 'none';
  subtitleDisplay.style.height = 'auto';
  subtitleDisplay.style.display = 'block';
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
    modalVideo.load(); // Reload the video in the modal
    
    // Style the subtitle display
    styleSubtitleDisplay();
    
    // If there's a subtitle file, parse it
    let subtitles = [];
    if (subtitleUrl) {
      console.log("Loading subtitles from:", subtitleUrl);
      subtitles = await parseVTT(subtitleUrl);
      console.log("Loaded subtitles:", subtitles.length);
      
      // Set up subtitle tracking
      modalVideo.ontimeupdate = () => {
        showSubtitle(subtitles, modalVideo.currentTime);
      };
    } else {
      console.log("No subtitle URL provided for this video");
      // No subtitles for this video - hide subtitle area
      subtitleDisplay.style.display = 'none';
      modalVideo.ontimeupdate = null;
    }
    
    modalVideo.play(); // Start playing the video
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
    
    // Remove timeupdate event handler
    modalVideo.ontimeupdate = null;
  }
});