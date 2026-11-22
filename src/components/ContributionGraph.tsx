"use client";
import { useEffect, useRef, useState } from "react";
import type { Contribution } from "@/lib/content";

const OPACITY = [0, 0.25, 0.45, 0.7, 1];

/** GitHub-style heatmap: columns are weeks, rows are weekdays. Cells ripple in when scrolled into view. */
export default function ContributionGraph({ days, total, user }: { days: Contribution[]; total: number; user: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const [hover, setHover] = useState<Contribution | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // pad the front so the first column starts on Sunday
  const pad = new Date(days[0].date + "T00:00:00").getDay();
  const cells: (Contribution | null)[] = [...Array(pad).fill(null), ...days];
  const weeks = Math.ceil(cells.length / 7);

  const label = (d: Contribution) =>
    `${d.count === 0 ? "No" : d.count} contribution${d.count === 1 ? "" : "s"} on ${new Date(d.date + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;

  return (
    <div ref={ref}>
      <div
        className="grid gap-[2px]"
        style={{ gridTemplateColumns: `repeat(${weeks}, minmax(0, 1fr))`, gridTemplateRows: "repeat(7, minmax(0, 1fr))", gridAutoFlow: "column" }}
        onMouseLeave={() => setHover(null)}
      >
        {cells.map((d, i) => (
          <div
            key={i}
            className="aspect-square rounded-[2px] transition-[opacity,transform] duration-500"
            style={{
              background: d && d.level > 0 ? `color-mix(in srgb, var(--fg) ${OPACITY[d.level] * 100}%, transparent)` : "var(--secondary)",
              opacity: !d ? 0 : shown ? 1 : 0,
              transform: shown ? "scale(1)" : "scale(0.4)",
              transitionDelay: `${Math.floor(i / 7) * 12}ms`,
            }}
            onMouseEnter={() => d && setHover(d)}
            title={d ? label(d) : undefined}
          />
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between gap-2 text-xs text-muted">
        <span className="truncate">
          {hover ? label(hover) : (
            <>
              <span className="font-semibold text-fg">{total}</span> contributions in the last year on{" "}
              <a href={`https://github.com/${user}`} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-fg">GitHub</a>
            </>
          )}
        </span>
        <span className="hidden shrink-0 items-center gap-1 sm:inline-flex">
          less
          {OPACITY.map((o, i) => (
            <span key={i} className="size-2.5 rounded-[2px]" style={{ background: i === 0 ? "var(--secondary)" : `color-mix(in srgb, var(--fg) ${o * 100}%, transparent)` }} />
          ))}
          more
        </span>
      </div>
    </div>
  );
}
