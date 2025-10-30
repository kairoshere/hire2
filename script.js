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
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Add dynamic counters for social stats
function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start) + '+';
        
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        }
    }, 16);
}

// Initialize Typed.js for dynamic text animation with colorful texts
const typed = new Typed('.dynamic-text', {
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
        document.querySelector('.typed-cursor').style.color = colors[arrayPos];
    }
});

// Initialize counters with enhanced animation
document.addEventListener('DOMContentLoaded', () => {
    const fbCounter = document.querySelector('.fb-count');
    const igCounter = document.querySelector('.ig-count');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('fb-count')) {
                    animateCounter(entry.target, 30, 2000);
                } else if (entry.target.classList.contains('ig-count')) {
                    animateCounter(entry.target, 11, 2000);
                }
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    [fbCounter, igCounter].forEach(counter => {
        counterObserver.observe(counter);
    });
});

// Parallax effect for header content
const headerContent = document.querySelector('.header-content');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    headerContent.style.transform = `translateY(${scrolled * 0.4}px)`;
});

// Mobile menu toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
});