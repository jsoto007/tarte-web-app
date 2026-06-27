import type { GalleryTile } from "@/types";
import galleryData from "../../content/gallery.json";

/**
 * Gallery tiles, loaded from content/gallery.json. Edit that file to change
 * photos, captions, order, or which tiles are "featured" (wide). Also reused
 * by the Home "From the 'gram" marquee.
 */
export const gallery = galleryData as GalleryTile[];
