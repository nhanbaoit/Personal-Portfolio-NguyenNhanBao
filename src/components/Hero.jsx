import React from 'react';
import ThreeJsLogo from './ThreeJsLogo';

export default function Hero({ onDownloadResume, isDarkMode }) {

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const nav = document.getElementById('navbar');
    const navHeight = nav ? nav.offsetHeight : 0;
    const targetTop = el.getBoundingClientRect().top + window.scrollY - navHeight - 15;
    window.scrollTo({ top: targetTop, behavior: 'smooth' });
  };

  return (
    <section className="hero reveal-section is-visible" id="home">
      <div className="container container-hero">
        <div className="hero-content">
          <h1 className="hero-name">Bao Nguyen Nhan</h1>

          <div className="hero-intro">
            <span className="line"></span>
            <p>
              <span className="highlight">Aspiring Full-stack Developer</span>, focused on building
              practical web applications with clean interfaces, database-driven features, and
              stable user flows using{' '}
              <span className="highlight-alt">
                HTML, CSS, JavaScript, PHP, Laravel, and MySQL.
              </span>
            </p>
          </div>

          <div className="hero-tech-badges" aria-label="Main technologies">
            <span>
              <i className="fa-brands fa-html5"></i> HTML
            </span>
            <span>
              <i className="fa-brands fa-css3-alt"></i> CSS
            </span>
            <span>
              <i className="fa-brands fa-js"></i> JavaScript
            </span>
            <span>
              <i className="fa-brands fa-react"></i> React
            </span>
            <span>
              <i className="fa-brands fa-php"></i> PHP
            </span>
            <span>
              <i className="fa-brands fa-laravel"></i> Laravel
            </span>
            <span>
              <i className="fa-brands fa-github"></i> GitHub
            </span>
            <span>
              <i className="fa-solid fa-database"></i> MySQL
            </span>
            <span>
              <i className="fa-brands fa-tailwind-css"></i> TailwindCSS
            </span>
            <span>
              <ThreeJsLogo size={16} color="#ff4d00" /> Three.js
            </span>
          </div>

          <div className="hero-actions">
            <a
              href="#projects"
              className="hero-btn-primary"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('projects');
              }}
            >
              <i className="fa-solid fa-layer-group"></i> View Projects
            </a>

            <a
              href="/files/NguyenNhanBao_Fullstack-Intern_Resume.pdf"
              download="NguyenNhanBao_Fullstack-Intern_Resume.pdf"
              className="hero-btn-secondary"
              onClick={onDownloadResume}
            >
              <i className="fa-solid fa-download"></i> Download Resume
            </a>
          </div>

          <div className="social-icons">
            <a
              href="https://www.linkedin.com/in/bao-nguyen-nhan-b64251381/"
              target="_blank"
              rel="noreferrer"
              className="social-btn"
              aria-label="LinkedIn"
            >
              <i className="fa-brands fa-square-linkedin"></i>
            </a>

            <a
              href="https://github.com/nhanbaoit"
              target="_blank"
              rel="noreferrer"
              className="social-btn"
              aria-label="GitHub"
            >
              <i className="fa-brands fa-github"></i>
            </a>
          </div>

          <div className="explore-more">
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('about');
              }}
            >
              <div className="explore-icon">
                <i className="fa-solid fa-arrow-down"></i>
              </div>
              <span>About Me</span>
            </a>
          </div>
        </div>

        <div className="hero-image-wrapper">
          {/* Neobrutalist Photo Badge */}
          <div
            className="hero-view-toggle"
            style={{
              position: 'absolute',
              top: '-48px',
              right: '0',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#ff4d00',
              color: '#ffffff',
              border: `2px solid ${isDarkMode ? '#333333' : '#0a0a0a'}`,
              boxShadow: isDarkMode ? '4px 4px 0 #ff4d00' : '4px 4px 0 #0a0a0a',
              zIndex: 10,
              padding: '6px 16px',
              fontWeight: 700,
              fontSize: '0.82rem',
              lineHeight: 1,
            }}
          >
            <i className="fa-solid fa-user"></i> Photo
          </div>

          <div className="image-card">
            <img src="/img/about-me.jpg" alt="Nhan Bao" />
          </div>
          <div className="dashed-box"></div>
          <div className="doodle-arrow">
            <svg width="100" height="100" viewBox="0 0 100 100" aria-hidden="true">
              <path
                d="M10,10 Q50,50 90,10"
                fill="none"
                stroke={isDarkMode ? '#ffd4c2' : 'black'}
                strokeWidth="1.5"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
