import Link from "next/link";
import Reveal from "@/components/Reveal";
import ResumeCard from "@/components/ResumeCard";
import ProjectCard from "@/components/ProjectCard";
import OssCard from "@/components/OssCard";
import YearsCounter from "@/components/YearsCounter";
import FlickeringGrid from "@/components/FlickeringGrid";
import LiveClock from "@/components/LiveClock";
import ContributionGraph from "@/components/ContributionGraph";
import { SectionHeading, Divider, FindMe, ClosingQuote } from "@/components/Sections";
import { site, about, experience, education, projects, wins, skills } from "@/data/site";
import { getContributions } from "@/lib/content";
import { getPosts } from "@/lib/posts";

export const revalidate = 86400; // refresh the GitHub graph daily

const D = 0.04;

function shortDate(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return `${d.getDate()} ${d.toLocaleString("en-US", { month: "short" })} '${String(d.getFullYear()).slice(2)}`;
}

export default async function Home() {
  const github = await getContributions(site.githubUser);
  const posts = getPosts().slice(0, 4);

  return (
    <main className="flex min-h-[100dvh] flex-col space-y-14">
      {/* ---------- hero ---------- */}
      <section id="hero" className="relative isolate">
        <FlickeringGrid className="pointer-events-none absolute -inset-x-6 -top-12 -z-10 h-[300px] w-[calc(100%+3rem)] [mask-image:radial-gradient(ellipse_at_top,black_10%,transparent_70%)] sm:-top-24 sm:h-[360px]" />
        <div className="flex justify-between gap-4">
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
            <span className="relative flex size-24 shrink-0 overflow-hidden rounded-2xl border shadow-sm ring-4 ring-secondary/60 sm:size-28">
              {site.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={site.avatar} alt={site.name} className="aspect-square h-full w-full object-cover" />
              ) : (
                <span className="flex h-full w-full items-center justify-center bg-secondary">{site.initials}</span>
              )}
            </span>
          </Reveal>
        </div>

        <Reveal delay={D * 3}>
          <div className="mt-8 space-y-3 text-pretty text-sm leading-relaxed text-muted">
            {about.map((para, i) => (
              <p key={i}>
                {para.map((s, j) =>
                  s.href ? (
                    <Link key={j} href={s.href} className="text-fg underline decoration-line underline-offset-4 transition-colors hover:decoration-fg">
                      {s.text}
                    </Link>
                  ) : (
                    <span key={j}>{s.text}</span>
                  )
                )}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={D * 4}>
          <div className="mt-6">
            <FindMe github={site.github} linkedin={site.linkedin} email={site.email} medium={site.medium} />
          </div>
        </Reveal>
      </section>

      <Divider />

      {/* ---------- work ---------- */}
      <section id="work" className="flex flex-col gap-y-4">
        <SectionHeading delay={D * 5}>cool places I worked at</SectionHeading>
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
      </section>

      {/* ---------- writings ---------- */}
      {posts.length > 0 && (
        <>
          <Divider />
          <section id="writings" className="flex flex-col gap-y-2">
            <SectionHeading delay={D * 7} href="/blog">writings</SectionHeading>
            <Reveal delay={D * 8}>
              <ul className="divide-y">
                {posts.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/blog/${p.slug}`} className="group grid grid-cols-[4.5rem_1fr_auto] items-baseline gap-3 py-3">
                      <span className="text-xs tabular-nums text-muted">{shortDate(p.date)}</span>
                      <span className="font-serif text-[17px] leading-snug transition-colors group-hover:text-fg/70">{p.title}</span>
                      <span className="text-xs tabular-nums text-muted">{p.minutes} min</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </section>
        </>
      )}

      <Divider />

      {/* ---------- projects ---------- */}
      <section id="projects" className="flex flex-col gap-y-4">
        <SectionHeading delay={D * 9}>things I built</SectionHeading>
        <div className="grid gap-3 sm:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={D * 10 + (i % 2) * 0.05} className="h-full">
              <ProjectCard p={p} />
            </Reveal>
          ))}
        </div>
      </section>

      <Divider />

      {/* ---------- open source ---------- */}
      <section id="oss" className="flex flex-col gap-y-4">
        <SectionHeading delay={D * 11}>open source &amp; hackathons</SectionHeading>
        <div className="space-y-3">
          {wins.map((w, i) => (
            <Reveal key={w.name} delay={D * 12 + i * 0.05}>
              <OssCard name={w.name} logo={w.logo} badge={w.right} sub={w.sub} href={w.href} timeline={w.timeline} />
            </Reveal>
          ))}
        </div>
      </section>

      {github && (
        <>
          <Divider />
          <section id="github" className="flex flex-col gap-y-4">
            <SectionHeading delay={D * 13}>shipping log</SectionHeading>
            <Reveal delay={D * 14}>
              <ContributionGraph days={github.days} total={github.total} user={site.githubUser} />
            </Reveal>
          </section>
        </>
      )}

      <Divider />

      {/* ---------- education + skills ---------- */}
      <section id="education" className="flex flex-col gap-y-4">
        <SectionHeading delay={D * 15}>education</SectionHeading>
        {education.map((e, i) => (
          <Reveal key={e.school} delay={D * 16 + i * 0.05}>
            <ResumeCard logo={e.logo} initials={e.initials} title={e.school} subtitle={e.degree} period={e.period} href={e.href} />
          </Reveal>
        ))}
      </section>

      <section id="skills" className="flex flex-col gap-y-4">
        <SectionHeading delay={D * 17}>skills</SectionHeading>
        <div className="flex flex-wrap gap-1">
          {skills.map((s, i) => (
            <Reveal key={s} delay={D * 18 + i * 0.03}>
              <div className="inline-flex items-center rounded-md border border-transparent bg-fg px-2.5 py-0.5 text-xs font-semibold text-bg shadow transition-colors hover:bg-fg/80">
                {s}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Divider />

      {/* ---------- contact + quote ---------- */}
      <section id="contact" className="space-y-10 text-center">
        <Reveal delay={D * 19}>
          <p className="mx-auto max-w-[600px] text-muted md:text-lg/relaxed">
            I&apos;m always happy to talk to new people. Say hello on{" "}
            <a className="text-blue-500 hover:underline" href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            {" "}or by{" "}
            <a className="text-blue-500 hover:underline" href={`mailto:${site.email}`}>email</a>.
          </p>
        </Reveal>
        <Reveal delay={D * 20}>
          <ClosingQuote text={site.quote.text} by={site.quote.by} />
        </Reveal>
      </section>
    </main>
  );
}
