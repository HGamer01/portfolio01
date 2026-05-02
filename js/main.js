// main.js - Core logic for SOLVIXX Portfolio

document.addEventListener('DOMContentLoaded', () => {
    initLenis();
    initCustomCursor();
    initNavbarScroll();
    initGSAPAnimations();
    initMagneticButtons();
});

// Initialize Lenis Smooth Scroll
function initLenis() {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        smoothTouch: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Sync GSAP ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
}

// Custom Cursor Interaction
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.cursor-follower');

    if (!cursor || !follower) return;

    window.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1
        });
        gsap.to(follower, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.3
        });
    });

    // Hover effects
    document.querySelectorAll('a, button, .interactive').forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursor, { scale: 1.5, duration: 0.3 });
            gsap.to(follower, { 
                width: 80, 
                height: 80, 
                border: '1px solid rgba(255, 255, 255, 0.5)', 
                duration: 0.3 
            });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(cursor, { scale: 1, duration: 0.3 });
            gsap.to(follower, { 
                width: 40, 
                height: 40, 
                border: '1px solid rgba(255, 255, 255, 0.3)', 
                duration: 0.3 
            });
        });
    });
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// Global GSAP Animations
function initGSAPAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Reveal
    const heroTimeline = gsap.timeline();
    heroTimeline.from('.hero h1', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
    }).from('.hero p', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power4.out"
    }, "-=0.8").from('.hero .btn', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power4.out"
    }, "-=0.6");

    // Reveal animations on scroll
    gsap.utils.toArray('[data-gsap="reveal"]').forEach(el => {
        gsap.from(el, {
            y: 60,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });
}

// Magnetic Button Effect
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(btn, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });
}

