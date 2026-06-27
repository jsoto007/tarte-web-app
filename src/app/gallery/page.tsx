import type { Metadata } from "next";
import { GalleryGrid } from "@/components/GalleryGrid";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "The Gallery",
  description:
    "Mornings, pours, and pastries from Tarte. A visual look inside the shop on Maple Row — tag @tartecoffee to be featured.",
};

export default function GalleryPage() {
  return (
    <div className="animate-fade-up">
      <PageHeader
        eyebrow="@tartecoffee"
        title="The Gallery"
        subtitle="Mornings, pours, and pastries from the shop. Tag us to be featured."
      />
      <GalleryGrid />
    </div>
  );
}
