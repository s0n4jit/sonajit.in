
import React from 'react';
import { Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative py-12 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          &copy; 2026 sOn4jit. All rights reserved.
        </div>
        
        <div className="flex items-center gap-4">
          <a href="mailto:hello@sonajit.in" className="flex items-center gap-2 text-[10px] font-bold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-widest">
            <Mail className="w-4 h-4" />
            <span>hello@sonajit.in</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
