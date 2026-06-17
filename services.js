// Scroll animation for hero section
document.addEventListener('DOMContentLoaded', function() {
  const heroSection = document.querySelector('.services-hero');
  
  // Add scroll-animate class to enable animations
  heroSection.classList.add('scroll-animate');
  
  // Optional: Add intersection observer for scroll-triggered animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  
  // Start with hero section visible
  heroSection.style.opacity = '1';
  heroSection.style.transform = 'translateY(0)';
});




// Service data
const services = {
    quantity: {
        tag: "Planning",
        title: "Quantity Surveying",
        description: "Professional cost management and financial control services for construction projects.",
        features: [
            "Cost planning & estimation",
            "Budget management",
            "Contract administration",
            "Cost control systems",
            "Final account preparation"
        ],
        action: "Get Quote"
    },
    architecture: {
        tag: "Design",
        title: "Architecture Work",
        description: "Creative architectural design and planning services for residential and commercial projects.",
        features: [
            "Architectural design",
            "3D visualization",
            "Working drawings",
            "Permit acquisition",
            "Site supervision"
        ],
        action: "Start Design"
    },
    udrain: {
        tag: "Infrastructure",
        title: "U-drain Construction",
        description: "Specialized drainage system construction and water management solutions.",
        features: [
            "Drainage system design",
            "Stormwater management",
            "Erosion control",
            "Site grading",
            "Waterproofing solutions"
        ],
        action: "Learn More"
    },
    design: {
        tag: "Aesthetic",
        title: "Interior & Exterior Design",
        description: "Complete design solutions for interior spaces and building exteriors.",
        features: [
            "Space planning",
            "Material selection",
            "Lighting design",
            "Color schemes",
            "Landscape design"
        ],
        action: "View Designs"
    },
    building: {
        tag: "Construction",
        title: "Building Project",
        description: "End-to-end construction project management from planning to completion.",
        features: [
            "Project planning",
            "Construction management",
            "Quality control",
            "Timeline management",
            "Site safety"
        ],
        action: "Start Project"
    },
    survey: {
        tag: "Survey",
        title: "Land Surveying",
        description: "Accurate land measurement, boundary determination, and topographic surveying.",
        features: [
            "Boundary surveying",
            "Topographic mapping",
            "Construction layout",
            "GPS surveying",
            "Land measurement"
        ],
        action: "Schedule Survey"
    },
    estimates: {
        tag: "Financial",
        title: "Estimates",
        description: "Detailed and accurate cost estimates for construction projects.",
        features: [
            "Material costing",
            "Labor estimates",
            "Equipment costs",
            "Overhead calculation",
            "Budget planning"
        ],
        action: "Get Estimate"
    },
    consultancy: {
        tag: "Advisory",
        title: "Consultancy Services",
        description: "Expert construction consultancy for project feasibility and compliance.",
        features: [
            "Project feasibility",
            "Construction methodology",
            "Regulatory compliance",
            "Risk assessment",
            "Best practices"
        ],
        action: "Book Consultation"
    }
};

// Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('serviceModal');
    const modalBody = modal.querySelector('.modal-body');
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    const cards = document.querySelectorAll('.overlay-card');
    
    // Open modal with service data
    function openModal(serviceId) {
        const service = services[serviceId];
        if (!service) return;
        
        modalBody.innerHTML = `
            <div class="modal-header">
                <div class="modal-tag">${service.tag}</div>
                <h2>${service.title}</h2>
                <p class="modal-description">${service.description}</p>
            </div>
            
            <div class="modal-details">
                <h4>Services Include:</h4>
                <ul>
                    ${service.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            
            <div class="modal-action">
                <a href="/contact.html?service=${serviceId}">${service.action}</a>
            </div>
        `;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Add click events to cards and buttons
    cards.forEach(card => {
        const serviceId = card.getAttribute('data-service');
        const button = card.querySelector('.learn-more-btn');
        
        // Click on button
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            openModal(serviceId);
        });
        
        // Click on entire card (optional)
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('learn-more-btn')) {
                openModal(serviceId);
            }
        });
    });
    
    // Close events
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    
    // Close with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal();
    });
});

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

// CTA Bar animation (optional)
document.addEventListener('DOMContentLoaded', function() {
  const ctaBar = document.querySelector('.bottom-cta-bar');
  
  if (ctaBar) {
    // Add animation class after a small delay
    setTimeout(() => {
      ctaBar.style.opacity = '1';
      ctaBar.style.transform = 'translateY(0)';
    }, 500);
    
    // Initial state
    ctaBar.style.opacity = '0';
    ctaBar.style.transform = 'translateY(20px)';
    ctaBar.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  }
});