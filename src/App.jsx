import React, { useState, useEffect } from 'react';
import PageLoader from './components/PageLoader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Toast from './components/Toast';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  const [toast, setToast] = useState(null);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'education', 'contact'];
      const scrollY = window.scrollY;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop - 200;
          if (scrollY >= top) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleNotify = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleDownloadResume = () => {
    handleNotify('CV is downloading! Thank you for your interest.', 'success');
  };

  return (
    <>
      <PageLoader />
      <Toast toast={toast} onClose={() => setToast(null)} />
      <Navbar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        activeSection={activeSection}
      />
      <main>
        <Hero onDownloadResume={handleDownloadResume} isDarkMode={isDarkMode} />
        <About onDownloadResume={handleDownloadResume} />
        <Skills />
        <Projects />
        <Education />
        <Contact onNotify={handleNotify} />
      </main>
      <Footer />
    </>
  );
}
