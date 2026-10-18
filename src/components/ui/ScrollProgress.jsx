/**
 * ScrollProgress — thin gold bar pinned to the top of the viewport.
 * Powered by Framer Motion's useScroll + scaleX transform (no jank).
 * Inspired by MagicUI's scroll-progress component.
 */
import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress({ color = 'var(--gold)' }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{
        scaleX,
        transformOrigin: '0% 50%',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: `linear-gradient(90deg, ${color}, rgba(243,211,139,0.4))`,
        zIndex: 200,
        boxShadow: `0 0 10px ${color}, 0 0 20px rgba(243,211,139,0.3)`,
      }}
    />
  );
}
