import React from 'react';

export default function Education() {
  return (
    <section className="education-languages reveal-section is-visible" id="education">
      <div className="container">
        <div className="text-center">
          <h2 className="section-title">Education & Languages.</h2>
        </div>

        <div className="education-languages-grid">
          <div className="info-card reveal-item is-visible">
            <h3>Thu Duc College of Technology</h3>
            <p>
              <strong>Major:</strong> Information Technology
            </p>
            <p>
              I am building a foundation in web development, databases, object-oriented programming,
              data structures, and practical software development through academic projects.
            </p>
            <span className="info-badge">
              <i className="fa-solid fa-graduation-cap"></i> Expected completion: 2027
            </span>
          </div>

          <div className="info-card reveal-item is-visible">
            <h3>Languages</h3>
            <p>
              I am improving my English communication skills to prepare for internship interviews,
              documentation reading, and teamwork in software projects.
            </p>

            <div className="language-list">
              <div className="language-item">
                <span>Vietnamese</span>
                <span className="language-level">Native</span>
              </div>

              <div className="language-item">
                <span>English</span>
                <span className="language-level">Pre-Intermediate / Improving</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
