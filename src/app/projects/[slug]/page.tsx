import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/data/site";
import AgentFlow from "@/components/AgentFlow";
import FailureChart from "@/components/FailureChart";
import Reveal from "@/components/Reveal";
import BrainWaves from "@/components/BrainWaves";

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

const signals = [
  { name: "Frontal alpha asymmetry", where: "Fp1 vs Fp2", means: "wanting it", note: "Relatively more left-frontal activity is linked to approach. Direction, not intensity." },
  { name: "Engagement index", where: "Fz, Cz", means: "switched on", note: "Beta ÷ alpha. Focus pushes beta up and idling pushes alpha up." },
  { name: "Frontal theta", where: "Fz", means: "thinking hard", note: "Midline theta rises with mental effort and memory encoding." },
  { name: "Posterior alpha drop", where: "O1, O2, Pz", means: "eyes locked in", note: "Back-of-head alpha falls when the eyes take in something interesting." },
];

const session = [
  { label: "rest · eyes open", secs: 60, tone: "bg-secondary" },
  { label: "eyes closed", secs: 60, tone: "bg-secondary" },
];
const perAd = [
  { label: "+", secs: 4, tone: "bg-secondary", title: "fixation cross, 4 s: lets the head settle" },
  { label: "the ad · 32–90 s", secs: 60, tone: "bg-fg text-bg", title: "only this window is scored" },
  { label: "gray", secs: 3, tone: "bg-secondary", title: "gray screen, 3 s: catches the delayed reaction to the ending and logo" },
  { label: "rate", secs: 10, tone: "bg-secondary", title: "liking + purchase intent" },
];

function Bar({ parts }: { parts: { label: string; secs: number; tone: string; title?: string }[] }) {
  return (
    <div className="flex h-9 gap-1 font-mono text-[10px]">
      {parts.map((s) => (
        <div key={s.label} title={s.title} style={{ flexGrow: s.secs }} className={`flex min-w-8 items-center justify-center overflow-hidden whitespace-nowrap rounded-md px-1 ${s.tone}`}>
          {s.label}
        </div>
      ))}
    </div>
  );
}

function Eeg() {
  return (
    <>
      <p className="text-lg leading-relaxed text-muted">
        Ask people if they liked an ad and they&apos;ll tell you something. Their brain tells you something else, second by second.
        We put a 19-channel dry-electrode EEG cap on people, play them real TV ads, and turn their brainwaves into a live engagement
        curve: where the ad grabs them, where it loses them, and whether <em>wanting</em> shows up in the signal before they say a word.
      </p>

      <figure className="mt-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/projects/eeg-lab.jpg" alt="A participant wearing a dry-electrode EEG cap watches an ad on a laptop in the lab" className="w-full rounded-xl border object-cover" />
        <figcaption className="mt-2 text-xs text-muted">A test session in the lab: cap on, ad playing, brain streaming over LSL.</figcaption>
      </figure>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat value="19" label="dry electrodes" />
        <Stat value="~0.1s" label="ad ↔ brain sync" />
        <Stat value="4" label="brain measures" />
        <Stat value="5" label="real TV ads" />
      </div>

      <H2>A live brain, on a laptop</H2>
      <BrainWaves />
      <p className="mt-3 text-sm text-muted">
        The amplifier streams raw microvolts over Lab Streaming Layer, and our task stamps &quot;ad started / ad ended&quot; markers on the
        <span className="text-fg"> same clock</span>, so brain and video line up to about a tenth of a second with zero manual alignment.
        We even use the amplifier&apos;s <em>measured</em> rate (~252.6 Hz) instead of the nominal 250 Hz, which would have drifted every marker by 6%.
      </p>

      <H2>Four things we read off the scalp</H2>
      <div className="grid gap-3 sm:grid-cols-2">
        {signals.map((s) => (
          <div key={s.name} className="rounded-xl border bg-card p-4">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-sm font-semibold">{s.name}</span>
              <span className="font-mono text-[10px] text-muted">{s.where}</span>
            </div>
            <div className="mt-1 font-serif text-lg italic">↑ {s.means}</div>
            <p className="mt-1 text-xs leading-relaxed text-muted">{s.note}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-sm text-muted">
        Everyone&apos;s raw EEG is different (skull, hair, electrode contact), so no number is read raw. Every measure is a change from that
        person&apos;s own 60 s of rest. A disturbing ad can be hugely engaging and still make you want to look away; asymmetry and engagement are kept apart for exactly that reason.
      </p>

      <H2>Designing the session</H2>
      <div className="space-y-2">
        <div className="text-xs text-muted">once, at the start</div>
        <Bar parts={session} />
        <div className="pt-2 text-xs text-muted">then, for each of the five ads</div>
        <Bar parts={perAd} />
      </div>
      <ul className="mt-4 space-y-2 text-sm text-muted">
        <li><span className="font-semibold text-fg">Eyes closed is a cap check.</span> Back-of-head alpha has to jump at least 1.3× when the eyes close. If it doesn&apos;t, those electrodes aren&apos;t really touching skin.</li>
        <li><span className="font-semibold text-fg">The cross exists because of a bug.</span> In our first test the opening ~5 s of the ad were wrecked by head movement from the last key press.</li>
        <li><span className="font-semibold text-fg">Two questions, not one.</span> Liking an ad and wanting the product are different things, so we ask both.</li>
      </ul>

      <H2>Turning noise into a curve</H2>
      <ul className="space-y-2 text-sm text-muted">
        <li><span className="font-semibold text-fg">Sliding windows.</span> 3 s windows stepped every 1 s, one point per window. 1 s windows were twice as noisy (±0.8 dB vs ±0.35 dB).</li>
        <li><span className="font-semibold text-fg">Median, not mean.</span> One number per ad is the median over its windows, so a cough or jaw clench moves it by under 1%.</li>
        <li><span className="font-semibold text-fg">Blinks removed with ICA,</span> matched only on the slow (&lt;4 Hz) band, so we kill blinks without killing the 8–13 Hz alpha we&apos;re measuring right next to the eyes.</li>
        <li><span className="font-semibold text-fg">Dead electrodes caught automatically:</span> anything that copies an unconnected input or swings past 150 µV is dropped.</li>
        <li><span className="font-semibold text-fg">A replay page</span> plays the ad next to all four graphs with a moving cursor; click a graph and the video seeks to that moment.</li>
      </ul>

      <H2>Proving the pipeline before trusting it</H2>
      <p className="mb-4 text-sm text-muted">We fed it synthetic EEG with known effects planted inside and checked what came out.</p>
      <div className="overflow-hidden rounded-xl border">
        <table className="w-full text-sm">
          <thead className="bg-card text-left text-xs text-muted">
            <tr><th className="px-4 py-2 font-medium">planted</th><th className="px-4 py-2 font-medium">pipeline found</th></tr>
          </thead>
          <tbody className="divide-y font-mono text-xs">
            {[
              ["127 µV blink", "21 µV, asymmetry intact"],
              ["50% alpha drop", "49.4%"],
              ["+3.0 dB theta", "+2.87 dB"],
              ["beta doubled (+100%)", "+92% engagement"],
            ].map(([a, b]) => (
              <tr key={a}><td className="px-4 py-2">{a}</td><td className="px-4 py-2">{b}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm text-muted">
        The same tests showed an honest limit: with ~30 s of data, noise alone moves asymmetry by ±0.18, and real effects are 0.1–0.3.
        So asymmetry only means something averaged over a group, never for one person watching one ad.
      </p>

      <H2>First real recording</H2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat value="45%" label="posterior alpha drop" />
        <Stat value="+14.5%" label="engagement vs rest" />
        <Stat value="8 / 10" label="liked the ad" />
        <Stat value="4 / 10" label="would buy" />
      </div>
      <p className="mt-3 text-sm text-muted">
        One participant, one beer ad: eyes clearly locked in, engagement up, and a textbook gap between liking the ad and wanting the product.
        One person proves the rig works, not a scientific claim. Next: a full five-ad session with ~20 people, then group stats,
        an opening-seconds &quot;hook&quot; score, and inter-subject correlation (how similarly different brains react to the same ad).
      </p>

      <H2>Where it started</H2>
      <p className="text-sm text-muted">
        Before building the rig, we rebuilt a published EEG study (OpenNeuro ds002739): can brain activity just before a choice predict it?
        Our rebuild hit <span className="text-fg">AUC 0.563</span> against the paper&apos;s 0.558. Then a deep network (EEGNet) <em>lost</em> to a simple linear
        decoder (0.544 vs 0.563, p = 0.019): with ~150 trials per person, extra capacity just overfits. That lesson shaped everything after it:
        with small lab data, well-understood measures beat black boxes.
      </p>
      <p className="mt-4 text-xs text-muted">
        BMSCE major project with Siddhant Sawhney, Pranav Easwar and Padma Deepak, guided by Prof. Amit Pradhan. EEG amplifier and cap provided by ITIE Knowledge Solutions.{" "}
        <a href="https://github.com/manojkulkarni123/Neuromarketing-EEG" target="_blank" rel="noreferrer" className="text-fg underline underline-offset-4">Source on GitHub</a>.
      </p>
    </>
  );
}

const bodies: Record<string, () => React.ReactElement> = { agentk: AgentK, "hpc-aiops": HpcAiops, "eeg-neuromarketing": Eeg };

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
