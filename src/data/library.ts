/**
 * Your library. Add books and blogs here; covers are fetched automatically from Open Library.
 *
 *   status: "reading" | "read" | "next"
 *   note:   optional one-liner shown when someone clicks the book
 *   cover:  optional image URL if the automatic cover is wrong
 *
 * NOTE: the entries below are placeholder/dummy data. Replace them with your own.
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
  { title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", status: "reading", note: "How real data systems work under the hood." },
  { title: "AI Engineering", author: "Chip Huyen", status: "reading", note: "Building applications on top of foundation models." },
  { title: "Site Reliability Engineering", author: "Betsy Beyer", status: "read", note: "Google's playbook for running production systems." },
  { title: "The Pragmatic Programmer", author: "David Thomas", status: "read" },
  { title: "Kubernetes Up and Running", author: "Brendan Burns", status: "read" },
  { title: "Zero to One", author: "Peter Thiel", status: "read" },
  { title: "The Almanack of Naval Ravikant", author: "Eric Jorgenson", status: "read" },
  { title: "Atomic Habits", author: "James Clear", status: "read" },
  { title: "Deep Learning", author: "Ian Goodfellow", status: "next" },
  { title: "Systems Performance", author: "Brendan Gregg", status: "next" },
  { title: "The Beginning of Infinity", author: "David Deutsch", status: "next" },
];

export const blogs: BlogLink[] = [
  { title: "Building effective agents", author: "Anthropic", url: "https://www.anthropic.com/engineering/building-effective-agents", note: "Workflows vs agents, and when to use which." },
  { title: "LLM Powered Autonomous Agents", author: "Lilian Weng", url: "https://lilianweng.github.io/posts/2023-06-23-agent/", note: "Planning, memory and tool use, all in one post." },
  { title: "A Recipe for Training Neural Networks", author: "Andrej Karpathy", url: "https://karpathy.github.io/2019/04/25/recipe/", note: "Practical habits that save days of debugging." },
  { title: "The Illustrated Transformer", author: "Jay Alammar", url: "https://jalammar.github.io/illustrated-transformer/", note: "The clearest visual explanation of attention." },
  { title: "How to Do Great Work", author: "Paul Graham", url: "https://paulgraham.com/greatwork.html" },
];

/* ---- shown by `npm run dev` only if the lists above are empty ---- */
export const demoBooks: Book[] = [];
export const demoBlogs: BlogLink[] = [];
