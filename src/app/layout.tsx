import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import Dock from "@/components/Dock";
import { getPosts } from "@/lib/posts";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s | ${site.name}` },
  description: site.tagline,
  alternates: { types: { "application/rss+xml": "/rss.xml" } },
  openGraph: { title: site.name, description: site.tagline, type: "website" },
};

// Saved choice wins; otherwise follow the OS setting.
const themeScript = `try{var t=localStorage.getItem('theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='light'}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning className={`${inter.variable} ${geistMono.variable} antialiased`}>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body className="mx-auto min-h-screen max-w-2xl px-6 py-12 pb-32 sm:py-24 sm:pb-36">
        {children}
        <Dock posts={getPosts()} />
      </body>
    </html>
  );
}
