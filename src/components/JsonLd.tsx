import { siteGraph } from "@/lib/schema";

/**
 * Renders a JSON-LD <script>. Use for any schema.org payload (page-level
 * breadcrumbs, the menu, etc.). JSON-LD must be raw JSON inside a script tag.
 */
export function JsonLdScript({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Site-wide structured data (Organization + WebSite + CafeOrCoffeeShop/Bakery),
 * rendered once from the root layout for richer search results and so AI
 * assistants can read the business, hours, and location as data.
 */
export function JsonLd() {
  return <JsonLdScript data={siteGraph()} />;
}
