/**
 * MagicCard — spotlight effect that follows the mouse cursor and highlights
 * borders on hover. Adapted from MagicUI's magic-card pattern.
 * Dependency-free (no next-themes needed — works in Vite/React).
 */
import React, { useCallback, useRef } from 'react';
import { motion } from 'framer-motion';

export default function MagicCard({
  children,
  className = '',
  spotlightColor = 'rgba(243,211,139,0.12)',
  borderColor = 'rgba(243,211,139,0.55)',
  style = {},
}) {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`magic-card ${className}`}
      style={{
        '--spotlight-color': spotlightColor,
        '--border-hover-color': borderColor,
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
      whileHover={{ scale: 1.005 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Spotlight layer */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), var(--spotlight-color), transparent 40%)',
          opacity: 0,
          transition: 'opacity 0.35s ease',
        }}
        className="magic-card__spotlight"
      />
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </motion.div>
  );
}
