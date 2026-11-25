import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import Reveal from "./Reveal";
import ScrambleText from "./ScrambleText";

/** Serif section title with an optional "view all ↗" link on the right. */
export function SectionHeading({
  children,
  delay = 0,
  href,
  hrefLabel = "view all",
}: {
  children: string;
  delay?: number;
  href?: string;
  hrefLabel?: string;
}) {
  return (
    <Reveal delay={delay}>
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="font-serif text-2xl tracking-tight">
          <ScrambleText text={children} />
        </h2>
        {href && (
          <Link href={href} className="group inline-flex items-center gap-0.5 text-xs text-muted transition-colors hover:text-fg">
            {hrefLabel}
            <ArrowUpRight className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>
    </Reveal>
  );
}

/** Hairline that fades out at both ends. */
export function Divider() {
  return <div aria-hidden className="mx-auto h-px w-2/3 bg-gradient-to-r from-transparent via-line to-transparent" />;
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor" aria-hidden>
      <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.2-3.1-.1-.4-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.2.8.8 1.2 1.9 1.2 3.1 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z" />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor" aria-hidden>
      <path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2ZM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2ZM7.1 20.5H3.5V9h3.6v11.5ZM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0Z" />
    </svg>
  );
}
function MediumIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor" aria-hidden>
      <path d="M13.5 12a6.75 6.75 0 1 1-13.5 0 6.75 6.75 0 0 1 13.5 0Zm7.4 0c0 3.5-1.5 6.3-3.4 6.3s-3.4-2.8-3.4-6.3 1.5-6.3 3.4-6.3 3.4 2.8 3.4 6.3ZM24 12c0 3.1-.5 5.6-1.2 5.6s-1.2-2.5-1.2-5.6.5-5.6 1.2-5.6S24 8.9 24 12Z" />
    </svg>
  );
}

/** "FIND ME" label + a row of icon links. */
export function FindMe({ github, linkedin, email, medium }: { github: string; linkedin: string; email: string; medium?: string }) {
  const links = [
    { label: "GitHub", href: github, icon: <GitHubIcon /> },
    { label: "LinkedIn", href: linkedin, icon: <LinkedInIcon /> },
    { label: "Email", href: `mailto:${email}`, icon: <Mail className="size-3.5" /> },
    ...(medium ? [{ label: "Medium", href: medium, icon: <MediumIcon /> }] : []),
  ];
  return (
    <div className="space-y-2">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">find me</p>
      <div className="flex flex-wrap gap-x-4 gap-y-1.5">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target={l.href.startsWith("mailto") ? undefined : "_blank"}
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-muted underline-offset-4 transition-colors hover:text-fg hover:underline"
          >
            {l.icon}
            {l.label}
          </a>
        ))}
      </div>
    </div>
  );
}

/** Centered closing quote with a big serif quote mark and a small-caps attribution. */
export function ClosingQuote({ text, by }: { text: string; by: string }) {
  return (
    <figure className="mx-auto max-w-md py-6 text-center">
      <div aria-hidden className="font-serif text-5xl leading-none text-muted/40">&ldquo;</div>
      <blockquote className="mt-1 font-serif text-lg italic leading-relaxed text-fg/85">{text}</blockquote>
      <figcaption className="mt-5 flex items-center justify-center gap-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted">
        <span className="h-px w-8 bg-line" />
        {by}
        <span className="h-px w-8 bg-line" />
      </figcaption>
    </figure>
  );
}
