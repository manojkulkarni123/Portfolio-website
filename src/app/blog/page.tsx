import Link from "next/link";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { getPosts } from "@/lib/posts";

export const metadata: Metadata = { title: "Blog", description: "My thoughts on agents, ML, infra and more." };

function shortDate(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return `${d.getDate()} ${d.toLocaleString("en-US", { month: "short" })} '${String(d.getFullYear()).slice(2)}`;
}

export default function BlogIndex() {
  const posts = getPosts();
  return (
    <section>
      <Reveal>
        <h1 className="font-serif text-3xl tracking-tight">writings</h1>
        <p className="mt-2 text-sm text-muted">Notes on agents, ML, infra, and the things I believe in.</p>
      </Reveal>
      <Reveal delay={0.08}>
        <ul className="mt-8 divide-y border-y">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}`} className="group grid grid-cols-[4.5rem_1fr_auto] items-baseline gap-3 py-4">
                <span className="text-xs tabular-nums text-muted">{shortDate(p.date)}</span>
                <span>
                  <span className="block font-serif text-lg leading-snug transition-colors group-hover:text-fg/70">{p.title}</span>
                  {p.summary && <span className="mt-0.5 block text-xs text-muted">{p.summary}</span>}
                </span>
                <span className="text-xs tabular-nums text-muted">{p.minutes} min</span>
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
      <Reveal delay={0.12}>
        <a href="/rss.xml" className="mt-4 inline-block text-xs text-muted hover:text-fg">rss</a>
      </Reveal>
    </section>
  );
}
