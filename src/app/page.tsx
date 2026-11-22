import Link from "next/link";
import Reveal from "@/components/Reveal";
import ResumeCard from "@/components/ResumeCard";
import YearsCounter from "@/components/YearsCounter";
import FlickeringGrid from "@/components/FlickeringGrid";
import LiveClock from "@/components/LiveClock";
import ScrambleText from "@/components/ScrambleText";
import ContributionGraph from "@/components/ContributionGraph";
import { site, about, experience, education, projects, wins, skills } from "@/data/site";
import { getContributions } from "@/lib/content";

export const revalidate = 86400; // refresh the GitHub graph daily

const D = 0.04;

function H2({ children, delay }: { children: string; delay: number }) {
  return (
    <Reveal delay={delay}>
      <h2 className="text-xl font-bold">
        <ScrambleText text={children} />
      </h2>
    </Reveal>
  );
}

export default async function Home() {
  const github = await getContributions(site.githubUser);
  return (
    <main className="flex min-h-[100dvh] flex-col space-y-10">
      <section id="hero" className="relative isolate">
        <FlickeringGrid className="pointer-events-none absolute -inset-x-6 -top-12 -z-10 h-[300px] w-[calc(100%+3rem)] [mask-image:radial-gradient(ellipse_at_top,black_10%,transparent_70%)] sm:-top-24 sm:h-[360px]" />
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="flex justify-between gap-2">
            <div className="flex flex-1 flex-col space-y-1.5">
              <Reveal className="flex">
                <span className="inline-block text-3xl font-bold tracking-tighter sm:text-5xl xl:text-5xl/none">
                  Hi, {site.firstName} Here
                </span>
              </Reveal>
              <Reveal delay={D}>
                <div className="max-w-[600px] md:text-sm">
                  {site.born ? <>Been here for <YearsCounter since={site.born} /> years</> : site.tagline}
                </div>
              </Reveal>
              <Reveal delay={D * 2}>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-2 text-xs text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="relative flex size-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                      <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                    </span>
                    {site.status}
                  </span>
                  <LiveClock />
                </div>
              </Reveal>
            </div>
            <Reveal delay={D}>
              <span className="relative flex size-28 shrink-0 overflow-hidden rounded-full border">
                {site.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={site.avatar} alt={site.name} className="aspect-square h-full w-full object-cover" />
                ) : (
                  <span className="flex h-full w-full items-center justify-center rounded-full bg-secondary">{site.initials}</span>
                )}
              </span>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="about">
        <H2 delay={D * 3}>About</H2>
        <Reveal delay={D * 4}>
          <div className="prose max-w-full text-pretty font-sans text-sm text-muted dark:prose-invert">
            {about.map((para, i) => (
              <p key={i}>
                {para.map((s, j) =>
                  s.href ? <Link key={j} href={s.href}>{s.text}</Link> : <span key={j}>{s.text}</span>
                )}
              </p>
            ))}
          </div>
        </Reveal>
      </section>

      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-3">
          <H2 delay={D * 5}>cool places I worked at</H2>
          {experience.map((r, i) => (
            <Reveal key={r.org + r.title} delay={D * 6 + i * 0.05}>
              <ResumeCard
                logo={r.logo}
                initials={r.initials}
                title={r.org}
                subtitle={r.title}
                period={r.period}
                description={r.description}
                badges={r.badges}
                href={r.href}
              />
            </Reveal>
          ))}
        </div>
      </section>

      <section id="projects">
        <div className="flex min-h-0 flex-col gap-y-3">
          <H2 delay={D * 7}>things I built</H2>
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={D * 8 + i * 0.05}>
              <ResumeCard logo={p.logo} initials={p.name[0]} title={p.name} period={p.highlight} subtitle={p.stack} description={p.oneLiner} href={p.href} />
            </Reveal>
          ))}
        </div>
      </section>

      {github && (
        <section id="github">
          <div className="flex min-h-0 flex-col gap-y-3">
            <H2 delay={D * 8.5}>shipping log</H2>
            <Reveal delay={D * 9}>
              <ContributionGraph days={github.days} total={github.total} user={site.githubUser} />
            </Reveal>
          </div>
        </section>
      )}

      <section id="wins">
        <div className="flex min-h-0 flex-col gap-y-3">
          <H2 delay={D * 9}>open source &amp; hackathons</H2>
          {wins.map((w, i) => (
            <Reveal key={w.name} delay={D * 10 + i * 0.05}>
              <ResumeCard logo={w.logo} initials={w.initials} title={w.name} period={w.right} subtitle={w.sub} description={w.description} href={w.href} />
            </Reveal>
          ))}
        </div>
      </section>

      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-3">
          <H2 delay={D * 11}>education</H2>
          {education.map((e, i) => (
            <Reveal key={e.school} delay={D * 12 + i * 0.05}>
              <ResumeCard logo={e.logo} initials={e.initials} title={e.school} subtitle={e.degree} period={e.period} href={e.href} />
            </Reveal>
          ))}
        </div>
      </section>

      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-3">
          <H2 delay={D * 13}>skills</H2>
          <div className="flex flex-wrap gap-1">
            {skills.map((s, i) => (
              <Reveal key={s} delay={D * 14 + i * 0.05}>
                <div className="inline-flex items-center rounded-md border border-transparent bg-fg px-2.5 py-0.5 text-xs font-semibold text-bg shadow transition-colors hover:bg-fg/80">
                  {s}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="grid w-full items-center justify-center gap-4 px-4 py-12 text-center md:px-6">
          <Reveal delay={D * 16}>
            <div className="space-y-3">
              <div className="inline-block rounded-lg bg-fg px-3 py-1 text-sm text-bg" />
              <p className="mx-auto max-w-[600px] text-muted md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                say hello on{" "}
                <a className="text-blue-500 hover:underline" href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
                {" "}or{" "}
                <a className="text-blue-500 hover:underline" href={`mailto:${site.email}`}>email</a>
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
