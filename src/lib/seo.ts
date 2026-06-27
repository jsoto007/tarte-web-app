/**
 * Canonical site URL used for metadata, sitemap, robots, and JSON-LD.
 * Resolution order:
 *   1. NEXT_PUBLIC_SITE_URL — set this to the production domain in Netlify.
 *   2. URL — provided automatically by Netlify at build time.
 *   3. A sensible default Netlify subdomain.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.URL ??
  "https://tarte-web-app.netlify.app"
).replace(/\/$/, "");
