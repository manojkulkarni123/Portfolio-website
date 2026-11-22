"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Moon, Sun, Search } from "lucide-react";
import { site, projects } from "@/data/site";
import type { PostMeta } from "@/lib/posts";

type Item = { label: string; hint: string; run: () => void };

export default function Nav({ posts }: { posts: PostMeta[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const openPalette = () => {
    setQ("");
    setSel(0);
    setOpen(true);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setQ("");
        setSel(0);
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Theme lives on <html data-theme>; icons are swapped with CSS so SSR and client always match.
  const toggleTheme = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch {}
  };

  const go = (href: string) => () => {
    setOpen(false);
    if (href.startsWith("http") || href.startsWith("mailto")) window.open(href, "_blank");
    else router.push(href);
  };

  const items: Item[] = useMemo(
    () => [
      { label: "Experience", hint: "Section", run: go("/#experience") },
      { label: "Projects", hint: "Section", run: go("/#projects") },
      { label: "Open source", hint: "Section", run: go("/#open-source") },
      { label: "Skills", hint: "Section", run: go("/#skills") },
      { label: "Contact", hint: "Section", run: go("/#contact") },
      { label: "Blog", hint: "Page", run: go("/blog") },
      ...posts.map((p) => ({ label: p.title, hint: "Post", run: go(`/blog/${p.slug}`) })),
      ...projects.map((p) => ({ label: p.name, hint: "Project", run: go("/#projects") })),
      { label: "GitHub", hint: "Link", run: go(site.github) },
      { label: "LinkedIn", hint: "Link", run: go(site.linkedin) },
      { label: "Email me", hint: "Link", run: go(`mailto:${site.email}`) },
      { label: "Toggle theme", hint: "Action", run: () => { toggleTheme(); setOpen(false); } },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [posts]
  );
  const filtered = items.filter((i) => i.label.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5">
          <Link href="/" className="font-mono text-sm font-semibold">
            manoj<span className="text-accent">.</span>dev
          </Link>
          <nav className="flex items-center gap-5 text-sm text-muted">
            <Link href="/#experience" className="hidden hover:text-fg sm:block">Experience</Link>
            <Link href="/#projects" className="hidden hover:text-fg sm:block">Projects</Link>
            <Link href="/blog" className="hover:text-fg">Blog</Link>
            <button
              onClick={openPalette}
              className="flex items-center gap-2 rounded-lg border border-line px-2.5 py-1 text-xs hover:text-fg"
              aria-label="Open command palette"
            >
              <Search size={13} /> <span className="hidden sm:inline">Search</span>
              <kbd className="font-mono">⌘K</kbd>
            </button>
            <button onClick={toggleTheme} aria-label="Toggle theme" className="hover:text-fg">
              <Sun size={16} className="theme-dark-only" />
              <Moon size={16} className="theme-light-only" />
            </button>
          </nav>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 px-4 pt-[15vh]" onClick={() => setOpen(false)}>
          <div className="w-full max-w-lg overflow-hidden rounded-xl border border-line bg-card shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <input
              ref={inputRef}
              autoFocus
              value={q}
              onChange={(e) => { setQ(e.target.value); setSel(0); }}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") { e.preventDefault(); setSel((s) => Math.min(s + 1, filtered.length - 1)); }
                if (e.key === "ArrowUp") { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)); }
                if (e.key === "Enter") filtered[sel]?.run();
              }}
              placeholder="Jump to…"
              className="w-full border-b border-line bg-transparent px-4 py-3 font-mono text-sm outline-none"
            />
            <ul className="max-h-72 overflow-y-auto p-1.5">
              {filtered.length === 0 && <li className="px-3 py-4 text-sm text-muted">No results</li>}
              {filtered.map((i, idx) => (
                <li key={i.label + i.hint}>
                  <button
                    onClick={i.run}
                    onMouseEnter={() => setSel(idx)}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm ${idx === sel ? "bg-accent-soft text-accent" : ""}`}
                  >
                    {i.label}
                    <span className="font-mono text-xs text-muted">{i.hint}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
