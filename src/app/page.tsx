import Link from "next/link";
import Reveal from "@/components/Reveal";
import Avatar from "@/components/Avatar";
import ResumeCard from "@/components/ResumeCard";
import ProjectCard from "@/components/ProjectCard";
import { site, experience, education, projects, openSource, achievements, skills } from "@/data/site";
import { getPosts } from "@/lib/posts";

const D = 0.04; // stagger step

function Heading({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <Reveal delay={delay}>
      <h2 className="text-xl font-bold">{children}</h2>
    </Reveal>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return <span className="inline-block rounded-lg bg-fg px-3 py-1 text-sm text-bg">{children}</span>;
}

export default function Home() {
  const posts = getPosts().slice(0, 3);
  const allSkills = Object.values(skills).flat();
  const wins = [
    ...achievements.map((a) => ({ title: a.title, sub: "Hackathon", detail: a.detail, initials: "🏆" })),
    ...openSource.map((o) => ({ title: o.name, sub: o.note, detail: o.detail, initials: o.name[0] })),
  ];

  return (
    <main className="flex min-h-[100dvh] flex-col space-y-10">
      {/* hero */}
      <section>
        <div className="flex justify-between gap-2">
          <div className="flex flex-1 flex-col space-y-1.5">
            <Reveal>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Hi, I&apos;m Manoj 👋</h1>
            </Reveal>
            <Reveal delay={D}>
              <p className="max-w-[600px] md:text-xl">{site.tagline}</p>
            </Reveal>
          </div>
          <Reveal delay={D}>
            <Avatar src={site.avatar} initials={site.initials} className="size-28" textClass="text-3xl" />
          </Reveal>
        </div>
      </section>

      {/* about */}
      <section className="space-y-2">
        <Heading delay={D * 3}>About</Heading>
        <Reveal delay={D * 4}>
          <div className="space-y-3 text-pretty text-sm text-muted">
            {site.about.map((p) => <p key={p}>{p}</p>)}
          </div>
        </Reveal>
      </section>

      {/* work */}
      <section id="work" className="scroll-mt-12">
        <div className="flex min-h-0 flex-col gap-y-4">
          <Heading delay={D * 5}>Work Experience</Heading>
          {experience.map((r, i) => (
            <Reveal key={r.org + r.title} delay={D * 6 + i * 0.05}>
              <ResumeCard
                logo={r.logo}
                initials={r.initials}
                title={r.org}
                subtitle={r.title}
                period={r.period}
                badges={r.badges}
                points={r.points}
                href={r.href}
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* education */}
      <section>
        <div className="flex min-h-0 flex-col gap-y-4">
          <Heading delay={D * 7}>Education</Heading>
          {education.map((e, i) => (
            <Reveal key={e.school} delay={D * 8 + i * 0.05}>
              <ResumeCard initials={e.initials} title={e.school} subtitle={e.degree} period={e.period} href={e.href} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* skills */}
      <section>
        <div className="flex min-h-0 flex-col gap-y-3">
          <Heading delay={D * 9}>Skills</Heading>
          <div className="flex flex-wrap gap-1">
            {allSkills.map((s, i) => (
              <Reveal key={s} delay={D * 10 + i * 0.02}>
                <span className="inline-flex rounded-md bg-fg px-2 py-0.5 text-xs font-semibold text-bg">{s}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* projects */}
      <section id="projects" className="scroll-mt-12">
        <div className="w-full space-y-12 py-12">
          <Reveal delay={D * 11}>
            <div className="flex flex-col items-center justify-center space-y-2 text-center">
              <Pill>My Projects</Pill>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Check out my latest work</h2>
              <p className="text-muted md:text-xl/relaxed">
                Agents, ML systems and infrastructure. A couple of them have full write-ups.
              </p>
            </div>
          </Reveal>
          <div className="mx-auto grid max-w-[800px] grid-cols-1 gap-3 sm:grid-cols-2">
            {projects.map((p, i) => (
              <Reveal key={p.slug} delay={D * 12 + i * 0.05} className="h-full">
                <ProjectCard p={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* open source & wins */}
      <section>
        <div className="w-full space-y-12 py-12">
          <Reveal delay={D * 13}>
            <div className="flex flex-col items-center justify-center space-y-2 text-center">
              <Pill>Open Source &amp; Wins</Pill>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Things I shipped outside work</h2>
              <p className="text-muted md:text-xl/relaxed">Merged PRs and hackathon builds.</p>
            </div>
          </Reveal>
          <Reveal delay={D * 14}>
            <ul className="mb-4 ml-4 divide-y divide-dashed divide-line border-l border-line">
              {wins.map((w) => (
                <li key={w.title} className="relative ml-10 py-4">
                  <div className="absolute -left-16 top-4 flex items-center justify-center rounded-full bg-bg">
                    <Avatar initials={w.initials} className="size-12" />
                  </div>
                  <div className="flex flex-1 flex-col justify-start gap-1">
                    <span className="text-xs text-muted">{w.sub}</span>
                    <h3 className="font-semibold leading-none">{w.title}</h3>
                    <p className="text-sm text-muted">{w.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* writing */}
      {posts.length > 0 && (
        <section className="space-y-4">
          <Heading delay={D * 15}>Writing</Heading>
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={D * 16 + i * 0.05}>
              <Link href={`/blog/${p.slug}`} className="flex flex-col space-y-1">
                <span className="text-sm font-medium tracking-tight hover:underline">{p.title}</span>
                <span className="text-xs text-muted">{p.date}</span>
              </Link>
            </Reveal>
          ))}
        </section>
      )}

      {/* contact */}
      <section id="contact" className="scroll-mt-12">
        <div className="grid w-full items-center justify-center gap-4 px-4 py-12 text-center md:px-6">
          <Reveal delay={D * 17}>
            <div className="space-y-3">
              <Pill>Contact</Pill>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Get in Touch</h2>
              <p className="mx-auto max-w-[600px] text-muted md:text-xl/relaxed">
                Want to chat about agents, ML or infra? Drop me an{" "}
                <a href={`mailto:${site.email}`} className="text-fg underline underline-offset-4">email</a> or a message on{" "}
                <a href={site.linkedin} target="_blank" rel="noreferrer" className="text-fg underline underline-offset-4">LinkedIn</a>.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
