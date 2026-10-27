import type { Metadata } from "next";
import { site } from "@/data/site";

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
  "Pelham Bay bakery & coffee shop on Middletown Road in the Bronx: homemade pastries, bread baked fresh daily, hot breakfast, sandwiches, custom cakes & coffee.";

/** Homepage <title>, led by the primary local keyword. */
export const homeTitle =
  "Tarte | Pelham Bay Bakery & Coffee Shop in the Bronx, NY";

/** Absolute URL helper for metadata/JSON-LD (accepts a root-relative path). */
export const absoluteUrl = (path: string) =>
  `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;

/**
 * Social share image (1200×628 JPEG, well under the ~300 KB that WhatsApp and
 * iMessage previews need — the 3 MB hero PNG was too heavy to unfurl).
 */
export const shareImage = {
  url: "/assets/og-tarte.jpg",
  width: 1200,
  height: 628,
  alt: `The ${site.fullName} storefront on Middletown Road in Pelham Bay, Bronx`,
};

/**
 * Full per-page metadata. Next.js replaces (not merges) a parent's
 * `openGraph`/`twitter` objects, so a page that sets only an OG title loses the
 * site name, image, and type. Build every page's metadata through this helper.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  /** Full <title>; rendered as-is (no template suffix). */
  title: string;
  description: string;
  /** Root-relative canonical path, e.g. "/menu". */
  path: string;
}): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.fullName,
      locale: "en_US",
      title,
      description,
      url: path,
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [shareImage.url],
    },
  };
}
