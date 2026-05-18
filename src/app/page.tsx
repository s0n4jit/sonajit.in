'use client';
import React, { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import LoadingScreen from '@/components/LoadingScreen';

const About = dynamic(() => import('@/components/About'), { loading: () => <div className="h-96" /> });
const Skills = dynamic(() => import('@/components/Skills'), { loading: () => <div className="h-96" /> });
const Projects = dynamic(() => import('@/components/Projects'), { loading: () => <div className="h-96" /> });
const Academic = dynamic(() => import('@/components/Academic'), { loading: () => <div className="h-96" /> });
const Blog = dynamic(() => import('@/components/Blog'), { loading: () => <div className="h-96" /> });
const Contact = dynamic(() => import('@/components/Contact'), { loading: () => <div className="h-96" /> });
const Footer = dynamic(() => import('@/components/Footer'));

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleCopy = (e: ClipboardEvent) => e.preventDefault();
    const handleDragStart = (e: DragEvent) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        (e.ctrlKey && (e.key === 'u' || e.key === 's' || e.key === 'p' || e.key === 'c' || e.key === 'i'))
      ) {
        e.preventDefault();
      }
    };

    window.addEventListener('contextmenu', handleContextMenu, true);
    window.addEventListener('copy', handleCopy, true);
    window.addEventListener('keydown', handleKeyDown, true);
    window.addEventListener('dragstart', handleDragStart, true);

    const timer = setTimeout(() => setIsLoading(false), 2500);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu, true);
      window.removeEventListener('copy', handleCopy, true);
      window.removeEventListener('keydown', handleKeyDown, true);
      window.removeEventListener('dragstart', handleDragStart, true);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (isModalOpen || isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isModalOpen, isLoading]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'academic', 'blog', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      onContextMenu={(e) => e.preventDefault()}
      className="relative min-h-screen bg-[#050505] text-white selection:bg-red-600 selection:text-white overflow-x-hidden"
    >
      <LoadingScreen />
      
      {!isModalOpen && <Navbar activeSection={activeSection} />}

      <main className="relative flex flex-col">
        <Hero />
        <Suspense fallback={<div className="h-screen" />}>
          <About />
          <Skills />
          <Projects isFullArchive={false} onModalStateChange={setIsModalOpen} />
          <Academic />
          <Blog />
          <Contact />
        </Suspense>
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default App;
