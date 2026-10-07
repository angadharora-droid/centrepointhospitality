import { Container } from "@/components/layout/Container";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { RevealHeading } from "@/components/typography/RevealHeading";
import { portfolioHero as content } from "@/content/portfolio-page";

export function PortfolioHero() {
  return (
    <section aria-labelledby="portfolio-title" className="bg-paper text-ink">
      <Container>
        <Reveal className="grid-site items-end gap-y-8 pt-[clamp(2.5rem,7svh,6rem)] pb-[clamp(3rem,6vw,5.5rem)]">
          <RevealItem variant="fade" className="col-span-full">
            <p className="eyebrow text-stone">{content.eyebrow}</p>
          </RevealItem>
          <RevealHeading
            as="h1"
            id="portfolio-title"
            lines={content.heading}
            emphasis={content.emphasis}
            className="col-span-full font-display text-page-title md:col-span-6 lg:col-span-8"
          />
          <RevealItem as="p" className="col-span-full max-w-[28rem] text-stone md:col-span-2 md:text-lede lg:col-span-4 lg:pb-3">
            {content.intro}
          </RevealItem>
        </Reveal>
      </Container>
    </section>
  );
}
