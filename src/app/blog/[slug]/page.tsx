import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import PostDate from "@/components/PostDate";
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
    <section id="blog">
      <h1 className="title max-w-[650px] font-serif text-3xl tracking-tight sm:text-4xl">{meta.title}</h1>
      <div className="mb-8 mt-2 flex max-w-[650px] items-center justify-between text-sm">
        <PostDate date={meta.date} />
      </div>
      <article className="prose dark:prose-invert">
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
      </article>
    </section>
  );
}
