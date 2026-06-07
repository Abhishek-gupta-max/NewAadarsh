/**
 * Scroll Animations - Intersection Observer
 * Adds smooth fade-in animations when elements scroll into view
 */

document.addEventListener('DOMContentLoaded', function() {
    // Create Intersection Observer options
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Callback when elements enter viewport
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class to trigger animation
                entry.target.classList.add('visible');
                
                // Optional: Stop observing after animation completes
                // observer.unobserve(entry.target);
            }
        });
    };

    // Create observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Find all elements with animation classes
    const animatedElements = document.querySelectorAll(
        '.scroll-fade-in, .scroll-fade-in-left, .scroll-fade-in-right, .scroll-scale-in'
    );

    // Observe each element
    animatedElements.forEach((element, index) => {
        // Add stagger delay via CSS variable
        element.style.setProperty('--index', index);
        observer.observe(element);
    });

    // Add smooth scroll anchor behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

/**
 * Utility: Trigger animations on page load
 */
window.addEventListener('load', function() {
    // Add animation class to hero sections immediately
    document.querySelectorAll('.hero-section').forEach(hero => {
        hero.classList.add('visible');
    });
});

/**
 * Mobile Navigation Toggle (if exists)
 */
function setupMobileNav() {
    const menuButton = document.querySelector('[data-mobile-menu-button]');
    const mobileMenu = document.querySelector('[data-mobile-menu]');

    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            menuButton.setAttribute('aria-expanded', 
                menuButton.getAttribute('aria-expanded') === 'false' ? 'true' : 'false'
            );
        });

        // Close menu when clicking on a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                menuButton.setAttribute('aria-expanded', 'false');
            });
        });
    }
}

setupMobileNav();

/**
 * Performance: Lazy load images
 */
function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        img.classList.remove('lazy-image');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

setupLazyLoading();

/**
 * Utility: Smooth scroll-to-top button
 */
function setupScrollToTop() {
    const scrollToTopBtn = document.querySelector('[data-scroll-to-top]');
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.remove('hidden');
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.add('hidden');
                scrollToTopBtn.classList.remove('visible');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

setupScrollToTop();

/**
 * Form enhancement: Real-time validation feedback
 */
function setupFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.querySelectorAll('input, textarea, select').forEach(field => {
            field.addEventListener('blur', function() {
                this.classList.remove('border-red-500');
                
                // Basic validation
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.classList.add('border-red-500');
                } else if (this.type === 'email' && this.value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(this.value)) {
                        this.classList.add('border-red-500');
                    }
                }
            });
        });
    });
}

setupFormValidation();

/**
 * Counter animation for statistics
 */
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Initialize counter animations for stat boxes
document.addEventListener('DOMContentLoaded', function() {
    const stats = document.querySelectorAll('[data-animate-counter]');
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-animate-counter'));
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounter(stat, target);
                observer.unobserve(stat);
            }
        });
        observer.observe(stat);
    });
});

console.log('✓ Scroll animations initialized');
