// Initialize AOS with custom settings
AOS.init({
    duration: 1000,
    once: false,
    mirror: true,
    offset: 100
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

if (navbar) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            navbar.classList.remove('scroll-up');
            navbar.classList.remove('scroll-down');
            return;
        }

        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });
}

// Smooth Scroll Implementation with Active Link Update
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        // Update active link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        this.classList.add('active');

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add dynamic counters for social stats
function animateCounter(element, target, duration) {
    if (!element) return;
    let start = 0;
    const increment = target / (duration / 16); // 60fps

    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start) + 'K+';

        if (start >= target) {
            element.textContent = target + 'K+';
            clearInterval(timer);
        }
    }, 16);
}

// Initialize Typed.js for dynamic text animation with colorful texts
let typed = null;
if (typeof Typed !== 'undefined' && document.querySelector('.dynamic-text')) {
    typed = new Typed('.dynamic-text', {
        strings: [
            'Professional Photo Editor ✨',
            'Digital Artist 🎨',
            'Creative Designer 🎯',
            'Visual Storyteller 🌟'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        cursorChar: '|',
        onStringTyped: (arrayPos) => {
            const colors = ['#FF3CAC', '#338AFF', '#3CF0C5', '#FFA63D'];
            const cursor = document.querySelector('.typed-cursor');
            if (cursor) cursor.style.color = colors[arrayPos % colors.length];
        }
    });
}

// Initialize counters with enhanced animation
document.addEventListener('DOMContentLoaded', () => {
    const fbCounter = document.querySelector('.fb-count');
    const igCounter = document.querySelector('.ig-count');

    const observerOptions = { threshold: 0.4 };
    const counterObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('fb-count')) animateCounter(entry.target, 30, 2000);
                if (entry.target.classList.contains('ig-count')) animateCounter(entry.target, 11, 2000);
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    if (fbCounter) counterObserver.observe(fbCounter);
    if (igCounter) counterObserver.observe(igCounter);

    // Modal wiring
    const modal = document.getElementById('service-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalClose = modal ? modal.querySelector('.modal-close') : null;

    function openModal(title, desc) {
        if (!modal) return;
        modal.setAttribute('aria-hidden', 'false');
        modalTitle.textContent = title;
        modalDesc.textContent = desc;
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (!modal) return;
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modal) modal.addEventListener('click', (e) => { if (e.target.classList.contains('modal-backdrop')) closeModal(); });

    document.querySelectorAll('.btn-details').forEach(btn => {
        btn.addEventListener('click', () => {
            const service = btn.getAttribute('data-service');
            if (service === 'paid-edits') {
                openModal('Paid Edits — Contact & Details', 'Paid edits are available. Contact via Email, Phone, or Instagram DM to discuss requirements, turnaround and pricing.');
            } else if (service === 'photo-editing') {
                openModal('Professional Photo Editing', 'High-quality photo editing. Send samples and requirements via email or DM to get started.');
            } else if (service === 'custom-edits') {
                openModal('Custom Edits', 'Custom and creative edits tailored to your brief. Contact for a quote and sample review.');
            } else {
                openModal('Service Details', 'Contact for details.');
            }
        });
    });
});

// Add interactive before/after hover behavior for touch devices and subtle parallax for showcase
(function enhanceShowcase(){
    const cards = document.querySelectorAll('.showcase-card');
    if (!cards.length) return;

    cards.forEach(card => {
        // touch toggles: tap to toggle edited overlay on small screens
        card.addEventListener('click', (e) => {
            if (window.innerWidth <= 800) {
                const after = card.querySelector('.img-after');
                if (after) after.style.opacity = after.style.opacity === '1' ? '0' : '1';
            }
        });

        // subtle parallax on mouse move
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const px = (e.clientX - rect.left) / rect.width - 0.5;
            const py = (e.clientY - rect.top) / rect.height - 0.5;
            const media = card.querySelector('.card-media');
            if (media) media.style.transform = `translate(${px * 8}px, ${py * 8}px)`;
        });

        card.addEventListener('mouseleave', () => {
            const media = card.querySelector('.card-media');
            if (media) media.style.transform = '';
        });
    });
})();

// Parallax effect for header content
const headerContent = document.querySelector('.header-content');
if (headerContent) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        headerContent.style.transform = `translateY(${scrolled * 0.4}px)`;
    });
}

// Mobile menu toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}