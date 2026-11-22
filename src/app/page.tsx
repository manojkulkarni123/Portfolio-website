import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";
import { site, experience, projects, openSource, achievements, skills } from "@/data/site";
import { getPosts } from "@/lib/posts";

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-5xl scroll-mt-20 px-5 py-16">
      <Reveal>
        <h2 className="mb-8 font-mono text-sm uppercase tracking-widest text-accent">{`// ${title}`}</h2>
      </Reveal>
      {children}
    </section>
  );
}

export default function Home() {
  const posts = getPosts().slice(0, 3);
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="grid-bg absolute inset-0 -z-10 opacity-60" />
        <div className="mx-auto max-w-5xl px-5 pb-20 pt-24 sm:pt-32">
          <Reveal>
            <p className="font-mono text-sm text-muted">
              <span className="text-accent">$</span> whoami
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight sm:text-7xl">{site.name}</h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="caret mt-5 max-w-2xl text-xl text-muted sm:text-2xl">{site.tagline}</p>
          </Reveal>
          <Reveal delay={0.24}>
            <p className="mt-6 max-w-2xl leading-relaxed text-muted">{site.intro}</p>
          </Reveal>
          <Reveal delay={0.32}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#projects" className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-bg">
                See my work <ArrowRight size={15} />
              </a>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2 text-sm hover:border-accent">
                <Mail size={15} /> Get in touch
              </a>
              <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 font-mono text-xs text-muted">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-accent" style={{ animation: "ping-dot 1.6s ease-out infinite" }} />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                Joining HPE Networking · Feb 2027
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      <Section id="experience" title="experience">
        <ol className="relative space-y-10 border-l border-line pl-8">
          {experience.map((r) => (
            <Reveal key={r.org + r.title}>
              <li className="relative">
                <span
                  className={`absolute -left-[37px] top-1.5 h-2.5 w-2.5 rounded-full border-2 ${
                    r.status === "incoming" ? "border-accent bg-bg" : "border-accent bg-accent"
                  }`}
                />
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="text-lg font-semibold">
                    {r.title} <span className="text-muted">· {r.org}</span>
                  </h3>
                  <span className="font-mono text-xs text-muted">
                    {r.status === "incoming" && <span className="mr-2 rounded bg-accent-soft px-1.5 py-0.5 text-accent">incoming</span>}
                    {r.period}
                  </span>
                </div>
                {r.points.length > 0 && (
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
                    {r.points.map((p) => (
                      <li key={p} className="flex gap-2"><span className="text-accent">›</span><span>{p}</span></li>
                    ))}
                  </ul>
                )}
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section id="projects" title="projects">
        <div className="grid gap-5 sm:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 0.08}><ProjectCard p={p} /></Reveal>
          ))}
        </div>
      </Section>

      <Section id="open-source" title="open source & wins">
        <div className="grid gap-5 sm:grid-cols-2">
          {openSource.map((o) => (
            <Reveal key={o.name}>
              <div className="h-full rounded-2xl border border-line bg-card p-6">
                <h3 className="font-semibold">{o.name} <span className="text-sm font-normal text-muted">· {o.note}</span></h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{o.detail}</p>
              </div>
            </Reveal>
          ))}
          {achievements.map((a) => (
            <Reveal key={a.title}>
              <div className="h-full rounded-2xl border border-accent/40 bg-accent-soft p-6 sm:col-span-2">
                <h3 className="font-semibold">🏆 {a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{a.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="skills" title="skills">
        <Reveal>
          <dl className="space-y-4">
            {Object.entries(skills).map(([k, v]) => (
              <div key={k} className="flex flex-col gap-2 sm:flex-row sm:items-baseline">
                <dt className="w-40 shrink-0 font-mono text-xs text-muted">{k}</dt>
                <dd className="flex flex-wrap gap-1.5">
                  {v.map((s) => (
                    <span key={s} className="rounded-md border border-line px-2.5 py-1 text-sm">{s}</span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Section>

      {posts.length > 0 && (
        <Section id="writing" title="writing">
          <div className="space-y-4">
            {posts.map((p) => (
              <Reveal key={p.slug}>
                <Link href={`/blog/${p.slug}`} className="group flex items-baseline justify-between gap-4 border-b border-line pb-4">
                  <span className="font-medium group-hover:text-accent">{p.title}</span>
                  <span className="shrink-0 font-mono text-xs text-muted">{p.date}</span>
                </Link>
              </Reveal>
            ))}
            <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-accent">All posts <ArrowRight size={14} /></Link>
          </div>
        </Section>
      )}

      <Section id="contact" title="contact">
        <Reveal>
          <p className="max-w-xl text-2xl font-semibold tracking-tight">Building something with agents, ML or infra? Let&apos;s talk.</p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <a className="text-accent hover:underline" href={`mailto:${site.email}`}>{site.email}</a>
            <a className="hover:text-accent" href={site.github} target="_blank" rel="noreferrer">GitHub</a>
            <a className="hover:text-accent" href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
