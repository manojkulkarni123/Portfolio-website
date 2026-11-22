"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";
import { HomeIcon, NotebookIcon, Mail, Sun, Moon } from "lucide-react";
import { site, projects } from "@/data/site";
import type { PostMeta } from "@/lib/posts";

const MAGNIFICATION = 60;
const DISTANCE = 140;
const BASE = 40;

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
      <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.2-3.1-.1-.4-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.2.8.8 1.2 1.9 1.2 3.1 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z" />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
      <path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2ZM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2ZM7.1 20.5H3.5V9h3.6v11.5ZM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0Z" />
    </svg>
  );
}

function DockIcon({ mouseX, label, children }: { mouseX: MotionValue<number>; label: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const distance = useTransform(mouseX, (x) => {
    const b = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return x - b.x - b.width / 2;
  });
  const width = useSpring(useTransform(distance, [-DISTANCE, 0, DISTANCE], [BASE, MAGNIFICATION, BASE]), {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  return (
    <motion.div ref={ref} style={{ width }} className="group relative flex aspect-square cursor-pointer items-center justify-center rounded-full">
      {children}
      <span className="pointer-events-none absolute -top-10 whitespace-nowrap rounded-md bg-fg px-3 py-1.5 text-xs text-bg opacity-0 transition-opacity group-hover:opacity-100">
        {label}
      </span>
    </motion.div>
  );
}

const btn =
  "inline-flex size-12 items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors hover:bg-accent";

type Item = { label: string; hint: string; run: () => void };

export default function Dock({ posts }: { posts: PostMeta[] }) {
  const router = useRouter();
  const mouseX = useMotionValue(Infinity);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);

  // Hidden extra: Cmd/Ctrl+K opens a quick-jump palette.
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

  const toggleTheme = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    root.style.colorScheme = next;
    try { localStorage.setItem("theme", next); } catch {}
  };

  const items: Item[] = useMemo(() => {
    const go = (href: string) => () => {
      setOpen(false);
      if (href.startsWith("http") || href.startsWith("mailto")) window.open(href, "_blank");
      else router.push(href);
    };
    return [
      { label: "Home", hint: "Page", run: go("/") },
      { label: "Blog", hint: "Page", run: go("/blog") },
      ...posts.map((p) => ({ label: p.title, hint: "Post", run: go(`/blog/${p.slug}`) })),
      ...projects.filter((p) => p.caseStudy).map((p) => ({ label: p.name, hint: "Case study", run: go(`/projects/${p.slug}`) })),
      { label: "GitHub", hint: "Link", run: go(site.github) },
      { label: "LinkedIn", hint: "Link", run: go(site.linkedin) },
      { label: "Email", hint: "Link", run: go(`mailto:${site.email}`) },
      { label: "Toggle theme", hint: "Action", run: () => { toggleTheme(); setOpen(false); } },
    ];
  }, [posts, router]);
  const filtered = items.filter((i) => i.label.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 flex h-full max-h-14 origin-bottom">
        <div className="fixed inset-x-0 bottom-0 h-16 w-full bg-bg backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] [mask-image:linear-gradient(to_top,black,transparent)]" />
        <motion.div
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          className="pointer-events-auto relative z-50 mx-auto flex h-full min-h-full w-max transform-gpu items-center rounded-full border bg-bg p-2 px-1 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
        >
          <DockIcon mouseX={mouseX} label="Home">
            <Link href="/" aria-label="Home" className={btn}><HomeIcon className="size-4" /></Link>
          </DockIcon>
          <DockIcon mouseX={mouseX} label="Blog">
            <Link href="/blog" aria-label="Blog" className={btn}><NotebookIcon className="size-4" /></Link>
          </DockIcon>
          <div role="none" className="h-full w-px shrink-0 bg-line" />
          <DockIcon mouseX={mouseX} label="GitHub">
            <a href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub" className={btn}><GitHubIcon /></a>
          </DockIcon>
          <DockIcon mouseX={mouseX} label="LinkedIn">
            <a href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={btn}><LinkedInIcon /></a>
          </DockIcon>
          <DockIcon mouseX={mouseX} label="Email">
            <a href={`mailto:${site.email}`} aria-label="Email" className={btn}><Mail className="size-4" /></a>
          </DockIcon>
          <div role="none" className="h-full w-px shrink-0 bg-line py-2" />
          <DockIcon mouseX={mouseX} label="Theme">
            <button type="button" onClick={toggleTheme} aria-label="Toggle theme" className="inline-flex h-9 w-9 items-center justify-center rounded-full px-2 transition-colors hover:bg-accent">
              <Sun className="theme-dark-only size-4" />
              <Moon className="theme-light-only size-4" />
            </button>
          </DockIcon>
        </motion.div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-4 pt-[15vh] backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div className="w-full max-w-lg overflow-hidden rounded-lg border bg-bg shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <input
              autoFocus
              value={q}
              onChange={(e) => { setQ(e.target.value); setSel(0); }}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") { e.preventDefault(); setSel((s) => Math.min(s + 1, filtered.length - 1)); }
                if (e.key === "ArrowUp") { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)); }
                if (e.key === "Enter") filtered[sel]?.run();
              }}
              placeholder="Type a command or search…"
              className="w-full border-b bg-transparent px-4 py-3 text-sm outline-none placeholder:text-muted"
            />
            <ul className="max-h-72 overflow-y-auto p-1.5">
              {filtered.length === 0 && <li className="px-3 py-4 text-sm text-muted">No results.</li>}
              {filtered.map((i, idx) => (
                <li key={i.label + i.hint}>
                  <button
                    onClick={i.run}
                    onMouseEnter={() => setSel(idx)}
                    className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm ${idx === sel ? "bg-accent" : ""}`}
                  >
                    {i.label}
                    <span className="text-xs text-muted">{i.hint}</span>
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
