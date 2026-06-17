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
