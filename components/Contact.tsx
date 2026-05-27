'use client';

import React, { useState } from 'react';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { submitContactForm } from '@/src/app/actions/contact';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setStatusMessage(null);

    try {
      const result = await submitContactForm(formData);

      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error(result.error || "Form submission failed");
      }
    } catch (error) {
      console.error('Contact submission error:', error);
      setStatus('error');
      setStatusMessage(error instanceof Error ? error.message : 'Unable to send message right now');
      setTimeout(() => {
        setStatus('idle');
        setStatusMessage(null);
      }, 4000);
    }
  };

  return (
    <section id="contact" className="py-24 bg-black">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="max-w-7xl mx-auto px-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div>
            <div className="mb-12">
              <div className="text-red-500 text-[10px] font-bold tracking-[0.4em] mb-4 uppercase">Inquiries</div>
              <h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-none mb-10 text-white">
                Let's<br/><span className="text-red-500">Connect</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed border-l-2 border-red-500 pl-8 max-w-md">
                Interested in collaboration, project ideas, career opportunities! 
                Please reach out via the form or email.
              </p>
            </div>
            
            <div className="mt-12 flex flex-wrap items-center gap-8">
              <a href="https://x.com/sOn4jit" target="_blank" rel="noopener noreferrer" aria-label="Follow me on X" className="text-slate-400 hover:text-red-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/sonajitrabha/" target="_blank" rel="noopener noreferrer" aria-label="Connect on LinkedIn" className="text-slate-400 hover:text-red-500 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://github.com/son4jit" target="_blank" rel="noopener noreferrer" aria-label="View Github Profile" className="text-slate-400 hover:text-red-500 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="mailto:hello@sonajit.in" aria-label="Send me an email" className="text-slate-400 hover:text-red-500 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-sm p-10 border border-white/10 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-2">
                <label htmlFor="name" className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Name</label>
                <input 
                  required
                  id="name"
                  name="name"
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 text-white focus:outline-none focus:border-red-500 transition-all text-sm" 
                  placeholder="Your Name"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Email</label>
                <input 
                  required
                  id="email"
                  name="email"
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 text-white focus:outline-none focus:border-red-500 transition-all text-sm" 
                  placeholder="hello@example.com"
                />
              </div>
            </div>
            <div className="mb-10 space-y-2">
              <label htmlFor="message" className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Message</label>
              <textarea 
                required
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full px-4 py-3 bg-black/40 border border-white/10 text-white focus:outline-none focus:border-red-500 transition-all text-sm resize-none" 
                placeholder="How can I help you?"
              ></textarea>
            </div>
            
            <button 
              type="submit"
              disabled={status === 'loading'}
              aria-label="Submit Contact Form"
              className={`w-full py-5 font-black uppercase text-xs tracking-[0.3em] transition-all flex items-center justify-center gap-4 ${
                status === 'success' ? 'bg-green-600 text-white' : 
                status === 'error' ? 'bg-orange-600 text-white' :
                'bg-red-500 text-white hover:bg-white hover:text-black'
              }`}
            >
              {status === 'loading' && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
              {status === 'success' ? 'Message Sent' : 
               status === 'error' ? 'Submission Failed' :
               status === 'loading' ? 'Sending...' : 'Submit Inquiry'}
            </button>
            {statusMessage && (
              <p className="mt-4 text-center text-xs font-bold uppercase tracking-widest text-orange-400">
                {statusMessage}
              </p>
            )}
          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
