import type { Metadata } from "next";
import { Suspense } from "react";
import { GalleryGrid } from "@/components/GalleryGrid";
import { InstagramHandle } from "@/components/InstagramIcon";
import { PageHeader } from "@/components/PageHeader";
import { JsonLdScript } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "The Gallery",
  description:
    "Mornings, pours, and pastries from Tarte. A visual look inside the shop on Middletown Road — tag @tartecoffee to be featured.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "The Gallery · Tarte",
    description:
      "Mornings, pours, and pastries from Tarte — a visual look inside the shop on Middletown Road.",
    url: "/gallery",
  },
};

export default function GalleryPage() {
  return (
    <div className="animate-fade-up">
      <JsonLdScript
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Gallery", path: "/gallery" },
        ])}
      />
      <PageHeader
        eyebrow={<InstagramHandle handle="@tartecoffee" />}
        title="The Gallery"
        subtitle="Mornings, pours, and pastries from the shop. Tag us to be featured."
      />
      <Suspense fallback={null}>
        <GalleryGrid />
      </Suspense>
    </div>
  );
}
