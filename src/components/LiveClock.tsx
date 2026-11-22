"use client";
import { useEffect, useState } from "react";

/** "Bengaluru · 11:42:07 PM" ticking in IST, with a day/night glyph. Empty on the server to avoid hydration mismatch. */
export default function LiveClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    const first = requestAnimationFrame(() => setNow(new Date()));
    return () => { clearInterval(id); cancelAnimationFrame(first); };
  }, []);

  const time = now?.toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata", hour: "numeric", minute: "2-digit", second: "2-digit" });
  const hour = now ? Number(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata", hour: "numeric", hour12: false })) : 12;
  const night = hour < 6 || hour >= 19;

  return (
    <span className="inline-flex items-center gap-1.5 tabular-nums">
      <span aria-hidden>{night ? "☾" : "☀"}</span>
      Bengaluru · {time ?? "--:--:-- --"}
    </span>
  );
}
