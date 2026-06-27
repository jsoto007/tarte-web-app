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

export const navItems = siteData.nav as NavItem[];
export const hours = siteData.hours as HoursRow[];
export const features = siteData.features as Feature[];
export const specialties = siteData.specialties as Specialty[];
export const stats = siteData.stats as Stat[];
export const team = siteData.team as TeamMember[];
export const storyTeaser = siteData.storyTeaser as string[];
export const aboutProse = siteData.aboutProse as string[];
