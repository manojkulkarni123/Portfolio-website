import Link from "next/link";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { getPosts } from "@/lib/posts";

export const metadata: Metadata = { title: "Blog", description: "My thoughts on agents, ML, infra and more." };

export default function BlogIndex() {
  const posts = getPosts();
  return (
    <section>
      <Reveal>
        <h1 className="mb-8 text-2xl font-medium tracking-tighter">blog</h1>
      </Reveal>
      {posts.map((p, i) => (
        <Reveal key={p.slug} delay={0.04 * 2 + i * 0.05}>
          <Link className="mb-4 flex flex-col space-y-1" href={`/blog/${p.slug}`}>
            <div className="flex w-full flex-col">
              <p className="tracking-tight">{p.title}</p>
              <p className="h-6 text-xs text-muted">{p.date}</p>
            </div>
          </Link>
        </Reveal>
      ))}
    </section>
  );
}
