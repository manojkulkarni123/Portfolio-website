import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import Nav from "@/components/Nav";
import { getPosts } from "@/lib/posts";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — AI & Infrastructure Engineer`, template: `%s · ${site.name}` },
  description: site.tagline,
  alternates: { types: { "application/rss+xml": "/rss.xml" } },
  openGraph: { title: site.name, description: site.tagline, type: "website" },
};

const themeScript = `try{var t=localStorage.getItem('theme')||'dark';document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='dark'}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body className="min-h-screen flex flex-col">
        <Nav posts={getPosts()} />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-line py-8 text-center text-sm text-muted">
          © 2026 {site.name} · Built with Next.js · Press <kbd className="font-mono">⌘K</kbd> / <kbd className="font-mono">Ctrl K</kbd>
        </footer>
      </body>
    </html>
  );
}
