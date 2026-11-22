import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import GalleryGrid from "@/components/GalleryGrid";
import { getPhotos } from "@/lib/content";

export const metadata: Metadata = { title: "Gallery", description: "Moments, places and hackathons." };

export default function GalleryPage() {
  const photos = getPhotos();
  return (
    <main className="space-y-8">
      <Reveal>
        <h1 className="text-2xl font-medium tracking-tighter">gallery</h1>
        <p className="mt-2 text-sm text-muted">Moments, places and hackathons. Hover for colour, click to open.</p>
      </Reveal>
      {photos.length ? (
        <GalleryGrid photos={photos} />
      ) : (
        <p className="text-sm text-muted">Photos coming soon.</p>
      )}
    </main>
  );
}
