import type { MenuSection } from "@/types";
import menuData from "../../content/menu.json";

/**
 * The full menu, loaded from content/menu.json. Edit that file (in the repo)
 * to change items, prices, sections, or groups — no code changes needed.
 * Each section belongs to a `group` ("Food" or "Drinks"), which drives the
 * filter bar on the Menu page.
 */
export const menu = menuData as MenuSection[];

/** Filter options: "All" plus each distinct group, in first-seen order. */
export const menuGroups: string[] = [
  "All",
  ...Array.from(new Set(menu.map((s) => s.group))),
];
