"use client";
import { motion } from "motion/react";

// Illustrative shape only: a reconstruction-error score that drifts above an
// adaptive threshold about 2.5h before a node fails. Not real telemetry.
const W = 640, H = 240, P = 28;
const hours = 12; // x axis: -12h .. 0h (failure)
const x = (h: number) => P + ((h + hours) / hours) * (W - 2 * P);
const y = (v: number) => H - P - v * (H - 2 * P);

const pts: [number, number][] = [];
for (let i = 0; i <= 120; i++) {
  const h = -hours + (i / 120) * hours;
  const noise = Math.sin(i * 1.7) * 0.03 + Math.sin(i * 0.53) * 0.04;
  const ramp = h > -3.2 ? Math.pow((h + 3.2) / 3.2, 1.8) * 0.62 : 0;
  pts.push([h, Math.min(0.97, 0.22 + noise + ramp)]);
}
const path = pts.map(([h, v], i) => `${i ? "L" : "M"}${x(h).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
const thr = pts.map(([h], i) => `${i ? "L" : "M"}${x(h).toFixed(1)},${y(0.5 + Math.sin(i * 0.2) * 0.015).toFixed(1)}`).join(" ");
const alertH = -2.5;

export default function FailureChart() {
  return (
    <figure className="rounded-2xl border border-line bg-card p-5 sm:p-6">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Anomaly score crossing the adaptive threshold about 2.5 hours before node failure">
        <rect x={x(alertH)} y={P} width={x(0) - x(alertH)} height={H - 2 * P} fill="var(--accent-soft)" />
        <line x1={P} x2={W - P} y1={H - P} y2={H - P} stroke="var(--line)" />
        {[-12, -9, -6, -3, 0].map((h) => (
          <text key={h} x={x(h)} y={H - 8} textAnchor="middle" fontSize="10" fill="var(--muted)" fontFamily="var(--font-mono)">
            {h === 0 ? "failure" : `${h}h`}
          </text>
        ))}
        <path d={thr} fill="none" stroke="var(--muted)" strokeDasharray="4 4" strokeWidth="1.2" />
        <text x={P + 4} y={y(0.5) - 6} fontSize="10" fill="var(--muted)" fontFamily="var(--font-mono)">adaptive threshold</text>
        <motion.path
          d={path} fill="none" stroke="var(--accent)" strokeWidth="2"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
          transition={{ duration: 2.2, ease: "easeInOut" }}
        />
        <line x1={x(alertH)} x2={x(alertH)} y1={P} y2={H - P} stroke="var(--accent)" strokeWidth="1" />
        <text x={x(alertH) - 6} y={P + 12} textAnchor="end" fontSize="10" fill="var(--accent)" fontFamily="var(--font-mono)">alert</text>
        <line x1={x(0)} x2={x(0)} y1={P} y2={H - P} stroke="#f87171" strokeWidth="1.5" />
        <text x={(x(alertH) + x(0)) / 2} y={P + 12} textAnchor="middle" fontSize="11" fill="var(--fg)" fontFamily="var(--font-mono)">~2.5h</text>
      </svg>
      <figcaption className="mt-3 text-xs text-muted">
        Illustration of how an alert works, not real data: the per-node anomaly score crosses its adaptive threshold well before the node fails. Measured on Marconi-100 telemetry: ~2.5h of advance warning, 6 of 7 failures caught.
      </figcaption>
    </figure>
  );
}
