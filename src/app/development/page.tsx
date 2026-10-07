import type { Metadata } from "next";
import { Capabilities } from "@/components/development/Capabilities";
import { DevelopmentHero } from "@/components/development/DevelopmentHero";
import { Enquiry } from "@/components/development/Enquiry";
import { Opportunities } from "@/components/development/Opportunities";
import { PartnershipModels } from "@/components/development/PartnershipModels";
import { PortfolioProof } from "@/components/development/PortfolioProof";
import { Process } from "@/components/development/Process";
import { Proposition } from "@/components/development/Proposition";
import { WhyCph } from "@/components/development/WhyCph";
import { developmentMeta } from "@/content/development";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({ ...developmentMeta, path: "/development" });

/** Development & Partnerships — the case for working with CPH, ending in an enquiry. */
export default function DevelopmentPage() {
  return (
    <>
      <DevelopmentHero />
      <Proposition />
      <PartnershipModels />
      <Capabilities />
      <WhyCph />
      <Process />
      <Opportunities />
      <PortfolioProof />
      <Enquiry />
    </>
  );
}
