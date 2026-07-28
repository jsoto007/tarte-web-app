import type { MetadataRoute } from "next";
import { navItems } from "@/data/site";
import { gallery } from "@/data/gallery";
import { absoluteUrl, siteUrl } from "@/lib/seo";

/**
 * Image entries per route (image sitemap) so Google Images can discover and
 * index the shop's photos — an extra local-discovery surface at zero UI cost.
 */
const imagesFor = (href: string): string[] => {
  if (href === "/") {
    return [absoluteUrl("/assets/hero-storefront.png")];
  }
  if (href === "/gallery") {
    return gallery.map((tile) => absoluteUrl(tile.img));
  }
  return [];
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return navItems.map((item) => ({
    url: `${siteUrl}${item.href === "/" ? "" : item.href}`,
    lastModified,
    changeFrequency: item.href === "/" ? "weekly" : "monthly",
    priority: item.href === "/" ? 1 : 0.7,
    images: imagesFor(item.href),
  }));
}
