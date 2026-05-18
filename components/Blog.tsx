import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '../types';
import { getBlogPosts } from '@/src/app/actions/github';
import { cn } from '@/src/lib/utils';
import { motion } from 'framer-motion';

interface BlogProps {
  isFullArchive?: boolean;
}

const ExpandableSummary: React.FC<{ text: string }> = ({ text }) => {
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
    <div className="mb-8">
      <p 
        ref={textRef}
        className={`text-slate-400 text-sm md:text-base leading-relaxed transition-all duration-300 ${
          isExpanded ? '' : 'line-clamp-3'
        }`}
      >
        {text}
      </p>
      {shouldShowToggle && (
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-red-500 text-[10px] font-black uppercase tracking-widest mt-2 hover:text-white transition-colors"
        >
          {isExpanded ? 'Show Less' : 'Read more'}
        </button>
      )}
    </div>
  );
};

const BlogImage: React.FC<{ src: string; alt: string; priority?: boolean }> = ({ src, alt, priority }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Image 
      src={src} 
      alt={alt}
      fill
      priority={priority}
      sizes="(max-width: 768px) 100vw, 50vw"
      onLoad={() => setIsLoaded(true)}
      className={cn(
        "object-cover grayscale transition-all duration-1000",
        !isLoaded ? "blur-md scale-105 opacity-40" : "blur-0 scale-100 opacity-80 group-hover:grayscale-0 group-hover:opacity-100"
      )}
    />
  );
};

const Blog: React.FC<BlogProps> = ({ isFullArchive = false }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const { posts: fetchedPosts, error: fetchError } = await getBlogPosts(isFullArchive);
        
        if (fetchError) {
          throw new Error(fetchError);
        }
        
        setPosts(fetchedPosts);
      } catch (error: any) {
        console.error('Error loading blog posts:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [isFullArchive]);

  return (
    <section id="blog" className={`${isFullArchive ? '' : 'py-24'} bg-black relative overflow-hidden`}>
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="max-w-7xl mx-auto px-6 relative z-10"
      >
        {!isFullArchive && (
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-red-600"></div>
              <span className="text-red-600 text-[10px] font-bold tracking-[0.5em] uppercase">Latest blogs</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-none text-white">
              Latest<br/>
              <span className="text-red-600">blogs.</span>
            </h2>
          </div>
        )}

        {loading ? (
          <div className="space-y-12">
            {[1, 2].map(i => (
              <div key={i} className="h-64 bg-white/5 animate-pulse border border-white/5"></div>
            ))}
          </div>
        ) : error ? (
            <div className="text-center p-10 bg-red-900/10 border border-red-600/30 rounded-lg">
              <h3 className="font-bold text-red-600 mb-2">Failed to Load Blog Posts</h3>
              <p className="text-slate-400 text-sm">{error}</p>
            </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-24">
              {posts.map((post, idx) => (
                <article 
                  key={idx}
                  className={`group relative grid grid-cols-1 md:grid-cols-12 gap-12 items-center transition-all duration-700`}
                >
                  <div className={`${idx % 2 === 0 ? 'md:col-span-6' : 'md:col-span-6 md:order-2'} relative`}>
                    <div className="relative aspect-video overflow-hidden border border-white/5 group-hover:border-red-600/50 transition-colors duration-500">
                      {post.image ? (
                        <BlogImage 
                          src={post.image} 
                          alt={post.title}
                          priority={idx === 0}
                        />
                      ) : (
                        <div className="w-full h-full bg-white/[0.02] flex items-center justify-center border border-white/5">
                          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-700 italic select-none">No Media Available</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={`${idx % 2 === 0 ? 'md:col-span-6' : 'md:col-span-6 md:order-1'}`}>
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-red-600 font-mono text-[10px] font-black uppercase tracking-widest">{post.date}</span>
                      <div className="h-[1px] w-12 bg-white/10"></div>
                    </div>
                    
                    <h3 className="text-2xl md:text-4xl font-black uppercase italic leading-tight text-white mb-6 group-hover:text-red-600 transition-colors duration-500">
                      {post.title}
                    </h3>
                    
                    <ExpandableSummary text={post.summary} />

                    <div className="flex flex-wrap gap-2 mb-10">
                      {post.tags.map(tag => (
                        <span key={tag} className="text-[9px] font-bold text-slate-400 border border-white/5 px-2 py-1 uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <a 
                      href={post.url} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-4 group/btn"
                    >
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover/btn:text-white transition-colors">Read Publication</span>
                      <div className="w-8 h-8 bg-red-600 flex items-center justify-center text-white transition-transform group-hover/btn:translate-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </a>
                  </div>
                </article>
              ))}
            </div>

            {!isFullArchive && (
              <div className="mt-24 flex justify-center">
                <Link 
                  href="/blog" 
                  className="group relative px-12 py-5 border border-white/10 hover:border-red-600 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <span className="relative z-10 font-black uppercase text-[10px] tracking-[0.4em] text-white group-hover:text-white">
                    view more posts
                  </span>
                </Link>
              </div>
            )}
          </>
        )}
      </motion.div>
    </section>
  );
};

export default Blog;
