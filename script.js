
// Loader
// window.addEventListener('load', () => {
//     setTimeout(() => {
//         document.querySelector('.loader').classList.add('hidden');
//     }, 2000);
// });

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorDot = document.querySelector('.cursor-dot');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    }, 50);
});

document.addEventListener('mousedown', () => {
    cursor.style.transform = 'scale(0.8)';
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'scale(1)';
});

// Hover effect on interactive elements
const interactiveElements = document.querySelectorAll('a, button, .work-item, .service-card, input, textarea, select');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        cursor.style.borderColor = 'var(--navy-blue)';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.borderColor = 'var(--saffron)';
    });
});

// Navigation scroll effect
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// PREMIUM HERO BACKGROUND - MOUSE INTERACTION
const orb1 = document.getElementById('orb1');
const orb2 = document.getElementById('orb2');
const orb3 = document.getElementById('orb3');

document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    // Parallax effect for orbs
    orb1.style.transform = `translate(${x * 50}px, ${y * 50}px)`;
    orb2.style.transform = `translate(${-x * 40}px, ${-y * 40}px)`;
    orb3.style.transform = `translate(${x * 30}px, ${-y * 30}px)`;
});

// Create floating particles
const heroParticles = document.getElementById('heroParticles');
for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle-float';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 8 + 's';
    particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
    heroParticles.appendChild(particle);
}

// Reveal animations on scroll
const reveals = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            el.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// Counter animation
const counters = document.querySelectorAll('.stat-number');
let counterStarted = false;

const startCounters = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / 100;
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };

        updateCounter();
    });
};

window.addEventListener('scroll', () => {
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const sectionTop = statsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight - 100 && !counterStarted) {
            counterStarted = true;
            startCounters();
        }
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Magnetic button effect
const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .nav-cta, .form-submit');

buttons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0)';
    });
});

// Tilt effect on service cards
const cards = document.querySelectorAll('.service-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Hero Carousel
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.carousel-indicator');
const progressCircle = document.getElementById('progressCircle');
const progressNumber = document.getElementById('progressNumber');
const slideCounter = document.querySelector('.slide-counter .current');

let currentSlide = 0;
const totalSlides = slides.length;
const slideInterval = 10000;
const circumference = 2 * Math.PI * 36;

progressCircle.style.strokeDasharray = circumference;
progressCircle.style.strokeDashoffset = circumference;

function updateCarousel() {
    slides.forEach((slide, index) => {
        slide.classList.remove('active', 'next-up');
        if (index === currentSlide) {
            slide.classList.add('active');
        } else if (index === (currentSlide + 1) % totalSlides) {
            slide.classList.add('next-up');
        }
    });

    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });

    progressNumber.textContent = currentSlide + 1;
    slideCounter.textContent = (currentSlide + 1).toString().padStart(2, '0');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentSlide = index;
        updateCarousel();
        resetProgress();
    });
});

let progress = 0;
let animationFrame;

function animateProgress() {
    progress += 100 / (slideInterval / 16.67);
    const offset = circumference - (progress / 100) * circumference;
    progressCircle.style.strokeDashoffset = offset;

    if (progress >= 100) {
        progress = 0;
        nextSlide();
    }

    animationFrame = requestAnimationFrame(animateProgress);
}

function resetProgress() {
    cancelAnimationFrame(animationFrame);
    progress = 0;
    progressCircle.style.strokeDashoffset = circumference;
    animationFrame = requestAnimationFrame(animateProgress);
}

animateProgress();

// Create carousel particles
const particlesContainer = document.getElementById('particlesContainer');
for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particlesContainer.appendChild(particle);
}

// Testimonial Carousel
const testimonialTrack = document.getElementById('testimonialTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const testimonialCards = document.querySelectorAll('.testimonial-card');

let testimonialIndex = 0;

function scrollTestimonials(direction) {
    const cardWidth = testimonialCards[0].offsetWidth + 32;
    
    if (direction === 'next') {
        testimonialIndex = Math.min(testimonialIndex + 1, testimonialCards.length - 2);
    } else {
        testimonialIndex = Math.max(testimonialIndex - 1, 0);
    }
    
    testimonialTrack.scrollTo({
        left: cardWidth * testimonialIndex,
        behavior: 'smooth'
    });
}

prevBtn.addEventListener('click', () => scrollTestimonials('prev'));
nextBtn.addEventListener('click', () => scrollTestimonials('next'));

setInterval(() => {
    if (testimonialIndex < testimonialCards.length - 2) {
        scrollTestimonials('next');
    } else {
        testimonialIndex = -1;
        scrollTestimonials('next');
    }
}, 5000);

// Mobile menu toggle - COMPLETE WORKING VERSION
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const mobileNavLinks = document.getElementById('mobileNavLinks');

// Toggle menu on button click
if (menuToggle) {
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        menuToggle.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
        mobileNavLinks.classList.toggle('active');
    });
}

// Close menu when clicking overlay
if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        mobileNavLinks.classList.remove('active');
    });
}

// Close menu when clicking on any link
const mobileLinks = document.querySelectorAll('.mobile-nav-links a, .mobile-nav-cta');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        mobileNavLinks.classList.remove('active');
    });
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNavLinks.classList.contains('active')) {
        menuToggle.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        mobileNavLinks.classList.remove('active');
    }
});

// // Contact Form
// const contactForm = document.getElementById('contactForm');
// contactForm.addEventListener('submit', (e) => {
//     e.preventDefault();
    
//     // Get form values
//     const formData = new FormData(contactForm);
//     const data = Object.fromEntries(formData);
    
//     // You can add your form submission logic here
//     console.log('Form submitted:', data);
    
//     // Show success message
//     alert('Thank you for contacting us! We will get back to you soon.');
//     contactForm.reset();
// });


// ================================================================
// ✅ UPDATE: PRODUCTS SECTION JavaScript
// (Original code se bilkul alag — koi conflict nahi)
// ================================================================

document.addEventListener('DOMContentLoaded', function () {

    // ✅ UPDATE: Product Filter Tabs logic
    const prodFilterTabs = document.querySelectorAll('.prod-filter-tab');
    const productCards = document.querySelectorAll('.product-card');

    prodFilterTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const category = this.getAttribute('data-category');

            // Active tab update
            prodFilterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Filter cards
            productCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = '';
                    }, 80);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 280);
                }
            });
        });
    });

    // ✅ UPDATE: Add to Cart Buttons logic (class: prod-btn-cart)
    const cartButtons = document.querySelectorAll('.prod-btn-cart');

    cartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const originalText = this.textContent;

            // Loading state
            this.classList.add('loading');
            this.textContent = '';

            setTimeout(() => {
                this.classList.remove('loading');
                this.textContent = 'Please Login Your Account ✓';
                this.style.background = 'linear-gradient(135deg, #10B981, #059669)';

                showProdToast('Please Login Your Account 👤');
 
                // Reset button after 2s
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.background = '';
                }, 2000);
            }, 1400);
        });
    });

    // ✅ UPDATE: Wishlist Buttons logic (class: prod-btn-wish)
    const wishButtons = document.querySelectorAll('.prod-btn-wish');

    wishButtons.forEach(button => {
        button.addEventListener('click', function () {
            this.classList.toggle('active');

            if (this.classList.contains('active')) {
                this.innerHTML = '♥';
                showProdToast('Wishlist mein add kar diya! ❤️', 'success');
            } else {
                this.innerHTML = '♡';
                showProdToast('Wishlist se hata diya', 'info');
            }
        });
    });

    // ✅ UPDATE: Product Cards Tilt Effect (like service cards)
    productCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ✅ UPDATE: Toast Function — "prod-toast" id use kiya (original se alag)
    function showProdToast(message, type = 'info') {
        const toast = document.getElementById('prodToast');
        if (!toast) return;

        toast.textContent = message;
        toast.className = 'prod-toast';

        if (type === 'success') toast.classList.add('success');

        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // ✅ UPDATE: Cursor hover effect on product cards & buttons (existing cursor ko extend kiya)
    const prodInteractive = document.querySelectorAll('.product-card, .prod-btn-cart, .prod-btn-wish, .prod-filter-tab');
    prodInteractive.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (cursor) {
                cursor.style.transform = 'scale(2)';
                cursor.style.borderColor = 'var(--navy-blue)';
            }
        });
        el.addEventListener('mouseleave', () => {
            if (cursor) {
                cursor.style.transform = 'scale(1)';
                cursor.style.borderColor = 'var(--saffron)';
            }
        });
    });

});


fetch("https://script.google.com/macros/s/AKfycbz2AEQcNwC8aclJLNHU46i8AY5112xwVOWECaxucNDHegxs_hev5sA9veix7u3iEL6X/exec", {
  method: "POST",
  mode: "no-cors",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name: name,
    email: email,
    phone: phone,
    message: message,
    website: ""
  })
})
.then(res => res.json())
.then(data => {
  console.log(data);
})
.catch(error => {
  console.error("Error:", error);
});
// ================================================================
// ✅ UPDATE END: Products Section JS
// ================================================================
