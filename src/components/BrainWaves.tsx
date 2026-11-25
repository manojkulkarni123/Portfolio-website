// A fake-but-plausible EEG monitor: one trace per electrode, scrolling left forever.
// Signals are deterministic sums of sines (theta/alpha/beta-ish), so server and client render the same SVG.
const W = 600; // one period of the trace; the path is drawn twice and slid by W
const ROW = 26;
const channels: { name: string; mix: [number, number, number]; seed: number }[] = [
  { name: "Fp1", mix: [0.5, 0.7, 0.35], seed: 1 },
  { name: "Fp2", mix: [0.45, 0.8, 0.3], seed: 2 },
  { name: "Fz", mix: [0.9, 0.5, 0.4], seed: 3 },
  { name: "Cz", mix: [0.5, 0.5, 0.75], seed: 4 },
  { name: "Pz", mix: [0.35, 1, 0.3], seed: 5 },
  { name: "O1", mix: [0.3, 1.1, 0.25], seed: 6 },
];

// Integer cycle counts per W so the trace tiles seamlessly.
function trace([theta, alpha, beta]: [number, number, number], seed: number) {
  const pts: string[] = [];
  for (let i = 0; i <= 2 * W; i += 3) {
    const t = (i / W) * Math.PI * 2;
    const v =
      theta * Math.sin(t * 6 + seed) +
      alpha * Math.sin(t * 11 + seed * 1.7) * (0.6 + 0.4 * Math.sin(t * 2 + seed)) +
      beta * Math.sin(t * 23 + seed * 2.3) * 0.6 +
      0.25 * Math.sin(t * 41 + seed * 3.1);
    pts.push(`${i ? "L" : "M"}${i},${(v * 4.2).toFixed(2)}`);
  }
  return pts.join(" ");
}

export default function BrainWaves() {
  const H = channels.length * ROW + 8;
  return (
    <figure className="overflow-hidden rounded-xl border bg-card">
      <div className="flex items-center justify-between border-b px-3 py-1.5 font-mono text-[10px] text-muted">
        <span className="inline-flex items-center gap-1.5">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-70" />
            <span className="relative inline-flex size-1.5 rounded-full bg-red-500" />
          </span>
          LSL · 252.6 Hz · µV
        </span>
        <span>6 of 19 channels</span>
      </div>
      <div className="flex">
        <div className="shrink-0 border-r pt-1 font-mono text-[10px] text-muted">
          {channels.map((c) => (
            <div key={c.name} className="flex w-9 items-center justify-center" style={{ height: ROW }}>
              {c.name}
            </div>
          ))}
        </div>
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="block w-full" style={{ height: H }} aria-label="Illustrative scrolling EEG traces">
          {channels.map((c, i) => (
            <g key={c.name} transform={`translate(0 ${i * ROW + ROW / 2 + 4})`}>
              <line x1="0" x2={W} y1="0" y2="0" stroke="var(--line)" strokeWidth="0.5" />
              <g className="eeg-scroll" style={{ animationDuration: `${7 + (i % 3)}s` }}>
                <path d={trace(c.mix, c.seed)} fill="none" stroke="var(--fg)" strokeOpacity={0.85} strokeWidth="1" vectorEffect="non-scaling-stroke" />
              </g>
            </g>
          ))}
        </svg>
      </div>
    </figure>
  );
}
