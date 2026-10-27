import type { Metadata } from "next";
import { Suspense } from "react";
import { GalleryGrid, GalleryGridView } from "@/components/GalleryGrid";
import { InstagramHandle } from "@/components/InstagramIcon";
import { PageHeader } from "@/components/PageHeader";
import { JsonLdScript } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Photo Gallery | Tarte – Pelham Bay Bakery & Coffee Shop, Bronx",
  description:
    "Photos of pastries, coffee, breakfast & custom cakes from Tarte, a Pelham Bay bakery on Middletown Road in the Bronx. Tag @tartecoffee to be featured.",
  path: "/gallery",
});

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
      <Suspense fallback={<GalleryGridView requestedCategory="All" />}>
        <GalleryGrid />
      </Suspense>
    </div>
  );
}
