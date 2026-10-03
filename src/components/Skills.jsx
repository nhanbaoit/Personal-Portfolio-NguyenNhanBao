import React from 'react';
import ThreeJsLogo from './ThreeJsLogo';

export default function Skills() {
  return (
    <section id="skills" className="skills-neo-section reveal-section is-visible">
      <div className="skills-neo-bg"></div>

      <div className="skills-neo-container">
        <div className="skills-neo-heading">
          <div className="skills-neo-label">
            <h2>SKILLS</h2>
          </div>
        </div>

        <div className="skills-neo-grid">
          {/* Frontend */}
          <div className="skills-neo-card reveal-item is-visible">
            <div className="skills-card-accent accent-cyan"></div>

            <div className="skills-neo-card-header">
              <i className="fa-brands fa-react skill-main-icon icon-cyan"></i>
              <h3>Frontend</h3>
            </div>

            <div className="skills-card-line"></div>

            <div className="skills-tags">
              <span className="skill-tag">
                <i className="fa-brands fa-html5"></i> HTML
              </span>
              <span className="skill-tag">
                <i className="fa-brands fa-css3-alt"></i> CSS
              </span>
              <span className="skill-tag">
                <i className="fa-brands fa-js"></i> JavaScript
              </span>
              <span className="skill-tag">
                <i className="fa-brands fa-react"></i> React
              </span>
              <span className="skill-tag">
                <ThreeJsLogo size={14} style={{ marginRight: '6px' }} /> Three.js
              </span>
              <span className="skill-tag">
                <i className="fa-brands fa-bootstrap"></i> Bootstrap
              </span>
              <span className="skill-tag">
                <i className="fa-brands fa-tailwind-css"></i> TailwindCSS
              </span>
              <span className="skill-tag">
                <i className="fa-solid fa-mobile-screen-button"></i> Responsive UI
              </span>
            </div>
          </div>

          {/* Backend & Database */}
          <div className="skills-neo-card reveal-item is-visible">
            <div className="skills-card-accent accent-yellow"></div>

            <div className="skills-neo-card-header">
              <i className="fa-solid fa-code skill-main-icon icon-yellow"></i>
              <h3>Backend & Database</h3>
            </div>

            <div className="skills-card-line"></div>

            <div className="skills-tags">
              <span className="skill-tag">
                <i className="fa-brands fa-php"></i> PHP
              </span>
              <span className="skill-tag">
                <i className="fa-brands fa-laravel"></i> Laravel
              </span>
              <span className="skill-tag">
                <i className="fa-solid fa-database"></i> MySQL
              </span>
              <span className="skill-tag">
                <i className="fa-solid fa-table"></i> SQL
              </span>
              <span className="skill-tag">
                <i className="fa-solid fa-server"></i> CRUD
              </span>
              <span className="skill-tag">
                <i className="fa-solid fa-shield-halved"></i> Authentication
              </span>
              <span className="skill-tag">
                <i className="fa-solid fa-cart-shopping"></i> E-commerce Logic
              </span>
            </div>
          </div>

          {/* Tools & QA */}
          <div className="skills-neo-card reveal-item is-visible">
            <div className="skills-card-accent accent-pink"></div>

            <div className="skills-neo-card-header">
              <i className="fa-solid fa-code-branch skill-main-icon icon-pink"></i>
              <h3>Tools & QA</h3>
            </div>

            <div className="skills-card-line"></div>

            <div className="skills-tags">
              <span className="skill-tag">
                <i className="fa-brands fa-git-alt"></i> Git
              </span>
              <span className="skill-tag">
                <i className="fa-brands fa-github"></i> GitHub
              </span>
              <span className="skill-tag">
                <i className="fa-solid fa-paper-plane"></i> Postman
              </span>
              <span className="skill-tag">
                <i className="fa-brands fa-docker"></i> Docker
              </span>
              <span className="skill-tag">
                <i className="fa-solid fa-bug"></i> Manual Testing
              </span>
              <span className="skill-tag">
                <i className="fa-brands fa-java"></i> Java
              </span>
              <span className="skill-tag">
                <i className="fa-solid fa-code"></i> C#
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
