// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');

mobileMenuBtn?.addEventListener('click', () => {
    const isExpanded = nav.classList.toggle('active');
    mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Search functionality
const searchBtn = document.querySelector('.search-btn');
searchBtn?.addEventListener('click', () => {
    // Navigate to search page or open an accessible search modal
    // This is a placeholder - implement proper search UI
    window.location.href = '#search';
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            nav?.classList.remove('active');
        }
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.path-card, .stat-item, .update-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Counter animation for statistics
const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 20);
};

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const hasPlus = text.includes('+');
                const hasColon = text.includes(':');
                
                if (hasColon) {
                    // For ratios like "12:1"
                    stat.textContent = text;
                } else {
                    // For numbers
                    const number = parseInt(text.replace(/\D/g, ''));
                    if (number) {
                        stat.textContent = '0';
                        setTimeout(() => {
                            animateCounter(stat, number);
                            if (hasPlus) {
                                setTimeout(() => {
                                    stat.textContent += '+';
                                }, 2000);
                            }
                        }, 300);
                    }
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Apply Now button handler
document.querySelectorAll('.btn-primary, .btn-white').forEach(btn => {
    if (btn.textContent.includes('Apply')) {
        btn.addEventListener('click', () => {
            alert('Application form will open here. This is a demo.');
            // In production, this would open an application form or redirect to application page
        });
    }
});

// Request Information button handler
document.querySelectorAll('.btn-outline-white').forEach(btn => {
    if (btn.textContent.includes('Request Information')) {
        btn.addEventListener('click', () => {
            const email = prompt('Please enter your email address:');
            if (email) {
                alert(`Thank you! We'll send information to: ${email}`);
                // In production, this would submit to a backend service
            }
        });
    }
});

// Update article cards with hover effects
document.querySelectorAll('.update-item, .path-card, .featured-article').forEach(card => {
    card.addEventListener('click', (e) => {
        if (!e.target.closest('a')) {
            console.log('Card clicked:', card.querySelector('h3, h4')?.textContent);
            // In production, this would navigate to the full article/page
        }
    });
});

// Add active state to navigation
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav a[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
});

// Add header shadow on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header?.classList.add('scrolled');
    } else {
        header?.classList.remove('scrolled');
    }
});

// Handle form submissions (for future implementation)
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Form submitted! (Demo mode)');
        // In production, this would handle actual form submission
    });
});

// Language selector handler
const languageSelect = document.querySelector('.language-selector select');
languageSelect?.addEventListener('change', (e) => {
    console.log('Language changed to:', e.target.value);
    // In production, this would change the website language
    alert(`Language changed to: ${e.target.value}\n(This is a demo - full translation would be implemented in production)`);
});

// Social media link handlers
document.querySelectorAll('.social-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const platform = link.querySelector('i').classList[1].replace('fa-', '');
        alert(`This would open ${platform} page\n(Demo mode)`);
        // In production, these would be actual social media links
    });
});

// Initialize tooltips for icons (if needed)
document.querySelectorAll('[aria-label]').forEach(element => {
    element.setAttribute('title', element.getAttribute('aria-label'));
});

// Log page load
console.log('Global Academic University website loaded successfully!');
console.log('For demonstration purposes, some interactive features show alerts.');
console.log('In production, these would connect to actual backend services.');
