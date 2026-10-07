import type { Metadata } from "next";
import { site } from "@/content/site";

// TODO: Replace with the final approved share image (1200×630). This one is
// composed from a current-site photograph and the official light logo.
const shareImage = {
  url: "/og/cph-share.jpg",
  width: 1200,
  height: 630,
  alt: "Centre Point Hospitality logo over a rooftop bar at dusk.",
};

/** The homepage title, also the default for any page without its own. */
export const homeTitle = `${site.name} | ${site.philosophy.replace(/\.$/, "")}`;

/** Open Graph / X fields every page shares, including the share image. */
export const sharedSocial = {
  openGraph: { type: "website", siteName: site.name, locale: "en_IN", images: [shareImage] },
  twitter: { card: "summary_large_image", images: [shareImage.url] },
} satisfies Pick<Metadata, "openGraph" | "twitter">;

type PageMeta = {
  /** Page name; the layout's template appends " | Centre Point Hospitality". */
  title: string;
  description: string;
  /** Canonical path. Query-state views (filters, enquiry types) point here too. */
  path: string;
  /** Use the title as-is, without the template (the homepage). */
  absolute?: boolean;
};

/**
 * One metadata shape for every page: unique title and description, a
 * canonical URL, Open Graph and an X card — each page sets all of it, because
 * Next merges metadata shallowly and a page's openGraph replaces the layout's.
 */
export function pageMetadata({ title, description, path, absolute = false }: PageMeta): Metadata {
  const shareTitle = absolute ? title : `${title} | ${site.name}`;
  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: { ...sharedSocial.openGraph, title: shareTitle, description, url: path },
    twitter: { ...sharedSocial.twitter, title: shareTitle, description },
  };
}
