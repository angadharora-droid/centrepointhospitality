import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutJourney } from "@/components/about/AboutJourney";
import { AboutLeadership } from "@/components/about/AboutLeadership";
import { AboutPhilosophy } from "@/components/about/AboutPhilosophy";
import { Evolution } from "@/components/about/Evolution";
import { FutureDirection } from "@/components/about/FutureDirection";
import { OpeningStory } from "@/components/about/OpeningStory";
import { aboutMeta } from "@/content/about";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({ ...aboutMeta, path: "/our-story" });

/** Our Story — the group's narrative, from 1988 to what comes next. */
export default function OurStoryPage() {
  return (
    <>
      <AboutHero />
      <OpeningStory />
      <Evolution />
      <AboutPhilosophy />
      <AboutJourney />
      <AboutLeadership />
      <FutureDirection />
    </>
  );
}
