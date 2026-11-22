"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Play, RotateCcw } from "lucide-react";

const steps = [
  { id: "collect", label: "collect", detail: "A read-only kopf operator spotted the failure and notified a human, who ran `agentk diagnose`. Collect builds a compact signature of the failing pod." },
  { id: "recall", label: "recall", detail: "Finds similar approved incidents in Chroma: pre-filtered by failure type, ranked by similarity, and only counted within a distance cutoff." },
  { id: "diagnose", label: "diagnose ⇄ tools", detail: "An LLM turn either calls a read-only inspector (logs, containers, ConfigMaps, resources, workload spec) and loops back, or calls submit_diagnosis. Bounded by a tool-call budget." },
  { id: "approval", label: "approval", detail: "The graph pauses for a human. A durable SQLite checkpointer lets `agentk approve` resume it from a different process. Reject, and nothing is written." },
  { id: "propose", label: "propose", detail: "Renders the remediation to a file: root cause, patch, and the past incidents it cited." },
  { id: "record", label: "record", detail: "Stores the approved incident (deduped) so the next similar failure is faster and more confident." },
];

export default function AgentFlow() {
  const [active, setActive] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => {
      if (active >= steps.length - 1) setRunning(false);
      else setActive(active + 1);
    }, 1100);
    return () => clearTimeout(t);
  }, [running, active]);

  return (
    <div className="rounded-2xl border border-line bg-card p-5 sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <span className="font-mono text-xs text-muted">agentk / langgraph</span>
        <button
          onClick={() => { setActive(0); setRunning(true); }}
          className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1 text-xs hover:border-fg hover:text-fg"
        >
          {running ? <RotateCcw size={12} /> : <Play size={12} />} {running ? "Running…" : "Run incident"}
        </button>
      </div>

      <ol className="grid gap-2 sm:grid-cols-6">
        {steps.map((s, i) => {
          const on = i === active;
          const done = i < active;
          return (
            <li key={s.id} className="relative">
              <button
                onClick={() => { setRunning(false); setActive(i); }}
                className={`relative w-full rounded-xl border px-3 py-3 text-left text-sm transition-colors ${
                  on ? "border-fg text-fg" : done ? "border-muted text-fg" : "border-line text-muted hover:text-fg"
                } ${i === 2 ? "border-dashed" : ""}`}
              >
                {on && (
                  <motion.span layoutId="agent-active" className="absolute inset-0 z-0 rounded-xl bg-secondary" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
                )}
                <span className="relative block font-mono text-[10px] text-muted">0{i + 1}</span>
                <span className="relative font-medium">{s.label}</span>
              </button>
            </li>
          );
        })}
      </ol>

      <motion.p key={active} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-5 min-h-14 text-sm leading-relaxed text-muted">
        <span className="font-mono text-fg">{steps[active].label.toLowerCase()} → </span>
        {steps[active].detail}
      </motion.p>
      <p className="mt-2 font-mono text-[11px] text-muted">Dashed = the tool loop; every tool is read-only. Step 06 feeds step 02 next time.</p>
    </div>
  );
}
