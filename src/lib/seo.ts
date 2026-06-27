/**
 * Canonical site URL used for metadata, sitemap, robots, and JSON-LD.
 * Override at build time with NEXT_PUBLIC_SITE_URL (e.g. the production domain
 * once it's connected in Netlify). The fallback is the default Netlify subdomain.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://tarte-web-app.netlify.app"
).replace(/\/$/, "");
