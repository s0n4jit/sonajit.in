'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Projects from '@/components/Projects';
import Footer from '@/components/Footer';

const ProjectsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu, true);
      window.removeEventListener('copy', handleCopy, true);
      window.removeEventListener('keydown', handleKeyDown, true);
      window.removeEventListener('dragstart', handleDragStart, true);
    };
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isModalOpen]);


  return (
    <div 
      onContextMenu={(e) => e.preventDefault()}
      className="relative min-h-screen bg-black text-white selection:bg-red-600 selection:text-white overflow-x-hidden"
    >
        <main className="relative pt-20 pb-20">
            <div className="max-w-7xl mx-auto px-6 mb-12">
              <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">
                  <span>Home</span>
                  <span>/</span>
                  <span className="text-white">Projects</span>
              </Link>
            </div>

            <Projects isFullArchive onModalStateChange={setIsModalOpen} />
        </main>
      
        <Footer />
    </div>
  );
};

export default ProjectsPage;