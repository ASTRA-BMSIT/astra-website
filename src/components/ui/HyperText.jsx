/**
 * HyperText — letter-scramble reveal, adapted from MagicUI's hyper-text pattern.
 * On mount (or when `trigger` flips), each character scrambles through random
 * characters before resolving to the real letter, with a staggered delay.
 */
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

export default function HyperText({
  text = '',
  className = '',
  duration = 800,
  delay = 0,        // ms before the whole animation starts
  charDelay = 40,   // ms stagger per character
  trigger = true,   // flip this to re-trigger
}) {
  const [displayed, setDisplayed] = useState(text.split('').map(() => ' '));
  const rafRef = useRef(null);

  useEffect(() => {
    if (!trigger) return;
    const chars = text.split('');
    let startTime = null;

    const totalMs = charDelay * chars.length + duration;

    const tick = (now) => {
      if (!startTime) startTime = now + delay;
      const elapsed = now - startTime;
      if (elapsed < 0) { rafRef.current = requestAnimationFrame(tick); return; }

      const next = chars.map((ch, i) => {
        const charStart = i * charDelay;
        const charEnd   = charStart + duration;
        const t = elapsed - charStart;
        if (ch === ' ') return ' ';
        if (t < 0) return ' ';
        if (t >= duration) return ch;
        // scramble phase: emit random char
        return randomChar();
      });

      setDisplayed(next);

      if (elapsed < totalMs) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplayed(chars);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [trigger, text, delay, duration, charDelay]);

  return (
    <span className={className} aria-label={text}>
      {displayed.map((ch, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.12, delay: i * (charDelay / 1000) * 0.3 }}
          className="inline-block"
          style={{ minWidth: ch === ' ' ? '0.3em' : undefined }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}
