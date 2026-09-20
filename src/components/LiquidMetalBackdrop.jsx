import React, { useEffect, useRef } from 'react';

/**
 * A lightweight CSS-driven, liquid-metal field inspired by shader-style motion.
 * It intentionally uses only layered gradients so it remains fast on mobile.
 */
export default function LiquidMetalBackdrop({ className = '' }) {
  return (
    <div className={`liquid-metal ${className}`} aria-hidden="true">
      <span className="liquid-metal__blob liquid-metal__blob--one" />
      <span className="liquid-metal__blob liquid-metal__blob--two" />
      <span className="liquid-metal__blob liquid-metal__blob--three" />
      <span className="liquid-metal__sheen" />
      <span className="liquid-metal__grain" />
    </div>
  );
}

export function MouseLiquidField() {
  const fieldRef = useRef(null);

  useEffect(() => {
    let frameId;
    let targetX = window.innerWidth * 0.5;
    let targetY = window.innerHeight * 0.34;
    let currentX = targetX;
    let currentY = targetY;

    const updateTarget = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };

    const render = () => {
      currentX += (targetX - currentX) * 0.32;
      currentY += (targetY - currentY) * 0.32;
      const shiftX = ((currentX - window.innerWidth / 2) / window.innerWidth) * 18;
      const shiftY = ((currentY - window.innerHeight / 2) / window.innerHeight) * 18;
      document.documentElement.style.setProperty('--pointer-x', `${currentX}px`);
      document.documentElement.style.setProperty('--pointer-y', `${currentY}px`);
      document.documentElement.style.setProperty('--grid-shift-x', `${shiftX}px`);
      document.documentElement.style.setProperty('--grid-shift-y', `${shiftY}px`);
      if (fieldRef.current) {
        const hero = document.querySelector('.pro-hero');
        const heroBounds = hero?.getBoundingClientRect();
        const overHero = heroBounds && currentY >= heroBounds.top && currentY <= heroBounds.bottom;
        fieldRef.current.style.setProperty('--pointer-x', `${currentX}px`);
        fieldRef.current.style.setProperty('--pointer-y', `${currentY}px`);
        fieldRef.current.style.setProperty('--mouse-glow-opacity', overHero ? '0' : '.44');
      }
      frameId = requestAnimationFrame(render);
    };

    window.addEventListener('pointermove', updateTarget, { passive: true });
    frameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('pointermove', updateTarget);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return <div ref={fieldRef} className="mouse-liquid-field" aria-hidden="true" />;
}
