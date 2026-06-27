import type { Metadata } from "next";
import { MenuFilter } from "@/components/MenuFilter";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "The Menu",
  description:
    "Browse Tarte's full menu — espresso, coffee, cold drinks, and fresh-baked bakery. Roasted, pulled, and baked in-house, with prices in USD.",
};

export default function MenuPage() {
  return (
    <div className="animate-fade-up">
      <PageHeader
        eyebrow="Coffee Shop · Bakes"
        title="The Menu"
        subtitle="Roasted, pulled, and baked in-house. Prices in USD — ask our baristas about today’s single origin."
      />
      <MenuFilter />
    </div>
  );
}
