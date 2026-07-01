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
