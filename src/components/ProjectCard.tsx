import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/site";

export default function ProjectCard({ p }: { p: Project }) {
  const title = p.caseStudy ? (
    <Link href={`/projects/${p.slug}`} className="hover:underline">{p.name}</Link>
  ) : (
    p.name
  );
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-line bg-card p-4 transition-shadow duration-300 hover:shadow-lg">
      <h3 className="font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 flex-1 text-xs leading-relaxed text-muted">{p.blurb}</p>
      <div className="mt-3 flex flex-wrap gap-1">
        {p.tags.map((t) => (
          <span key={t} className="rounded-md bg-secondary px-1.5 py-0.5 text-[10px] font-semibold">{t}</span>
        ))}
      </div>
      {(p.caseStudy || p.links.length > 0) && (
        <div className="mt-3 flex flex-wrap gap-1">
          {p.caseStudy && (
            <Link href={`/projects/${p.slug}`} className="inline-flex items-center gap-1 rounded-md bg-fg px-2 py-1 text-[10px] font-semibold text-bg">
              Case study
            </Link>
          )}
          {p.links.map((l) => (
            <a key={l.href + l.label} href={l.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-0.5 rounded-md bg-fg px-2 py-1 text-[10px] font-semibold text-bg">
              {l.label} <ArrowUpRight className="size-3" />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
