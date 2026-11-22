import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Bookshelf from "@/components/Bookshelf";
import ResumeCard from "@/components/ResumeCard";
import { getBooks, getBlogs, getCover } from "@/lib/content";

export const metadata: Metadata = { title: "Library", description: "Books I've read, am reading, and want to read, plus blogs worth your time." };
export const revalidate = 2592000; // covers are cached for 30 days

export default async function LibraryPage() {
  const books = await Promise.all(getBooks().map(async (b) => ({ ...b, coverUrl: await getCover(b) })));
  const blogs = getBlogs();

  return (
    <main className="space-y-12">
      <Reveal>
        <h1 className="text-2xl font-medium tracking-tighter">library</h1>
        <p className="mt-2 text-sm text-muted">Books that shaped how I think, and a few I&apos;m eyeing. Tap a spine.</p>
      </Reveal>

      <Reveal delay={0.08}>
        {books.length ? <Bookshelf books={books} /> : <p className="text-sm text-muted">The shelves are being stocked.</p>}
      </Reveal>

      {blogs.length > 0 && (
        <section className="flex flex-col gap-y-3">
          <Reveal delay={0.12}>
            <h2 className="text-xl font-bold">blogs worth reading</h2>
          </Reveal>
          {blogs.map((b, i) => {
            const host = new URL(b.url).hostname;
            return (
              <Reveal key={b.url} delay={0.16 + i * 0.05}>
                <ResumeCard
                  logo={`https://www.google.com/s2/favicons?domain=${host}&sz=64`}
                  initials={b.author[0]}
                  title={b.title}
                  subtitle={b.author}
                  period={host.replace(/^www\./, "")}
                  description={b.note}
                  href={b.url}
                />
              </Reveal>
            );
          })}
        </section>
      )}
    </main>
  );
}
