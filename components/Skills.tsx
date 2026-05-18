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
    <div className={cn("rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider", styles[level])}>
      {level}
    </div>
  );
};

// --- SkillCard Component ---
const SkillCard: React.FC<{ skill: Skill }> = ({ skill }) => {
  const { Icon, name, category, proficiency } = skill;
  
  return (
    <motion.div 
      className="group relative flex h-[120px] w-[280px] flex-shrink-0 cursor-pointer flex-col justify-between overflow-hidden rounded-lg border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-white/10"
      whileHover={{ y: -4 }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <motion.div 
            className="text-slate-400 transition-colors duration-300 group-hover:text-primary"
            whileHover={{ scale: 1.1, filter: 'drop-shadow(0 0 8px hsl(var(--primary)))' }}
          >
            <Icon className="h-8 w-8" strokeWidth={1.5} />
          </motion.div>
          <div>
            <h3 className="font-bold text-white">{name}</h3>
            <p className="text-xs text-slate-400">{category}</p>
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
  const marqueeRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | undefined>(undefined);
  const isHovering = useRef(false);
  const currentX = useRef(0);
  const speed = useRef(0.5);

  useEffect(() => {
    const marqueeEl = marqueeRef.current;
    if (!marqueeEl) return;

    const loop = () => {
      // Adjust speed based on hover state (easing)
      const targetSpeed = isHovering.current ? 0.1 : 0.5;
      speed.current += (targetSpeed - speed.current) * 0.1;

      currentX.current -= speed.current;
      const contentWidth = marqueeEl.scrollWidth / 2; // Width of one set of items

      // Reset position to create seamless loop
      if (contentWidth > 0 && currentX.current <= -contentWidth) {
        currentX.current += contentWidth;
      }
      
      // Apply transform using 3D for GPU acceleration
      marqueeEl.style.transform = `translate3d(${currentX.current}px, 0, 0)`;
      animationFrameId.current = requestAnimationFrame(loop);
    };

    animationFrameId.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameId.current !== undefined) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

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
        className="relative w-full h-[140px] overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_15%,black_85%,transparent_100%)]"
        onMouseEnter={() => { isHovering.current = true; }}
        onMouseLeave={() => { isHovering.current = false; }}
      >
        <div 
          ref={marqueeRef}
          className="absolute left-0 top-0 flex w-max items-center gap-8 py-4"
          style={{ willChange: 'transform' }}
        >
          {duplicatedSkills.map((skill, idx) => (
            <SkillCard key={`skill-${idx}`} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;