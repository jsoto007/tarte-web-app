import type { Metadata } from "next";
import { CakeOrderForm } from "@/components/CakeOrderForm";
import { JsonLdScript } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { CAKE_PRICE_PER_PERSON_CENTS, cakeOrderCopy } from "@/data/cakeOrder";
import { formatUsd } from "@/lib/cakeOrder";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Custom Cakes in the Bronx | Order a Specialty Cake from Tarte",
  description: `Order custom cakes in the Bronx from Tarte, a Pelham Bay bakery: birthday and celebration cakes in vanilla, chocolate, red velvet & more, ${formatUsd(
    CAKE_PRICE_PER_PERSON_CENTS,
  )} per person.`,
  path: "/order-cake",
});

export default function OrderCakePage() {
  return (
    <div className="animate-fade-up">
      <JsonLdScript
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Menu", path: "/menu" },
          { name: "Order a Specialty Cake", path: "/order-cake" },
        ])}
      />
      <PageHeader eyebrow={cakeOrderCopy.eyebrow} title={cakeOrderCopy.title} subtitle={cakeOrderCopy.intro} />
      {/* The root layout already provides <main>; a second one is invalid. */}
      <div className="cake-order-page">
        <CakeOrderForm />
      </div>
    </div>
  );
}
