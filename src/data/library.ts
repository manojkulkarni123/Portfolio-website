/**
 * Your library. Add books and blogs here; covers are fetched automatically from Open Library.
 *
 *   status: "reading" | "read" | "next"
 *   note:   optional one-liner shown when someone clicks the book
 *   cover:  optional image URL if the automatic cover is wrong
 *
 * NOTE: the books are yours (from Obsidian); the blogs are still placeholder picks. Replace them with your own.
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

const cover = (id: number) => `https://covers.openlibrary.org/b/id/${id}-M.jpg`;

// From Obsidian: Library/Books i read.md
export const books: Book[] = [
  { title: "Meditations", author: "Marcus Aurelius", status: "read", cover: cover(15256763) },
  { title: "The Almanack of Naval Ravikant", author: "Eric Jorgenson", status: "read" },
  { title: "The Tao of Seneca", author: "Seneca", status: "read", note: "Practical letters from a Stoic master.", cover: "/covers/tao-of-seneca.png" },
  { title: "Self-Reliance", author: "Ralph Waldo Emerson", status: "read" },
  { title: "Jonathan Livingston Seagull", author: "Richard Bach", status: "read", cover: cover(6522230) },
  { title: "Can't Hurt Me", author: "David Goggins", status: "read" },
  { title: "Influence", author: "Robert Cialdini", status: "read" },
  { title: "Jaws: The Story of a Hidden Epidemic", author: "Sandra Kahn & Paul Ehrlich", status: "read", cover: cover(12604731) },
  { title: "The Laws of Human Nature", author: "Robert Greene", status: "read" },
  { title: "Mastery", author: "Robert Greene", status: "read" },
  { title: "The Stranger", author: "Albert Camus", status: "read", cover: cover(13151269) },
  { title: "Notes from Underground", author: "Fyodor Dostoevsky", status: "read" },
  { title: "Inner War and Peace", author: "Osho", status: "read", note: "Timeless solutions to conflict from the Bhagavad Gita.", cover: cover(2022649) },
  { title: "Psycho-Cybernetics", author: "Maxwell Maltz", status: "read" },
  { title: "Steal Like an Artist", author: "Austin Kleon", status: "read" },
  { title: "Chanakya Neeti", author: "Chanakya", status: "read" },
  { title: "Inside Chanakya's Mind", author: "Radhakrishnan Pillai", status: "read", note: "Aanvikshiki and the art of thinking." },
  { title: "The Art of Learning", author: "Josh Waitzkin", status: "read" },
  { title: "Start with Why", author: "Simon Sinek", status: "read" },
  { title: "The Compound Effect", author: "Darren Hardy", status: "read" },
  { title: "How to Think Like Leonardo da Vinci", author: "Michael J. Gelb", status: "read" },
  { title: "The Alchemist", author: "Paulo Coelho", status: "read" },
  { title: "Man's Search for Meaning", author: "Viktor E. Frankl", status: "read", cover: cover(14633660) },
  { title: "Zero to One", author: "Peter Thiel", status: "read", cover: cover(9002334) },

  // few I'm eyeing (from Obsidian: Library/Books to read.md)
  { title: "Thinking in Bets", author: "Annie Duke", status: "next", cover: cover(8792782) },
  { title: "1984", author: "George Orwell", status: "next", cover: cover(8745958) },
  { title: "Flow", author: "Mihaly Csikszentmihalyi", status: "next", cover: cover(11041932) },
];

// blogs worth reading: the section appears on /library once this has entries
export const blogs: BlogLink[] = [];

/* ---- shown by `npm run dev` only if the lists above are empty ---- */
export const demoBooks: Book[] = [];
export const demoBlogs: BlogLink[] = [];
