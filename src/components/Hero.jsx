import React, { useState } from 'react';
import ThreeHeroScene from './ThreeHeroScene';

export default function Hero({ onDownloadResume, isDarkMode }) {
  const [heroView, setHeroView] = useState('photo'); // 'photo' | 'three'

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
              <i className="fa-solid fa-cube" style={{ color: '#ff4d00' }}></i> Three.js
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
          {/* Neobrutalist View Mode Switcher */}
          <div
            className="hero-view-toggle"
            style={{
              position: 'absolute',
              top: '-50px',
              right: '0',
              display: 'inline-flex',
              background: isDarkMode ? '#1e1e1e' : '#ffffff',
              border: `2px solid ${isDarkMode ? '#333333' : '#0a0a0a'}`,
              boxShadow: isDarkMode ? '4px 4px 0 #ff4d00' : '4px 4px 0 #0a0a0a',
              zIndex: 10,
              padding: '3px',
              gap: '4px',
            }}
          >
            <button
              onClick={() => setHeroView('photo')}
              style={{
                background: heroView === 'photo' ? '#ff4d00' : 'transparent',
                color: heroView === 'photo' ? '#ffffff' : 'inherit',
                border: 'none',
                padding: '6px 14px',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer',
                transition: '0.2s ease',
              }}
            >
              <i className="fa-solid fa-user" style={{ marginRight: '6px' }}></i> Photo
            </button>
            <button
              onClick={() => setHeroView('three')}
              style={{
                background: heroView === 'three' ? '#ff4d00' : 'transparent',
                color: heroView === 'three' ? '#ffffff' : 'inherit',
                border: 'none',
                padding: '6px 14px',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer',
                transition: '0.2s ease',
              }}
            >
              <i className="fa-solid fa-cube" style={{ marginRight: '6px' }}></i> 3D Three.js
            </button>
          </div>

          {heroView === 'photo' ? (
            <>
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
            </>
          ) : (
            <div
              className="three-card-container"
              style={{
                width: '380px',
                height: '420px',
                maxWidth: '100%',
                background: isDarkMode ? '#1a1a1a' : '#fcfcfc',
                border: `3px solid ${isDarkMode ? '#444444' : '#0a0a0a'}`,
                boxShadow: isDarkMode ? '8px 8px 0 #ff4d00' : '8px 8px 0 #0a0a0a',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              <ThreeHeroScene isDarkMode={isDarkMode} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
