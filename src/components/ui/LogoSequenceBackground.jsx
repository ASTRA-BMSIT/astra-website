import React, { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

const TOTAL_FRAMES = 40;

const getLogoFramePath = (index) => {
  const frameNumber = String(index + 1).padStart(3, "0");
  return `/logo_break/ezgif-frame-${frameNumber}.jpg`;
};

/**
 * LogoSequenceBackground
 * 
 * Fixed background component that uses Framer Motion's useScroll to map
 * scroll progress across the page to the 40-frame ASTRA logo animation sequence.
 * 
 * Uses an HTML5 canvas with high-DPI scaling, progressive preloading, and
 * mix-blend-mode: screen so the black frame background seamlessly disappears
 * into the deep #070706 canvas, leaving only the glowing golden logo emblem.
 */
export default function LogoSequenceBackground({ className = "" }) {
  const canvasRef = useRef(null);
  const imagesRef = useRef(new Map());
  const [loadedCount, setLoadedCount] = useState(0);
  const currentFrameRef = useRef(-1);
  const rafIdRef = useRef(null);

  const { scrollYProgress } = useScroll();

  // Preload all frames progressively
  useEffect(() => {
    let isCancelled = false;
    const images = imagesRef.current;

    // Binary order or prioritized loading: frame 0, frame 39, then all frames
    const loadIndices = [0, TOTAL_FRAMES - 1];
    for (let i = 1; i < TOTAL_FRAMES - 1; i++) {
      loadIndices.push(i);
    }

    const loadFrame = (index) => {
      return new Promise((resolve) => {
        if (images.has(index)) {
          resolve(images.get(index));
          return;
        }
        const img = new Image();
        img.onload = () => {
          if (!isCancelled) {
            images.set(index, img);
            setLoadedCount((c) => c + 1);
            // If this is the initial frame, render immediately
            if (index === 0 && currentFrameRef.current === -1) {
              renderFrame(0);
            }
          }
          resolve(img);
        };
        img.onerror = () => {
          resolve(null);
        };
        img.src = getLogoFramePath(index);
      });
    };

    // Load sequentially in small batches to preserve network bandwidth
    const loadAll = async () => {
      const batchSize = 4;
      for (let i = 0; i < loadIndices.length; i += batchSize) {
        if (isCancelled) break;
        const batch = loadIndices.slice(i, i + batchSize);
        await Promise.all(batch.map(loadFrame));
      }
    };

    loadAll();

    return () => {
      isCancelled = true;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  // Find nearest loaded frame if exact frame isn't loaded yet
  const getNearestFrame = useCallback((targetIndex) => {
    const images = imagesRef.current;
    if (images.has(targetIndex)) return images.get(targetIndex);

    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const prev = targetIndex - offset;
      const next = targetIndex + offset;
      if (prev >= 0 && images.has(prev)) return images.get(prev);
      if (next < TOTAL_FRAMES && images.has(next)) return images.get(next);
    }
    return null;
  }, []);

  // Render a specific frame onto canvas
  const renderFrame = useCallback((frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = getNearestFrame(frameIndex);
    if (!img) return;

    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    // Calculate dimensions to contain and center the logo
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = width / height;

    let drawWidth, drawHeight, drawX, drawY;

    // Use contain with subtle scale so the logo stays prominently centered
    if (imgAspect > canvasAspect) {
      drawWidth = width * 0.85;
      drawHeight = drawWidth / imgAspect;
      drawX = (width - drawWidth) / 2;
      drawY = (height - drawHeight) / 2;
    } else {
      drawHeight = height * 0.75;
      drawWidth = drawHeight * imgAspect;
      drawX = (width - drawWidth) / 2;
      drawY = (height - drawHeight) / 2;
    }

    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    currentFrameRef.current = frameIndex;
  }, [getNearestFrame]);

  // Handle window resizing
  useEffect(() => {
    const handleResize = () => {
      if (currentFrameRef.current >= 0) {
        renderFrame(currentFrameRef.current);
      } else {
        renderFrame(0);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [renderFrame]);

  // Bind to Framer Motion useScroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const progress = Math.max(0, Math.min(1, latest));
    const targetFrame = Math.min(TOTAL_FRAMES - 1, Math.floor(progress * (TOTAL_FRAMES - 1)));

    if (targetFrame !== currentFrameRef.current) {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(() => {
        renderFrame(targetFrame);
      });
    }
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
