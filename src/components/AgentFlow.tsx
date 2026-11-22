"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Play, RotateCcw } from "lucide-react";

const steps = [
  { id: "detect", label: "Detect", detail: "Watches the cluster and picks up pod failures as they happen." },
  { id: "investigate", label: "Investigate", detail: "Calls read-only tools: pod logs, events, ConfigMaps, resource usage and workload manifests. A scoped RBAC ClusterRole means the agent cannot change anything." },
  { id: "recall", label: "Recall", detail: "Searches Chroma for similar past incidents that were approved before, and uses them as context." },
  { id: "plan", label: "Plan", detail: "Writes a root-cause summary and a step-by-step remediation plan." },
  { id: "approve", label: "Human gate", detail: "Nothing happens until a human approves the plan. The model proposes; a person decides." },
  { id: "learn", label: "Remember", detail: "Approved incidents are embedded and stored in Chroma, so the next similar failure is diagnosed faster." },
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
          className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1 text-xs hover:border-accent hover:text-accent"
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
                  on ? "border-accent text-accent" : done ? "border-accent/40 text-fg" : "border-line text-muted hover:text-fg"
                } ${i === 1 ? "border-dashed" : ""}`}
              >
                {on && (
                  <motion.span layoutId="agent-active" className="absolute inset-0 z-0 rounded-xl bg-accent-soft" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
                )}
                <span className="relative block font-mono text-[10px] text-muted">0{i + 1}</span>
                <span className="relative font-medium">{s.label}</span>
              </button>
            </li>
          );
        })}
      </ol>

      <motion.p key={active} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-5 min-h-14 text-sm leading-relaxed text-muted">
        <span className="font-mono text-accent">{steps[active].label.toLowerCase()} → </span>
        {steps[active].detail}
      </motion.p>
      <p className="mt-2 font-mono text-[11px] text-muted">Dashed border = runs under a read-only RBAC ClusterRole. Step 06 feeds back into step 03.</p>
    </div>
  );
}
