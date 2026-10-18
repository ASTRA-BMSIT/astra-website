import React, { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const TOTAL_FRAMES = 40;

const getAstraFramePath = (index) => {
  const frameNumber = String(index + 1).padStart(3, "0");
  return `/astra_break/ezgif-frame-${frameNumber}.jpg`;
};

/**
 * MissionControlSequence
 *
 * Highly optimized HTML5 Canvas frame-by-frame image sequencer for the ASTRA Hero section.
 * - Sizing & Border: Scaled up to 540px–620px with an ultra-sleek, razor-thin 1px tactical golden bezel (no heavy black borders).
 * - Precision Scroll Timing: Transition starts at 0.0 (start of Home) and completes at 0.5 (middle of Home), remaining locked at Frame 39 well before reaching the About section.
 * - Cinematic Smoothness: Array-preloaded frames with asynchronous GPU texture decoding and a high-framerate requestAnimationFrame lerp render loop.
 */
export default function MissionControlSequence({ targetRef, className = "" }) {
  const canvasRef = useRef(null);
  const framesRef = useRef(new Array(TOTAL_FRAMES).fill(null));
  const [currentFrameDisplay, setCurrentFrameDisplay] = useState(0);
  const [scrubPercentDisplay, setScrubPercentDisplay] = useState(0);

  // Target frame from scroll vs currently rendered lerped frame
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const isLoopRunningRef = useRef(false);
  const rafIdRef = useRef(null);
  const lastDrawnFrameRef = useRef(-1);

  // ── Precision Scroll Timing ─────────────────────────────────────────
  // Offset ["start start", "end start"] tracks the home section's journey through viewport.
  // 0.0 = hero top at viewport top (start of Home)
  // 0.5 = middle of Home section (final frame reached here!)
  // >= 0.5 = clamped at frame 39 (completes well before reaching About)
  const { scrollYProgress } = useScroll(
    targetRef
      ? {
          target: targetRef,
          offset: ["start start", "end start"],
        }
      : {}
  );

  const frameProgress = useTransform(
    scrollYProgress,
    [0, 0.5],
    [0, TOTAL_FRAMES - 1],
    { clamp: true }
  );

  // ── Draw Frame onto High-DPI Canvas ──────────────────────────────────
  const drawFrameToCanvas = useCallback((frameIdx) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const clampedIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, frameIdx));
    let img = framesRef.current[clampedIndex];

    // Fallback to nearest loaded frame if exact frame is loading
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

    // Precise 16:9 frame rendering edge-to-edge
    ctx.drawImage(img, 0, 0, width, height);
    lastDrawnFrameRef.current = clampedIndex;
  }, []);

  // ── Continuous Cinema Lerp Loop (rAF) ───────────────────────────────
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
          setCurrentFrameDisplay(rounded);
          setScrubPercentDisplay(Math.round((rounded / (TOTAL_FRAMES - 1)) * 100));
        }
        isLoopRunningRef.current = false;
        return;
      }

      // Smooth interpolation factor (0.24) delivers silky, high-framerate response
      currentFrameRef.current += diff * 0.24;
      const rounded = Math.round(currentFrameRef.current);

      if (rounded !== lastDrawnFrameRef.current) {
        drawFrameToCanvas(rounded);
        setCurrentFrameDisplay(rounded);
        setScrubPercentDisplay(Math.round((rounded / (TOTAL_FRAMES - 1)) * 100));
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
      img.src = getAstraFramePath(i);

      img.onload = () => {
        if (isCancelled) return;
        preloadedArray[i] = img;

        // Eagerly decode into GPU memory
        if (img.decode) {
          img.decode().catch(() => {});
        }

        // Draw Frame 0 as soon as it's available
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

  // ── Window Resize Observer ──────────────────────────────────────────
  useEffect(() => {
    const handleResize = () => {
      drawFrameToCanvas(Math.round(currentFrameRef.current));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrameToCanvas]);

  // ── Scroll Event Listener via Framer Motion ─────────────────────────
  useMotionValueEvent(frameProgress, "change", (latest) => {
    targetFrameRef.current = Math.max(0, Math.min(TOTAL_FRAMES - 1, latest));
    startAnimationLoop();
  });

  const formattedFrame = String(currentFrameDisplay + 1).padStart(2, "0");

  return (
    <div
      className={`tactical-mission-panel w-full max-w-[540px] lg:max-w-[580px] xl:max-w-[620px] rounded-xl overflow-hidden border border-[rgba(243,211,139,0.25)] hover:border-[rgba(243,211,139,0.45)] ring-1 ring-inset ring-[rgba(243,211,139,0.08)] bg-[#0e0b08]/85 backdrop-blur-xl shadow-[0_20px_50px_rgba(7,7,6,0.7),0_0_30px_rgba(243,211,139,0.08)] transition-all duration-300 ${className}`}
    >
      {/* ── Sleek, Compact Telemetry HUD Header ── */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[rgba(243,211,139,0.16)] bg-[#130f0c]/90 text-[#d9ccb0] font-mono text-[9px] tracking-tactical select-none">
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#f3d38b] shadow-[0_0_8px_#f3d38b] animate-pulse" />
          <span className="text-[#f6f1e8] font-medium tracking-wider">NX-01 // MISSION CONTROL</span>
        </div>
        <div className="flex items-center gap-3 text-[#9a8e76]">
          <span>SECTOR BLR-01</span>
          <span className="text-[#f3d38b] font-semibold flex items-center gap-1">
            <span className="inline-block w-1 h-1 rounded-full bg-[#f3d38b]" />
            ONLINE
          </span>
        </div>
      </div>

      {/* ── Cinematic 16:9 Canvas Screen (Zero Black Bars) ── */}
      <div className="relative w-full aspect-video bg-[#070706] overflow-hidden group select-none">
        {/* Active Frame Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
        />

        {/* Minimalist Precision Reticle Brackets */}
        <div className="pointer-events-none absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-[rgba(243,211,139,0.6)]" />
        <div className="pointer-events-none absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-[rgba(243,211,139,0.6)]" />
        <div className="pointer-events-none absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-[rgba(243,211,139,0.6)]" />
        <div className="pointer-events-none absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-[rgba(243,211,139,0.6)]" />

        {/* Subtle HUD Telemetry Badges */}
        <div className="pointer-events-none absolute top-3 right-3.5 flex items-center gap-1.5 bg-[#070706]/80 px-2 py-0.5 rounded border border-[rgba(243,211,139,0.22)] text-[8px] font-mono text-[#f3d38b]">
          <span className="text-[#9a8e76]">FRAME</span>
          <span className="font-bold">{formattedFrame}/40</span>
        </div>

        <div className="pointer-events-none absolute bottom-3 left-3.5 flex items-center gap-1.5 bg-[#070706]/80 px-2 py-0.5 rounded border border-[rgba(243,211,139,0.22)] text-[8px] font-mono text-[#d9ccb0]">
          <span className="text-[#9a8e76]">PROGRESS:</span>
          <span className="text-[#fce9b0] font-bold">{scrubPercentDisplay}%</span>
        </div>
      </div>

      {/* ── Sleek, Compact Telemetry HUD Footer & Progress Line ── */}
      <div className="relative px-4 py-2 border-t border-[rgba(243,211,139,0.16)] bg-[#130f0c]/90 text-[#9a8e76] font-mono text-[8px] tracking-tactical flex items-center justify-between select-none">
        <div className="flex items-center gap-3">
          <span>VECTOR / 18.4°</span>
          <span className="text-[#f3d38b]">TRACKING / ACTIVE</span>
        </div>
        <div className="flex items-center gap-2">
          <span>LINK:</span>
          <span className="text-[#f6f1e8] font-medium">ESTABLISHED</span>
        </div>

        {/* Real-time 2px Gold Scrub Track at the bottom */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[rgba(243,211,139,0.3)] to-[#f3d38b] transition-all duration-75"
          style={{ width: `${scrubPercentDisplay}%` }}
        />
      </div>
    </div>
  );
}
