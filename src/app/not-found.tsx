import React from 'react';
import Link from 'next/link';

/**
 * Standard Dark-themed 404 Error Page.
 * Matches the main portfolio's aesthetic.
 */
export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="relative mb-12">
        <h1 className="text-[10rem] md:text-[15rem] font-black leading-none opacity-10 select-none">404</h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 bg-red-600/20 blur-3xl rounded-full animate-pulse"></div>
        </div>
      </div>
      
      <div className="max-w-md relative z-10">
        <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-6">
          Access <span className="text-red-500">Denied</span>
        </h2>
        <p className="text-slate-400 text-lg mb-12 font-medium leading-relaxed">
          The requested system node could not be located in the network archive.
        </p>
        
        <Link 
          href="/" 
          className="group relative inline-flex px-12 py-5 border border-white/10 hover:border-red-600 transition-all duration-300 overflow-hidden"
        >
          <div className="absolute inset-0 bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          <span className="relative z-10 font-black uppercase text-xs tracking-[0.4em]">
            Return to Root
          </span>
        </Link>
      </div>
      
      {/* Decorative Binary Background Snippet */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] font-mono text-[10px] break-all overflow-hidden select-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="whitespace-nowrap">
            {"01101110 01101111 01110100 00100000 01100110 01101111 01110101 01101110 01100100".repeat(10)}
          </div>
        ))}
      </div>
    </div>
  );
}