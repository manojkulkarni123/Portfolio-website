/* eslint-disable @next/next/no-img-element */
import { ArrowUpRight } from "lucide-react";
import type { Milestone } from "@/data/site";

/** Open-source / hackathon card with a small vertical timeline of milestones (newest first). */
export default function OssCard({
  name,
  logo,
  badge,
  sub,
  href,
  timeline,
}: {
  name: string;
  logo: string;
  badge: string;
  sub: string;
  href: string;
  timeline: Milestone[];
}) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="flex items-start gap-3">
        <span className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full border bg-white">
          <img src={logo} alt="" className="h-full w-full object-cover" />
        </span>
        <div className="min-w-0 flex-1">
          <a href={href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1 text-sm font-semibold hover:underline">
            {name}
            <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
          </a>
          <p className="text-[11px] text-muted">{sub}</p>
        </div>
        <span className="shrink-0 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium">{badge}</span>
      </div>

      <ol className="relative ml-[15px] mt-4 space-y-4 border-l pl-5">
        {timeline.map((m, i) => (
          <li key={m.date + m.title} className="relative">
            <span
              className={`absolute -left-[25px] top-1 size-2 rounded-full border ${i === 0 ? "border-fg bg-fg" : "border-muted bg-bg"}`}
            />
            <p className="text-xs">
              <span className="mr-2 tabular-nums text-muted">{m.date}</span>
              <span className="font-medium">{m.title}</span>
            </p>
            {m.detail && <p className="mt-0.5 text-xs leading-relaxed text-muted">{m.detail}</p>}
          </li>
        ))}
      </ol>
    </div>
  );
}
