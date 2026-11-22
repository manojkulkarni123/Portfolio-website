"use client";
import { useEffect, useRef, useState } from "react";

const GLYPHS = "abcdefghijklmnopqrstuvwxyz!<>-_\\/[]{}=+*^?#01";

/** Renders the real text on the server; on first scroll into view it "decodes" from random glyphs. Hover replays it. */
export default function ScrambleText({ text, className }: { text: string; className?: string }) {
  const [out, setOut] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const raf = useRef(0);

  const run = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    cancelAnimationFrame(raf.current);
    const start = performance.now();
    const dur = 550;
    const frame = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const solved = Math.floor(p * text.length);
      setOut(
        text
          .split("")
          .map((c, i) => (i < solved || c === " " ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join("")
      );
      if (p < 1) raf.current = requestAnimationFrame(frame);
    };
    raf.current = requestAnimationFrame(frame);
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { run(); io.disconnect(); }
    }, { rootMargin: "-40px" });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <span ref={ref} className={className} onMouseEnter={run} aria-label={text}>
      <span aria-hidden>{out}</span>
    </span>
  );
}
