import type { StaticImageData } from "next/image";

/**
 * Content model. Each module reads typed data from src/content/* so a CMS can
 * later replace the local files without touching components.
 */

export const portfolioCategories = [
  { id: "stay", label: "Stay", description: "Hotels & Resorts" },
  { id: "dine", label: "Dine", description: "Restaurants & Bars" },
  { id: "create", label: "Create", description: "Food & Beverage Brands" },
  { id: "experience", label: "Experience", description: "Experiences & Ventures" },
] as const;

export type PortfolioCategory = (typeof portfolioCategories)[number]["id"];

/** The portfolio page filtered to one category. */
export const portfolioHref = (category: PortfolioCategory) => `/portfolio?category=${category}`;

export const categoryLabel = (category: PortfolioCategory) =>
  portfolioCategories.find((c) => c.id === category)!.label;

/** A brand's entry on the portfolio page. (Brands have no detail pages yet.) */
export const brandHref = (slug: string) => `/portfolio#${slug}`;

export type ImageAsset = {
  /** A static import today; a CMS URL (with width/height) later. */
  src: StaticImageData | string;
  alt: string;
  width?: number;
  height?: number;
  /** CSS object-position for cropped placements. */
  focus?: string;
  /** Preserve wide artwork instead of cropping it to the placement. */
  fit?: "cover" | "contain";
  /** Fill the unused area when `fit` is `contain`. */
  background?: string;
  /** True while a stand-in is shown in place of real photography. */
  placeholder?: boolean;
};

export type Brand = {
  slug: string;
  name: string;
  category: PortfolioCategory;
  /** Kind of place or product, e.g. "Art café & lounge". */
  type: string;
  /** Only where confirmed. */
  location?: string;
  summary: string;
  image: ImageAsset;
  logo?: ImageAsset;
  /** Up to three primary actions (official site, Instagram, directions, reservations). */
  links?: { label: string; href: string }[];
  /** Listing and delivery platforms — kept out of the card, behind "More links +". */
  moreLinks?: { label: string; href: string }[];
};

export type Person = {
  slug: string;
  name: string;
  role: string;
  /** Paragraphs. Empty while a biography awaits approval — the profile is then not offered. */
  bio: string[];
  /** Short labelled facts drawn from the biography (e.g. Experience, Education). */
  highlights?: { label: string; value: string }[];
  /** A belief the person is quoted as holding in approved copy. */
  belief?: string;
  portrait: ImageAsset;
};

export type TimelineEntry = {
  /** A year, a range, or a non-date label such as "Today". */
  year: string;
  title: string;
  body: string;
  image?: ImageAsset;
  /** False while the date or copy awaits confirmation. */
  confirmed: boolean;
  /** Full chronology only (Our Story page); the homepage shows the main chapters. */
  extended?: boolean;
};

export const storyCategories = ["Group News", "Openings", "Food & Culture", "People", "Recognition", "Events", "Press", "Insights"] as const;
export type StoryCategory = (typeof storyCategories)[number];

export type Story = {
  slug: string;
  category: StoryCategory;
  title: string;
  /** ISO 8601 — a full date ("2024-10-25") or, when only the month is known, "2023-11". Omitted when unknown. */
  date?: string;
  excerpt?: string;
  image: ImageAsset;
  /** Original coverage, for stories that began as press. `href` is omitted when the article is no longer online. */
  source?: { publication: string; href?: string };
  featured?: boolean;
};
