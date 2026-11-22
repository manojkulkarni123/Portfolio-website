/**
 * Gallery: drop photos (jpg, png, webp, avif) into public/gallery/ and they appear automatically,
 * sorted by file name. Optionally add a caption / place / date per file name here.
 *
 * NOTE: dummy-*.jpg are placeholder photos from Lorem Picsum (Unsplash licence). Delete them and these captions
 * once you add your own.
 */
export const captions: Record<string, { caption?: string; place?: string; date?: string }> = {
  "dummy-01.jpg": { caption: "Placeholder: a fjord from the cliffs", place: "Unsplash via Lorem Picsum" },
  "dummy-02.jpg": { caption: "Placeholder: red rocks at sunset", place: "Unsplash via Lorem Picsum" },
  "dummy-03.jpg": { caption: "Placeholder: camp below snowy peaks", place: "Unsplash via Lorem Picsum" },
};
