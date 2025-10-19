// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);

// Update theme toggle button and logo
function updateThemeToggle() {
    const isDark = body.getAttribute('data-theme') === 'dark';
    themeToggle.innerHTML = isDark
        ? '<i class="fas fa-sun sun-icon"></i>'
        : '<i class="fas fa-moon moon-icon"></i>';

    // Update hero logo based on theme
    const heroLogo = document.querySelector('.hero-logo');
    if (heroLogo) {
        heroLogo.src = isDark ? 'logo.png' : 'logo.jpeg';
    }
}

updateThemeToggle();

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggle();
});

// Logo is already set in HTML, no need for upload functionality

// Email input auto-append @gmail.com on blur
const emailInput = document.getElementById('email');

emailInput.addEventListener('blur', function() {
    const value = emailInput.value.trim();
    if (value && !value.includes('@')) {
        emailInput.value = value + '@gmail.com';
    }
});

// Contact form handling with Web3Forms Email Service
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const surname = document.getElementById('surname').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validation
    if (name === '' || surname === '' || email === '' || phone === '' || message === '') {
        showNotification('Ju lutem plotësoni të gjitha fushat.', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showNotification('Ju lutem vendosni një adresë email të vlefshme.', 'error');
        return;
    }

    if (!isValidPhone(phone)) {
        showNotification('Ju lutem vendosni një numër telefoni të vlefshëm.', 'error');
        return;
    }

    // Show loading notification
    showNotification('Duke dërguar mesazhin...', 'info');

    try {
        // Get form data
        const formData = new FormData(contactForm);

        // Send to Formspree
        const response = await fetch('https://formspree.io/f/mzzjwrey', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            showNotification('Mesazhi u dërgua me sukses! Do t\'ju përgjigjemi së shpejti.', 'success');
            contactForm.reset();
        } else {
            showNotification('Ndodhi një gabim. Ju lutem provoni përsëri.', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Ndodhi një gabim në dërgimin e mesazhit. Ju lutem provoni përsëri.', 'error');
    }
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
    return phoneRegex.test(phone);
}

function showNotification(message, type) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Style the notification
    notification.style.position = 'fixed';
    notification.style.top = '100px';
    notification.style.right = '20px';
    notification.style.padding = '16px 24px';
    notification.style.borderRadius = '8px';
    notification.style.fontWeight = '600';
    notification.style.zIndex = '9999';
    notification.style.maxWidth = '400px';
    notification.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
    notification.style.animation = 'slideInRight 0.3s ease-out';

    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        notification.style.color = 'white';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
        notification.style.color = 'white';
    } else if (type === 'info') {
        notification.style.background = 'linear-gradient(135deg, #3b82f6, #2563eb)';
        notification.style.color = 'white';
    }

    // Add to body
    document.body.appendChild(notification);

    // Auto remove after 5 seconds (except for info which removes after 3 seconds)
    const duration = type === 'info' ? 3000 : 5000;
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, duration);
}

// Add notification animations to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

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

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .feature-item, .value-item, .info-item').forEach(el => {
    observer.observe(el);
});

// Hero background is static, no need for dynamic updates

// Mobile menu toggle functionality
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navMenu.classList.toggle('mobile-menu');
    navMenu.classList.toggle('active');

    // Update theme toggle in mobile menu
    const themeToggle = document.getElementById('themeToggle');
    const isDark = body.getAttribute('data-theme') === 'dark';
    themeToggle.innerHTML = isDark
        ? '<i class="fas fa-sun sun-icon"></i>'
        : '<i class="fas fa-moon moon-icon"></i>';
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('mobile-menu');
        navMenu.classList.remove('active');
    });
});

// "Kërko Sherbim" button functionality - scroll to contact section
document.querySelectorAll('.cta-button, .btn-primary').forEach(button => {
    if (button.textContent.trim() === 'Kërko Sherbim' || button.textContent.trim() === 'Kerko Sherbim') {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});

// "Më Shume Informacion" button functionality - scroll to about section
document.querySelectorAll('.btn-secondary').forEach(button => {
    if (button.textContent.trim() === 'Më Shume Informacion') {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});

// Floating Contact Button functionality
const floatingContactBtn = document.getElementById('floatingContactBtn');
const contactSection = document.getElementById('contact');

// Function to check if contact section is in view
function isContactInView() {
    if (!contactSection) return false;
    const rect = contactSection.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
}

// Function to toggle floating button visibility
function toggleFloatingButton() {
    if (window.innerWidth <= 768) { // Only on mobile
        if (isContactInView()) {
            floatingContactBtn.style.display = 'none';
        } else {
            floatingContactBtn.style.display = 'flex';
        }
    } else {
        floatingContactBtn.style.display = 'none';
    }
}

// Event listener for floating button click
floatingContactBtn.addEventListener('click', () => {
    if (contactSection) {
        contactSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
});

// Check on scroll and resize
window.addEventListener('scroll', toggleFloatingButton);
window.addEventListener('resize', toggleFloatingButton);

// Initial check
toggleFloatingButton();
