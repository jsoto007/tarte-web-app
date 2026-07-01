import type { GalleryTile } from "@/types";
import galleryData from "../../content/gallery.json";

/**
 * Gallery tiles, loaded from content/gallery.json. Edit that file to change
 * photos, captions, categories, order, or which tiles are "featured" (wide).
 * Also reused by the Home "From the 'gram" marquee.
 */
export const gallery = galleryData as GalleryTile[];

/** Filter options: "All" plus each distinct category, in first-seen order. */
export const galleryCategories: string[] = [
  "All",
  ...Array.from(new Set(gallery.map((g) => g.category))),
];
