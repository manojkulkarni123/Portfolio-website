"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/site";

/** Project card: logo, name, highlight chip, description, stack chips and links. A soft spotlight follows the cursor. */
export default function ProjectCard({ p }: { p: Project }) {
  const internal = p.href?.startsWith("/");
  return (
    <div
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border bg-card p-4 transition-colors hover:border-muted/50"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "radial-gradient(260px circle at var(--mx) var(--my), color-mix(in srgb, var(--fg) 6%, transparent), transparent 70%)" }}
      />
      <div className="relative flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-white">
          <img src={p.logo} alt="" className="size-6 object-contain" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold leading-snug">{p.name}</h3>
          <span className="mt-1 inline-block rounded-full border px-2 py-px text-[10px] text-muted">{p.highlight}</span>
        </div>
      </div>

      <p className="relative mt-3 flex-1 text-xs leading-relaxed text-muted">{p.oneLiner}</p>

      <div className="relative mt-3 flex flex-wrap gap-1 border-t pt-3">
        {p.tags.map((t) => (
          <span key={t} className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[10px]">{t}</span>
        ))}
      </div>

      <div className="relative mt-3 flex flex-wrap gap-4 text-xs">
        {p.caseStudy && (
          <Link href={`/projects/${p.slug}`} className="inline-flex items-center gap-1 font-medium hover:underline">
            Case study <ArrowRight className="size-3" />
          </Link>
        )}
        {p.href && !internal && (
          <a href={p.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-muted hover:text-fg">
            {p.href.includes("github.com") ? "Repo" : "Live"} <ArrowUpRight className="size-3" />
          </a>
        )}
        {p.repo && p.repo !== p.href && (
          <a href={p.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-muted hover:text-fg">
            Repo <ArrowUpRight className="size-3" />
          </a>
        )}
      </div>
    </div>
  );
}
