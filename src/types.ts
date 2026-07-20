/** Shared content types for the Tarte marketing site. */

export type MenuItem = {
  name: string;
  /** Price in USD as a fixed string, e.g. "3.00". Rendered with a leading "$". Omit for items with no individual price (e.g. flavors). */
  price?: string;
  /** Optional text shown after the formatted price, e.g. "/ person". */
  priceSuffix?: string;
  /** Optional one-line description. */
  desc?: string;
};

export type MenuSection = {
  /** Section heading shown on the menu, e.g. "Bagels". */
  title: string;
  /** Top-level group used by the filter bar, e.g. "Food" or "Drinks". */
  group: string;
  /** Optional note under the heading, e.g. "With French fries on the side". */
  note?: string;
  /** Optional Gallery category that this menu section can link to. */
  galleryCategory?: string;
  items: MenuItem[];
};

export type GalleryTile = {
  label: string;
  img: string;
  /** User-facing filter category shown on the Gallery page. */
  category: string;
  /** Wide tiles span two columns (every 5th tile in the design). */
  featured: boolean;
};

export type NavItem = {
  label: string;
  href: string;
};

export type Specialty = {
  title: string;
  caption: string;
  img: string;
};

export type Feature = {
  /** Emoji glyph placeholder per the design — swap for a brand icon later. */
  icon: string;
  title: string;
  desc: string;
  linkLabel: string;
  href: string;
};

export type TeamMember = {
  name: string;
  role: string;
  /** CSS gradient placeholder portrait (intentional per the handoff). */
  gradient: string;
};

export type Stat = {
  value: string;
  label: string;
};

export type HoursRow = {
  /** Compact label used on the Home hours card, e.g. "Mon – Fri". */
  dayShort: string;
  /** Full label used on the Visit page, e.g. "Monday – Friday". */
  dayLong: string;
  time: string;
};
