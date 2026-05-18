import React, { useState, useRef, useEffect } from 'react';
import { EXPERIENCES, EDUCATION, CERTIFICATIONS } from '../constants';
import { motion } from 'framer-motion';

const ExpandableDescription: React.FC<{ text: string }> = ({ text }) => {
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
    <div className="text-slate-400 text-sm leading-relaxed font-medium mb-10 max-w-2xl border-l-2 border-white/5 pl-6 italic">
      <p
        ref={textRef}
        className={`transition-all duration-300 ${
          isExpanded ? '' : 'line-clamp-3'
        }`}
      >
        {text}
      </p>
      {shouldShowToggle && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-red-600 text-[10px] font-black uppercase tracking-widest mt-2 hover:text-white transition-colors"
        >
          {isExpanded ? 'Show Less' : 'Read more'}
        </button>
      )}
    </div>
  );
};

const Academic: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'experience' | 'education' | 'certifications'>('experience');

  return (
    <section id="academic" className="py-24 bg-black border-y border-white/5 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-red-600/5 to-transparent pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="max-w-7xl mx-auto px-6"
      >
        <div className="flex flex-col lg:flex-row gap-20 lg:gap-40">
          {/* Left Column: Titles & Navigation */}
          <div className="lg:w-[45%] shrink-0">
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-[2px] bg-red-600"></div>
                <span className="text-red-600 text-[10px] font-black uppercase tracking-[0.4em] italic">
                  Professional Journey & Academic Background.
                </span>
              </div>
              
              <h2 className="text-5xl md:text-[5.5rem] font-black uppercase italic tracking-tighter mb-12 leading-[0.8] text-white">
                Experience<br/>
                <span className="text-red-600">& Education</span>
              </h2>

              <div className="flex flex-col gap-3 max-w-xs mt-16">
                <button 
                  onClick={() => setActiveTab('experience')}
                  className={`group relative text-left px-8 py-5 font-black uppercase text-xs tracking-[0.3em] border transition-all duration-500 overflow-hidden ${
                    activeTab === 'experience' ? 'bg-white text-black border-white' : 'border-white/10 text-slate-400 hover:border-red-600/50 hover:text-white'
                  }`}
                >
                  <span className="relative z-10">[01] Professional</span>
                </button>
                <button 
                  onClick={() => setActiveTab('education')}
                  className={`group relative text-left px-8 py-5 font-black uppercase text-xs tracking-[0.3em] border transition-all duration-500 overflow-hidden ${
                    activeTab === 'education' ? 'bg-white text-black border-white' : 'border-white/10 text-slate-400 hover:border-red-600/50 hover:text-white'
                  }`}
                >
                  <span className="relative z-10">[02] Educational</span>
                </button>
                <button 
                  onClick={() => setActiveTab('certifications')}
                  className={`group relative text-left px-8 py-5 font-black uppercase text-xs tracking-[0.3em] border transition-all duration-500 overflow-hidden ${
                    activeTab === 'certifications' ? 'bg-white text-black border-white' : 'border-white/10 text-slate-400 hover:border-red-600/50 hover:text-white'
                  }`}
                >
                  <span className="relative z-10">[03] Certifications</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Content with the Red Separator Line */}
          <div className="flex-grow relative">
            {/* Vertical Red Line with Decorative Indicators */}
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-red-600">
              {/* Arrow Indicator (Top) - Signifying forward movement */}
              <div className="absolute -top-5 -left-[9px] w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[15px] border-b-red-600 animate-pulse"></div>
              
              {/* Square Block (Bottom) */}
              <div className="absolute -bottom-2 -left-[7px] w-4 h-4 bg-red-600 border-4 border-black"></div>
            </div>

            {/* Content Area */}
            <div className="pl-12 md:pl-24 py-4">
              {activeTab === 'experience' && (
                <div className="space-y-24">
                  {EXPERIENCES.map((exp, idx) => (
                    <div key={idx} className="relative group">
                      {/* Dynamic Red Block Cell for Professional Experience */}
                      <div className="absolute top-1 -left-[53px] md:-left-[101px] w-2.5 h-2.5 bg-red-600 z-20 shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
                      
                      <div className="mb-10">
                         <div className="flex items-center gap-3 mb-4">
                           <span className="text-red-600 font-mono text-[11px] font-black uppercase tracking-[0.2em]">{exp.duration}</span>
                           <div className="h-[1px] w-8 bg-white/10"></div>
                         </div>
                         <h3 className="text-4xl md:text-5xl font-black uppercase italic leading-none mb-3 text-white tracking-tighter">
                           {exp.role}
                         </h3>
                         <p className="text-lg md:text-xl text-slate-500 font-bold uppercase tracking-tight">{exp.organization}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {exp.focusAreas.map((area, i) => (
                          <div 
                            key={i} 
                            className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase border border-white/5 p-5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-red-600/20 transition-all group/item"
                          >
                            <div className="w-1 h-1 bg-red-600 group-hover/item:scale-150 transition-transform"></div>
                            {area}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'education' && (
                <div className="space-y-24">
                  {EDUCATION.map((edu, idx) => (
                    <div key={idx} className="relative group">
                      {/* Dynamic Color-coded Block Cell (Red for Pursuing, Green for Completed) */}
                      <div className={`absolute top-1 -left-[53px] md:-left-[101px] w-2.5 h-2.5 z-20 ${
                        edu.status === 'Pursuing' ? 'bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)]' : 'bg-green-600 shadow-[0_0_10px_rgba(22,163,74,0.5)]'
                      }`}></div>

                      <div className="mb-10">
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center gap-3">
                            <span className="text-red-600 font-mono text-[11px] font-black uppercase tracking-[0.2em]">{edu.duration}</span>
                            <div className="h-[1px] w-8 bg-white/10"></div>
                          </div>
                          <span className={`px-3 py-1 text-[10px] font-black uppercase text-white tracking-widest italic ${edu.status === 'Pursuing' ? 'bg-red-600' : 'bg-green-600'}`}>{edu.status}</span>
                        </div>
                        <h3 className="text-4xl md:text-5xl font-black uppercase italic leading-none mb-3 text-white tracking-tighter">
                          {edu.degree}
                        </h3>
                        <p className="text-lg md:text-xl text-slate-500 font-bold uppercase tracking-tight mb-8">{edu.institution}</p>
                        
                        {edu.description && (
                          <ExpandableDescription text={edu.description} />
                        )}

                        {edu.focusAreas && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {edu.focusAreas.map((area, i) => (
                              <div key={i} className="px-5 py-4 bg-white/[0.02] border border-white/5 text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-4 hover:border-red-600/20 transition-all group/edu">
                                <div className="w-1.5 h-1.5 bg-red-600 group-hover/edu:rotate-45 transition-transform"></div>
                                {area}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'certifications' && (
                <div className="space-y-24">
                  {CERTIFICATIONS.map((cert, idx) => (
                    <div key={idx} className="relative group">
                      {/* Dynamic Color-coded Block Cell (Red for In Progress, Green for Completed) */}
                      <div className={`absolute top-1 -left-[53px] md:-left-[101px] w-2.5 h-2.5 z-20 ${
                        cert.status === 'In Progress' ? 'bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)]' : 'bg-green-600 shadow-[0_0_10px_rgba(22,163,74,0.5)]'
                      }`}></div>

                      <div className="mb-10">
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center gap-3">
                            <span className="text-red-600 font-mono text-[11px] font-black uppercase tracking-[0.2em]">{cert.date}</span>
                            <div className="h-[1px] w-8 bg-white/10"></div>
                          </div>
                          <span className={`px-3 py-1 text-[10px] font-black uppercase text-white tracking-widest italic ${cert.status === 'In Progress' ? 'bg-red-600' : 'bg-green-600'}`}>{cert.status}</span>
                        </div>
                        <h3 className="text-4xl md:text-5xl font-black uppercase italic leading-none mb-3 text-white tracking-tighter">
                          {cert.name}
                        </h3>
                        <p className="text-lg md:text-xl text-slate-500 font-bold uppercase tracking-tight mb-8">{cert.issuer}</p>
                        
                        {cert.description && (
                          <ExpandableDescription text={cert.description} />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Academic;