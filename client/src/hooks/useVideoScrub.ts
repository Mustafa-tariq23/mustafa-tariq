import { useEffect, useRef } from "react";

const TOTAL_FRAMES = 97;
const SENSITIVITY = 0.8;

export function useVideoScrub() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const prevXRef = useRef<number | null>(null);
  const targetProgressRef = useRef<number>(0.5);
  const currentProgressRef = useRef<number>(0.5);
  const animFrameIdRef = useRef<number | null>(null);
  const lastDrawnFrameRef = useRef<number>(-1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // ── 1. Preload 97 high-performance frames ──────────────────────
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    const drawFrame = (frameIndex: number) => {
      let img = images[frameIndex];
      // If requested frame is still loading, find nearest loaded frame
      if (!img || !img.complete || img.naturalWidth === 0) {
        for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
          const prev = images[frameIndex - offset];
          if (prev && prev.complete && prev.naturalWidth > 0) {
            img = prev;
            break;
          }
          const next = images[frameIndex + offset];
          if (next && next.complete && next.naturalWidth > 0) {
            img = next;
            break;
          }
        }
      }
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const cw = canvas.width;
      const ch = canvas.height;
      if (cw === 0 || ch === 0) return;

      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      // Cover scaling
      const canvasRatio = cw / ch;
      const imgRatio = iw / ih;
      let rw: number;
      let rh: number;

      if (canvasRatio > imgRatio) {
        rw = cw;
        rh = cw / imgRatio;
      } else {
        rh = ch;
        rw = ch * imgRatio;
      }

      // object-position: 70% center
      const ox = (cw - rw) * 0.7;
      const oy = (ch - rh) * 0.5;

      ctx.drawImage(img, ox, oy, rw, rh);
      lastDrawnFrameRef.current = frameIndex;
    };

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      const targetIdx = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(currentProgressRef.current * (TOTAL_FRAMES - 1)))
      );
      drawFrame(targetIdx);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const pad = String(i).padStart(3, "0");
      img.src = `/hero-frames/frame_${pad}.jpg`;
      img.onload = () => {
        loadedCount += 1;
        // Draw the initial center frame once loaded
        if (i === 48 || (loadedCount === 1 && lastDrawnFrameRef.current === -1)) {
          const initIdx = Math.min(
            TOTAL_FRAMES - 1,
            Math.max(0, Math.round(currentProgressRef.current * (TOTAL_FRAMES - 1)))
          );
          drawFrame(initIdx);
        }
      };
      images.push(img);
    }
    imagesRef.current = images;

    // ── 2. 60FPS RAF animation loop with smooth lerp ────────────────
    const tick = () => {
      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.0002) {
        currentProgressRef.current += diff * 0.32;
        const frameIdx = Math.min(
          TOTAL_FRAMES - 1,
          Math.max(0, Math.round(currentProgressRef.current * (TOTAL_FRAMES - 1)))
        );
        if (frameIdx !== lastDrawnFrameRef.current) {
          drawFrame(frameIdx);
        }
      }
      animFrameIdRef.current = requestAnimationFrame(tick);
    };
    animFrameIdRef.current = requestAnimationFrame(tick);

    // ── 3. Mouse Movement scrubbing per prompt spec ─────────────────
    const handleMouseMove = (e: MouseEvent) => {
      const currentX = e.clientX;
      if (prevXRef.current === null) {
        prevXRef.current = currentX;
        return;
      }

      const delta = currentX - prevXRef.current;
      prevXRef.current = currentX;

      const progressOffset = (delta / window.innerWidth) * SENSITIVITY;
      const nextProgress = targetProgressRef.current + progressOffset;
      targetProgressRef.current = Math.min(1, Math.max(0, nextProgress));
    };

    const handleMouseLeave = () => {
      prevXRef.current = null;
    };

    // Touch scrubbing for mobile
    const handleTouchMove = (e: TouchEvent) => {
      if (!e.touches || e.touches.length === 0) return;
      const currentX = e.touches[0].clientX;
      if (prevXRef.current === null) {
        prevXRef.current = currentX;
        return;
      }

      const delta = currentX - prevXRef.current;
      prevXRef.current = currentX;

      const progressOffset = (delta / window.innerWidth) * SENSITIVITY;
      const nextProgress = targetProgressRef.current + progressOffset;
      targetProgressRef.current = Math.min(1, Math.max(0, nextProgress));
    };

    const handleTouchEnd = () => {
      prevXRef.current = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return canvasRef;
}
