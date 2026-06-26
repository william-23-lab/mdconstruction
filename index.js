// HERO SLIDER
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');

let currentIndex = 0;
let slideTimer = null;
const AUTO_INTERVAL = 7000; // 5 seconds
const VIDEO_SLIDE_INTERVAL = 1000; // 20 seconds for slide 1 (video)

function showSlide(index) {
  if (!slides.length) return;
  const safeIndex = ((index % slides.length) + slides.length) % slides.length;

  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === safeIndex);
    const video = slide.querySelector('.slide-video');
    if (video) {
      video.playbackRate = 0.8;
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


const swiper = new Swiper(".mdSwiper", {
    loop: false,
    spaceBetween: 25,

    navigation: {
        nextEl: ".md-next-btn",
        prevEl: ".md-prev-btn",
    },

    breakpoints: {
        0: {
            slidesPerView: 1,
        },

        768: {
            slidesPerView: 2,
        },

        1200: {
            slidesPerView: 3.2,
        }
    }
});


swiper.on('reachEnd', function () {
    document.querySelector('.md-next-btn').style.opacity = '.5';
});

swiper.on('fromEdge', function () {
    document.querySelector('.md-next-btn').style.opacity = '1';
});




const mdSwiper = new Swiper(".mdSwiper", {
    spaceBetween: 20,

    navigation: {
        nextEl: ".md-next-btn",
        prevEl: ".md-prev-btn",
    },

    breakpoints: {

        0: {
            slidesPerView: 1.2
        },

        480: {
            slidesPerView: 2.2
        },

        768: {
            slidesPerView: 2.5
        },

        1200: {
            slidesPerView: 3.2
        }
    }
});




// =========================
// TESTIMONIAL SLIDER
// =========================

const testimonials = [
{
    image: "images/kwaku.jpg",
    name: "Kwaku Larbi",
    role: "Home Owner",
    review: "MD Construction exceeded our expectations. Their team delivered quality work on schedule and kept us informed throughout the project."
},
{
    image: "images/sarah.jpg",
    name: "Sarah Owusu",
    role: "Business Owner",
    review: "Professional, reliable, and highly experienced. They transformed our commercial space beautifully and within budget."
},
{
    image: "images/daniel.jpg",
    name: "Daniel Asante",
    role: "Property Developer",
    review: "From planning to completion, MD Construction handled everything professionally. I highly recommend their services."
}
];

const clientImage = document.getElementById("clientImage");
const clientName = document.getElementById("clientName");
const clientRole = document.getElementById("clientRole");
const clientReview = document.getElementById("clientReview");

const prevBtn = document.querySelector(".md-prev");
const nextBtn = document.querySelector(".md-next");

const dots = document.querySelectorAll(".md-testimonial-dots span");

let testimonialIndex = 0;
let testimonialTimer;

function updateTestimonial(index){

    if(!clientImage) return;

    clientImage.style.opacity = 0;
    clientName.style.opacity = 0;
    clientRole.style.opacity = 0;
    clientReview.style.opacity = 0;

    setTimeout(()=>{

        clientImage.src = testimonials[index].image;
        clientName.textContent = testimonials[index].name;
        clientRole.textContent = testimonials[index].role;
        clientReview.textContent = testimonials[index].review;

        clientImage.style.opacity = 1;
        clientName.style.opacity = 1;
        clientRole.style.opacity = 1;
        clientReview.style.opacity = 1;

    },250);

    if(dots.length){
        dots.forEach(dot=>dot.classList.remove("active"));
        dots[index].classList.add("active");
    }

}

function nextTestimonial(){

    testimonialIndex++;

    if(testimonialIndex >= testimonials.length){
        testimonialIndex = 0;
    }

    updateTestimonial(testimonialIndex);

}

function prevTestimonial(){

    testimonialIndex--;

    if(testimonialIndex < 0){
        testimonialIndex = testimonials.length - 1;
    }

    updateTestimonial(testimonialIndex);

}

function startTestimonialAuto(){

    stopTestimonialAuto();

    testimonialTimer = setInterval(()=>{
        nextTestimonial();
    },5000);

}

function stopTestimonialAuto(){

    clearInterval(testimonialTimer);

}

if(clientImage){

    updateTestimonial(testimonialIndex);

    if(nextBtn){
        nextBtn.addEventListener("click",()=>{
            nextTestimonial();
            startTestimonialAuto();
        });
    }

    if(prevBtn){
        prevBtn.addEventListener("click",()=>{
            prevTestimonial();
            startTestimonialAuto();
        });
    }

    dots.forEach((dot,index)=>{

        dot.addEventListener("click",()=>{

            testimonialIndex = index;

            updateTestimonial(testimonialIndex);

            startTestimonialAuto();

        });

    });

    startTestimonialAuto();

}