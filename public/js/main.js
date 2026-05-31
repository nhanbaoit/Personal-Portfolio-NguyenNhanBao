/* ========================================
   PORTFOLIO MAIN JAVASCRIPT
======================================== */

let ticking = false;

/* ========================================
   NOTIFICATION
======================================== */

function showNotification(message, type = "success") {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === "success" ? "#4CAF50" : "#f44336"};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        font-weight: 500;
        max-width: 320px;
        line-height: 1.5;
        transform: translateX(120%);
        opacity: 0;
        transition: transform 0.3s ease, opacity 0.3s ease;
    `;

    document.body.appendChild(notification);

    requestAnimationFrame(() => {
        notification.style.transform = "translateX(0)";
        notification.style.opacity = "1";
    });

    setTimeout(() => {
        notification.style.transform = "translateX(120%)";
        notification.style.opacity = "0";

        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/* ========================================
   PAGE LOADER
======================================== */

function initPageLoader() {
    const loader = document.getElementById("page-loader");

    if (!loader) return;

    window.addEventListener("load", () => {
        setTimeout(() => {
            loader.classList.add("hide");
        }, 650);

        setTimeout(() => {
            loader.remove();
        }, 1250);
    });
}

/* ========================================
   SAFE SMOOTH SCROLL
======================================== */

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            const href = this.getAttribute("href");

            if (!href || href === "#") return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        });
    });
}

/* ========================================
   BUTTONS
======================================== */

function initButtons() {
    const cvDownloadBtn = document.getElementById("cv-download-btn");

    if (cvDownloadBtn) {
        cvDownloadBtn.addEventListener("click", () => {
            showNotification("CV is downloading! Thank you for your interest.", "success");
        });
    }

    const contactNavBtn = document.querySelector("nav .btn-contact");

    if (contactNavBtn) {
        contactNavBtn.addEventListener("click", (e) => {
            const contactSection = document.getElementById("contact");

            if (contactSection) {
                e.preventDefault();
                contactSection.scrollIntoView({ behavior: "smooth" });
            }
        });
    }
}

/* ========================================
   CONTACT FORM
======================================== */

function initContactForm() {
    const contactForm = document.getElementById("contactForm");

    if (!contactForm) return;

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        handleFormSubmit(this);
    });
}

function handleFormSubmit(form) {
    const nameInput = form.querySelector('input[name="firstName"]');
    const emailInput = form.querySelector('input[name="email"]');
    const subjectInput = form.querySelector('input[name="subject"]');
    const messageInput = form.querySelector('textarea[name="message"]');

    const name = nameInput ? nameInput.value.trim() : "";
    const email = emailInput ? emailInput.value.trim() : "";
    const subject = subjectInput ? subjectInput.value.trim() : "";
    const message = messageInput ? messageInput.value.trim() : "";

    if (!name || !email || !subject || !message) {
        showNotification("Please fill all fields!", "error");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        showNotification("Please enter a valid email!", "error");
        return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton ? submitButton.innerHTML : "";

    if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
    }

    const formData = new FormData(form);

    fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
            Accept: "application/json",
        },
    })
        .then((response) => {
            if (response.ok) {
                showNotification("Thank you! Your message has been sent successfully.", "success");
                form.reset();
                return;
            }

            response.json().then((data) => {
                if (Object.hasOwn(data, "errors")) {
                    showNotification(
                        data.errors.map((error) => error.message).join(", "),
                        "error"
                    );
                } else {
                    showNotification("Oops! There was a problem submitting your form.", "error");
                }
            });
        })
        .catch(() => {
            showNotification("Oops! Network error. Please try again later.", "error");
        })
        .finally(() => {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
            }
        });
}

/* ========================================
   ACTIVE LINK + NAVBAR
======================================== */

function updateActiveLink() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");

    let current = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop - 220 &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
}

function updateNavbarShadow() {
    const navbar = document.querySelector(".navbar");

    if (!navbar) return;

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
}

function handleScroll() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateActiveLink();
            updateNavbarShadow();
            ticking = false;
        });

        ticking = true;
    }
}

/* ========================================
   LAZY LOAD IMAGES
======================================== */

function initLazyImages() {
    const images = document.querySelectorAll("img");

    if (!("IntersectionObserver" in window)) {
        images.forEach((img) => {
            img.style.opacity = "1";
        });
        return;
    }

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = "1";
                observer.unobserve(img);
            }
        });
    });

    images.forEach((img) => {
        img.style.opacity = "0";
        img.style.transition = "opacity 0.4s ease";
        imageObserver.observe(img);
    });
}

/* ========================================
   SCROLL REVEAL
======================================== */

function initScrollReveal() {
    const revealElements = document.querySelectorAll(".reveal-section, .reveal-item");

    if (!revealElements.length) return;

    if (!("IntersectionObserver" in window)) {
        revealElements.forEach((element) => {
            element.classList.add("is-visible");
        });
        return;
    }

    const observer = new IntersectionObserver(
        (entries, observerInstance) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observerInstance.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -80px 0px",
        }
    );

    revealElements.forEach((element) => {
        observer.observe(element);
    });
}

/* ========================================
   FORM INPUT FOCUS
======================================== */

function initFormFocusEffects() {
    const formInputs = document.querySelectorAll(".form-group input, .form-group textarea");

    formInputs.forEach((input) => {
        input.addEventListener("focus", function () {
            this.style.transform = "scale(1.01)";
        });

        input.addEventListener("blur", function () {
            this.style.transform = "scale(1)";
        });
    });
}

/* ========================================
   KEYBOARD NAVIGATION
======================================== */

function initKeyboardNavigation() {
    document.addEventListener("keydown", (e) => {
        const key = e.key.toLowerCase();

        if (key === "h") {
            const homeSection = document.getElementById("home");

            if (homeSection) {
                homeSection.scrollIntoView({ behavior: "smooth" });
            }
        }

        if (key === "c") {
            const contactSection = document.getElementById("contact");

            if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" });
            }
        }
    });
}

/* ========================================
   DARK MODE
======================================== */

function initDarkMode() {
    const themeToggleBtn = document.getElementById("theme-toggle");
    const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector("i") : null;

    const isDarkMode = localStorage.getItem("darkMode") === "true";

    if (isDarkMode) {
        document.body.classList.add("dark-mode");

        if (themeIcon) {
            themeIcon.classList.remove("fa-moon");
            themeIcon.classList.add("fa-sun");
        }
    }

    if (!themeToggleBtn) return;

    themeToggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        const isDark = document.body.classList.contains("dark-mode");
        localStorage.setItem("darkMode", isDark);

        if (!themeIcon) return;

        if (isDark) {
            themeIcon.classList.remove("fa-moon");
            themeIcon.classList.add("fa-sun");
        } else {
            themeIcon.classList.remove("fa-sun");
            themeIcon.classList.add("fa-moon");
        }
    });
}

/* ========================================
   ABOUT IMAGE 3D TILT
======================================== */

function initAboutImage3DTilt() {
    const aboutCard = document.querySelector(".about-3d-card");
    const aboutInner = document.querySelector(".about-image-inner");

    if (!aboutCard || !aboutInner) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth <= 768;

    if (reduceMotion || isMobile) return;

    aboutCard.addEventListener("mousemove", (e) => {
        const rect = aboutCard.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = -((y - centerY) / centerY) * 4;
        const rotateY = ((x - centerX) / centerX) * 4;

        const moveX = ((x - centerX) / centerX) * 6;
        const moveY = ((y - centerY) / centerY) * 6;

        aboutInner.style.transform = `
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translate3d(${moveX}px, ${moveY}px, 18px)
        `;
    });

    aboutCard.addEventListener("mouseleave", () => {
        aboutInner.style.transform =
            "rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)";
    });
}

/* ========================================
   INITIALIZATION
======================================== */

document.addEventListener("DOMContentLoaded", () => {
    initPageLoader();
    initSmoothScroll();
    initButtons();
    initContactForm();
    initLazyImages();
    initScrollReveal();
    initFormFocusEffects();
    initKeyboardNavigation();
    initDarkMode();
    initAboutImage3DTilt();

    updateActiveLink();
    updateNavbarShadow();

    window.addEventListener("scroll", handleScroll, { passive: true });

    console.log("Portfolio loaded successfully!");
    console.log(
        "%cWelcome to my Portfolio!",
        "font-size: 20px; color: #ff5722; font-weight: bold;"
    );
});