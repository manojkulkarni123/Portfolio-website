"use client";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Photo } from "@/lib/content";

/** Masonry of photos: greyscale until hovered, click for a full-screen viewer (arrow keys / Esc). */
export default function GalleryGrid({ photos }: { photos: Photo[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const move = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + photos.length) % photos.length)), [photos.length]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, move]);

  const p = open !== null ? photos[open] : null;

  return (
    <>
      <div className="columns-2 gap-2 sm:columns-3">
        {photos.map((ph, i) => (
          <motion.button
            key={ph.src}
            type="button"
            onClick={() => setOpen(i)}
            initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
            className="group relative mb-2 block w-full overflow-hidden rounded-md"
          >
            <Image
              src={ph.src}
              width={ph.width}
              height={ph.height}
              alt={ph.caption ?? ""}
              sizes="(min-width: 640px) 220px, 50vw"
              className="h-auto w-full grayscale transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
            />
            {ph.caption && (
              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2 text-left text-[11px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                {ph.caption}
              </span>
            )}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {p && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <motion.div
              key={p.src}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative max-h-[80vh] max-w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={p.src} width={p.width} height={p.height} alt={p.caption ?? ""} sizes="100vw" className="max-h-[80vh] w-auto rounded-md object-contain" />
            </motion.div>
            <div className="mt-4 text-center text-sm text-white/80" onClick={(e) => e.stopPropagation()}>
              {p.caption && <p className="text-white">{p.caption}</p>}
              {(p.place || p.date) && <p className="text-xs text-white/60">{[p.place, p.date].filter(Boolean).join(" · ")}</p>}
              <p className="mt-1 text-xs tabular-nums text-white/40">{open! + 1} / {photos.length}</p>
            </div>
            <button aria-label="Close" className="absolute right-4 top-4 text-white/70 hover:text-white" onClick={() => setOpen(null)}><X /></button>
            {photos.length > 1 && (
              <>
                <button aria-label="Previous" className="absolute left-2 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white" onClick={(e) => { e.stopPropagation(); move(-1); }}><ChevronLeft /></button>
                <button aria-label="Next" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white" onClick={(e) => { e.stopPropagation(); move(1); }}><ChevronRight /></button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
