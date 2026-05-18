'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, Shield, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Hero: React.FC = () => {
  const [displayText, setDisplayText] = useState('');
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const fullText = "Network Security // Pentester";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 50);

    const handleScroll = () => {
      setShowScrollIndicator(window.scrollY < 50);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollDown = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen relative flex flex-col items-start pt-40 md:pt-28 overflow-hidden">
      {/* Binary Background Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-15 overflow-hidden">
         <div className="absolute inset-0 text-[10px] font-mono leading-none break-all binary-scrolling-text select-none">
            {Array.from({ length: 40 }).map((_, i) => (
              <div key={i} className="whitespace-nowrap opacity-20">
                {"01010110011011110110100101100100001000000101001101100101011000110111010101110010011010010111010001111001".repeat(5)}
              </div>
            ))}
         </div>
         <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]"></div>
      </div>

      {/* Moving Grid Background - Mobile Only (Increased Opacity and Brightness) */}
      <div className="absolute inset-0 bg-grid-red animate-grid lg:hidden opacity-70 brightness-150 pointer-events-none"></div>

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
        {/* Left Side: Text Content */}
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-2.5 h-2.5 bg-red-600 rotate-45"></div>
            <div className="h-[1px] w-24 md:w-40 bg-white/10"></div>
          </div>

          <div className="text-base sm:text-xl md:text-2xl font-mono font-bold uppercase tracking-tight text-red-600 mb-2 ml-1 italic opacity-90">
            Hi, I'm
          </div>

          <h1 className="text-6xl md:text-[8rem] lg:text-[9.5rem] font-black leading-[0.85] mb-8 md:mb-12 tracking-tighter uppercase italic select-none text-white text-left">
            Sonajit<br/>
            <span className="text-red-600">Rabha</span>
          </h1>

          <div className="flex flex-col items-start">
            <div className="text-base sm:text-xl md:text-2xl font-mono font-bold uppercase tracking-tight text-white/70 overflow-hidden">
              {displayText}<span className="animate-pulse text-red-600">|</span>
            </div>
          </div>

          <div className="mt-8 md:mt-16 flex flex-wrap gap-6 justify-start">
            <button 
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative px-10 py-5 bg-red-600 overflow-hidden min-w-[200px]"
            >
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <span className="relative z-10 font-black uppercase text-xs tracking-[0.2em] group-hover:text-black transition-colors duration-300">View Projects</span>
            </button>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-5 border border-white/10 hover:border-red-600 hover:bg-red-600/5 transition-all font-black uppercase text-xs tracking-[0.2em] min-w-[200px]"
            >
              Lets Connect
            </button>
          </div>
        </div>

        {/* Right Side: Secure Visual Elements */}
        <div className="relative group lg:block hidden">
          <div className="relative w-full aspect-square max-w-md mx-auto">
            <div className="absolute -inset-4 border border-white/5 rounded-lg"></div>
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-red-600"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/20"></div>

            <div className="relative w-full h-full overflow-hidden bg-black/40 border border-white/10 rounded-sm">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
              >
                <source src="/api/media/skull" type="video/mp4" />
              </video>
              
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 pointer-events-none"></div>
              <div className="absolute top-4 left-4 flex gap-2">
                <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-white/20"></div>
                <div className="w-2 h-2 rounded-full bg-white/20"></div>
              </div>
              
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="w-full h-[2px] bg-red-600/30 blur-sm animate-[scan_4s_linear_infinite]"></div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 bg-black border border-red-600/30 p-3 flex items-center gap-3 backdrop-blur-md">
              <Shield className="w-5 h-5 text-red-600" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white">Network Security</span>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-black border border-white/10 p-3 flex items-center gap-3 backdrop-blur-md">
              <Target className="w-5 h-5 text-red-600" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white">CCNA</span>
            </div>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {showScrollIndicator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
            onClick={handleScrollDown}
          >
            <ChevronDown className="w-8 h-8 text-white/50 animate-bounce" />
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(1000%); }
        }
      `}</style>
    </section>
  );
};

export default Hero;