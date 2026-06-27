import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { menu, menuCategories } from "./menu";
import { gallery } from "./gallery";
import { features, hours, specialties, stats, team } from "./site";

const publicPath = (img: string) => join(process.cwd(), "public", img);

const allImages = [
  ...menu.flatMap((s) => s.items.map((i) => i.img)),
  ...gallery.map((g) => g.img),
  ...specialties.map((s) => s.img),
];

describe("image assets", () => {
  it.each([...new Set(allImages)])("exists in /public: %s", (img) => {
    expect(img.startsWith("/assets/")).toBe(true);
    expect(existsSync(publicPath(img))).toBe(true);
  });
});

describe("menu data", () => {
  it("has the expected categories", () => {
    expect(menuCategories).toEqual([
      "All",
      "Espresso",
      "Coffee",
      "Cold",
      "Bakery",
    ]);
  });

  it("has 4 sections of 4 items each", () => {
    expect(menu).toHaveLength(4);
    for (const section of menu) {
      expect(section.items).toHaveLength(4);
    }
  });

  it("formats every price as a 2-decimal string", () => {
    for (const section of menu) {
      for (const item of section.items) {
        expect(item.price).toMatch(/^\d+\.\d{2}$/);
        expect(item.name.length).toBeGreaterThan(0);
        expect(item.desc.length).toBeGreaterThan(0);
      }
    }
  });
});

describe("gallery data", () => {
  it("has 12 tiles", () => {
    expect(gallery).toHaveLength(12);
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
    expect(features).toHaveLength(3);
    expect(specialties).toHaveLength(6);
    expect(stats).toHaveLength(4);
    expect(team).toHaveLength(3);
  });
});
