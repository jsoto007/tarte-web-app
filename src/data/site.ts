import type {
  Feature,
  HoursRow,
  NavItem,
  Specialty,
  Stat,
  TeamMember,
} from "@/types";
import siteData from "../../content/site.json";

/**
 * Site-wide content, loaded from content/site.json. Edit that file (in the
 * repo) to change brand details, contact info, hours, and the marketing copy
 * used on Home / About — no code changes needed.
 */
export const site = siteData;
export const social = siteData.social;
export const geo = siteData.geo;
export const fullAddress = `${site.contact.addressLine}, ${site.contact.district}`;
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  fullAddress,
)}`;
/**
 * Keyless Google Maps embed, centered on the shop's exact coordinates.
 * Uses the `/maps/embed?pb=...` form (the same one Google's own
 * "Share > Embed a map" feature generates) — the plain `/maps?...&output=embed`
 * form now redirects and sends `X-Frame-Options: SAMEORIGIN`, so it renders
 * blank inside an iframe.
 */
export const mapEmbedUrl =
  `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3018!2d${geo.longitude}!3d${geo.latitude}` +
  `!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c28b506e323f2f%3A0x6c651b29e9901058!2zVGFydGU!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus`;
export const phoneHref = `tel:${site.contact.phone.replace(/[^\d+]/g, "")}`;
export const emailHref = `mailto:${site.contact.email}`;

export const navItems = siteData.nav as NavItem[];
export const hours = siteData.hours as HoursRow[];
export const features = siteData.features as Feature[];
export const specialties = siteData.specialties as Specialty[];
export const stats = siteData.stats as Stat[];
export const team = siteData.team as TeamMember[];
export const storyTeaser = siteData.storyTeaser as string[];
export const aboutProse = siteData.aboutProse as string[];
