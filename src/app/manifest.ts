import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { siteDescription } from "@/lib/seo";

/** Web app manifest — improves mobile install/SEO signals. Design unchanged. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.fullName,
    short_name: site.name,
    description: siteDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#f3e9da",
    theme_color: "#211610",
    icons: [
      {
        src: "/assets/tarte-logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
