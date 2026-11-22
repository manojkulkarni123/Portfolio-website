"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import Avatar from "./Avatar";

export default function ResumeCard({
  logo,
  initials,
  title,
  subtitle,
  period,
  badges = [],
  points = [],
  href,
}: {
  logo?: string;
  initials: string;
  title: string;
  subtitle: string;
  period: string;
  badges?: string[];
  points?: string[];
  href?: string;
}) {
  const [open, setOpen] = useState(false);
  const expandable = points.length > 0;

  return (
    <div
      className={`flex ${expandable ? "cursor-pointer" : ""}`}
      onClick={() => expandable && setOpen((o) => !o)}
    >
      <Avatar src={logo} initials={initials} className="m-auto size-12" />
      <div className="group ml-4 flex flex-grow flex-col">
        <div className="flex items-center justify-between gap-x-2 text-base">
          <h3 className="inline-flex items-center gap-x-1 text-xs font-semibold leading-none sm:text-sm">
            {href ? (
              <a href={href} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="hover:underline">
                {title}
              </a>
            ) : (
              title
            )}
            {badges.map((b) => (
              <span key={b} className="ml-1 rounded-md bg-secondary px-1.5 py-0.5 text-[10px] font-semibold">{b}</span>
            ))}
            {expandable && (
              <ChevronRight
                className={`size-4 transform transition-all duration-300 ease-out ${
                  open ? "rotate-90 opacity-100" : "translate-x-0 opacity-0 group-hover:translate-x-1 group-hover:opacity-100"
                }`}
              />
            )}
          </h3>
          <span className="shrink-0 text-right text-xs tabular-nums text-muted sm:text-sm">{period}</span>
        </div>
        <div className="mt-0.5 text-xs text-muted">{subtitle}</div>
        {expandable && (
          <motion.div
            initial={false}
            animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <ul className="mt-2 list-disc space-y-1.5 pl-4 text-xs leading-relaxed text-muted sm:text-sm">
              {points.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
}
