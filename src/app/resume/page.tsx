'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Download, 
  Linkedin, 
  Github, 
  Mail,
  Loader2
} from 'lucide-react';
import { SiTryhackme } from 'react-icons/si';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '@/components/Footer';

const ResumeHeader = () => (
  <header className="mb-4 md:mb-6">
    <div className="text-center">
        <h1 className="text-2xl sm:text-4xl font-bold tracking-wider text-gray-900">SONAJIT RABHA</h1>
        <p className="text-xs sm:text-base text-gray-700 mt-1">Networking & Cybersecurity</p>
    </div>
    <div className="mt-4 flex justify-center items-center flex-wrap gap-x-4 gap-y-2 text-xs sm:text-sm text-gray-600">
        <a href="mailto:hello@sonajit.in" className="flex items-center gap-2 hover:text-red-600 transition-colors">
            <Mail size={14} />
            <span>hello@sonajit.in</span>
        </a>
        <Link href="https://www.linkedin.com/in/sonajitrabha/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-red-600 transition-colors">
            <Linkedin size={14} />
            <span>sonajitrabha</span>
        </Link>
         <Link href="https://github.com/son4jit" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-red-600 transition-colors">
            <Github size={14} />
            <span>son4jit</span>
        </Link>
         <Link href="https://tryhackme.com/p/sOn4jit" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-red-600 transition-colors">
            <SiTryhackme size={14} />
            <span>sOn4jit</span>
        </Link>
    </div>
  </header>
);

const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <section className="mb-4 md:mb-5">
    <h2 className="text-xs sm:text-sm font-bold tracking-widest text-gray-800 border-b-2 border-gray-300 pb-1 mb-2 md:mb-3 uppercase">{title}</h2>
    {children}
  </section>
);

const ExperienceEntry = () => (
  <div className="mb-3 md:mb-4">
    <div className="flex flex-col sm:flex-row justify-between sm:items-start">
      <div className="mb-1 sm:mb-0">
        <h3 className="text-sm sm:text-base font-bold text-gray-900">Cybersecurity Intern</h3>
        <p className="text-xs sm:text-sm italic text-gray-600">ENCODERSPRO Pvt. Ltd.</p>
      </div>
      <div className="text-left sm:text-right text-xs sm:text-sm text-gray-600 flex-shrink-0 sm:ml-4">
        <p>June 2025 – July 2025</p>
        <p className="italic">Remote</p>
      </div>
    </div>
    <ul className="list-disc pl-5 mt-1 md:mt-2 space-y-1 text-xs sm:text-sm text-gray-700">
      <li>Performed vulnerability scanning and web application testing using Nmap and Burp Suite</li>
      <li>Analyzed security logs and network traffic using SIEM tools and Wireshark</li>
      <li>Assisted in incident investigation and documentation</li>
      <li>Created structured technical reports with findings and remediation steps</li>
    </ul>
  </div>
);

const EducationEntry = () => (
    <div className="flex flex-col sm:flex-row justify-between sm:items-start">
      <div className="mb-1 sm:mb-0">
        <h3 className="text-sm sm:text-base font-bold text-gray-900">Bachelor of Science in Computer Science (4th Semester)</h3>
        <p className="text-xs sm:text-sm italic text-gray-600">Pandit Deendayal Upadhyaya Adarsha Mahavidyalaya</p>
        <p className="text-xs sm:text-sm text-gray-600 mt-1">Sem II: 6.19 CGPA</p>
      </div>
      <p className="text-left sm:text-right text-xs sm:text-sm text-gray-600 flex-shrink-0 sm:ml-4 mt-1 sm:mt-0">2024 – 2027</p>
    </div>
);

const SkillsSection = () => (
    <div className="space-y-1.5 md:space-y-2 text-xs sm:text-sm text-gray-700">
        <p><strong className="font-bold text-gray-900">Core Security:</strong> OWASP Top 10, Network Security, VAPT, Phishing Analysis, TCP/IP, HTTP/HTTPS</p>
        <p><strong className="font-bold text-gray-900">Operating Systems:</strong> Linux (Kali, Parrot, Arch), Windows, Ubuntu Server</p>
        <p><strong className="font-bold text-gray-900">Security Tools:</strong> Nmap, Burp Suite, Metasploit, Wireshark, Hydra, Shodan</p>
        <p><strong className="font-bold text-gray-900">Penetration Testing:</strong> Web, Network, Enumeration, Basic Source Code Review</p>
        <p><strong className="font-bold text-gray-900">Programming & Scripting:</strong> C, C++, Python</p>
    </div>
);

const ProjectEntry = ({ title, tech, date, children, githubLink }: { title: string, tech: string, date: string, children: React.ReactNode, githubLink?: string}) => (
    <div className="mb-2.5 md:mb-3">
        <div className="flex flex-col sm:flex-row justify-between sm:items-start">
            <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-0.5 sm:mb-0">
                {title} <span className="font-normal italic text-gray-600">[{tech}]</span>
                {githubLink && (
                    <Link href={githubLink} target="_blank" rel="noopener noreferrer" className="inline-block ml-1 text-gray-600 hover:text-red-600 transition-colors">
                         <svg className="w-3 h-3 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </Link>
                )}
            </h3>
            <p className="text-left sm:text-right text-xs sm:text-sm text-gray-600 flex-shrink-0 sm:ml-4">{date}</p>
        </div>
        <div className="pl-5 text-xs sm:text-sm text-gray-700">
            {children}
        </div>
    </div>
);

const AchievementEntry = ({ title, children, link }: { title: string, children: React.ReactNode, link?: string }) => (
    <div className="mb-2.5 md:mb-3">
        <h3 className="text-sm sm:text-base font-bold text-gray-900">
            {title}
            {link && (
                <Link href={link} target="_blank" rel="noopener noreferrer" className="inline-block ml-1 text-gray-600 hover:text-red-600 transition-colors">
                     <svg className="w-3 h-3 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </Link>
            )}
        </h3>
        <div className="pl-5 text-xs sm:text-sm text-gray-700">
            {children}
        </div>
    </div>
);

export default function ResumePage() {
  const [isDownloading, setIsDownloading] = useState(false);

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

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isDownloading) return;

    setIsDownloading(true);
    
    // Create a temporary link and trigger it
    const link = document.createElement('a');
    link.href = '/resume/resume.pdf';
    link.download = 'Sonajit_Rabha_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Simulate duration for visual feedback
    setTimeout(() => {
      setIsDownloading(false);
    }, 2000);
  };

  return (
    <div 
      onContextMenu={(e) => e.preventDefault()}
      className="relative min-h-screen bg-black text-white selection:bg-red-600 selection:text-white overflow-x-hidden"
    >
      <main className="relative pt-6 md:pt-16 pb-12 md:pb-20">
        <div className="max-w-4xl mx-auto px-6 mb-6 md:mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors group">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Portfolio</span>
          </Link>
          
          <button 
            onClick={handleDownload}
            disabled={isDownloading}
            className="hidden md:flex items-center gap-3 px-8 py-4 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all rounded-sm shadow-xl shadow-red-600/10 disabled:opacity-80 disabled:cursor-not-allowed group relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {isDownloading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex items-center gap-3"
                >
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Downloading...</span>
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex items-center gap-3"
                >
                  <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                  <span>Download CV</span>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Floating Download Button for Mobile */}
        <div className="md:hidden fixed bottom-6 right-6 z-[100]">
          <button 
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex items-center justify-center w-14 h-14 bg-red-600 text-white rounded-full shadow-2xl shadow-red-600/40 active:scale-95 transition-transform disabled:opacity-80"
            aria-label="Download CV"
          >
            {isDownloading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <Download className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Resume Content (Code-based) */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 print:px-0">
          <div className="bg-white rounded-sm shadow-2xl p-5 sm:p-10 md:p-16 text-gray-900 overflow-hidden">
            <ResumeHeader />

            <Section title="Professional Summary">
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                Entry-level Network Administrator with hands-on experience in network configuration, troubleshooting, system administration, and basic network security implementation. Familiar with routing and switching concepts, TCP/IP, DNS, DHCP, firewall configuration, and network monitoring tools such as Wireshark and Nmap. Strong understanding of maintaining secure, stable, and efficient network infrastructure. Also interested in cybersecurity & continuously developing skills in network defense and threat analysis.
              </p>
            </Section>
            
            <Section title="Experience">
                <ExperienceEntry />
            </Section>
            
            <Section title="Education">
                <EducationEntry />
            </Section>

            <Section title="Skills">
                <SkillsSection />
            </Section>

            <Section title="Certificates">
                <div className="space-y-1.5 md:space-y-2 text-xs sm:text-sm text-gray-700">
                    <p><strong className="font-bold text-gray-900">CCNA (200-301):</strong> In Progress</p>
                    <p><strong className="font-bold text-gray-900">CRTA (Certified Red Team Analyst):</strong> In Progress</p>
                </div>
            </Section>

            <Section title="Projects">
                <ProjectEntry title="Meta-Wiper" tech="Python" date="06/2025 – Present" githubLink="https://github.com/son4jit/metawiper">
                    <ul className="list-disc mt-1 space-y-1">
                        <li>Built a custom data-wiping tool implementing multi-pass overwrite algorithms for forensic anti-recovery research</li>
                    </ul>
                </ProjectEntry>
            </Section>

            <Section title="Achievements">
                <AchievementEntry title="TryHackMe Global Ranking: Top 8%">
                     <ul className="list-disc mt-1 space-y-1">
                        <li>Ranked in the Top 8% on TryHackMe globally, demonstrating strong practical cybersecurity and penetration testing skills.</li>
                    </ul>
                </AchievementEntry>
                <AchievementEntry title="TryHackMe Pre Security Certificate" link="https://tryhackme.com/certificate/THM-FQBLYA24ZE">
                     <ul className="list-disc mt-1 space-y-1">
                        <li>Learned how technology works from the ground up, from computer fundamentals and basic coding to networking, web technologies, and cybersecurity concepts, including attacks and defenses.</li>
                    </ul>
                </AchievementEntry>
                <AchievementEntry title="TryHackMe Advent of Cyber 2025 Completion" link="https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-MJ2KANEC8W.pdf">
                     <ul className="list-disc mt-1 space-y-1">
                        <li>Successfully completed all 24 days of TryHackMe Advent of Cyber 2025, covering real-world topics including malware analysis, SOC alert triage, web attack forensics, and incident response.</li>
                    </ul>
                </AchievementEntry>
                 <AchievementEntry title="Cybercrime, Cyber Laws & Technology Training">
                     <ul className="list-disc mt-1 space-y-1">
                        <li>Completed a structured training program at Rashtriya Raksha University.</li>
                    </ul>
                 </AchievementEntry>
                 <AchievementEntry title="Cybersecurity0x02 Workshop" link="https://www.linkedin.com/in/sonajitrabha/details/certifications/1761403091045/single-media-viewer/?profileId=ACoAAEzM230BPa5ZSxhnuiK3ppmZ_rr8X3C-vm4">
                     <ul className="list-disc mt-1 space-y-1">
                        <li>Participated in a hands-on cybersecurity workshop at ENCODERSPRO Pvt. Ltd., gaining exposure to network security, SOC operations, DFIR concepts, OSINT, and vulnerability assessment techniques.</li>
                    </ul>
                </AchievementEntry>
            </Section>
          </div>
        </div>
      </main>
      
      <Footer />
      
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          .no-print {
            display: none !important;
          }
          nav, footer, .floating-button {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
