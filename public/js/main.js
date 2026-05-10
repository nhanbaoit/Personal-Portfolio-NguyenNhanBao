/* ========================================
   SMOOTH SCROLL & NAVIGATION
   ======================================== */

// Smooth scroll to section when clicking nav links
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

/* ========================================
   BUTTONS FUNCTIONALITY
   ======================================== */

// Download CV Button
// Download CV Button
const cvDownloadBtn = document.getElementById('cv-download-btn');
if (cvDownloadBtn) {
    cvDownloadBtn.addEventListener('click', function () {
        // Hiện thông báo ở góc phải
        showNotification('CV is downloading! Thank you for your interest.', 'success');
    });
}

// Contact Button in Navigation
const contactNavBtn = document.querySelector('nav .contact-btn');
if (contactNavBtn) {
    contactNavBtn.addEventListener('click', function () {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });
}

// View Projects Button
const viewProjectsBtn = document.querySelector('.btn-secondary');
if (viewProjectsBtn) {
    viewProjectsBtn.addEventListener('click', function () {
        document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
    });
}

/* ========================================
   FORM HANDLING
   ======================================== */

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        handleFormSubmit(this);
    });
}

function handleFormSubmit(form) {
    // 1. Lấy giá trị để validate
    const name = form.querySelector('input[name="firstName"]').value;
    const email = form.querySelector('input[name="email"]').value;
    const subject = form.querySelector('input[name="subject"]').value;
    const message = form.querySelector('textarea[name="message"]').value;

    // 2. Validate form
    if (!name || !email || !subject || !message) {
        showNotification('Please fill all fields!', 'error');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email!', 'error');
        return;
    }

    // 3. Đóng gói dữ liệu để gửi đi
    const formData = new FormData(form);

    // 4. Gửi dữ liệu thật đến Formspree bằng Fetch API
    fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            // Nếu Formspree báo nhận thành công -> Hiện thông báo xanh của bạn
            showNotification('Thank you! Your message has been sent successfully.', 'success');
            form.reset();
        } else {
            // Nếu lỗi từ server Formspree
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    showNotification(data["errors"].map(error => error["message"]).join(", "), 'error');
                } else {
                    showNotification('Oops! There was a problem submitting your form', 'error');
                }
            })
        }
    }).catch(error => {
        // Nếu lỗi mạng
        showNotification('Oops! Network error. Please try again later.', 'error');
    });
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Style notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        font-weight: 500;
    `;

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/* ========================================
   DOWNLOAD CV
   ======================================== */

function downloadCV() {
    // Replace 'your-cv.pdf' with your actual CV file path
    const cvPath = 'your-cv.pdf';

    // Check if file exists or show alert
    const link = document.createElement('a');
    link.href = cvPath;
    link.download = 'CV-Data-Analyst.pdf';

    // If file doesn't exist, show message
    link.onerror = () => {
        showNotification('CV file not found. Please check back soon!', 'error');
    };

    // Try to download
    try {
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        showNotification('Please place your CV file (your-cv.pdf) in the same folder as this HTML file.', 'error');
    }
}

/* ========================================
   ACTIVE LINK HIGHLIGHTING
   ======================================== */

window.addEventListener('scroll', () => {
    updateActiveLink();
});

function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--accent)';
        }
    });
}

/* ========================================
   SCROLL TO TOP ANIMATION
   ======================================== */

window.addEventListener('scroll', () => {
    updateNavbarShadow();
});

function updateNavbarShadow() {
    const navbar = document.querySelector('nav');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
    }
}

/* ========================================
   LAZY LOAD IMAGES
   ======================================== */

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        imageObserver.observe(img);
    });
}

/* ========================================
   SECTION ANIMATION ON SCROLL
   ======================================== */

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    sectionObserver.observe(section);
});

/* ========================================
   CARD HOVER EFFECTS
   ======================================== */

const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });
});

const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });
});

/* ========================================
   FORM INPUT FOCUS EFFECTS
   ======================================== */

const formInputs = document.querySelectorAll('.form-input, .form-textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', function () {
        this.style.transform = 'scale(1.02)';
    });

    input.addEventListener('blur', function () {
        this.style.transform = 'scale(1)';
    });
});

/* ========================================
   KEYBOARD NAVIGATION
   ======================================== */

document.addEventListener('keydown', (e) => {
    // Press 'H' to go to Home
    if (e.key.toLowerCase() === 'h') {
        document.getElementById('hero').scrollIntoView({ behavior: 'smooth' });
    }
    // Press 'C' to go to Contact
    if (e.key.toLowerCase() === 'c') {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    }
});

/* ========================================
   DARK MODE TOGGLE (Optional)
   ======================================== */


const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

function initDarkMode() {
    // Kiểm tra trạng thái đã lưu
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        if (themeIcon) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        // Bật/tắt class dark-mode trên body
        document.body.classList.toggle('dark-mode');
        
        // Cập nhật LocalStorage
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark);
        
        // Đổi icon tương ứng
        if (isDark) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    });
}

// Khởi chạy chế độ tối nếu người dùng đã lưu trước đó
initDarkMode();

// Uncomment to enable dark mode on page load
// initDarkMode();

/* ========================================
   UTILITY FUNCTIONS
   ======================================== */

// Smooth scroll to element
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Add CSS animation
function addAnimation(element, animationName, duration = 0.6) {
    element.style.animation = `${animationName} ${duration}s ease-out`;
}

// Debounce function for better performance
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/* ========================================
   INITIALIZATION
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio loaded successfully!');

    // Initialize all features
    updateActiveLink();
    updateNavbarShadow();

    // Add welcome message
    console.log('%cWelcome to my Portfolio!', 'font-size: 20px; color: #ff5722; font-weight: bold;');
});