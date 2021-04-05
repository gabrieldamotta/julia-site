/*
 * Handles selecting videos for the "Watch" page.
 */

const selectionContainer = document.querySelector('.vid-selector');
const videoContainer = document.querySelector('.aspect-ratio').firstElementChild;

selectionContainer.addEventListener('click', e => {
    e.preventDefault();

    // get clicked video
    const vidToggle = e.target.closest('.vid-selectable');
    if (!vidToggle) return;
    
    // get id path
    var vidId = vidToggle.firstElementChild.src.split("/")[4];

    // manipulate container path to new id
    videoContainer.src = "https://www.youtube.com/embed/" + vidId;
})