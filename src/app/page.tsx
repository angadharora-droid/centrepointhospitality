import type { Metadata } from "next";
import { Development } from "@/components/home/Development";
import { Hero } from "@/components/home/Hero";
import { Introduction } from "@/components/home/Introduction";
import { Journal } from "@/components/home/Journal";
import { Journey } from "@/components/home/Journey";
import { Leadership } from "@/components/home/Leadership";
import { OurWorld } from "@/components/home/OurWorld";
import { Philosophy } from "@/components/home/Philosophy";
import { SelectedPortfolio } from "@/components/home/SelectedPortfolio";
import { Stats } from "@/components/home/Stats";
import { site } from "@/content/site";
import { homeTitle, pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({ title: homeTitle, description: site.description, path: "/", absolute: true });

/** Homepage — modules are composed here in order as they are built. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Introduction />
      <OurWorld />
      <SelectedPortfolio />
      <Stats />
      <Philosophy />
      <Journey />
      <Leadership />
      <Development />
      <Journal />
    </>
  );
}
