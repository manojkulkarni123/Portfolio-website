import Link from "next/link";
import type { Metadata } from "next";
import { getPosts } from "@/lib/posts";

export const metadata: Metadata = { title: "Blog", description: "Notes on AI agents, ML systems and infrastructure." };

export default function BlogIndex() {
  const posts = getPosts();
  return (
    <div className="mx-auto max-w-2xl px-5 py-16">
      <h1 className="text-4xl font-semibold tracking-tight">Blog</h1>
      <p className="mt-2 text-muted">Notes on AI agents, ML systems and infrastructure. <a href="/rss.xml" className="text-accent">RSS</a></p>
      <ul className="mt-10 space-y-8">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link href={`/blog/${p.slug}`} className="group block">
              <div className="font-mono text-xs text-muted">{p.date} · {p.minutes} min read</div>
              <h2 className="mt-1 text-xl font-semibold group-hover:text-accent">{p.title}</h2>
              <p className="mt-1 text-sm text-muted">{p.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
