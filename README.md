# manoj.dev

Personal site and blog. Next.js (App Router) + Tailwind + Motion, MDX blog, deployed on Vercel.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Edit content

- **Profile, experience, projects, skills:** `src/data/site.ts`
- **Case-study pages:** `src/app/projects/[slug]/page.tsx` (any project with `caseStudy: true`)
- **Blog posts:** add `content/blog/<slug>.mdx`

```mdx
---
title: "Post title"
date: "2026-12-01"
summary: "One line shown in the list and in RSS."
tags: ["kubernetes"]
draft: true   # remove to publish; drafts are hidden in production
---
```

Note: MDX uses `{/* comments */}`, not `<!-- -->`.

## Deploy (Vercel)

```bash
npx vercel login
npx vercel --prod
```

Or push to GitHub and import the repo at vercel.com/new. No settings needed.
After the first deploy, set your real domain in `site.url` (`src/data/site.ts`).
