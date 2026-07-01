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

/**
 * Canonical one-line description reused across page metadata, Open Graph,
 * Twitter cards, and JSON-LD so search engines and AI assistants see a single,
 * consistent summary of the business everywhere.
 */
export const siteDescription =
  "Homemade pastries, fresh bakes, cozy coffee, and handcrafted drinks on Middletown Road in the Bronx since 2025.";

/** Absolute URL helper for metadata/JSON-LD (accepts a root-relative path). */
export const absoluteUrl = (path: string) =>
  `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
