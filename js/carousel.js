/*
 * Handles scrollable carousel in "Portfolio"
 * switches from double slides to single slides
 * if screen is small enough.
 */
const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel__button--right');
const prevButton = document.querySelector('.carousel__button--left');
const dotsNav = document.querySelector('.carousel__nav');
const dots = Array.from(dotsNav.children);

var slideWidth = track.getBoundingClientRect().width;
window.addEventListener('resize', _ => {
  slideWidth = track.getBoundingClientRect().width;
  track.style.transform = 'translateX(-' + track.querySelector('.current-slide').offsetLeft + 'px)';
})

// arrange slides side by side
// const setSlidePosition = (slide, index) => {
//   slide.style.left = slideWidth * index + 'px';
// }
// slides.forEach(setSlidePosition);
//
// window.addEventListener('resize', _ => {
//   slideWidth = slides[0].getBoundingClientRect().width;
//   slides.forEach(setSlidePosition);
//   track.style.transform = 'translateX(-' + track.querySelector('.current-slide').style.left; + ')';
// })

// handle movement
const moveToSlide = (track, currentSlide, targetSlide) => {
  // move to target slide
  track.style.transform = 'translateX(-' + targetSlide.offsetLeft + 'px)';
  // switch current slide tag
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
}

// handle navigation dots' updates
const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove('current-slide');
  targetDot.classList.add('current-slide');
}

// click left, move left
prevButton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide');
  var prevSlide = currentSlide.previousElementSibling;

  const currentDot = dotsNav.querySelector('.current-slide');
  var prevDot = currentDot.previousElementSibling;

  // check if exists
  if (!prevSlide) {
    prevSlide = slides[slides.length - 1];
    prevDot = dots[dots.length - 1];
  }
  // handle screensize check
  if ((window.innerWidth > 1000) &&
      prevSlide.classList.contains('carousel__slide--semi')) {
    prevSlide = prevSlide.previousElementSibling;
    prevDot = prevDot.previousElementSibling;
  }

  // move
  moveToSlide(track, currentSlide, prevSlide);
  updateDots(currentDot, prevDot);
})

// click right, move right
nextButton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide');
  var nextSlide = currentSlide.nextElementSibling;

  const currentDot = dotsNav.querySelector('.current-slide');
  var nextDot = currentDot.nextElementSibling;

  // special check for resize from last slide
  if (!nextSlide) {
    nextSlide = slides[0];
    nextDot = dots[0];
  }
  // handle screensize check
  if ((window.innerWidth > 1000) &&
      nextSlide.classList.contains('carousel__slide--semi')) {
    nextSlide = nextSlide.nextElementSibling;
    nextDot = nextDot.nextElementSibling;
  }
  // check if exists
  if (!nextSlide) {
    nextSlide = slides[0];
    nextDot = dots[0];
  }

  // move
  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
})

// handle navigation dots
dotsNav.addEventListener('click', e => {
  // check if dot was clicked
  const targetDot = e.target.closest('button');
  if (!targetDot) return;

  const currentSlide = track.querySelector('.current-slide');
  const currentDot = dotsNav.querySelector('.current-slide');
  const targetIndex = dots.findIndex(dot => dot === targetDot);
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
})
