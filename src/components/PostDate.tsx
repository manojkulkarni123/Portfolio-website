"use client";
import { useEffect, useState } from "react";

function ago(date: Date) {
  const days = Math.floor((Date.now() - date.getTime()) / 86400000);
  if (days < 1) return "Today";
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

/** "September 1, 2024 (2y ago)". The relative part is computed in the browser so it never goes stale. */
export default function PostDate({ date }: { date: string }) {
  const d = new Date(date + "T00:00:00");
  const full = d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const [rel, setRel] = useState("");
  useEffect(() => {
    const id = requestAnimationFrame(() => setRel(ago(d)));
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);
  return <p className="text-sm text-neutral-600 dark:text-neutral-400">{full}{rel && ` (${rel})`}</p>;
}
