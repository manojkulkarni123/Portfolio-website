"use client";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import type { Project } from "@/data/site";

export default function ProjectCard({ p }: { p: Project }) {
  return (
    <div
      className="group relative h-full overflow-hidden rounded-2xl border border-line bg-card p-6 transition-colors hover:border-accent/50"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      <div className="spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="relative flex h-full flex-col">
        <h3 className="text-lg font-semibold tracking-tight">{p.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{p.blurb}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.tags.map((t) => (
            <span key={t} className="rounded-md bg-accent-soft px-2 py-0.5 font-mono text-xs text-accent">{t}</span>
          ))}
        </div>
        <div className="mt-auto flex flex-wrap gap-4 pt-4 text-sm">
          {p.caseStudy && (
            <Link href={`/projects/${p.slug}`} className="inline-flex items-center gap-1 font-medium text-accent">
              Case study <ArrowRight size={14} />
            </Link>
          )}
          {p.links.map((l) => (
            <a key={l.href + l.label} href={l.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-accent">
              {l.label} <ArrowUpRight size={14} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
