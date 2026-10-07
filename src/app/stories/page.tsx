import type { Metadata } from "next";
import { StoriesList } from "@/components/stories/StoriesList";
import { storiesMeta } from "@/content/stories-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({ ...storiesMeta, path: "/stories" });

/** Stories — every piece of press coverage, newest first, each linking to the original article. */
export default function StoriesPage() {
  return <StoriesList />;
}
