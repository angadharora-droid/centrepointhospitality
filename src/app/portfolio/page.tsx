import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PortfolioFilter } from "@/components/portfolio/PortfolioFilter";
import { PortfolioGroups } from "@/components/portfolio/PortfolioGroups";
import { PortfolioHero } from "@/components/portfolio/PortfolioHero";
import { isPortfolioCategory, portfolioMeta } from "@/content/portfolio-page";
import { pageMetadata } from "@/lib/metadata";

// Filtered views (?category=…) canonicalise to /portfolio, so they never compete in search.
export const metadata: Metadata = pageMetadata({ ...portfolioMeta, path: "/portfolio" });

type PortfolioPageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };

/** Portfolio — every brand in the registry, filterable by category via ?category=. */
export default async function PortfolioPage({ searchParams }: PortfolioPageProps) {
  const { category } = await searchParams;
  const active = isPortfolioCategory(category) ? category : undefined;

  return (
    <>
      <PortfolioHero />
      <div className="bg-paper">
        <Container>
          <PortfolioFilter active={active} />
        </Container>
      </div>
      <PortfolioGroups active={active} />
    </>
  );
}
