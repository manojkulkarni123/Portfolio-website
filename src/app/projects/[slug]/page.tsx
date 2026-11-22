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
    <div className="rounded-lg border border-line bg-card p-4">
      <div className="text-2xl font-bold tracking-tighter tabular-nums">{value}</div>
      <div className="mt-1 text-xs text-muted">{label}</div>
    </div>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-4 mt-12 text-xl font-bold">{children}</h2>;
}

function AgentK() {
  return (
    <>
      <p className="leading-relaxed text-muted">
        A Kubernetes remediation agent that learns from incidents. When a workload fails, AgentK investigates the way an engineer would:
        it reads logs, container state, config and the workload spec, works out the root cause, and writes a proposed fix.
        It never touches the cluster, and a human approves every diagnosis.{" "}
        <a href="https://github.com/manojkulkarni123/Agentk" target="_blank" rel="noreferrer" className="text-fg underline underline-offset-4">Source on GitHub</a>.
      </p>
      <H2>How a diagnosis runs</H2>
      <AgentFlow />
      <H2>Three ideas hold it together</H2>
      <ul className="space-y-3 text-sm text-muted">
        <li><span className="font-semibold text-fg">Hybrid trigger.</span> The operator only detects and notifies; a human runs the diagnosis. Detection is cheap and always on, while the expensive agentic part stays behind a person, so cost and autonomy are bounded by design.</li>
        <li><span className="font-semibold text-fg">Agentic diagnosis.</span> A <code>diagnose ⇄ tools</code> cycle in LangGraph. The model keeps calling read-only inspectors until it has enough evidence, then submits. It adapts to the failure in front of it instead of running one fixed prompt.</li>
        <li><span className="font-semibold text-fg">Curated memory.</span> Only approved diagnoses are stored, and writes are deduped, so a recurring failure can&apos;t pile up into a false consensus. Memory is a vetted set of incidents, not a log of every guess.</li>
      </ul>
      <H2>What it detects</H2>
      <div className="flex flex-wrap gap-1">
        {["CrashLoopBackOff", "RunContainerError", "ImagePullBackOff", "OOMKilled", "ReadinessProbeFailed", "Init-container failures", "Pending / Unschedulable", "Multi-container pods"].map((s) => (
          <span key={s} className="rounded-md bg-secondary px-2 py-0.5 text-xs font-semibold">{s}</span>
        ))}
      </div>
      <p className="mt-3 text-sm text-muted">
        Reading the desired workload spec is what catches config bugs that logs hide, like a typo in the command or a probe pointed at a path the app doesn&apos;t serve.
      </p>
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
    <article>
      <Link href="/#projects" className="text-sm text-muted hover:text-fg">← projects</Link>
      <Reveal>
        <h1 className="mt-6 text-3xl font-bold tracking-tighter sm:text-5xl">{p.name}</h1>
        <div className="mt-4 flex flex-wrap gap-1">
          {p.tags.map((t) => (
            <span key={t} className="rounded-md bg-secondary px-1.5 py-0.5 text-xs font-semibold">{t}</span>
          ))}
        </div>
      </Reveal>
      <div className="mt-10"><Body /></div>
    </article>
  );
}
