import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const dir = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  minutes: number;
};

function read(slug: string) {
  const raw = fs.readFileSync(path.join(dir, `${slug}.mdx`), "utf8");
  const { data, content } = matter(raw);
  const meta: PostMeta = {
    slug,
    title: data.title,
    date: new Date(data.date).toISOString().slice(0, 10),
    summary: data.summary ?? "",
    tags: data.tags ?? [],
    minutes: Math.max(1, Math.round(readingTime(content).minutes)),
  };
  return { meta, content, draft: !!data.draft };
}

export function getPosts(): PostMeta[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => read(f.replace(/\.mdx$/, "")))
    .filter((p) => !p.draft)
    .map((p) => p.meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string) {
  if (!/^[\w-]+$/.test(slug) || !fs.existsSync(path.join(dir, `${slug}.mdx`))) return null;
  const post = read(slug);
  return post.draft && process.env.NODE_ENV === "production" ? null : post;
}
