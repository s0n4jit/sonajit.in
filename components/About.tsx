import React, { useState } from 'react';
import Image from 'next/image';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <section id="about" className="py-12 bg-black relative">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center"
      >
        <div className="relative group">
          <div className="absolute -top-6 -left-6 w-24 h-24 border-t-2 border-l-2 border-red-500/50 z-10"></div>
          <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-2 border-r-2 border-slate-800 z-10"></div>
          
          <div className="relative overflow-hidden border border-white/5 aspect-square">
            <Image 
              src="/img/heroimg/profile.jpg" 
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              onLoad={() => setIsLoaded(true)}
              className={cn(
                "grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 object-cover scale-105 group-hover:scale-100",
                !isLoaded ? "blur-md" : "blur-0"
              )}
              alt="Sonajit Rabha"
            />
            <div className="absolute inset-0 bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
          </div>
        </div>

        <div>
          <div className="text-red-500 text-[10px] font-bold tracking-[0.4em] mb-4 uppercase italic">WHO AM I</div>
          <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter mb-12 leading-none">
            About <span className="text-red-500">Me</span>
          </h2>
          <div className="space-y-8 text-slate-400 font-medium leading-loose text-lg border-l border-slate-800 pl-10">
            <p>
              Hello! I'm <span className="text-white">Sonajit</span>, a Bachelor’s student in Computer Science with a strong interest in <span className="text-white">Network Engineering</span> and <span className="text-white">Cybersecurity</span>. I’m passionate about building reliable network infrastructure and ensuring systems remain secure, efficient, and resilient. My focus is on understanding how networks operate at a deeper level and how security principles strengthen overall system design.
            </p>
            <p>
              I have hands-on experience with <span className="text-white">Linux environments</span> (Kali, Ubuntu), networking fundamentals including <span className="text-white">TCP/IP</span>, routing and switching concepts, and programming in <span className="text-white">C/C++</span> and <span className="text-white">Python</span>. I enjoy solving infrastructure and security challenges, improving network performance, and continuously sharpening my practical skills.
            </p>
            <p className="pt-2">
              <span className="text-red-500 font-black uppercase italic tracking-widest text-sm">CCNA – In Progress</span>
            </p>
          </div>
          
          <div className="mt-12 flex flex-wrap items-center gap-8">
            <a href="https://x.com/sOn4jit" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-red-500 transition-colors" aria-label="X (Twitter)">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/sonajitrabha/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-red-500 transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://github.com/son4jit" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-red-500 transition-colors" aria-label="Github">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;