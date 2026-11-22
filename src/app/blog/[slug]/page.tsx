import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import { getPost, getPosts } from "@/lib/posts";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.meta.title, description: post.meta.summary };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const { meta, content } = post;
  return (
    <article>
      <Link href="/blog" className="text-sm text-muted hover:text-fg">← blog</Link>
      <h1 className="mt-6 max-w-[650px] text-3xl font-medium tracking-tighter">{meta.title}</h1>
      <div className="mt-2 text-sm text-muted">{meta.date} · {meta.minutes} min read</div>
      <div className="prose-blog mt-8">
        <MDXRemote
          source={content}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [
                rehypeSlug,
                [rehypePrettyCode, { theme: { light: "github-light", dark: "github-dark" }, keepBackground: false }],
              ],
            },
          }}
        />
      </div>
    </article>
  );
}
