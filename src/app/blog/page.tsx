import Link from "next/link";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { getPosts } from "@/lib/posts";

export const metadata: Metadata = { title: "Blog", description: "Notes on AI agents, ML systems and infrastructure." };

export default function BlogIndex() {
  const posts = getPosts();
  return (
    <section>
      <Reveal>
        <h1 className="mb-8 text-2xl font-medium tracking-tighter">blog</h1>
      </Reveal>
      {posts.map((p, i) => (
        <Reveal key={p.slug} delay={0.04 * (i + 1)}>
          <Link href={`/blog/${p.slug}`} className="mb-4 flex flex-col space-y-1">
            <span className="tracking-tight hover:underline">{p.title}</span>
            <span className="h-6 text-xs text-muted">{p.date} · {p.minutes} min read</span>
          </Link>
        </Reveal>
      ))}
      <Reveal delay={0.04 * (posts.length + 1)}>
        <a href="/rss.xml" className="text-xs text-muted hover:underline">rss</a>
      </Reveal>
    </section>
  );
}
