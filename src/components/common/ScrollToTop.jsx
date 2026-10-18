import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowUp } from 'react-icons/hi';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 w-12 h-12 border border-accent-red bg-bg-base/80 backdrop-blur-sm text-accent-red flex items-center justify-center hover:bg-accent-red hover:text-bg-base transition-all group"
        >
          <HiArrowUp className="text-xl group-hover:-translate-y-1 transition-transform" />
          <div className="absolute -inset-1 border border-accent-red/20 animate-ping rounded-none opacity-20" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
