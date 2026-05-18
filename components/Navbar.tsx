'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, FolderKanban, GraduationCap, Mail, FileText, Newspaper } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBlog } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

interface NavbarProps { activeSection: string; }

const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'about', label: 'About', icon: User },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'academic', label: 'Experience', icon: GraduationCap },
    { id: 'blog', label: 'Blog', icon: Newspaper },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const containerVariants = {
    open: {
      height: 'auto',
      opacity: 1,
      transition: {
        height: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        opacity: { duration: 0.3 },
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    },
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        height: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
        opacity: { duration: 0.2 },
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    open: { opacity: 1 },
    closed: { opacity: 0 }
  };

  const textVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    },
    closed: {
      x: -20,
      opacity: 0
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${isScrolled || isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full lg:translate-y-0'}`}>
      <div className="pt-4 md:pt-6 pb-2 md:pb-4 px-4 md:px-6">
        <div 
          className={`max-w-7xl mx-auto transition-all duration-500 rounded-xl border relative z-[60] overflow-hidden ${
            isScrolled || isMobileMenuOpen 
              ? 'bg-black/80 backdrop-blur-xl border-white/10 shadow-2xl' 
              : 'bg-black/40 backdrop-blur-md border-white/5'
          }`}
        >
          <div className="flex items-center justify-between px-6 py-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 cursor-pointer shrink-0" 
              onClick={() => {
                if (isMobileMenuOpen) setIsMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="w-9 h-9 bg-red-600 rounded-sm overflow-hidden flex items-center justify-center border border-white/10">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-full object-cover grayscale brightness-125"
                >
                  <source src="/api/media/skull" type="video/mp4" />
                </video>
              </div>
              <span className="text-[11px] font-black tracking-widest uppercase text-white">sOn4jit</span>
            </motion.div>

            <div className="hidden lg:flex items-center gap-8 ml-auto mr-10">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`text-[11px] font-bold uppercase tracking-widest transition-all relative ${
                    activeSection === item.id ? 'text-red-500' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 md:gap-4">
              <Link 
                href="/resume" 
                className="hidden lg:block px-6 py-2.5 bg-white/5 border border-white/10 hover:border-red-600/50 hover:bg-white/10 transition-all rounded-lg text-[10px] font-black uppercase tracking-widest text-white shrink-0"
              >
                Resume
              </Link>
              
              <a 
                href="https://blog.sonajit.in" 
                target="_blank" 
                rel="noopener noreferrer"
                className="lg:hidden flex items-center justify-center w-8 h-8 text-red-500 hover:text-white transition-colors"
                aria-label="Visit Blog"
              >
                <FontAwesomeIcon icon={faBlog} className="text-base" />
              </a>

              <button 
                className="lg:hidden text-white p-2 relative z-[70] flex items-center justify-center w-10 h-10 outline-none"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle navigation menu"
              >
                <div className="w-6 h-3 relative flex flex-col items-center justify-center">
                  <motion.span 
                    animate={isMobileMenuOpen ? { rotate: 45, y: 1 } : { rotate: 0, y: -3 }}
                    transition={{ duration: 0.3 }}
                    className="absolute h-[2px] w-full bg-white rounded-full"
                  />
                  <motion.span 
                    animate={isMobileMenuOpen ? { rotate: -45, y: 1 } : { rotate: 0, y: 3 }}
                    transition={{ duration: 0.3 }}
                    className="absolute h-[2px] w-full bg-white rounded-full"
                  />
                </div>
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div 
                variants={containerVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="lg:hidden overflow-hidden border-t border-white/5"
              >
                <div className="px-6 pb-8 pt-4 flex flex-col gap-4">
                  {navItems.map((item) => {
                    const isBlog = item.id === 'blog';
                    const Icon = item.icon;

                    return (
                      <motion.button
                        key={item.id}
                        variants={itemVariants}
                        onClick={() => scrollTo(item.id)}
                        className="block w-full text-left outline-none group/item"
                      >
                        <div className="flex items-center gap-6 w-full py-2">
                          <div className="w-6 flex justify-center shrink-0">
                            {isBlog ? (
                              <FontAwesomeIcon icon={faBlog} className="text-red-500 text-base" />
                            ) : (
                              <Icon className="w-5 h-5 text-red-500" />
                            )}
                          </div>
                          <motion.span 
                            variants={textVariants}
                            className={`text-xs font-black uppercase tracking-[0.2em] transition-colors ${activeSection === item.id ? 'text-white' : 'text-slate-300'}`}
                          >
                            {item.label}
                          </motion.span>
                        </div>
                      </motion.button>
                    );
                  })}
                  
                  <motion.div variants={itemVariants} className="pt-4">
                    <Link 
                      href="/resume" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full flex items-center justify-center gap-3 text-center py-4 bg-red-600 text-white font-black uppercase text-xs tracking-[0.3em] rounded-lg shadow-lg shadow-red-600/20 active:scale-[0.98] transition-transform"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Resume</span>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;