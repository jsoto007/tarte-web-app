import { directionsUrl, geo, hours, site, social } from "@/data/site";
import { menu } from "@/data/menu";
import { absoluteUrl, siteDescription, siteUrl } from "@/lib/seo";

/**
 * Centralized schema.org (JSON-LD) builders.
 *
 * Structured data is the single most effective way to make this site legible
 * to search engines AND AI assistants (ChatGPT, Claude, Perplexity, Gemini,
 * Google's AI Overviews). It lets them read the business, hours, location, and
 * the full priced menu as data rather than guessing from prose — which is what
 * powers accurate recommendations ("a bakery near Middletown Rd that opens at 7").
 *
 * Everything is derived from content/*.json so the JSON-LD can never drift from
 * what the site actually displays.
 */

const ORG_ID = `${siteUrl}/#organization`;
const BUSINESS_ID = `${siteUrl}/#business`;
const WEBSITE_ID = `${siteUrl}/#website`;

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

/** Expand a day label ("Monday – Friday" or "Saturday") into schema day names. */
function daysInRange(label: string): string[] {
  const parts = label.split(/[–-]/).map((s) => s.trim());
  if (parts.length === 1) {
    return DAYS.includes(parts[0] as (typeof DAYS)[number]) ? [parts[0]] : [];
  }
  const start = DAYS.indexOf(parts[0] as (typeof DAYS)[number]);
  const end = DAYS.indexOf(parts[1] as (typeof DAYS)[number]);
  if (start === -1 || end === -1) return [];
  return DAYS.slice(start, end + 1) as unknown as string[];
}

/** "7:00 AM" -> "07:00" (ISO 24h for OpeningHoursSpecification). */
function to24h(t: string): string {
  const m = t.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!m) return t.trim();
  let h = parseInt(m[1], 10);
  const meridiem = m[3].toUpperCase();
  if (meridiem === "PM" && h !== 12) h += 12;
  if (meridiem === "AM" && h === 12) h = 0;
  return `${String(h).padStart(2, "0")}:${m[2]}`;
}

/** Derive OpeningHoursSpecification from the human-readable hours rows. */
function openingHours() {
  return hours.map((row) => {
    const [opens, closes] = row.time.split(/[–-]/).map((s) => to24h(s));
    return {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: daysInRange(row.dayLong),
      opens,
      closes,
    };
  });
}

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: site.contact.addressLine,
  addressLocality: site.contact.locality,
  addressRegion: site.contact.region,
  postalCode: site.contact.postalCode,
  addressCountry: site.contact.country,
};

/** Organization node — the brand behind the shop and the site. */
function organizationNode() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.fullName,
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/assets/tarte-logo.png"),
    },
    sameAs: [social.instagram],
  };
}

/** WebSite node — helps engines/AI understand the site as a whole. */
function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: siteUrl,
    name: site.fullName,
    description: siteDescription,
    inLanguage: "en-US",
    publisher: { "@id": ORG_ID },
  };
}

/** The LocalBusiness (CafeOrCoffeeShop) node — the richest, most useful node. */
function businessNode() {
  return {
    "@type": ["CafeOrCoffeeShop", "Bakery"],
    "@id": BUSINESS_ID,
    name: site.fullName,
    alternateName: site.name,
    description: siteDescription,
    slogan: site.tagline,
    url: siteUrl,
    image: [
      absoluteUrl("/assets/hero-storefront.png"),
      absoluteUrl("/assets/hero-cafe.jpg"),
    ],
    logo: absoluteUrl("/assets/tarte-logo.png"),
    telephone: site.contact.phone,
    email: site.contact.email,
    foundingDate: String(site.established),
    priceRange: "$",
    currenciesAccepted: "USD",
    paymentAccepted: "Cash, Credit Card, Debit Card",
    servesCuisine: [
      "Coffee",
      "Bakery",
      "Pastries",
      "Breakfast",
      "Sandwiches",
    ],
    address: postalAddress,
    geo: {
      "@type": "GeoCoordinates",
      latitude: geo.latitude,
      longitude: geo.longitude,
    },
    hasMap: directionsUrl,
    areaServed: { "@type": "City", name: "The Bronx" },
    hasMenu: absoluteUrl("/menu"),
    acceptsReservations: absoluteUrl("/visit"),
    sameAs: [social.instagram],
    parentOrganization: { "@id": ORG_ID },
    openingHoursSpecification: openingHours(),
  };
}

/**
 * The site-wide JSON-LD graph (Organization + WebSite + LocalBusiness),
 * rendered once in the root layout.
 */
export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationNode(), websiteNode(), businessNode()],
  };
}

/**
 * The full, machine-readable menu as a schema.org Menu. This is what lets an AI
 * assistant answer "what pastries does Tarte have and how much?" precisely.
 */
export function menuSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": `${siteUrl}/menu#menu`,
    name: `${site.name} Menu`,
    inLanguage: "en-US",
    url: absoluteUrl("/menu"),
    provider: { "@id": BUSINESS_ID },
    hasMenuSection: menu.map((section) => ({
      "@type": "MenuSection",
      name: section.title,
      ...(section.note ? { description: section.note } : {}),
      hasMenuItem: section.items.map((item) => ({
        "@type": "MenuItem",
        name: item.name,
        ...(item.desc ? { description: item.desc } : {}),
        ...(item.price
          ? {
              offers: {
                "@type": "Offer",
                price: item.price,
                priceCurrency: "USD",
              },
            }
          : {}),
      })),
    })),
  };
}

/** A BreadcrumbList for an inner page, e.g. Home › Menu. */
export function breadcrumbSchema(
  trail: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}
