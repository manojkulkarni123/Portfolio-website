"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ChevronRight, ArrowUpRight } from "lucide-react";

/**
 * One row: round logo, bold title, right-aligned date, subtitle.
 * With a description, clicking the row expands it (chevron rotates); otherwise the row is a plain link.
 */
export default function ResumeCard({
  logo,
  initials,
  title,
  subtitle,
  period,
  description,
  badges = [],
  href,
}: {
  logo?: string;
  initials: string;
  title: string;
  subtitle?: string;
  period?: string;
  description?: string;
  badges?: string[];
  href?: string;
}) {
  const [open, setOpen] = useState(false);
  const external = href && !href.startsWith("/");

  const body = (
    <div className="flex rounded-lg bg-card text-fg">
      <div className="flex-none">
        <span className="relative m-auto flex size-12 shrink-0 overflow-hidden rounded-full border dark:bg-fg">
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logo} alt={title} className="aspect-square h-full w-full bg-white object-contain" />
          ) : (
            <span className="flex h-full w-full items-center justify-center rounded-full bg-secondary">{initials}</span>
          )}
        </span>
      </div>
      <div className="group ml-4 flex-grow flex-col items-center">
        <div className="flex flex-col">
          <div className="flex items-center justify-between gap-x-2 text-base">
            <h3 className="inline-flex items-center justify-center text-xs font-semibold leading-none sm:text-sm">
              {title}
              {badges.length > 0 && (
                <span className="inline-flex gap-x-1">
                  {badges.map((b) => (
                    <span key={b} className="ml-1 inline-flex items-center rounded-md bg-secondary px-1.5 py-0 text-[10px] font-semibold sm:text-xs">
                      {b}
                    </span>
                  ))}
                </span>
              )}
              <ChevronRight
                className={`size-4 transform transition-all duration-300 ease-out ${
                  open ? "rotate-90 opacity-100" : "translate-x-0 opacity-0 group-hover:translate-x-1 group-hover:opacity-100"
                }`}
              />
            </h3>
            {period && <div className="text-right text-xs tabular-nums text-muted sm:text-sm">{period}</div>}
          </div>
          {subtitle && <div className="font-sans text-xs">{subtitle}</div>}
        </div>
        {description && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: open ? 1 : 0, height: open ? "auto" : 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-2 overflow-hidden text-xs sm:text-sm"
          >
            {description}
            {href && (
              <>
                {" "}
                {external ? (
                  <a href={href} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="inline-flex items-center text-muted underline underline-offset-2 hover:text-fg">
                    visit <ArrowUpRight className="size-3" />
                  </a>
                ) : (
                  <Link href={href} onClick={(e) => e.stopPropagation()} className="text-muted underline underline-offset-2 hover:text-fg">
                    read more →
                  </Link>
                )}
              </>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );

  if (description) {
    return (
      <div role="button" tabIndex={0} className="block cursor-pointer" onClick={() => setOpen((o) => !o)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setOpen((o) => !o))} aria-expanded={open}>
        {body}
      </div>
    );
  }
  if (!href) return <div className="block">{body}</div>;
  return external ? (
    <a href={href} target="_blank" rel="noreferrer" className="block cursor-pointer">{body}</a>
  ) : (
    <Link href={href} className="block cursor-pointer">{body}</Link>
  );
}
