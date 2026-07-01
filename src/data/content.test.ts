import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { menu, menuGroups } from "./menu";
import { gallery, galleryCategories } from "./gallery";
import {
  directionsUrl,
  features,
  fullAddress,
  hours,
  specialties,
  stats,
  team,
} from "./site";

const publicPath = (img: string) => join(process.cwd(), "public", img);

// Only items that actually have a photo (most real menu items don't).
const allImages = [
  ...menu.flatMap((s) => s.items.map((i) => i.img)).filter(Boolean),
  ...gallery.map((g) => g.img),
  ...specialties.map((s) => s.img),
] as string[];

describe("image assets", () => {
  it.each([...new Set(allImages)])("exists in /public: %s", (img) => {
    expect(img.startsWith("/assets/")).toBe(true);
    expect(existsSync(publicPath(img))).toBe(true);
  });
});

describe("menu data", () => {
  it("exposes All + the distinct groups as filter options", () => {
    expect(menuGroups[0]).toBe("All");
    expect(menuGroups).toContain("Food");
    expect(menuGroups).toContain("Drinks");
  });

  it("has non-empty sections, each tagged with a known group", () => {
    expect(menu.length).toBeGreaterThan(0);
    for (const section of menu) {
      expect(section.title.length).toBeGreaterThan(0);
      expect(["Food", "Drinks"]).toContain(section.group);
      expect(section.items.length).toBeGreaterThan(0);
    }
  });

  it("includes both Food and Drinks sections", () => {
    expect(menu.some((s) => s.group === "Food")).toBe(true);
    expect(menu.some((s) => s.group === "Drinks")).toBe(true);
  });

  it("includes made-to-order specialty cakes priced per person", () => {
    const cakes = menu.find((s) => s.title === "Specialty Cakes");
    expect(cakes).toBeDefined();
    expect(cakes?.note).toMatch(/Made to order/i);
    expect(cakes?.items[0]).toMatchObject({
      name: "Custom Specialty Cake",
      price: "9.00",
      priceSuffix: " / person",
    });
  });

  it("links menu sections only to known gallery categories", () => {
    for (const section of menu) {
      if (section.galleryCategory !== undefined) {
        expect(galleryCategories).toContain(section.galleryCategory);
      }
    }
  });

  it("formats every present price as a 2-decimal string", () => {
    for (const section of menu) {
      for (const item of section.items) {
        expect(item.name.length).toBeGreaterThan(0);
        if (item.price !== undefined) {
          expect(item.price).toMatch(/^\d+\.\d{2}$/);
        }
      }
    }
  });
});

describe("gallery data", () => {
  it("has 12 tiles", () => {
    expect(gallery).toHaveLength(12);
  });

  it("exposes All + the distinct categories as filter options", () => {
    expect(galleryCategories[0]).toBe("All");
    expect(galleryCategories).toContain("Pastries");
    expect(galleryCategories).toContain("Specialty Cakes");
    expect(galleryCategories).toContain("Coffee");
  });

  it("assigns every tile to a category", () => {
    for (const tile of gallery) {
      expect(tile.category.length).toBeGreaterThan(0);
      expect(galleryCategories).toContain(tile.category);
    }
  });

  it("marks every 5th tile as featured (indices 0, 5, 10)", () => {
    const featuredIdx = gallery
      .map((g, i) => (g.featured ? i : -1))
      .filter((i) => i >= 0);
    expect(featuredIdx).toEqual([0, 5, 10]);
  });
});

describe("site data shape", () => {
  it("has the expected collection sizes", () => {
    expect(hours).toHaveLength(3);
    expect(features).toHaveLength(4);
    expect(specialties).toHaveLength(6);
    expect(stats).toHaveLength(4);
    expect(team).toHaveLength(3);
  });

  it("builds a Google Maps directions URL for the shop address", () => {
    expect(fullAddress).toBe("2960 Middletown Rd, Bronx, NY 10461");
    expect(directionsUrl).toBe(
      "https://www.google.com/maps/dir/?api=1&destination=2960%20Middletown%20Rd%2C%20Bronx%2C%20NY%2010461",
    );
  });
});
