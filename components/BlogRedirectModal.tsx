'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, Newspaper } from 'lucide-react';

interface BlogRedirectModalProps {
  externalUrl: string;
}

const BlogRedirectModal: React.FC<BlogRedirectModalProps> = ({ externalUrl }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show the modal after a short delay for professional feel
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => setIsOpen(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 p-8 md:p-10 shadow-2xl rounded-sm overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-1 h-full bg-red-600" />
            <div className="absolute top-0 right-0 p-4">
              <button 
                onClick={handleClose}
                className="text-slate-500 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-600/10 flex items-center justify-center text-red-600">
                  <Newspaper size={20} />
                </div>
                <span className="text-red-500 text-[10px] font-black uppercase tracking-[0.4em]">Redirect Advice</span>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-black text-white uppercase italic tracking-tighter leading-tight mb-4">
                Visit the official<br/>
                <span className="text-red-500">Blog Site?</span>
              </h2>
              
              <p className="text-slate-400 text-sm leading-relaxed font-medium">
                For the most up-to-date technical articles, interactive content, and a superior reading experience, i recommend visiting official blog site.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href={externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-8 py-4 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest text-center hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 group"
              >
                <span>Go to blog.sonajit.in</span>
                <ExternalLink size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              
              <button 
                onClick={handleClose}
                className="px-8 py-4 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:border-white transition-all"
              >
                Stay on Archive
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BlogRedirectModal;
