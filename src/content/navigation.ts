import { site } from "./site";

export type NavItem = {
  label: string;
  href: string;
  /** Short caption shown beside the item in the full-screen menu. */
  note?: string;
  external?: boolean;
};

export const primaryNav: NavItem[] = [
  { label: "Our Story", href: "/our-story", note: "Heritage, philosophy & people" },
  { label: "Portfolio", href: "/portfolio", note: "Stay · Dine · Create · Experience" },
  { label: "Development", href: "/development", note: "Management & partnerships" },
  { label: "Stories", href: "/stories", note: "News & press" },
  { label: "Careers", href: site.careersUrl, note: "View current openings", external: true },
];

export const contactNav: NavItem = { label: "Contact", href: "/contact" };
