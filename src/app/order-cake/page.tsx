import type { Metadata } from "next";
import { CakeOrderForm } from "@/components/CakeOrderForm";
import { PageHeader } from "@/components/PageHeader";
import { cakeOrderCopy } from "@/data/cakeOrder";

export const metadata: Metadata = {
  title: "Order a Specialty Cake",
  description: "Request a made-to-order specialty cake from Tarte for your celebration.",
  alternates: { canonical: "/order-cake" },
};

export default function OrderCakePage() {
  return (
    <div className="animate-fade-up">
      <PageHeader eyebrow={cakeOrderCopy.eyebrow} title={cakeOrderCopy.title} subtitle={cakeOrderCopy.intro} />
      <main className="cake-order-page">
        <CakeOrderForm />
      </main>
    </div>
  );
}
