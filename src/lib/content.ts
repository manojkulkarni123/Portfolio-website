import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";
import { books, blogs, demoBooks, demoBlogs, type Book } from "@/data/library";
import { captions } from "@/data/gallery";

const dev = process.env.NODE_ENV !== "production";

/* ---------- library ---------- */

export function getBooks(): Book[] {
  return books.length || !dev ? books : demoBooks;
}
export function getBlogs() {
  return blogs.length || !dev ? blogs : demoBlogs;
}
export function hasLibrary() {
  return getBooks().length > 0 || getBlogs().length > 0;
}

/** Cover from Open Library's search API, cached for a month. */
export async function getCover(book: Book): Promise<string | undefined> {
  if (book.cover) return book.cover;
  try {
    const q = new URLSearchParams({ title: book.title, author: book.author, limit: "1", fields: "cover_i" });
    const res = await fetch(`https://openlibrary.org/search.json?${q}`, { next: { revalidate: 60 * 60 * 24 * 30 } });
    if (!res.ok) return undefined;
    const data = (await res.json()) as { docs?: { cover_i?: number }[] };
    const id = data.docs?.[0]?.cover_i;
    return id ? `https://covers.openlibrary.org/b/id/${id}-M.jpg` : undefined;
  } catch {
    return undefined;
  }
}

/* ---------- gallery ---------- */

export type Photo = { src: string; width: number; height: number; caption?: string; place?: string; date?: string };

const galleryDir = path.join(process.cwd(), "public", "gallery");

export function getPhotos(): Photo[] {
  if (!fs.existsSync(galleryDir)) return [];
  return fs
    .readdirSync(galleryDir)
    .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
    .sort()
    .flatMap((f) => {
      try {
        const { width, height } = imageSize(fs.readFileSync(path.join(galleryDir, f)));
        if (!width || !height) return [];
        return [{ src: `/gallery/${f}`, width, height, ...captions[f] }];
      } catch {
        return [];
      }
    });
}

/* ---------- github ---------- */

export type Contribution = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

/** Last year of public GitHub contributions, refreshed daily. */
export async function getContributions(user: string): Promise<{ total: number; days: Contribution[] } | null> {
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${user}?y=last`, {
      next: { revalidate: 60 * 60 * 24 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { total: { lastYear: number }; contributions: Contribution[] };
    return { total: data.total.lastYear, days: data.contributions };
  } catch {
    return null;
  }
}
