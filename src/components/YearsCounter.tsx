"use client";
import { useEffect, useState } from "react";

const YEAR_MS = 365.2425 * 24 * 60 * 60 * 1000;

/** Live-ticking age, e.g. "21.284719352". Renders empty on the server to avoid a hydration mismatch. */
export default function YearsCounter({ since }: { since: string }) {
  const [v, setV] = useState("");
  useEffect(() => {
    const start = new Date(since).getTime();
    const id = setInterval(() => setV(((Date.now() - start) / YEAR_MS).toFixed(9)), 50);
    return () => clearInterval(id);
  }, [since]);
  return <span className="tabular-nums">{v}</span>;
}
