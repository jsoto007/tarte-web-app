/** Shared content types for the Tarte marketing site. */

export type MenuItem = {
  name: string;
  desc: string;
  /** Price in USD as a fixed string, e.g. "3.00". Rendered with a leading "$". */
  price: string;
  /** Public path, e.g. "/assets/menu/espresso.jpg". */
  img: string;
};

export type MenuSection = {
  /** Doubles as the category name shown in the filter bar. */
  title: string;
  items: MenuItem[];
};

export type GalleryTile = {
  label: string;
  img: string;
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
