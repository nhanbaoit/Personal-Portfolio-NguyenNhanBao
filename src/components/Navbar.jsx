import React, { useState, useEffect } from 'react';

export default function Navbar({ isDarkMode, toggleDarkMode, activeSection }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (!element) return;

    const nav = document.getElementById('navbar');
    const navHeight = nav ? nav.offsetHeight : 0;
    const targetTop = element.getBoundingClientRect().top + window.scrollY - navHeight - 15;

    window.scrollTo({
      top: targetTop,
      behavior: 'smooth',
    });
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="nav-container">
        <a
          href="#home"
          className="logo"
          aria-label="Go to home section"
          onClick={(e) => scrollToSection(e, 'home')}
        >
          <span className="logo-circle">B</span>
          <span className="logo-text">Bao Nguyen Nhan</span>
        </a>

        <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <li>
            <a
              href="#home"
              className={activeSection === 'home' ? 'active' : ''}
              onClick={(e) => scrollToSection(e, 'home')}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#about"
              className={activeSection === 'about' ? 'active' : ''}
              onClick={(e) => scrollToSection(e, 'about')}
            >
              About Me
            </a>
          </li>
          <li>
            <a
              href="#skills"
              className={activeSection === 'skills' ? 'active' : ''}
              onClick={(e) => scrollToSection(e, 'skills')}
            >
              Skills
            </a>
          </li>
          <li>
            <a
              href="#projects"
              className={activeSection === 'projects' ? 'active' : ''}
              onClick={(e) => scrollToSection(e, 'projects')}
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="#education"
              className={activeSection === 'education' ? 'active' : ''}
              onClick={(e) => scrollToSection(e, 'education')}
            >
              Education
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="btn-contact"
              onClick={(e) => scrollToSection(e, 'contact')}
            >
              Contact Me
            </a>
          </li>
          <li
            className="theme-toggle"
            id="theme-toggle"
            style={{ cursor: 'pointer' }}
            aria-label="Toggle dark mode"
            onClick={toggleDarkMode}
          >
            <i className={isDarkMode ? 'fas fa-sun' : 'fas fa-moon'} />
          </li>
        </ul>

        {/* Mobile Hamburger Button */}
        <button
          className="mobile-toggle-btn md:hidden"
          style={{
            background: 'transparent',
            border: 'none',
            fontSize: '1.4rem',
            cursor: 'pointer',
            color: 'inherit',
          }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <i className={mobileMenuOpen ? 'fas fa-xmark' : 'fas fa-bars'} />
        </button>
      </div>
    </nav>
  );
}
