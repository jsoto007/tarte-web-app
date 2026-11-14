import type { Metadata } from "next";
import { MenuFilter } from "@/components/MenuFilter";
import { PageHeader } from "@/components/PageHeader";
import { JsonLdScript } from "@/components/JsonLd";
import { breadcrumbSchema, menuSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Menu & Prices | Tarte – Pelham Bay Bakery & Coffee Shop",
  description:
    "Tarte's full menu with prices: bagels, tarts, pastries, sandwiches & wraps, focaccia, omelets, byrek, custom cakes & coffee from our Pelham Bay bakery in the Bronx.",
  path: "/menu",
});

export default function MenuPage() {
  return (
    <div className="animate-fade-up">
      <JsonLdScript data={menuSchema()} />
      <JsonLdScript
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Menu", path: "/menu" },
        ])}
      />
      <PageHeader
        eyebrow="Coffee Shop · Bakes"
        title="The Menu"
        subtitle="Made fresh, baked in-house, and roasted with care. Prices in USD — ask our baristas about today’s specials."
      />
      <MenuFilter />
    </div>
  );
}
