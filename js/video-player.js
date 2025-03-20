// Get modal, preview images, and close button
const modal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const videoSource = document.getElementById('videoSource');
const closeModal = document.getElementById('closeModal');
const previewImages = document.querySelectorAll('.preview-image');

// Show modal when a preview image is clicked
previewImages.forEach(image => {
image.addEventListener('click', function () {
    const videoUrl = this.getAttribute('data-video');
    videoSource.src = videoUrl; // Set the video source based on clicked image
    modal.style.display = 'flex'; // Show the modal
    modalVideo.load(); // Reload the video in the modal
    modalVideo.play(); // Start playing the video
});
});

// Close modal when the close button is clicked
closeModal.addEventListener('click', function () {
modal.style.display = 'none'; // Hide the modal
modalVideo.pause(); // Pause the video
modalVideo.currentTime = 0; // Reset the video to the beginning
});

// Close modal when clicking outside the modal content
window.addEventListener('click', function (event) {
if (event.target === modal) {
    modal.style.display = 'none'; // Hide the modal
    modalVideo.pause(); // Pause the video
    modalVideo.currentTime = 0; // Reset the video to the beginning
}
});
