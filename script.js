// Mobile Navigation
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(26, 26, 26, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
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
document.querySelectorAll('.service-card, .plan-card, .contact-item, .tech-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Counter animation for stats
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '');
        }
    }, 16);
};

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const text = statNumber.textContent;
            const number = parseInt(text.replace(/\D/g, ''));

            if (text.includes('150')) {
                animateCounter(statNumber, 150);
            } else if (text.includes('500')) {
                animateCounter(statNumber, 500);
            } else if (text.includes('99.9')) {
                animateCounter(statNumber, 99.9);
            }

            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// Form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);

        // Show success message (in real app, you'd send to server)
        const submitButton = contactForm.querySelector('.submit-button');
        const originalText = submitButton.textContent;

        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        setTimeout(() => {
            submitButton.textContent = 'Message Sent!';
            submitButton.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.style.background = 'linear-gradient(135deg, #00d4ff 0%, #ff6b6b 100%)';
                contactForm.reset();
            }, 2000);
        }, 1000);
    });
}

// ZIP code availability checker
const zipInput = document.getElementById('zipInput');
const checkButton = document.querySelector('.check-button');

if (checkButton) {
    checkButton.addEventListener('click', () => {
        const zipCode = zipInput.value.trim();

        if (!zipCode) {
            alert('Please enter a ZIP code');
            return;
        }

        if (!/^\d{5}$/.test(zipCode)) {
            alert('Please enter a valid 5-digit ZIP code');
            return;
        }

        const originalText = checkButton.textContent;
        checkButton.textContent = 'Checking...';
        checkButton.disabled = true;

        setTimeout(() => {
            // Simulate availability check
            const isAvailable = Math.random() > 0.3; // 70% chance of availability

            if (isAvailable) {
                checkButton.textContent = 'Available!';
                checkButton.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                alert(`Great news! Altura Fiber is available in ${zipCode}. A representative will contact you soon.`);
            } else {
                checkButton.textContent = 'Not Available';
                checkButton.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
                alert(`We're sorry, Altura Fiber is not yet available in ${zipCode}. We'll notify you when it becomes available.`);
            }

            setTimeout(() => {
                checkButton.textContent = originalText;
                checkButton.disabled = false;
                checkButton.style.background = 'linear-gradient(135deg, #00d4ff 0%, #ff6b6b 100%)';
            }, 3000);
        }, 1500);
    });
}

// Plan selection
document.querySelectorAll('.plan-button').forEach(button => {
    button.addEventListener('click', (e) => {
        const planCard = e.target.closest('.plan-card');
        const planName = planCard.querySelector('h3').textContent;
        const planPrice = planCard.querySelector('.amount').textContent;

        const originalText = button.textContent;
        button.textContent = 'Selected!';
        button.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

        alert(`You've selected the ${planName} plan for $${planPrice}/month. A representative will contact you to complete the setup.`);

        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = 'linear-gradient(135deg, #00d4ff 0%, #ff6b6b 100%)';
        }, 2000);
    });
});

// CTA buttons functionality
document.querySelectorAll('.btn-primary, .cta-button').forEach(button => {
    button.addEventListener('click', () => {
        if (button.textContent.includes('Check Availability')) {
            document.getElementById('coverage').scrollIntoView({ behavior: 'smooth' });
        } else if (button.textContent.includes('View Plans')) {
            document.getElementById('plans').scrollIntoView({ behavior: 'smooth' });
        } else if (button.textContent.includes('Get Started')) {
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Service cards hover effect enhancement
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Plan cards hover effect enhancement
document.querySelectorAll('.plan-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        if (!card.classList.contains('popular')) {
            card.style.transform = 'translateY(-15px) scale(1.02)';
        } else {
            card.style.transform = 'translateY(-15px) scale(1.07)';
        }
    });

    card.addEventListener('mouseleave', () => {
        if (!card.classList.contains('popular')) {
            card.style.transform = 'translateY(0) scale(1)';
        } else {
            card.style.transform = 'translateY(0) scale(1.05)';
        }
    });
});

// Dynamic particles animation
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: radial-gradient(circle, #00d4ff, transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
        animation: floatUp 6s linear infinite;
    `;

    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = window.innerHeight + 'px';

    document.body.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 6000);
}

// Create floating particles periodically
setInterval(createParticle, 2000);

// Add floating particle animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-bg-animation');

    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
}
)