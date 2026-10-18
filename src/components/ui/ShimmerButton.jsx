/**
 * ShimmerButton — CTA button with a travelling shimmer light around its
 * perimeter, inspired by MagicUI shimmer-button. Self-contained CSS-in-JS.
 */
import React from 'react';

export default function ShimmerButton({
  children,
  onClick,
  href,
  className = '',
  shimmerColor = 'rgba(255,247,220,0.65)',
  background = 'transparent',
  borderColor = 'rgba(243,211,139,0.55)',
  shimmerDuration = '2.2s',
  ...props
}) {
  const base = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    overflow: 'hidden',
    border: `1px solid ${borderColor}`,
    background,
    cursor: 'pointer',
    fontFamily: 'var(--mono)',
    fontSize: '10px',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--paper)',
    padding: '14px 28px',
    minHeight: '50px',
    transition: 'border-color 0.3s ease, color 0.3s ease',
  };

  // shimmer travels around the perimeter via conic-gradient + rotation
  const shimmerStyle = {
    content: '""',
    position: 'absolute',
    inset: '-2px',
    background: `conic-gradient(from var(--shimmer-angle, 0deg), transparent 0deg 60deg, ${shimmerColor} 90deg, transparent 120deg 360deg)`,
    animation: `shimmer-spin ${shimmerDuration} linear infinite`,
    zIndex: 0,
  };

  const Tag = href ? 'a' : 'button';

  return (
    <>
      <style>{`
        @property --shimmer-angle {
          syntax: '<angle>';
          inherits: false;
          initial-value: 0deg;
        }
        @keyframes shimmer-spin {
          to { --shimmer-angle: 360deg; }
        }
        .shimmer-btn:hover {
          border-color: rgba(243,211,139,0.9) !important;
          color: #fff !important;
        }
        .shimmer-btn .shimmer-inner { position: relative; z-index: 1; }
        .shimmer-btn::before {
          content: '';
          position: absolute;
          inset: -1px;
          background: conic-gradient(from var(--shimmer-angle, 0deg), transparent 0deg 60deg, ${shimmerColor} 90deg, transparent 120deg 360deg);
          animation: shimmer-spin ${shimmerDuration} linear infinite;
          z-index: 0;
          border-radius: inherit;
        }
        .shimmer-btn::after {
          content: '';
          position: absolute;
          inset: 1px;
          background: rgba(7,7,6,0.95);
          z-index: 0;
          border-radius: inherit;
        }
      `}</style>
      <Tag
        href={href}
        onClick={onClick}
        className={`shimmer-btn ${className}`}
        style={base}
        {...props}
      >
        <span className="shimmer-inner">{children}</span>
      </Tag>
    </>
  );
}
