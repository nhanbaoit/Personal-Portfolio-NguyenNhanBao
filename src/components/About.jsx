import React, { useRef } from 'react';

export default function About({ onDownloadResume }) {
  const cardRef = useRef(null);
  const innerRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const inner = innerRef.current;
    if (!card || !inner) return;

    if (window.innerWidth <= 768) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -((y - centerY) / centerY) * 5;
    const rotateY = ((x - centerX) / centerX) * 5;

    const moveX = ((x - centerX) / centerX) * 8;
    const moveY = ((y - centerY) / centerY) * 8;

    inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(${moveX}px, ${moveY}px, 20px)`;
  };

  const handleMouseLeave = () => {
    if (innerRef.current) {
      innerRef.current.style.transform = 'rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)';
    }
  };

  return (
    <section className="about reveal-section is-visible" id="about">
      <div className="container container-about">
        <div
          className="about-image about-3d-card"
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="about-image-inner" ref={innerRef}>
            <img src="/img/about-me.jpg" alt="Bao Nguyen Nhan" />
          </div>
          <div className="orange-bar"></div>
        </div>

        <div className="about-text">
          <h2 className="section-title">About Me.</h2>

          <div className="about-desc">
            <span className="line"></span>

            <div className="desc-content">
              <p className="main-p">
                Hello! I’m <span className="text-emphasis">Bao Nguyen Nhan</span>, an IT student at Thu Duc College of Technology, focusing on full-stack web development.
              </p>

              <p className="about-paragraph">
                I build practical web applications using HTML, CSS, JavaScript, React, PHP, Laravel, MySQL, and Git/GitHub. I enjoy creating clean user interfaces, working with database-driven features, and improving web systems through stable, user-friendly functionality.
              </p>

              <p className="about-paragraph">
                I am currently improving my React, Next.js, Three.js, testing, and English communication skills while preparing for internship opportunities in web development.
              </p>

              <p className="about-paragraph">
                I am looking for an internship environment where I can work with real projects, learn from experienced developers, and contribute to reliable software products.
              </p>

              <div className="about-actions">
                <a
                  href="/files/NguyenNhanBao_Fullstack-Intern_Resume.pdf"
                  download="NguyenNhanBao_Fullstack-Intern_Resume.pdf"
                  className="btn-download"
                  id="cv-download-btn"
                  onClick={onDownloadResume}
                >
                  <i className="fa-solid fa-download"></i> Download Resume
                </a>

                <a
                  href="https://github.com/nhanbaoit"
                  target="_blank"
                  rel="noreferrer"
                  className="social-btn social-mini"
                  aria-label="GitHub"
                >
                  <i className="fa-brands fa-github"></i>
                </a>

                <a
                  href="https://www.linkedin.com/in/bao-nguyen-nhan-b64251381/"
                  target="_blank"
                  rel="noreferrer"
                  className="social-btn social-mini"
                  aria-label="LinkedIn"
                >
                  <i className="fa-brands fa-square-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
