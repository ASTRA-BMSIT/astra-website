/**
 * TiltCard — pointer-driven 3D perspective tilt micro-interaction.
 * Maps cursor position within the card to rotateX / rotateY.
 * The glare layer moves with the pointer to simulate a specular highlight.
 * Uses requestAnimationFrame + lerp for smooth, GPU-composited transforms.
 */
import React, { useRef, useCallback } from 'react';

const TILT_MAX = 8;          // max degrees of tilt
const GLARE_OPACITY = 0.12;  // max glare opacity

function lerp(a, b, t) { return a + (b - a) * t; }

export default function TiltCard({
  children,
  className = '',
  style = {},
  maxTilt = TILT_MAX,
  glare = true,
  scale = 1.025,
}) {
  const cardRef   = useRef(null);
  const glareRef  = useRef(null);
  const stateRef  = useRef({ rx: 0, ry: 0, gx: 50, gy: 50, frame: null });

  const animate = useCallback(() => {
    const s = stateRef.current;
    const el = cardRef.current;
    const gl = glareRef.current;
    if (!el) return;

    el.style.transform = `perspective(900px) rotateX(${s.rx}deg) rotateY(${s.ry}deg) scale(${scale})`;
    if (gl) {
      gl.style.background = `radial-gradient(circle at ${s.gx}% ${s.gy}%, rgba(255,247,220,${GLARE_OPACITY}), transparent 60%)`;
    }
  }, [scale]);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width  / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);

    const s = stateRef.current;
    s.rx = -dy * maxTilt;   // tilt up/down
    s.ry =  dx * maxTilt;   // tilt left/right
    s.gx = ((e.clientX - rect.left) / rect.width)  * 100;
    s.gy = ((e.clientY - rect.top)  / rect.height) * 100;

    cancelAnimationFrame(s.frame);
    s.frame = requestAnimationFrame(animate);
  }, [maxTilt, animate]);

  const handleMouseLeave = useCallback(() => {
    const s = stateRef.current;
    s.rx = 0; s.ry = 0; s.gx = 50; s.gy = 50;
    cancelAnimationFrame(s.frame);
    s.frame = requestAnimationFrame(animate);

    // reset transform smoothly via CSS transition
    if (cardRef.current) {
      cardRef.current.style.transition = 'transform 0.55s cubic-bezier(.16,1,.3,1)';
      cardRef.current.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
      setTimeout(() => {
        if (cardRef.current) cardRef.current.style.transition = '';
      }, 600);
    }
  }, [animate]);

  const handleMouseEnter = useCallback(() => {
    if (cardRef.current) {
      cardRef.current.style.transition = 'transform 0.1s ease';
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className={`tilt-card ${className}`}
      style={{
        willChange: 'transform',
        transformStyle: 'preserve-3d',
        position: 'relative',
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {glare && (
        <div
          ref={glareRef}
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            pointerEvents: 'none',
            borderRadius: 'inherit',
          }}
        />
      )}
      <div style={{ position: 'relative', zIndex: 1, transformStyle: 'preserve-3d' }}>
        {children}
      </div>
    </div>
  );
}
