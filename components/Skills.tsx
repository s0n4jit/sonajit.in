'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  GitBranch, 
  Terminal, 
  ShieldCheck, 
  Server, 
  Database,
  Search,
  Fingerprint,
  Network,
  Code2,
  Container
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

// --- Type Definitions ---
type Proficiency = 'Beginner' | 'Intermediate' | 'Expert';

interface Skill {
  Icon: React.ElementType;
  name: string;
  category: string;
  proficiency: Proficiency;
}

// --- Data ---
const skills: Skill[] = [
  { Icon: Network, name: 'TCP/IP & Subnetting', category: 'Networking Fundamentals', proficiency: 'Intermediate' },
  { Icon: Network, name: 'Routing & Switching', category: 'Network Infrastructure', proficiency: 'Beginner' }, 
  { Icon: Server, name: 'Linux/Unix', category: 'Operating Systems', proficiency: 'Intermediate' },
  { Icon: Server, name: 'DNS & DHCP', category: 'Network Services', proficiency: 'Intermediate' },
  { Icon: Network, name: 'Wireshark', category: 'Packet Analysis', proficiency: 'Intermediate' },
  { Icon: Code2, name: 'Python', category: 'Automation & Scripting', proficiency: 'Intermediate' },
  { Icon: Code2, name: 'C/C++', category: 'Low-Level Programming', proficiency: 'Intermediate' },
  { Icon: GitBranch, name: 'Git & GitHub', category: 'Version Control', proficiency: 'Intermediate' },
  { Icon: Container, name: 'Docker', category: 'Virtualization', proficiency: 'Beginner' },
  { Icon: Database, name: 'SQL', category: 'Database Fundamentals', proficiency: 'Beginner' },
];

const duplicatedSkills = [...skills, ...skills];

// --- Badge Component ---
const ProficiencyBadge: React.FC<{ level: Proficiency }> = ({ level }) => {
  const styles = {
    Beginner: 'border-cyan-400/50 bg-cyan-950/70 text-cyan-300',
    Intermediate: 'border-yellow-400/50 bg-yellow-950/70 text-yellow-300',
    Expert: 'border-red-400/50 bg-red-950/70 text-red-300',
  };
  return (
    <div className={cn("rounded-full border px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider md:px-3 md:py-1 md:text-[10px]", styles[level])}>
      {level}
    </div>
  );
};

// --- SkillCard Component ---
const SkillCard: React.FC<{ skill: Skill }> = ({ skill }) => {
  const { Icon, name, category, proficiency } = skill;
  
  return (
    <motion.div 
      className="group relative flex h-[96px] w-[210px] flex-shrink-0 cursor-pointer flex-col justify-between overflow-hidden rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-white/10 sm:h-[105px] sm:w-[240px] md:h-[120px] md:w-[280px] md:p-5"
      whileHover={{ y: -4 }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3 md:gap-4">
          <motion.div 
            className="text-slate-400 transition-colors duration-300 group-hover:text-primary"
            whileHover={{ scale: 1.1, filter: 'drop-shadow(0 0 8px hsl(var(--primary)))' }}
          >
            <Icon className="h-6 w-6 md:h-8 md:w-8" strokeWidth={1.5} />
          </motion.div>
          <div className="min-w-0">
            <h3 className="truncate text-sm font-bold text-white md:text-base">{name}</h3>
            <p className="truncate text-[10px] text-slate-400 md:text-xs">{category}</p>
          </div>
        </div>
      </div>
      <div className="self-end">
        <ProficiencyBadge level={proficiency} />
      </div>
    </motion.div>
  );
};

// --- Main Skills Component (Infinite Loop) ---
const Skills: React.FC = () => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | undefined>(undefined);
  const isHovering = useRef(false);
  const isInteracting = useRef(false);
  const interactionTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const currentX = useRef(0);
  const mobileScrollX = useRef(0);
  const speed = useRef(0.5);

  useEffect(() => {
    const viewportEl = viewportRef.current;
    const marqueeEl = marqueeRef.current;
    if (!viewportEl || !marqueeEl) return;

    const loop = () => {
      const isMobile = window.matchMedia('(max-width: 767px)').matches;
      const contentWidth = marqueeEl.scrollWidth / 2; // Width of one set of items

      if (isMobile) {
        if (isInteracting.current) {
          marqueeEl.style.transform = '';
          mobileScrollX.current = viewportEl.scrollLeft;
          currentX.current = -mobileScrollX.current;

          if (contentWidth > 0 && viewportEl.scrollLeft >= contentWidth) {
            viewportEl.scrollLeft -= contentWidth;
            mobileScrollX.current = viewportEl.scrollLeft;
            currentX.current = -mobileScrollX.current;
          }
        } else {
          viewportEl.scrollLeft = 0;
          const targetSpeed = 0.5;
          speed.current += (targetSpeed - speed.current) * 0.1;

          currentX.current -= speed.current;

          if (contentWidth > 0 && currentX.current <= -contentWidth) {
            currentX.current += contentWidth;
          }

          marqueeEl.style.transform = `translate3d(${currentX.current}px, 0, 0)`;
        }
      } else {
        viewportEl.scrollLeft = 0;
        const targetSpeed = isHovering.current ? 0.1 : 0.5;
        speed.current += (targetSpeed - speed.current) * 0.1;

        currentX.current -= speed.current;

        if (contentWidth > 0 && currentX.current <= -contentWidth) {
          currentX.current += contentWidth;
        }

        marqueeEl.style.transform = `translate3d(${currentX.current}px, 0, 0)`;
      }

      animationFrameId.current = requestAnimationFrame(loop);
    };

    animationFrameId.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameId.current !== undefined) {
        cancelAnimationFrame(animationFrameId.current);
      }

      if (interactionTimeout.current !== undefined) {
        clearTimeout(interactionTimeout.current);
      }
    };
  }, []);

  const pauseMobileAutoScroll = () => {
    const viewportEl = viewportRef.current;
    const marqueeEl = marqueeRef.current;

    if (viewportEl && marqueeEl) {
      marqueeEl.style.transform = '';
      viewportEl.scrollLeft = Math.abs(currentX.current);
    }

    isInteracting.current = true;

    if (interactionTimeout.current !== undefined) {
      clearTimeout(interactionTimeout.current);
    }
  };

  const resumeMobileAutoScroll = () => {
    if (interactionTimeout.current !== undefined) {
      clearTimeout(interactionTimeout.current);
    }

    interactionTimeout.current = setTimeout(() => {
      isInteracting.current = false;
    }, 1200);
  };

  return (
    <section id="skills" className="py-24 bg-black relative">
       {/* Background Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-[600px] bg-red-600/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="max-w-7xl mx-auto px-6 relative z-10 text-left mb-12 md:mb-16"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-[1px] bg-red-600"></div>
          <span className="text-red-500 text-[10px] font-bold tracking-[0.5em] uppercase">Core Competencies</span>
        </div>
        <h2 className="text-5xl md:text-8xl font-black text-white mb-6 uppercase tracking-tighter italic leading-none">
          Skills<br/>
          <span className="text-red-600">Arsenal</span>
        </h2>
      </motion.div>

      <div 
        ref={viewportRef}
        className="relative w-full h-[140px] overflow-x-auto overflow-y-hidden overscroll-x-contain scroll-smooth [mask-image:linear-gradient(to_right,transparent_0%,black_8%,black_92%,transparent_100%)] [scrollbar-width:none] md:overflow-hidden md:[mask-image:linear-gradient(to_right,transparent_0%,black_15%,black_85%,transparent_100%)] [&::-webkit-scrollbar]:hidden"
        onMouseEnter={() => { isHovering.current = true; }}
        onMouseLeave={() => { isHovering.current = false; }}
        onTouchStart={pauseMobileAutoScroll}
        onTouchEnd={resumeMobileAutoScroll}
        onTouchCancel={resumeMobileAutoScroll}
        onPointerDown={pauseMobileAutoScroll}
        onPointerUp={resumeMobileAutoScroll}
        onPointerCancel={resumeMobileAutoScroll}
        onScroll={resumeMobileAutoScroll}
      >
        <div 
          ref={marqueeRef}
          className="flex w-max snap-x snap-mandatory items-center gap-5 px-6 py-4 md:absolute md:left-0 md:top-0 md:gap-8 md:px-0"
          style={{ willChange: 'transform' }}
        >
          {duplicatedSkills.map((skill, idx) => (
            <div key={`skill-${idx}`} className="snap-center">
              <SkillCard skill={skill} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
