import type { MetadataRoute } from "next";
import { site, projects } from "@/data/site";
import { getPosts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url },
    { url: `${site.url}/blog` },
    ...projects.filter((p) => p.caseStudy).map((p) => ({ url: `${site.url}/projects/${p.slug}` })),
    ...getPosts().map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: p.date })),
  ];
}
