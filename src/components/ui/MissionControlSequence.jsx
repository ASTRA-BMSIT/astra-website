import React, { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

const TOTAL_FRAMES = 40;

const getAstraFramePath = (index) => {
  const frameNumber = String(index + 1).padStart(3, "0");
  return `/astra_break/ezgif-frame-${frameNumber}.jpg`;
};

/**
 * MissionControlSequence
 * 
 * Replaces the static/CSS-animated mission control UI on the right side of the hero section.
 * Preloads the 40-frame mission control / tactical platform animation sequence from /astra_break/
 * and maps the scroll progress through the hero section to scrub frame-by-frame.
 * 
 * Includes high-DPI canvas rendering, tactical HUD telemetry readouts,
 * interactive frame tracking, and subtle warm-gold aerospace styling.
 */
export default function MissionControlSequence({ targetRef, className = "" }) {
  const canvasRef = useRef(null);
  const imagesRef = useRef(new Map());
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrubProgress, setScrubProgress] = useState(0);
  const rafIdRef = useRef(null);
  const currentRenderedFrameRef = useRef(-1);

  // Bind scroll progress to the hero section
  const { scrollYProgress } = useScroll(
    targetRef
      ? {
          target: targetRef,
          offset: ["start start", "end start"],
        }
      : {}
  );

  // Preload all frames in /astra_break
  useEffect(() => {
    let isCancelled = false;
    const images = imagesRef.current;

    // Load first frame immediately for instant visual
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
            if (index === 0 && currentRenderedFrameRef.current === -1) {
              setIsLoaded(true);
              renderFrame(0);
            }
          }
          resolve(img);
        };
        img.onerror = () => {
          resolve(null);
        };
        img.src = getAstraFramePath(index);
      });
    };

    const loadAll = async () => {
      // Prioritize frame 0 first
      await loadFrame(0);
      const batchSize = 4;
      for (let i = 0; i < loadIndices.length; i += batchSize) {
        if (isCancelled) break;
        const batch = loadIndices.slice(i, i + batchSize);
        await Promise.all(batch.map(loadFrame));
      }
      if (!isCancelled) setIsLoaded(true);
    };

    loadAll();

    return () => {
      isCancelled = true;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  // Find nearest available frame
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

  // Render a frame on the canvas
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

    // Calculate dimensions to cover/contain neatly in 16:9 ratio
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = width / height;

    let drawWidth, drawHeight, drawX, drawY;

    if (imgAspect > canvasAspect) {
      drawWidth = height * imgAspect;
      drawHeight = height;
      drawX = (width - drawWidth) / 2;
      drawY = 0;
    } else {
      drawWidth = width;
      drawHeight = width / imgAspect;
      drawX = 0;
      drawY = (height - drawHeight) / 2;
    }

    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    currentRenderedFrameRef.current = frameIndex;
  }, [getNearestFrame]);

  // Handle window resizing
  useEffect(() => {
    const handleResize = () => {
      renderFrame(currentRenderedFrameRef.current >= 0 ? currentRenderedFrameRef.current : 0);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [renderFrame]);

  // Scrub frame sequence on scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const progress = Math.max(0, Math.min(1, latest));
    const targetFrame = Math.min(TOTAL_FRAMES - 1, Math.floor(progress * (TOTAL_FRAMES - 1)));

    setScrubProgress(Math.round(progress * 100));

    if (targetFrame !== currentRenderedFrameRef.current) {
      setCurrentFrame(targetFrame);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(() => {
        renderFrame(targetFrame);
      });
    }
  });

  const formattedFrame = String(currentFrame + 1).padStart(2, "0");

  return (
    <div
      className={`tactical-mission-panel w-full max-w-[430px] rounded-lg overflow-hidden border border-[rgba(243,211,139,0.32)] bg-[#120f0c]/90 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] ${className}`}
      style={{
        boxShadow: "0 20px 50px rgba(7,7,6,0.9), 0 0 35px rgba(243,211,139,0.12)",
      }}
    >
      {/* ── Top Telemetry HUD Header ── */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[rgba(243,211,139,0.18)] bg-[#0d0a08]/80 text-[#d9ccb0] font-mono text-[9px] tracking-tactical">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#f3d38b] shadow-[0_0_8px_#f3d38b] animate-pulse" />
          <span className="text-[#f6f1e8] font-medium">NX-01 // MISSION CONTROL</span>
        </div>
        <div className="flex items-center gap-2 text-[#9a8e76]">
          <span>SECTOR BLR-01</span>
          <span className="text-[#f3d38b] font-medium">ONLINE</span>
        </div>
      </div>

      {/* ── Visual Frame Sequencer Screen ── */}
      <div className="relative aspect-[16/10] w-full bg-[#070706] overflow-hidden group">
        {/* Canvas displaying scrubbed frame */}
        <canvas
          ref={canvasRef}
          className="w-full h-full block object-cover"
        />

        {/* Reticle Corner Markers */}
        <div className="pointer-events-none absolute inset-2.5 border border-[rgba(243,211,139,0.14)]" />
        <div className="pointer-events-none absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-[#f3d38b]" />
        <div className="pointer-events-none absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-[#f3d38b]" />
        <div className="pointer-events-none absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-[#f3d38b]" />
        <div className="pointer-events-none absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-[#f3d38b]" />

        {/* Tactical Crosshair watermark */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-15">
          <div className="w-12 h-[1px] bg-[#f3d38b]" />
          <div className="h-12 w-[1px] bg-[#f3d38b] -ml-[6px]" />
        </div>

        {/* Scrub Overlay Readout (Top-right inside screen) */}
        <div className="pointer-events-none absolute top-3.5 right-4 flex items-center gap-2 bg-[#070706]/75 px-2 py-0.5 rounded border border-[rgba(243,211,139,0.2)] text-[8px] font-mono text-[#f3d38b]">
          <span className="text-[#9a8e76]">SEQ</span>
          <span className="font-bold">{formattedFrame}/40</span>
        </div>

        {/* Active Scrub Telemetry (Bottom-left inside screen) */}
        <div className="pointer-events-none absolute bottom-3.5 left-4 flex items-center gap-2 bg-[#070706]/75 px-2 py-0.5 rounded border border-[rgba(243,211,139,0.2)] text-[8px] font-mono text-[#d9ccb0]">
          <span className="text-[#9a8e76]">SCRUB:</span>
          <span className="text-[#fce9b0] font-semibold">{scrubProgress}%</span>
        </div>
      </div>

      {/* ── Bottom Telemetry HUD Footer ── */}
      <div className="px-4 py-2.5 border-t border-[rgba(243,211,139,0.18)] bg-[#0d0a08]/80 text-[#9a8e76] font-mono text-[8px] tracking-tactical flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span>VECTOR / 18.4°</span>
          <span className="text-[#f3d38b]">TRACKING / ACTIVE</span>
        </div>
        <div className="flex items-center gap-2">
          <span>LINK:</span>
          <span className="text-[#f6f1e8] font-medium">ESTABLISHED</span>
        </div>
      </div>
    </div>
  );
}
