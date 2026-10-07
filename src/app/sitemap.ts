import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// Published routes only. Query-state views (/portfolio?category=…,
// /contact?type=…) canonicalise to their base page and are left out, as is
// the /about redirect.
const routes = ["/", "/our-story", "/portfolio", "/development", "/stories", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({ url: new URL(route, site.url).toString() }));
}
