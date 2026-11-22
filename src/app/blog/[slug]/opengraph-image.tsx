import { ogImage, ogSize } from "@/lib/og";
import { getPost, getPosts } from "@/lib/posts";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Blog post";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  return ogImage(post?.meta.title ?? "Blog", "cat blog/" + slug);
}
