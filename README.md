# Tarte — Coffee Shop & Bakes

The marketing website for **Tarte**, an independent coffee shop and bakery
(est. 2014). A warm, editorial, five-page site that sells the brand's "crafted
coffee & cozy moments" feeling and drives two actions: **explore the menu** and
**visit / reserve a table**.

Built with **Next.js 16** (App Router) + **TypeScript** + **Tailwind CSS v4**,
deploy-ready for **Netlify**.

**Pages:** Home `/` · Menu `/menu` · Gallery `/gallery` · Our Story `/about` ·
Visit `/visit`

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

### Scripts

| Script | Does |
|---|---|
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Vitest unit + data-integrity tests |
| `npm run test:e2e` | Playwright E2E tests (builds, serves on :3100, runs Chromium) |

> First E2E run only: `npx playwright install chromium`.

---

## Editing content

All copy, prices, and imagery live in typed data files — **no code changes
needed** to update the site:

| File | Controls |
|---|---|
| `src/data/menu.ts` | Menu categories, items, prices, descriptions, photos |
| `src/data/gallery.ts` | Gallery tiles (labels, photos, which tiles are "featured"/wide) |
| `src/data/site.ts` | Nav, hours, address/contact, café specialties, feature cards, team, stats, story copy |

Photos live in `public/assets/` (menu items in `public/assets/menu/`). To add a
new menu photo, drop the file in that folder and reference it by path
(`/assets/menu/your-photo.jpg`) in `menu.ts`.

### Re-skin the brand colour

The brand gold is a single CSS variable. Change `--color-accent` in
`src/app/globals.css` and the whole site updates (buttons, underlines, accents,
links). The design handoff suggests these alternates: `#b5824e`, `#a9805c`,
`#7c9a6f`.

---

## Forms

The **reservation** form uses **Netlify Forms** — no backend required.
Submissions appear in your Netlify dashboard under **Forms**.

- The form is registered for detection via `public/__forms.html`.
- The client component posts to `/__forms.html` with the matching `form-name`.
- Locally (no Netlify backend) submissions resolve optimistically so you can see
  the success states; in production a real failure is surfaced to the user.

After the first deploy, confirm form detection is enabled in the Netlify UI
(**Site configuration → Forms**). You can add email notifications there.

---

## Deploy to Netlify (connect the repo)

This repo is deploy-ready. In the Netlify dashboard:

1. **Add new site → Import an existing project** and pick the GitHub repo
   `tarte-web-app`.
2. Build settings are auto-detected from `netlify.toml`
   (build `npm run build`, Next.js runtime plugin, Node 22). No changes needed.
3. (Recommended) Set an environment variable so canonical URLs, the sitemap,
   and social cards use your real domain:
   - `NEXT_PUBLIC_SITE_URL` = `https://your-domain.com`
4. **Deploy.** Every push to `main` redeploys automatically.

No other environment variables are required.

---

## Project structure

```
src/
  app/                 # Routes (App Router) + layout, sitemap, robots, icons
    page.tsx           #   Home
    menu/ gallery/ about/ visit/
  components/          # Nav, Footer, Button, forms, MapPlaceholder, etc.
  data/                # menu / gallery / site content (edit here)
  lib/                 # validation, form submit, seo config
public/
  assets/              # logos + photography
  __forms.html         # Netlify Forms registration
e2e/                   # Playwright tests
```

## Notes

- **Next.js 16**: Turbopack is the default for dev and build; `params` /
  `searchParams` are async. This site is fully static (every route prerenders).
- **Accessibility**: skip link, semantic landmarks, keyboard-navigable gallery
  lightbox and nav, visible focus rings, and `prefers-reduced-motion` support.
- The map, the "Roastery" tile, and team portraits are intentional placeholders
  from the design — swap them for an embedded map / real photos when ready.
