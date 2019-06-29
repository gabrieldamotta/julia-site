/*
 * Handles any modal photos in a document with class "modal-holder"
 */
const modalContainer = document.querySelector('.modal-holder');
const modal = document.querySelector('.modal-photo');

modalContainer.addEventListener('click', e => {
  e.preventDefault();
  // get nearest img to click
  const modalToggle = e.target.closest('.can-modal-photo');
  // return on click outside img
  if (!modalToggle) return;

  // fetch and define open and close for modal
  const modalOpen = _ => {
    modal.classList.add('is-open');
    modal.style.animation = 'modalIn 400ms forwards';
  }
  const modalClose = _ => {
    modal.classList.remove('is-open');
    modal.removeEventListener('animationend', modalClose);
  }

  // handle close button
  const closeButton = modal.querySelector('.modal-close');
  closeButton.addEventListener('click', _ => {
    modal.style.animation = 'modalOut 400ms forwards';
    modal.addEventListener('animationend', modalClose);
  })

  // handle escape close
  document.addEventListener('keydown', e => {
    if (e.keyCode == 27) {
      modal.style.animation = 'modalOut 400ms forwards';
      modal.addEventListener('animationend', modalClose);
    }
  })

  // fetch full image path
  const image = modal.firstElementChild;
  var oriPath = modalToggle.src;
  var splitPath = oriPath.split("\.");
  try {
    image.src = splitPath[0] + "_FULL." + splitPath[1];
  } catch { // use light image if path is bad
    image.src = oriPath;
  }

  // open the modal
  modalOpen();
})
