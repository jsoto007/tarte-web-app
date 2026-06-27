import { site } from "@/data/site";
import { siteUrl } from "@/lib/seo";

/** schema.org CafeOrCoffeeShop structured data for richer search results. */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: site.fullName,
    description:
      "Crafted coffee & cozy moments — artisan espresso, handcrafted drinks, and fresh-baked pastries on Maple Row, roasted and baked in-house since 2014.",
    url: siteUrl,
    image: `${siteUrl}/assets/hero-storefront.png`,
    logo: `${siteUrl}/assets/tarte-logo.png`,
    telephone: site.contact.phone,
    email: site.contact.email,
    foundingDate: String(site.established),
    priceRange: "$",
    servesCuisine: ["Coffee", "Bakery", "Pastries"],
    address: {
      "@type": "PostalAddress",
      streetAddress: site.contact.addressLine,
      addressLocality: site.contact.district,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "08:00",
        closes: "17:00",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // JSON-LD must be raw JSON in a script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
