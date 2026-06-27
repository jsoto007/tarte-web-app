import type { Metadata } from "next";
import { MenuFilter } from "@/components/MenuFilter";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "The Menu",
  description:
    "Browse Tarte's full menu — bagels, tarts, pastries, sandwiches & wraps, focaccia, omelets, byrek, dessert, and hot & cold drinks. Made fresh, with prices in USD.",
};

export default function MenuPage() {
  return (
    <div className="animate-fade-up">
      <PageHeader
        eyebrow="Coffee Shop · Bakes"
        title="The Menu"
        subtitle="Made fresh, baked in-house, and roasted with care. Prices in USD — ask our baristas about today’s specials."
      />
      <MenuFilter />
    </div>
  );
}
