/**
 * Your library. Add books and blogs here; covers are fetched automatically from Open Library.
 *
 *   status: "reading" | "read" | "next"
 *   note:   optional one-liner shown when someone clicks the book
 *   cover:  optional image URL if the automatic cover is wrong
 *
 * While these lists are empty, `npm run dev` shows a few demo entries so you can see the design,
 * and the live site hides the Library link from the dock.
 */

export type BookStatus = "reading" | "read" | "next";

export type Book = {
  title: string;
  author: string;
  status: BookStatus;
  note?: string;
  cover?: string;
};

export type BlogLink = {
  title: string;
  author: string;
  url: string;
  note?: string;
};

export const books: Book[] = [
  // { title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", status: "reading", note: "..." },
];

export const blogs: BlogLink[] = [
  // { title: "How to Do Great Work", author: "Paul Graham", url: "https://paulgraham.com/greatwork.html" },
];

/* ---- demo content for local development only ---- */

export const demoBooks: Book[] = [
  { title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", status: "reading", note: "Demo entry." },
  { title: "Site Reliability Engineering", author: "Betsy Beyer", status: "read", note: "Demo entry." },
  { title: "The Pragmatic Programmer", author: "David Thomas", status: "read" },
  { title: "Zero to One", author: "Peter Thiel", status: "read" },
  { title: "Deep Learning", author: "Ian Goodfellow", status: "next" },
  { title: "Kubernetes Up and Running", author: "Brendan Burns", status: "next" },
];

export const demoBlogs: BlogLink[] = [
  { title: "How to Do Great Work", author: "Paul Graham", url: "https://paulgraham.com/greatwork.html", note: "Demo entry." },
  { title: "Building effective agents", author: "Anthropic", url: "https://www.anthropic.com/engineering/building-effective-agents" },
];
