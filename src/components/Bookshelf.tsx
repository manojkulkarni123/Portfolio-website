"use client";
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import type { Book } from "@/data/library";

export type ShelfBook = Book & { coverUrl?: string };

// monochrome spines with a few warm accents, so the shelf stays on-theme
const SPINES = [
  { bg: "#e7e5e4", fg: "#0c0a09" },
  { bg: "#1c1c1c", fg: "#e5e5e5" },
  { bg: "#a8a29e", fg: "#0c0a09" },
  { bg: "#2b2b2b", fg: "#f5f5f4" },
  { bg: "#f5f5f4", fg: "#1c1917" },
  { bg: "#57534e", fg: "#fafaf9" },
  { bg: "#7f1d1d", fg: "#fef2f2" },
  { bg: "#1e3a5f", fg: "#eff6ff" },
];

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function Spine({ book, selected, onClick }: { book: ShelfBook; selected: boolean; onClick: () => void }) {
  const h = hash(book.title);
  const style = SPINES[h % SPINES.length];
  const width = 30 + (book.title.length % 4) * 5 + (h % 6);
  const height = 150 + (h % 45);
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={`${book.title} by ${book.author}`}
      animate={{ y: selected ? -18 : 0 }}
      whileHover={{ y: selected ? -18 : -10 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className="relative shrink-0 overflow-hidden rounded-t-[3px] rounded-b-[1px] border border-black/20 shadow-[inset_-3px_0_6px_rgba(0,0,0,.25),inset_2px_0_2px_rgba(255,255,255,.15)]"
      style={{ width, height, background: style.bg, color: style.fg }}
    >
      <span className="absolute inset-x-0 top-2 mx-auto h-px w-3/5 opacity-40" style={{ background: style.fg }} />
      <span className="absolute inset-x-0 bottom-2 mx-auto h-px w-3/5 opacity-40" style={{ background: style.fg }} />
      <span className="absolute inset-0 flex items-center justify-center px-1 py-5 [writing-mode:vertical-rl]">
        <span className="line-clamp-2 text-[10px] font-semibold leading-tight tracking-tight">{book.title}</span>
      </span>
    </motion.button>
  );
}

function Shelf({ title, books, selected, onSelect }: { title: string; books: ShelfBook[]; selected: string | null; onSelect: (t: string) => void }) {
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="text-sm font-semibold">{title}</h2>
        <span className="text-xs tabular-nums text-muted">{books.length}</span>
      </div>
      {books.length === 0 ? (
        <div className="flex h-24 items-center justify-center rounded-md border border-dashed text-xs text-muted">empty shelf</div>
      ) : (
        <div className="overflow-x-auto pb-1 pt-6 [scrollbar-width:none]">
          <div className="flex min-w-max items-end gap-1 px-1">
            {books.map((b) => (
              <Spine key={b.title} book={b} selected={selected === b.title} onClick={() => onSelect(b.title)} />
            ))}
          </div>
        </div>
      )}
      {/* the plank */}
      <div className="h-2 rounded-sm bg-secondary shadow-[0_6px_12px_-4px_rgba(0,0,0,.5)]" />
    </div>
  );
}

export default function Bookshelf({ books }: { books: ShelfBook[] }) {
  const [selected, setSelected] = useState<string | null>(null);
  const toggle = (t: string) => setSelected((s) => (s === t ? null : t));
  const book = books.find((b) => b.title === selected);

  const shelves: [string, ShelfBook[]][] = [
    ["currently reading", books.filter((b) => b.status === "reading")],
    ["read", books.filter((b) => b.status === "read")],
    ["up next", books.filter((b) => b.status === "next")],
  ];

  return (
    <div className="space-y-10">
      <AnimatePresence>
        {book && (
          <motion.div
            key={book.title}
            initial={{ opacity: 0, y: -8, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
            className="relative flex gap-4 rounded-lg border bg-card p-4"
          >
            {book.coverUrl ? (
              <img src={book.coverUrl} alt="" className="h-36 w-24 shrink-0 rounded-sm object-cover shadow-lg" />
            ) : (
              <div className="flex h-36 w-24 shrink-0 items-center justify-center rounded-sm bg-secondary p-2 text-center text-[10px] font-semibold">{book.title}</div>
            )}
            <div className="min-w-0 pr-6">
              <span className="text-xs text-muted">{{ reading: "currently reading", read: "read", next: "up next" }[book.status]}</span>
              <h3 className="mt-1 font-semibold leading-tight">{book.title}</h3>
              <p className="text-sm text-muted">{book.author}</p>
              {book.note && <p className="mt-3 text-sm">{book.note}</p>}
            </div>
            <button onClick={() => setSelected(null)} aria-label="Close" className="absolute right-3 top-3 text-muted hover:text-fg">
              <X className="size-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      {shelves.map(([t, list]) => (
        <Shelf key={t} title={t} books={list} selected={selected} onSelect={toggle} />
      ))}
    </div>
  );
}
