"use client";
import { useEffect, useRef } from "react";

/** A canvas of tiny squares that randomly flicker. Uses the current --fg colour, pauses off-screen, respects reduced motion. */
export default function FlickeringGrid({
  className,
  square = 3,
  gap = 6,
  chance = 0.25,
  maxOpacity = 0.22,
}: {
  className?: string;
  square?: number;
  gap?: number;
  chance?: number;
  maxOpacity?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let visible = true;
    let cols = 0, rows = 0, dpr = 1;
    let cells = new Float32Array(0);
    let color = "255,255,255";
    let last = 0;

    const readColor = () => {
      const probe = document.createElement("span");
      probe.style.color = "var(--fg)";
      document.body.appendChild(probe);
      const m = getComputedStyle(probe).color.match(/\d+(\.\d+)?/g);
      probe.remove();
      if (m) color = `${m[0]},${m[1]},${m[2]}`;
    };

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      cols = Math.ceil(width / (square + gap));
      rows = Math.ceil(height / (square + gap));
      cells = new Float32Array(cols * rows).map(() => Math.random() * maxOpacity);
      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const s = square * dpr, step = (square + gap) * dpr;
      for (let i = 0; i < cols; i++)
        for (let j = 0; j < rows; j++) {
          ctx.fillStyle = `rgba(${color},${cells[i * rows + j]})`;
          ctx.fillRect(i * step, j * step, s, s);
        }
    };

    const tick = (t: number) => {
      const dt = (t - last) / 1000;
      last = t;
      if (visible) {
        for (let k = 0; k < cells.length; k++) if (Math.random() < chance * dt) cells[k] = Math.random() * maxOpacity;
        draw();
      }
      raf = requestAnimationFrame(tick);
    };

    readColor();
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    const mo = new MutationObserver(() => { readColor(); draw(); });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    if (!reduce) raf = requestAnimationFrame((t) => { last = t; tick(t); });

    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); mo.disconnect(); };
  }, [square, gap, chance, maxOpacity]);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
