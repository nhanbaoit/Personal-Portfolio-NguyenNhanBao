import React, { useState } from 'react';

export default function Contact({ onNotify }) {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, email, subject, message } = formData;
    if (!firstName.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      onNotify('Please fill in all fields!', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      onNotify('Please enter a valid email address!', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/mykonldj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          firstName: firstName.trim(),
          email: email.trim(),
          subject: subject.trim(),
          message: message.trim(),
        }),
      });

      if (response.ok) {
        onNotify('Thank you! Your message has been sent successfully.', 'success');
        setFormData({
          firstName: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        const data = await response.json();
        if (data && data.errors) {
          onNotify(data.errors.map((err) => err.message).join(', '), 'error');
        } else {
          onNotify('Oops! There was a problem submitting your form.', 'error');
        }
      }
    } catch {
      onNotify('Oops! Network error. Please try again later.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact reveal-section is-visible" id="contact">
      <div className="contact-wrapper">
        <div className="contact-info">
          <h2 className="section-title">Contact Me.</h2>

          <p className="contact-intro">
            I am open to internship opportunities, frontend roles, backend practice projects, and
            web development collaborations.
          </p>

          <div className="contact-direct-grid">
            <a href="mailto:nhanbao.0410@gmail.com" className="contact-direct-card">
              <i className="fa-solid fa-envelope"></i>
              <strong>Email</strong>
              <span>nhanbao.0410@gmail.com</span>
            </a>

            <a
              href="https://github.com/nhanbaoit"
              target="_blank"
              rel="noreferrer"
              className="contact-direct-card"
            >
              <i className="fa-brands fa-github"></i>
              <strong>GitHub</strong>
              <span>github.com/nhanbaoit</span>
            </a>

            <a
              href="https://www.linkedin.com/in/bao-nguyen-nhan-b64251381/"
              target="_blank"
              rel="noreferrer"
              className="contact-direct-card"
            >
              <i className="fa-brands fa-linkedin"></i>
              <strong>LinkedIn</strong>
              <span>Bao Nguyen Nhan</span>
            </a>
          </div>

          <div className="contact-note">
            <p>
              Please include your <strong>Name</strong>, <strong>Email Address</strong>, and a
              short message so I can reply properly.
            </p>
          </div>
        </div>

        <div className="contact-form-container">
          <h3>Send Me A Message</h3>

          <form id="contactForm" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  placeholder="e.g. John"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="e.g. john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                id="subject"
                type="text"
                name="subject"
                placeholder="Enquiry"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Write your message here..."
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn-send" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i> Sending...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-paper-plane"></i> Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
