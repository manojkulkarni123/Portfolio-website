"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { HomeIcon, NotebookIcon, Mail, Sun, Moon, Images, LibraryBig } from "lucide-react";
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

type DockEntry = {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
  match?: (path: string) => boolean;
};

function DockIcon({
  entry,
  mouseX,
  active,
  hovered,
  onHover,
}: {
  entry: DockEntry;
  mouseX: MotionValue<number>;
  active: boolean;
  hovered: boolean;
  onHover: (id: string | null) => void;
}) {
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

  const cls = "relative z-10 flex h-full w-full items-center justify-center rounded-full";
  const external = entry.href && !entry.href.startsWith("/");
  const inner = entry.href ? (
    external ? (
      <a href={entry.href} aria-label={entry.label} target={entry.href.startsWith("mailto") ? undefined : "_blank"} rel="noreferrer" className={cls}>{entry.icon}</a>
    ) : (
      <Link href={entry.href} aria-label={entry.label} className={cls}>{entry.icon}</Link>
    )
  ) : (
    <button type="button" onClick={entry.onClick} aria-label={entry.label} className={cls}>{entry.icon}</button>
  );

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      whileTap={{ scale: 0.82 }}
      onHoverStart={() => onHover(entry.id)}
      onHoverEnd={() => onHover(null)}
      className="relative flex aspect-square cursor-pointer items-center justify-center rounded-full"
    >
      {/* sliding hover highlight, shared between icons */}
      {hovered && (
        <motion.span layoutId="dock-hover" className="absolute inset-0 rounded-full bg-accent" transition={{ type: "spring", stiffness: 500, damping: 35 }} />
      )}
      {inner}
      {/* active page dot */}
      <AnimatePresence>
        {active && (
          <motion.span
            layoutId="dock-active"
            className="absolute -bottom-1 size-1 rounded-full bg-fg"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          />
        )}
      </AnimatePresence>
      {/* tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="pointer-events-none absolute -top-10 whitespace-nowrap rounded-md bg-fg px-2.5 py-1 text-xs font-medium text-bg"
          >
            {entry.label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

type Item = { label: string; hint: string; run: () => void };

function toggleTheme() {
  const root = document.documentElement;
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  root.style.colorScheme = next;
  try { localStorage.setItem("theme", next); } catch {}
}

export default function Dock({
  posts,
  showGallery,
  showLibrary,
}: {
  posts: PostMeta[];
  showGallery: boolean;
  showLibrary: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const mouseX = useMotionValue(Infinity);
  const [hovered, setHovered] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);

  // scroll progress line + hide on scroll down, show on scroll up
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    const nearBottom = window.innerHeight + y >= document.documentElement.scrollHeight - 80;
    setHidden(y > prev && y > 160 && !nearBottom);
  });

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

  const groups: DockEntry[][] = [
    [
      { id: "home", label: "Home", href: "/", icon: <HomeIcon className="size-4" />, match: (p) => p === "/" },
      { id: "blog", label: "Blog", href: "/blog", icon: <NotebookIcon className="size-4" />, match: (p) => p.startsWith("/blog") },
      ...(showLibrary ? [{ id: "library", label: "Library", href: "/library", icon: <LibraryBig className="size-4" />, match: (p: string) => p.startsWith("/library") }] : []),
      ...(showGallery ? [{ id: "gallery", label: "Gallery", href: "/gallery", icon: <Images className="size-4" />, match: (p: string) => p.startsWith("/gallery") }] : []),
    ],
    [
      { id: "github", label: "GitHub", href: site.github, icon: <GitHubIcon /> },
      { id: "linkedin", label: "LinkedIn", href: site.linkedin, icon: <LinkedInIcon /> },
      { id: "email", label: "Email", href: `mailto:${site.email}`, icon: <Mail className="size-4" /> },
    ],
    [
      {
        id: "theme",
        label: "Theme",
        onClick: toggleTheme,
        icon: (
          <motion.span whileTap={{ rotate: 180 }} className="flex">
            <Sun className="theme-dark-only size-4" />
            <Moon className="theme-light-only size-4" />
          </motion.span>
        ),
      },
    ],
  ];

  const items: Item[] = useMemo(() => {
    const go = (href: string) => () => {
      setOpen(false);
      if (href.startsWith("http") || href.startsWith("mailto")) window.open(href, "_blank");
      else router.push(href);
    };
    return [
      { label: "Home", hint: "Page", run: go("/") },
      { label: "Blog", hint: "Page", run: go("/blog") },
      ...(showLibrary ? [{ label: "Library", hint: "Page", run: go("/library") }] : []),
      ...(showGallery ? [{ label: "Gallery", hint: "Page", run: go("/gallery") }] : []),
      ...posts.map((p) => ({ label: p.title, hint: "Post", run: go(`/blog/${p.slug}`) })),
      ...projects.filter((p) => p.caseStudy).map((p) => ({ label: p.name, hint: "Case study", run: go(`/projects/${p.slug}`) })),
      { label: "GitHub", hint: "Link", run: go(site.github) },
      { label: "LinkedIn", hint: "Link", run: go(site.linkedin) },
      { label: "Email", hint: "Link", run: go(`mailto:${site.email}`) },
      { label: "Toggle theme", hint: "Action", run: () => { toggleTheme(); setOpen(false); } },
    ];
  }, [posts, router, showGallery, showLibrary]);
  const filtered = items.filter((i) => i.label.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 h-16 w-full bg-bg backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] [mask-image:linear-gradient(to_top,black,transparent)]" />
      <motion.div
        animate={{ y: hidden ? 96 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="pointer-events-none fixed inset-x-0 bottom-0 z-40 mx-auto mb-4 flex h-14 origin-bottom"
      >
        <motion.nav
          aria-label="Main"
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => { mouseX.set(Infinity); setHovered(null); }}
          className="pointer-events-auto relative mx-auto flex h-full w-max transform-gpu items-center gap-0.5 overflow-visible rounded-full border bg-bg/80 px-1.5 backdrop-blur-xl [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
        >
          {/* scroll progress along the top edge */}
          <span className="pointer-events-none absolute inset-x-6 -top-px h-px overflow-hidden">
            <motion.span className="block h-full origin-left bg-fg/70" style={{ scaleX: progress }} />
          </span>

          {groups.map((group, gi) => (
            <div key={gi} className="flex h-full items-center gap-0.5">
              {gi > 0 && <div role="none" className="mx-1 h-3/5 w-px shrink-0 bg-line" />}
              {group.map((entry) => (
                <DockIcon
                  key={entry.id}
                  entry={entry}
                  mouseX={mouseX}
                  active={!!entry.match?.(pathname)}
                  hovered={hovered === entry.id}
                  onHover={setHovered}
                />
              ))}
            </div>
          ))}
        </motion.nav>
      </motion.div>

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
