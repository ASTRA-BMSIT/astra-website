import React, { useEffect, useRef, useCallback } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const TOTAL_FRAMES = 40;

const getLogoFramePath = (index) => {
  const frameNumber = String(index + 1).padStart(3, "0");
  return `/logo_break/ezgif-frame-${frameNumber}.jpg`;
};

/**
 * LogoSequenceBackground
 *
 * Fixed background component that maps page scroll progress to the 40-frame ASTRA logo animation.
 * Features:
 * - Preloads all 40 image frames into an array on mount with async GPU decoding.
 * - Fluid requestAnimationFrame lerp render loop for cinematic high-framerate playback.
 * - HTML5 Canvas with devicePixelRatio scaling, mix-blend-mode: screen, and radial vignette.
 */
export default function LogoSequenceBackground({ className = "" }) {
  const canvasRef = useRef(null);
  const framesRef = useRef(new Array(TOTAL_FRAMES).fill(null));

  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const isLoopRunningRef = useRef(false);
  const rafIdRef = useRef(null);
  const lastDrawnFrameRef = useRef(-1);

  // Bind to entire page scroll
  const { scrollYProgress } = useScroll();
  const frameProgress = useTransform(
    scrollYProgress,
    [0, 1],
    [0, TOTAL_FRAMES - 1],
    { clamp: true }
  );

  // ── Draw Frame onto Canvas ──────────────────────────────────────────
  const drawFrameToCanvas = useCallback((frameIdx) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const clampedIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, frameIdx));
    let img = framesRef.current[clampedIndex];

    // Fallback to nearest loaded frame if current isn't ready
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const prev = clampedIndex - offset;
        const next = clampedIndex + offset;
        if (prev >= 0 && framesRef.current[prev]?.complete && framesRef.current[prev]?.naturalWidth > 0) {
          img = framesRef.current[prev];
          break;
        }
        if (next < TOTAL_FRAMES && framesRef.current[next]?.complete && framesRef.current[next]?.naturalWidth > 0) {
          img = framesRef.current[next];
          break;
        }
      }
    }

    if (!img) return;

    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (width === 0 || height === 0) return;

    if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    // Calculate dimensions to contain and center the logo
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = width / height;

    let drawWidth, drawHeight, drawX, drawY;

    if (imgAspect > canvasAspect) {
      drawWidth = width * 0.82;
      drawHeight = drawWidth / imgAspect;
      drawX = (width - drawWidth) / 2;
      drawY = (height - drawHeight) / 2;
    } else {
      drawHeight = height * 0.76;
      drawWidth = drawHeight * imgAspect;
      drawX = (width - drawWidth) / 2;
      drawY = (height - drawHeight) / 2;
    }

    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    lastDrawnFrameRef.current = clampedIndex;
  }, []);

  // ── High-Framerate Lerp Loop (rAF) ──────────────────────────────────
  const startAnimationLoop = useCallback(() => {
    if (isLoopRunningRef.current) return;
    isLoopRunningRef.current = true;

    const tick = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;

      if (Math.abs(diff) < 0.015) {
        currentFrameRef.current = targetFrameRef.current;
        const rounded = Math.round(currentFrameRef.current);
        if (rounded !== lastDrawnFrameRef.current) {
          drawFrameToCanvas(rounded);
        }
        isLoopRunningRef.current = false;
        return;
      }

      currentFrameRef.current += diff * 0.22;
      const rounded = Math.round(currentFrameRef.current);

      if (rounded !== lastDrawnFrameRef.current) {
        drawFrameToCanvas(rounded);
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);
  }, [drawFrameToCanvas]);

  // ── Preload All Frames into Array on Mount ──────────────────────────
  useEffect(() => {
    let isCancelled = false;
    const preloadedArray = new Array(TOTAL_FRAMES);

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getLogoFramePath(i);

      img.onload = () => {
        if (isCancelled) return;
        preloadedArray[i] = img;

        if (img.decode) {
          img.decode().catch(() => {});
        }

        if (i === 0 && lastDrawnFrameRef.current === -1) {
          drawFrameToCanvas(0);
        }
      };

      preloadedArray[i] = img;
    }

    framesRef.current = preloadedArray;

    return () => {
      isCancelled = true;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [drawFrameToCanvas]);

  // ── Handle Resize ───────────────────────────────────────────────────
  useEffect(() => {
    const handleResize = () => {
      drawFrameToCanvas(Math.round(currentFrameRef.current));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrameToCanvas]);

  // ── Scroll Listener ─────────────────────────────────────────────────
  useMotionValueEvent(frameProgress, "change", (latest) => {
    targetFrameRef.current = Math.max(0, Math.min(TOTAL_FRAMES - 1, latest));
    startAnimationLoop();
  });

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
      style={{
        mixBlendMode: "screen",
        opacity: 0.32,
        maskImage: "radial-gradient(ellipse 65% 65% at 50% 50%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 85%)",
        WebkitMaskImage: "radial-gradient(ellipse 65% 65% at 50% 50%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 85%)",
      }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
}
