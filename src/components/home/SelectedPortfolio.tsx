import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { Container } from "@/components/layout/Container";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Emphasis } from "@/components/typography/Emphasis";
import { Arrow } from "@/components/ui/Arrow";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { selectedPortfolio as content } from "@/content/home";
import { brandHref, categoryLabel } from "@/content/types";
import { PortfolioShowcase } from "./PortfolioShowcase";

const TITLE_ID = "selected-portfolio-title";

/**
 * Selected portfolio — after the dark, immersive category panels the page
 * returns to paper: one framed image at a time, chosen from a quiet list.
 * Mobile swaps the list for a short stack of large visual blocks.
 */
export function SelectedPortfolio() {
  return (
    <section aria-labelledby={TITLE_ID} className="bg-paper py-section text-ink">
      <Container>
        <Reveal className="grid-site items-end gap-y-8 pb-[clamp(3rem,6vw,6rem)]">
          <RevealItem variant="fade" className="col-span-full mb-4 md:mb-6 lg:mb-10">
            <p className="eyebrow text-stone">{content.eyebrow}</p>
          </RevealItem>

          <h2
            id={TITLE_ID}
            className="col-span-full font-display text-statement max-md:text-statement-sm md:col-span-6 lg:col-span-7"
          >
            {content.heading.map((line, i) => (
              <Fragment key={line}>
                <span className="-my-[0.14em] block overflow-hidden py-[0.14em] pr-[0.08em]">
                  <RevealItem as="span" variant="line" className="block">
                    <Emphasis text={line} word={content.emphasis} />
                  </RevealItem>
                </span>
                {i < content.heading.length - 1 && " "}
              </Fragment>
            ))}
          </h2>

          <RevealItem
            as="p"
            className="col-span-full max-w-[26rem] text-lede text-stone md:col-span-4 md:col-start-5 lg:col-span-4 lg:col-start-9"
          >
            {content.intro}
          </RevealItem>
        </Reveal>

        <div className="hidden md:block">
          <PortfolioShowcase brands={content.brands} />
        </div>

        <ul className="space-y-12 md:hidden">
          {content.mobileBrands.map((brand) => (
            <li key={brand.slug}>
              <Link href={brandHref(brand.slug)} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-linen">
                  <Image
                    src={brand.image.src}
                    alt={brand.image.alt}
                    fill
                    sizes="90vw"
                    className={`${brand.image.fit === "contain" ? "object-contain" : "object-cover"} [filter:contrast(1.02)_saturate(0.95)]`}
                    style={{ objectPosition: brand.image.focus, backgroundColor: brand.image.background }}
                  />
                </div>
                <div className="mt-5 flex items-end justify-between gap-6">
                  <div className="min-w-0">
                    <p className="eyebrow text-stone">
                      <span className="text-ink">{categoryLabel(brand.category)}</span> ·{" "}
                      {brand.location ?? brand.type}
                    </p>
                    <h3 className="mt-3 font-display text-[2.5rem] leading-none tracking-[-0.015em]">
                      {brand.name}
                    </h3>
                  </div>
                  <Arrow className="mb-2 transition-transform duration-(--duration-base) group-hover:translate-x-1" />
                </div>
                <p className="mt-4 text-stone">{brand.summary}</p>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-14 flex border-t border-line pt-6 md:mt-16 md:justify-end md:pt-8">
          <ArrowLink href={content.cta.href}>{content.cta.label}</ArrowLink>
        </div>
      </Container>
    </section>
  );
}
