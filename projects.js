/* ============================================
   MD CONSTRUCTION — PROJECTS PAGE
   projects.js
   ============================================ */

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


/* ============================================
   MD CONSTRUCTION — PROJECTS PAGE
   projects.js
   ============================================ */
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.project-card');
const emptyState = document.getElementById('emptyState');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    let visible = 0;
    cards.forEach((card, i) => {
      const match = filter === 'all' || card.getAttribute('data-category') === filter;
      card.classList.remove('visible', 'hidden');
      if (match) {
        card.classList.remove('hidden');
        visible++;
        setTimeout(() => card.classList.add('visible'), i * 60);
      } else {
        card.classList.add('hidden');
      }
    });
    emptyState.style.display = visible === 0 ? 'block' : 'none';
  });
});

/* ---------- SCROLL ANIMATION ---------- */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
cards.forEach(card => observer.observe(card));

// ============================================================
//  PROJECTS LIGHTBOX — MD CONSTRUCTION
// ============================================================

const lightbox        = document.getElementById('lightbox');
const lightboxImg     = document.getElementById('lightboxImg');
const lightboxTitle   = document.getElementById('lightboxTitle');
const lightboxCounter = document.getElementById('lightboxCounter');
const lightboxThumbs  = document.getElementById('lightboxThumbnails');
const lightboxClose   = document.getElementById('lightboxClose');
const lightboxBackdrop= document.getElementById('lightboxBackdrop');
const lightboxPrev    = document.getElementById('lightboxPrev');
const lightboxNext    = document.getElementById('lightboxNext');

let currentImages = [];
let currentIndex  = 0;

// Open lightbox when a card is clicked
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    const images = card.dataset.images.split(',').map(s => s.trim());
    const title  = card.dataset.title;
    openLightbox(images, title, 0);
  });
});

function openLightbox(images, title, index) {
  currentImages = images;
  currentIndex  = index;

  lightboxTitle.textContent = title;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';

  buildThumbnails();
  goToImage(currentIndex);
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function goToImage(index) {
  currentIndex = index;

  // Fade out
  lightboxImg.classList.add('fading');

  setTimeout(() => {
    lightboxImg.src = currentImages[currentIndex];
    lightboxImg.alt = lightboxTitle.textContent;
    lightboxImg.classList.remove('fading');
  }, 220);

  // Update counter
  lightboxCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;

  // Update thumbnails
  document.querySelectorAll('.lightbox-thumb').forEach((thumb, i) => {
    thumb.classList.toggle('active', i === currentIndex);
  });

  // Update nav buttons
  lightboxPrev.disabled = currentIndex === 0;
  lightboxNext.disabled = currentIndex === currentImages.length - 1;
}

function buildThumbnails() {
  lightboxThumbs.innerHTML = '';
  currentImages.forEach((src, i) => {
    const img = document.createElement('img');
    img.src = src;
    img.className = 'lightbox-thumb' + (i === 0 ? ' active' : '');
    img.addEventListener('click', () => goToImage(i));
    lightboxThumbs.appendChild(img);
  });
}

// Navigation
lightboxPrev.addEventListener('click', () => {
  if (currentIndex > 0) goToImage(currentIndex - 1);
});

lightboxNext.addEventListener('click', () => {
  if (currentIndex < currentImages.length - 1) goToImage(currentIndex + 1);
});

// Close
lightboxClose.addEventListener('click', closeLightbox);
lightboxBackdrop.addEventListener('click', closeLightbox);

// Keyboard navigation
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'ArrowLeft')  goToImage(Math.max(0, currentIndex - 1));
  if (e.key === 'ArrowRight') goToImage(Math.min(currentImages.length - 1, currentIndex + 1));
  if (e.key === 'Escape')     closeLightbox();
});


// VIDEO LIGHTBOX
const videoLightbox = document.getElementById('videoLightbox');
const lightboxVideo = document.getElementById('lightboxVideo');
const videoLightboxClose = document.getElementById('videoLightboxClose');
const videoLightboxBackdrop = document.getElementById('videoLightboxBackdrop');

document.querySelectorAll('.video-card').forEach(card => {
    card.addEventListener('click', () => {
        const videoSrc = card.dataset.video;
        lightboxVideo.src = videoSrc;
        videoLightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
        lightboxVideo.play();
    });
});

function closeVideoLightbox() {
    videoLightbox.classList.remove('open');
    document.body.style.overflow = '';
    lightboxVideo.pause();
    lightboxVideo.currentTime = 0;
    lightboxVideo.src = '';
}

videoLightboxClose.addEventListener('click', closeVideoLightbox);
videoLightboxBackdrop.addEventListener('click', closeVideoLightbox);

document.addEventListener('keydown', e => {
    if (videoLightbox.classList.contains('open') && e.key === 'Escape') {
        closeVideoLightbox();
    }
});