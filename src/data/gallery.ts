import type { GalleryTile } from "@/types";

/**
 * Gallery tiles, also reused by the Home "From the 'gram" marquee.
 * Every 5th tile (indexes 0, 5, 10) is "featured" and spans two columns,
 * matching the design's `grid-column: span 2` treatment.
 */
const labels = [
  "Morning Pour",
  "Fresh Croissants",
  "Latte Art",
  "The Roastery",
  "Corner Table",
  "Almond Tart",
  "Cold Brew Bar",
  "Pastry Case",
  "Sunlit Window",
  "Bean Selection",
  "Hand Pour",
  "Afternoon Slice",
];

const images = [
  "/assets/menu/latte.jpg",
  "/assets/menu/croissant2.jpg",
  "/assets/menu/cappuccino.jpg",
  "/assets/hero-cafe.jpg",
  "/assets/menu/croissantcoaster.jpg",
  "/assets/menu/breadplate.jpg",
  "/assets/menu/coldbrew.jpg",
  "/assets/menu/croissantstable.jpg",
  "/assets/menu/filter.jpg",
  "/assets/menu/beans.jpg",
  "/assets/menu/cortado.jpg",
  "/assets/menu/croissanttray.jpg",
];

export const gallery: GalleryTile[] = labels.map((label, i) => ({
  label,
  img: images[i],
  featured: i % 5 === 0,
}));
