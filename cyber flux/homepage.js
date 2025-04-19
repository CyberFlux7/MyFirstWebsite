// Global variables
let slideIndex = 1;
let autoSlideInterval;
let timerBar;
const slideDuration = 500; // 5 seconds per slide

// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Get the timer bar element
  timerBar = document.querySelector('.slider-timer');
  
  // Show the first slide
  showSlides(slideIndex);
  
  // Start automatic slideshow
  startAutoSlide();
  
  // Get all dots
  const dots = document.querySelectorAll('.dot');
  
  // Add click event to each dot
  dots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
      currentSlide(index + 1);
    });
  });
  
  // Add click events to prev/next buttons
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');
  
  if (prevButton) {
    prevButton.addEventListener('click', function() {
      changeSlide(-1);
    });
  }
  
  if (nextButton) {
    nextButton.addEventListener('click', function() {
      changeSlide(1);
    });
  }
  
  // Pause auto slide on hover
  const heroSlider = document.querySelector('.hero-slider');
  if (heroSlider) {
    heroSlider.addEventListener('mouseenter', function() {
      stopAutoSlide();
    });
    
    heroSlider.addEventListener('mouseleave', function() {
      startAutoSlide();
    });
  }
});

// Next/previous controls
function changeSlide(n) {
  resetTimer();
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  resetTimer();
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  
  // Loop back to the first slide if we're at the end
  if (n > slides.length) {
    slideIndex = 1;
  }
  
  // Go to the last slide if we go before the first one
  if (n < 1) {
    slideIndex = slides.length;
  }
  
  // Hide all slides
  for (i = 0; i < slides.length; i++) {
    slides[i].style.opacity = "0";
    slides[i].classList.remove("active");
  }
  
  // Remove active class from all dots
  for (i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }
  
  // Show the current slide
  slides[slideIndex-1].style.opacity = "1";
  slides[slideIndex-1].classList.add("active");
  
  // Add active class to the current dot
  if (dots.length > 0) {
    dots[slideIndex-1].classList.add("active");
  }
  
  // Start the timer animation
  startTimerAnimation();
}

// Auto slide functionality
function startAutoSlide() {
  // Reset any existing interval
  stopAutoSlide();
  
  // Start timer animation
  startTimerAnimation();
  
  // Change slides after duration
  autoSlideInterval = setInterval(function() {
    changeSlide(1);
  }, slideDuration);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
  
  // Stop the timer animation
  if (timerBar) {
    timerBar.style.transition = 'none';
    timerBar.style.width = '0%';
  }
}

function resetTimer() {
  // Reset the timer bar
  if (timerBar) {
    timerBar.style.transition = 'none';
    timerBar.style.width = '0%';
  }
  
  // Clear the interval
  clearInterval(autoSlideInterval);
}

function startTimerAnimation() {
  // Animate the timer bar
  if (timerBar) {
    // Reset to 0 first without transition
    timerBar.style.transition = 'none';
    timerBar.style.width = '0%';
    
    // Force a reflow so the browser recognizes the change
    timerBar.offsetHeight;
    
    // Now set the transition and animate to 100%
    timerBar.style.transition = `width ${slideDuration}ms linear`;
    timerBar.style.width = '100%';
  }
}