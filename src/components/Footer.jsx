import React from 'react';

export default function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const nav = document.getElementById('navbar');
    const navHeight = nav ? nav.offsetHeight : 0;
    const targetTop = el.getBoundingClientRect().top + window.scrollY - navHeight - 15;
    window.scrollTo({ top: targetTop, behavior: 'smooth' });
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container footer-container">
        <p className="copyright">
          &copy; {new Date().getFullYear()} All rights reserved by <strong>Bao Nguyen Nhan</strong>
        </p>

        <div className="footer-right">
          <div className="footer-links">
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('about');
              }}
            >
              About
            </a>
            <a
              href="#skills"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('skills');
              }}
            >
              Skills
            </a>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('projects');
              }}
            >
              Projects
            </a>
            <a
              href="#education"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('education');
              }}
            >
              Education
            </a>
          </div>

          <a
            href="#home"
            className="scroll-top"
            aria-label="Scroll to top"
            onClick={scrollToTop}
          >
            <i className="fa-solid fa-arrow-up"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
