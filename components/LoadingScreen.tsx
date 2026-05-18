
'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2800); // Display for 2.8 seconds to allow wave animation to complete

    return () => clearTimeout(timer);
  }, []);

  // Exact casing: s (lower), O (upper), n (lower), 4, j (lower), i (lower), t (lower)
  const text = "sOn4jit";
  const letters = Array.from(text);

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const letterVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black overflow-hidden"
        >
          <motion.div
            variants={containerVariants}
            initial="initial"
            animate="animate"
            className="text-lg md:text-xl font-black italic tracking-[0.2em] select-none text-white flex items-center"
          >
            {letters.map((char, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                className={char === 'O' || char === '4' ? "text-red-600" : "text-white"}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
