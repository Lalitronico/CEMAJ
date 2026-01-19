/**
 * CEMAJ - Main JavaScript
 * Comité Esperanza de Morena - Ciudad Juárez
 * Interactividad y animaciones
 */

(function() {
    'use strict';

    // ========================================
    // DOM Elements
    // ========================================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    // ========================================
    // Navbar Scroll Effect
    // ========================================
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // ========================================
    // Mobile Navigation Toggle
    // ========================================
    function toggleMobileNav() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }

    function closeMobileNav() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    // ========================================
    // Smooth Scroll Navigation
    // ========================================
    function handleNavClick(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            closeMobileNav();
        }
    }

    // ========================================
    // Active Navigation Link
    // ========================================
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id], header[id]');
        const scrollPosition = window.scrollY + navbar.offsetHeight + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // ========================================
    // Tabs Functionality
    // ========================================
    function handleTabClick(e) {
        const clickedBtn = e.currentTarget;
        const targetTab = clickedBtn.getAttribute('data-tab');

        // Update active button
        tabBtns.forEach(btn => btn.classList.remove('active'));
        clickedBtn.classList.add('active');

        // Update active panel
        tabPanels.forEach(panel => {
            panel.classList.remove('active');
            if (panel.id === `tab-${targetTab}`) {
                panel.classList.add('active');
            }
        });
    }

    // ========================================
    // Scroll Animations (Intersection Observer)
    // ========================================
    function initScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Optionally stop observing after animation
                    // observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animateElements.forEach(element => {
            observer.observe(element);
        });
    }

    // ========================================
    // Hero CTA Smooth Scroll
    // ========================================
    function initHeroCTA() {
        const heroCTA = document.querySelector('.hero-cta');
        if (heroCTA) {
            heroCTA.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = targetSection.offsetTop - navbarHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        }
    }

    // ========================================
    // Close mobile nav on clicking outside
    // ========================================
    function handleOutsideClick(e) {
        if (navMenu.classList.contains('active') &&
            !navMenu.contains(e.target) &&
            !navToggle.contains(e.target)) {
            closeMobileNav();
        }
    }

    // ========================================
    // Escape key to close mobile nav
    // ========================================
    function handleEscapeKey(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMobileNav();
        }
    }

    // ========================================
    // Throttle function for scroll events
    // ========================================
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // ========================================
    // Initialize all event listeners
    // ========================================
    function init() {
        // Scroll events (throttled for performance)
        const throttledScrollHandler = throttle(() => {
            handleNavbarScroll();
            updateActiveNavLink();
        }, 100);

        window.addEventListener('scroll', throttledScrollHandler);

        // Mobile navigation
        if (navToggle) {
            navToggle.addEventListener('click', toggleMobileNav);
        }

        // Navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', handleNavClick);
        });

        // Tabs
        tabBtns.forEach(btn => {
            btn.addEventListener('click', handleTabClick);
        });

        // Click outside to close mobile nav
        document.addEventListener('click', handleOutsideClick);

        // Escape key
        document.addEventListener('keydown', handleEscapeKey);

        // Initialize scroll animations
        initScrollAnimations();

        // Initialize hero CTA
        initHeroCTA();

        // Initial checks
        handleNavbarScroll();
        updateActiveNavLink();

        // Add loaded class to body for potential CSS animations
        document.body.classList.add('loaded');

        console.log('CEMAJ website initialized successfully!');
    }

    // ========================================
    // Run initialization when DOM is ready
    // ========================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
