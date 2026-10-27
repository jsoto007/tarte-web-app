import { describe, expect, it } from "vitest";
import { eventForHref } from "./analytics";
import { pageMetadata, shareImage, siteDescription } from "./seo";

describe("pageMetadata", () => {
  const meta = pageMetadata({
    title: "Menu & Prices | Tarte",
    description: "The menu.",
    path: "/menu",
  });

  it("keeps the share image, site name, and type on every page", () => {
    // Next.js replaces a parent's openGraph wholesale, so each page must
    // carry the full set itself.
    expect(meta.openGraph).toMatchObject({
      type: "website",
      siteName: "Tarte Bakes & Coffee Shop",
      url: "/menu",
      images: [shareImage],
    });
    expect(meta.twitter).toMatchObject({
      card: "summary_large_image",
      title: "Menu & Prices | Tarte",
      images: [shareImage.url],
    });
  });

  it("sets the canonical and an absolute title", () => {
    expect(meta.alternates).toEqual({ canonical: "/menu" });
    expect(meta.title).toEqual({ absolute: "Menu & Prices | Tarte" });
  });

  it("keeps the site description within the ~160-char snippet limit", () => {
    expect(siteDescription.length).toBeLessThanOrEqual(160);
  });
});

describe("eventForHref", () => {
  it.each([
    ["tel:+19297779536", "click_to_call"],
    ["mailto:tarte@tartebakes.com", "click_email"],
    ["https://www.google.com/maps/dir/?api=1&destination=x", "get_directions"],
    ["https://www.instagram.com/tartecoffee", "click_instagram"],
    ["/menu", null],
  ])("%s -> %s", (href, expected) => {
    expect(eventForHref(href)).toBe(expected);
  });
});
