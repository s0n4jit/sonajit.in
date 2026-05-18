'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ProjectData } from '../types';
import { LOCAL_PROJECT_FILES } from '../constants';
import { getProjectReadme } from '@/src/app/actions/github';
import { cn } from '@/src/lib/utils';
import { motion } from 'framer-motion';

const ExpandableText: React.FC<{ text: string }> = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowToggle, setShouldShowToggle] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const { scrollHeight, offsetHeight } = textRef.current;
      setShouldShowToggle(scrollHeight > offsetHeight + 2);
    }
  }, [text]);

  return (
    <div className="mb-4">
      <p 
        ref={textRef}
        className={`text-slate-400 text-xs font-medium leading-relaxed max-w-sm transition-all duration-300 ${
          isExpanded ? '' : 'line-clamp-3'
        }`}
      >
        {text}
      </p>
      {shouldShowToggle && (
        <button 
          onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
          className="text-red-500 text-[9px] font-black uppercase tracking-widest mt-1.5 hover:text-white transition-colors"
        >
          {isExpanded ? 'Show Less' : 'Read more'}
        </button>
      )}
    </div>
  );
};

interface ProjectsProps {
  isFullArchive?: boolean;
  onModalStateChange?: (isModalOpen: boolean) => void;
}

const ProjectModal: React.FC<{ project: ProjectData; onClose: () => void }> = ({ project, onClose }) => {
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDoc = async () => {
      setLoading(true);
      setError(null);
      try {
        const { html, error: fetchError } = await getProjectReadme(project.githubLink);
        
        if (fetchError) {
          throw new Error(fetchError);
        }
        
        setHtmlContent(html);
      } catch (err: any) {
        setError(err.message || "Could not synchronize with remote documentation.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoc();
  }, [project.githubLink]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 animate-in fade-in zoom-in duration-300">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={onClose}></div>
      <div className="relative w-full max-w-5xl bg-[#080808] border border-white/10 h-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl rounded-sm">
        <div className="flex justify-between items-center px-6 py-4 border-b border-white/5 bg-[#0a0a0a] shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-6 bg-red-500"></div>
            <div>
              <span className="text-red-500 text-[9px] font-black uppercase tracking-[0.3em] block leading-none mb-1">Documentation Feed</span>
              <h3 className="text-sm font-bold text-white uppercase tracking-tight">{project.title}</h3>
            </div>
          </div>
          <button type="button" aria-label="Close documentation modal" onClick={onClose} className="group p-2 text-slate-500 hover:text-white transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="flex-grow overflow-y-auto p-6 md:p-14 font-sans bg-[#050505] scrollbar-thin scrollbar-thumb-red-500">
          {loading ? (
             <div className="space-y-8 max-w-3xl animate-pulse"><div className="h-12 bg-white/5 w-1/2"></div><div className="h-4 bg-white/5 w-full"></div><div className="h-4 bg-white/5 w-3/4"></div></div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-white font-bold uppercase text-xs tracking-[0.2em] mb-3">Sync Error</p>
              <p className="text-slate-400 text-sm max-w-sm">{error}</p>
            </div>
          ) : (
            <div className="markdown-body max-w-none" dangerouslySetInnerHTML={{ __html: htmlContent }} />
          )}
        </div>
        <div className="p-6 border-t border-white/5 bg-[#0a0a0a] flex flex-wrap gap-4 shrink-0">
          <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex-1 md:flex-none text-center px-10 py-4 bg-red-500 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all">Github Repo</a>
          {project.demoLink && <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="flex-1 md:flex-none text-center px-10 py-4 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red-500 transition-all">Live Demo</a>}
        </div>
      </div>
    </div>
  );
};

const ProjectCardImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Image 
      src={src} 
      alt={alt} 
      fill 
      sizes="(max-width: 768px) 100vw, 50vw"
      onLoad={() => setIsLoaded(true)}
      className={cn(
        "object-cover grayscale transition-all duration-700",
        !isLoaded ? "blur-md scale-105 opacity-40" : "blur-0 scale-100 opacity-100 group-hover:grayscale-0 group-hover:scale-105"
      )} 
    />
  );
};

const Projects: React.FC<ProjectsProps> = ({ isFullArchive = false, onModalStateChange }) => {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const openModal = (project: ProjectData) => {
    setSelectedProject(project);
    onModalStateChange?.(true);
  };

  const closeModal = () => {
    setSelectedProject(null);
    onModalStateChange?.(false);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError(null);
      try {
        const projectDataPromises = LOCAL_PROJECT_FILES.map(async (filename) => {
          if (!filename) return null;
          try {
            const res = await fetch(`/projects/${filename}`);
            if (!res.ok) {
               return null;
            }
            const text = await res.text();
            const match = text.match(/^---\s*([\s\S]*?)\s*---/);
            const yamlStr = match ? match[1] : '';
            const metadata: any = {};
            yamlStr.split('\n').forEach(line => {
              const parts = line.split(':');
              if (parts.length >= 2) {
                const key = parts[0].trim();
                let value = parts.slice(1).join(':').trim().replace(/^"(.*)"$/, '$1');
                if (value.startsWith('[') && value.endsWith(']')) {
                  metadata[key] = value.slice(1, -1).split(',').map(s => s.trim().replace(/^"(.*)"$/, '$1'));
                } else { metadata[key] = value; }
              }
            });
            return {
              title: metadata.title || filename,
              description: metadata.description || "",
              tags: metadata.tags || [],
              githubLink: metadata.githubLink || "#",
              demoLink: metadata.demoLink,
              image: metadata.image || `/img/placeholder.png`,
              date: metadata.date || "2024-01-01"
            } as ProjectData;
          } catch (e: any) { 
            return null;
          }
        });

        const results = await Promise.all(projectDataPromises);
        const validProjects = results.filter((p): p is ProjectData => p !== null);
        
        const sorted = validProjects.sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());
        setProjects(sorted);
      } catch (err: any) { 
        // Silent
      } finally { setLoading(false); }
    };
    fetchProjects();
  }, []);

  const displayedProjects = isFullArchive ? projects : projects.slice(0, 2);

  return (
    <section id="projects" className={`${isFullArchive ? '' : 'py-12'} bg-black overflow-hidden relative`}>
      {!isFullArchive && (
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="max-w-7xl mx-auto px-6 mb-20 relative z-10"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-[1px] bg-red-500"></div>
            <span className="text-red-500 text-[10px] font-bold tracking-[0.5em] uppercase">projects deployments</span>
          </div>
          <h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-none text-white">PROJECT<br/><span className="text-red-500">ARCHIVE.</span></h2>
        </motion.div>
      )}

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="max-w-7xl mx-auto px-6 relative z-10"
      >
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[1, 2, 3, 4].map(i => <div key={i} className="aspect-video bg-white/5 animate-pulse border border-white/5"></div>)}
          </div>
        ) : error ? (
            <div className="text-center p-12 bg-red-900/10 border border-red-600/30">
                <h3 className="font-bold text-red-500 mb-2 uppercase tracking-widest text-sm">Deployment Sync Error</h3>
                <p className="text-slate-400 text-xs">{error}</p>
            </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-24 px-6 border border-white/5 bg-white/[0.02]">
            <h3 className="text-2xl md:text-3xl font-black text-white mb-4 uppercase italic tracking-tighter">No Projects Currently<br/><span className="text-red-500">Deployed.</span></h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed italic">
              The archive is currently undergoing maintenance or updates. Please check back later for new security research and implementations.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            {displayedProjects.map((project, idx) => (
              <div key={idx} className="group relative">
                <div className="relative aspect-[16/10] overflow-hidden border border-white/5 bg-[#080808]">
                  <ProjectCardImage 
                    src={project.image!} 
                    alt={project.title} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80"></div>
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-[8px] font-black text-slate-400 border border-white/10 px-2 py-1 uppercase tracking-widest">{tag}</span>
                      ))}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-white uppercase italic mb-2 leading-none">{project.title}</h3>
                    <ExpandableText text={project.description} />
                  </div>
                </div>
                <div className="mt-8 flex items-center gap-6">
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors">Repo</a>
                  {project.demoLink && <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors">Live</a>}
                  <button onClick={() => openModal(project)} className="ml-auto text-red-500 text-[10px] font-black uppercase tracking-[0.2em] hover:text-white transition-colors underline underline-offset-8 decoration-red-500/30">Read More</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
       {!isFullArchive && projects.length > 0 && (
        <div className="mt-24 flex justify-center">
          <Link
            href="/projects"
            className="group relative px-12 py-5 border border-white/10 hover:border-red-500 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-red-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <span className="relative z-10 font-black uppercase text-[10px] tracking-[0.4em] text-white">
              View Full Archive
            </span>
          </Link>
        </div>
      )}
      {selectedProject && <ProjectModal project={selectedProject} onClose={closeModal} />}
    </section>
  );
};

export default Projects;
