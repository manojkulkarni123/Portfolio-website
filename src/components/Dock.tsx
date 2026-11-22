"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";
import { Home, NotebookPen, Mail, Search, Sun, Moon } from "lucide-react";
import { site, projects } from "@/data/site";
import type { PostMeta } from "@/lib/posts";

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

function DockItem({
  mouseX,
  label,
  children,
  href,
  onClick,
}: {
  mouseX: MotionValue<number>;
  label: string;
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const distance = useTransform(mouseX, (x) => {
    const b = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return x - b.x - b.width / 2;
  });
  const size = useSpring(useTransform(distance, [-120, 0, 120], [40, 56, 40]), { mass: 0.1, stiffness: 160, damping: 13 });

  const cls = "flex h-full w-full items-center justify-center rounded-full text-fg transition-colors hover:bg-secondary";
  const inner = href ? (
    href.startsWith("/") ? (
      <Link href={href} aria-label={label} className={cls}>{children}</Link>
    ) : (
      <a href={href} aria-label={label} target={href.startsWith("mailto") ? undefined : "_blank"} rel="noreferrer" className={cls}>{children}</a>
    )
  ) : (
    <button onClick={onClick} aria-label={label} className={cls}>{children}</button>
  );

  return (
    <motion.div ref={ref} style={{ width: size, height: size }} className="group relative flex aspect-square items-center justify-center">
      {inner}
      <span className="pointer-events-none absolute -top-9 whitespace-nowrap rounded-md border border-line bg-bg px-2 py-0.5 text-xs opacity-0 transition-opacity group-hover:opacity-100">
        {label}
      </span>
    </motion.div>
  );
}

type Item = { label: string; hint: string; run: () => void };

export default function Dock({ posts }: { posts: PostMeta[] }) {
  const router = useRouter();
  const mouseX = useMotionValue(Infinity);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);

  const openPalette = () => { setQ(""); setSel(0); setOpen(true); };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setQ(""); setSel(0);
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Theme lives on <html data-theme>; icons swap via CSS so SSR and client always match.
  const toggleTheme = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
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
      { label: "Work experience", hint: "Section", run: go("/#work") },
      { label: "Projects", hint: "Section", run: go("/#projects") },
      { label: "Contact", hint: "Section", run: go("/#contact") },
      ...posts.map((p) => ({ label: p.title, hint: "Post", run: go(`/blog/${p.slug}`) })),
      ...projects.filter((p) => p.caseStudy).map((p) => ({ label: p.name, hint: "Case study", run: go(`/projects/${p.slug}`) })),
      { label: "GitHub", hint: "Link", run: go(site.github) },
      { label: "LinkedIn", hint: "Link", run: go(site.linkedin) },
      { label: "Email me", hint: "Link", run: go(`mailto:${site.email}`) },
      { label: "Toggle theme", hint: "Action", run: () => { toggleTheme(); setOpen(false); } },
    ];
  }, [posts, router]);
  const filtered = items.filter((i) => i.label.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 h-16 bg-bg/60 backdrop-blur-lg [mask-image:linear-gradient(to_top,black,transparent)]" />
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 mx-auto mb-4 flex justify-center">
        <motion.nav
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          className="pointer-events-auto flex h-14 items-end gap-1 rounded-full border border-line bg-bg px-2 pb-2 shadow-[0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]"
        >
          <DockItem mouseX={mouseX} label="Home" href="/"><Home className="size-4" /></DockItem>
          <DockItem mouseX={mouseX} label="Blog" href="/blog"><NotebookPen className="size-4" /></DockItem>
          <span className="mx-1 h-full w-px self-center bg-line" />
          <DockItem mouseX={mouseX} label="GitHub" href={site.github}><GitHubIcon /></DockItem>
          <DockItem mouseX={mouseX} label="LinkedIn" href={site.linkedin}><LinkedInIcon /></DockItem>
          <DockItem mouseX={mouseX} label="Email" href={`mailto:${site.email}`}><Mail className="size-4" /></DockItem>
          <span className="mx-1 h-full w-px self-center bg-line" />
          <DockItem mouseX={mouseX} label="Search ⌘K" onClick={openPalette}><Search className="size-4" /></DockItem>
          <DockItem mouseX={mouseX} label="Theme" onClick={toggleTheme}>
            <Sun className="theme-dark-only size-4" />
            <Moon className="theme-light-only size-4" />
          </DockItem>
        </motion.nav>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-4 pt-[15vh] backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div className="w-full max-w-lg overflow-hidden rounded-xl border border-line bg-bg shadow-2xl" onClick={(e) => e.stopPropagation()}>
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
              className="w-full border-b border-line bg-transparent px-4 py-3 text-sm outline-none placeholder:text-muted"
            />
            <ul className="max-h-72 overflow-y-auto p-1.5">
              {filtered.length === 0 && <li className="px-3 py-4 text-sm text-muted">No results.</li>}
              {filtered.map((i, idx) => (
                <li key={i.label + i.hint}>
                  <button
                    onClick={i.run}
                    onMouseEnter={() => setSel(idx)}
                    className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm ${idx === sel ? "bg-secondary" : ""}`}
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
