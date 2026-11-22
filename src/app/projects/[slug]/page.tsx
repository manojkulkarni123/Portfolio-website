import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/data/site";
import AgentFlow from "@/components/AgentFlow";
import FailureChart from "@/components/FailureChart";
import Reveal from "@/components/Reveal";

export function generateStaticParams() {
  return projects.filter((p) => p.caseStudy).map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? { title: p.name, description: p.blurb } : {};
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-line bg-card p-4">
      <div className="font-mono text-2xl font-semibold text-accent">{value}</div>
      <div className="mt-1 text-xs text-muted">{label}</div>
    </div>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-4 mt-14 text-2xl font-semibold tracking-tight">{children}</h2>;
}

function AgentK() {
  return (
    <>
      <p className="text-lg leading-relaxed text-muted">
        When a pod fails, an on-call engineer runs the same commands every time: logs, events, describe, check the ConfigMap, check limits.
        AgentK does that investigation automatically, then stops and asks a human before anything changes.
      </p>
      <H2>How it works</H2>
      <AgentFlow />
      <H2>Design choices</H2>
      <ul className="space-y-3 text-muted">
        <li><span className="text-fg">Read-only by construction.</span> Safety is enforced by a scoped RBAC ClusterRole, not by the prompt. Even a confused model cannot write to the cluster.</li>
        <li><span className="text-fg">Human approval gate.</span> The agent proposes a remediation plan; a person decides whether it happens.</li>
        <li><span className="text-fg">Memory from approved incidents.</span> Only incidents a human signed off on are stored in Chroma, so retrieval learns from good diagnoses, not guesses.</li>
        <li><span className="text-fg">LangGraph state machine.</span> Each step is an explicit node in a graph, which makes every run easy to follow and debug.</li>
      </ul>
    </>
  );
}

function HpcAiops() {
  return (
    <>
      <p className="text-lg leading-relaxed text-muted">
        At HPE I built deep-learning proof-of-concepts for the Advanced AI Capabilities Suite of HPE Performance Cluster Manager (HPCM):
        spotting HPC node failures before they happen and detecting anomalies across metrics and logs together.
      </p>

      <H2>Node failure prediction</H2>
      <p className="mb-6 text-muted">
        Failures are rare, so labels are scarce. Instead of learning what failure looks like, a dual LSTM-VAE learns what
        <em> normal</em> telemetry looks like across many compute nodes. Each node gets its own adaptive threshold, so a naturally noisy node does not drown out a quiet one that starts to drift.
      </p>
      <div className="mb-6 grid grid-cols-3 gap-3">
        <Stat value="~2.5h" label="advance warning" />
        <Stat value="6 / 7" label="failures caught" />
        <Stat value="85.7%" label="recall" />
      </div>
      <FailureChart />

      <H2>Multimodal anomaly detection</H2>
      <p className="mb-6 text-muted">
        Pi-Transformer fuses numeric system metrics with logs. Logs are parsed into templates with Drain, embedded with MiniLM, and combined with metrics through
        cross-modal attention. A learnable prior and association-discrepancy scoring flag behaviour that breaks the usual relationship between the two signals.
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat value="0.70" label="AUROC" />
        <Stat value="~73%" label="fault episodes caught" />
        <Stat value="40" label="metrics" />
        <Stat value="25M+" label="log lines (GAIA-MicroSS)" />
      </div>
    </>
  );
}

const bodies: Record<string, () => React.ReactElement> = { agentk: AgentK, "hpc-aiops": HpcAiops };

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  const Body = bodies[slug];
  if (!p || !Body) notFound();
  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <Link href="/#projects" className="text-sm text-muted hover:text-accent">← Projects</Link>
      <Reveal>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">{p.name}</h1>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.tags.map((t) => (
            <span key={t} className="rounded-md bg-accent-soft px-2 py-0.5 font-mono text-xs text-accent">{t}</span>
          ))}
        </div>
      </Reveal>
      <div className="mt-10"><Body /></div>
    </article>
  );
}
