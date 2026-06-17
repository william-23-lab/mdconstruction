// HERO SLIDER
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');

let currentIndex = 0;
let slideTimer = null;
const AUTO_INTERVAL = 7000; // 5 seconds
const VIDEO_SLIDE_INTERVAL = 20000; // 20 seconds for slide 1 (video)

function showSlide(index) {
  if (!slides.length) return;
  const safeIndex = ((index % slides.length) + slides.length) % slides.length;

  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === safeIndex);
    const video = slide.querySelector('.slide-video');
    if (video) {
      video.playbackRate = 0.55;
      if (i === safeIndex) {
        video.play();
      } else {
        video.pause();
        video.currentTime = 0;
      }
    }
  });

  if (indicators && indicators.length) {
    indicators.forEach((indicator, i) => indicator.classList.toggle('active', i === safeIndex));
  }

  currentIndex = safeIndex;
}

function nextSlide() {
  showSlide(currentIndex + 1);
  startAutoSlide();
}

function startAutoSlide() {
  stopAutoSlide();
  const duration = currentIndex === 0 ? VIDEO_SLIDE_INTERVAL : AUTO_INTERVAL;
  slideTimer = setTimeout(nextSlide, duration);
}

function stopAutoSlide() {
  if (slideTimer) {
    clearTimeout(slideTimer);
    slideTimer = null;
  }
}

if (indicators && indicators.length) {
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      stopAutoSlide();
      showSlide(index);
      startAutoSlide();
    });
  });
}

// Initialize
showSlide(currentIndex);
startAutoSlide();



// Animated counter for stats (guarded to avoid errors if section missing)
const counters = document.querySelectorAll('.stat-number');
const speed = 200;

function animateCounters() {
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-count') || 0;
    const count = +counter.innerText || 0;
    const increment = Math.max(1, Math.floor(target / speed));

    if (count < target) {
      counter.innerText = Math.min(target, count + increment);
      setTimeout(animateCounters, 20);
    } else {
      counter.innerText = target;
    }
  });
}

const aboutSection = document.querySelector('.about-section');
if (aboutSection && counters.length) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  observer.observe(aboutSection);
}

class TestimonialSlider {
    constructor() {
        this.slides = document.querySelectorAll('.testimonial-slide');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.querySelector('.slider-prev');
        this.nextBtn = document.querySelector('.slider-next');
        this.currentSlide = 0;
        this.autoSlideInterval = null;
        
        this.init();
    }
    
    init() {
        // Event listeners
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Dot click events
        this.dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const slideIndex = parseInt(e.target.dataset.slide);
                this.goToSlide(slideIndex);
            });
        });
        
        // Start auto-slide
        this.startAutoSlide();
        
        // Pause auto-slide on hover
        const sliderContainer = document.querySelector('.slider-container');
        sliderContainer.addEventListener('mouseenter', () => this.stopAutoSlide());
        sliderContainer.addEventListener('mouseleave', () => this.startAutoSlide());
    }
    
    goToSlide(index) {
        // Remove active class from current slide and dot
        this.slides[this.currentSlide].classList.remove('active');
        this.dots[this.currentSlide].classList.remove('active');
        
        // Update current slide
        this.currentSlide = index;
        
        // Add active class to new slide and dot
        this.slides[this.currentSlide].classList.add('active');
        this.dots[this.currentSlide].classList.add('active');
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }
    
    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }
    
    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000); // Change slide every 5 seconds
    }
    
    stopAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    }
}

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TestimonialSlider();
});


const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

// Hamburger open/close
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Mobile dropdown toggle
const dropdownArrows = document.querySelectorAll(".dropdown-arrow");

dropdownArrows.forEach(arrow => {
    arrow.addEventListener("click", function(e) {
        e.preventDefault();
        const parent = this.closest(".dropdown");
        parent.classList.toggle("active");
    });
});


// =====================
// ✅ AOS ANIMATIONS INIT
// =====================
AOS.init({
  duration: 1000,
  easing: 'ease-in-out',
  once: false,
});