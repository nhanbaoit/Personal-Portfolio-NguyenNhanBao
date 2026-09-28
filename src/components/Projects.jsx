import React from 'react';

const projects = [
  {
    id: 1,
    title: 'Personal Portfolio Website',
    status: 'Completed',
    isCompleted: true,
    role: 'Role: Frontend Developer',
    image: '/img/Portfolio.png',
    tags: ['React', 'Three.js', 'Tailwind', 'JavaScript', 'Responsive Design'],
    description:
      'A personal portfolio website designed to showcase my technical skills, academic projects, resume, and contact information with a responsive and interactive user interface powered by React & Three.js.',
    features: [
      'Responsive layout for desktop and mobile',
      'Dark mode, page loader, and interactive Three.js 3D scene',
      'Project showcase and Formspree contact form integration',
    ],
    github: 'https://github.com/nhanbaoit/Personal-Portfolio-NguyenNhanBao',
    live: 'https://nhanbaoit.github.io/Personal-Portfolio-NguyenNhanBao/',
  },
];

export default function Projects() {
  return (
    <section className="projects reveal-section is-visible" id="projects">
      <div className="container">
        <div className="text-center">
          <h2 className="section-title">Academic Projects.</h2>
        </div>

        <div
          className="projects-grid"
          style={{
            maxWidth: '680px',
            margin: '60px auto 0',
            gridTemplateColumns: '1fr',
          }}
        >
          {projects.map((project) => (
            <div className="project-card reveal-item is-visible" key={project.id}>
              <div className="project-img">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <i className="fa-solid fa-external-link-alt"></i>
                </div>
              </div>

              <div className="project-info">
                <div className="project-header">
                  <h3>{project.title}</h3>
                  <span className={`project-badge ${project.isCompleted ? 'completed' : ''}`}>
                    {project.status}
                  </span>
                </div>

                <p className="project-role">{project.role}</p>

                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <p>{project.description}</p>

                <ul className="project-features">
                  {project.features.map((feat, i) => (
                    <li key={i}>{feat}</li>
                  ))}
                </ul>

                <div className="project-links">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer">
                      <i className="fa-brands fa-github"></i> GitHub
                    </a>
                  )}

                  {project.live && (
                    <a href={project.live} target="_blank" rel="noreferrer">
                      <i className="fa-brands fa-chrome"></i> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
