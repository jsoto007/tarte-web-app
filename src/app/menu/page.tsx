import type { Metadata } from "next";
import { MenuFilter } from "@/components/MenuFilter";
import { PageHeader } from "@/components/PageHeader";
import { JsonLdScript } from "@/components/JsonLd";
import { breadcrumbSchema, menuSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "The Menu",
  description:
    "Browse Tarte's full menu — bagels, tarts, pastries, sandwiches & wraps, focaccia, omelets, byrek, dessert, and hot & cold drinks. Made fresh, with prices in USD.",
  alternates: { canonical: "/menu" },
  openGraph: {
    title: "The Menu · Tarte",
    description:
      "Bagels, tarts, pastries, sandwiches, focaccia, omelets, byrek, dessert, and hot & cold drinks — made fresh, prices in USD.",
    url: "/menu",
  },
};

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
