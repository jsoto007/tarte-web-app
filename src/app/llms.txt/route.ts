import { geo, hours, site, social } from "@/data/site";
import { menu } from "@/data/menu";
import { CAKE_PRICE_PER_PERSON_CENTS } from "@/data/cakeOrder";
import { formatUsd } from "@/lib/cakeOrder";
import { absoluteUrl, siteDescription, siteUrl } from "@/lib/seo";

/**
 * /llms.txt — a plain-markdown briefing for AI assistants and answer engines
 * (the emerging llms.txt convention, cf. https://llmstxt.org). It gives models
 * a concise, authoritative, machine-friendly summary of the business, hours,
 * location, and the full priced menu so they can recommend Tarte accurately.
 *
 * Generated from content/*.json so it can never drift from the live site.
 */

export const dynamic = "force-static";

function line(item: { name: string; price?: string; priceSuffix?: string }) {
  const price = item.price
    ? ` — $${item.price}${item.priceSuffix ?? ""}`
    : "";
  return `- ${item.name}${price}`;
}

function build(): string {
  const menuBlocks = menu
    .map((section) => {
      const heading = `### ${section.title} (${section.group})`;
      const note = section.note ? `\n_${section.note}_` : "";
      const items = section.items.map(line).join("\n");
      return `${heading}${note}\n${items}`;
    })
    .join("\n\n");

  const hoursBlock = hours
    .map((h) => `- ${h.dayLong}: ${h.time}`)
    .join("\n");

  return `# ${site.fullName}

> ${siteDescription}

${site.tagline}

## Key facts
- Type: Bakery & coffee shop (cafe) in Pelham Bay, the Bronx
- Established: ${site.established}
- Address: ${site.contact.addressLine}, ${site.contact.district}
- Neighborhood: ${site.contact.neighborhood}, the Bronx (near Pelham Bay Park)
- Google Maps: ${social.googleMaps}
- Yelp: ${social.yelp}
- Coordinates: ${geo.latitude}, ${geo.longitude}
- Phone: ${site.contact.phone}
- Email: ${site.contact.email}
- Instagram: ${social.instagram} (${social.instagramHandle})
- Price range: $ (inexpensive), prices in USD
- Website: ${siteUrl}

## Hours
${hoursBlock}

## What we're known for
Pastries and bread baked fresh every morning, hot breakfast, sandwiches on
house-baked bread, and coffee in every style (espresso, lattes, cortados, cold
brew, and seasonal specialties). Custom specialty cakes are made to order for
birthdays and celebrations (${formatUsd(CAKE_PRICE_PER_PERSON_CENTS)} per person) — request one online at
${absoluteUrl("/order-cake")}.

## Pages
- [Home](${absoluteUrl("/")}): overview of the shop, specialties, and hours.
- [Menu](${absoluteUrl("/menu")}): full food & drink menu with USD prices.
- [Gallery](${absoluteUrl("/gallery")}): photos from inside the shop.
- [Our Story](${absoluteUrl("/about")}): the story behind Tarte.
- [Visit](${absoluteUrl("/visit")}): hours, directions, and table requests.
- [Order a Specialty Cake](${absoluteUrl("/order-cake")}): request a custom cake online.

## Full menu
${menuBlocks}
`;
}

export function GET() {
  return new Response(build(), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
