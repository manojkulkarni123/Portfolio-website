import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import Dock from "@/components/Dock";
import { getPosts } from "@/lib/posts";
import { getPhotos, hasLibrary } from "@/lib/content";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s | ${site.name}` },
  description: site.tagline,
  alternates: { types: { "application/rss+xml": "/rss.xml" } },
  openGraph: { title: site.name, description: site.tagline, type: "website" },
};

// Dark by default; a saved choice wins.
const themeScript = `try{var t=localStorage.getItem('theme')||'dark';document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning className={`${inter.variable} ${geistMono.variable}`}>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body className="mx-auto min-h-screen max-w-2xl overflow-x-clip bg-bg px-6 py-12 font-sans antialiased sm:py-24">
        {children}
        <Dock posts={getPosts()} showGallery={getPhotos().length > 0} showLibrary={hasLibrary()} />
      </body>
    </html>
  );
}
