import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { portfolioProof as content } from "@/content/development";
import { categoryLabel } from "@/content/types";

/** Four properties from the shared brand registry, each with the expertise it shows. */
export function PortfolioProof() {
  return (
    <section aria-labelledby="proof-title" className="bg-paper py-section text-ink">
      <Container>
        <SectionHeader id="proof-title" eyebrow={content.eyebrow} lines={content.heading} emphasis={content.emphasis} />
        <Reveal amount={0.1} stagger={0.08}>
          <ul className="grid gap-x-(--spacing-grid) gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {content.items.map(({ brand, line }) => (
              <RevealItem as="li" key={brand.slug}>
                <div className="relative aspect-[4/5] overflow-hidden bg-linen">
                  <Image
                    src={brand.image.src}
                    alt={brand.image.alt}
                    fill
                    sizes="(min-width: 64rem) 22vw, (min-width: 40rem) 45vw, 90vw"
                    className={`${brand.image.fit === "contain" ? "object-contain" : "object-cover"} [filter:contrast(1.02)_saturate(0.94)]`}
                    style={{ objectPosition: brand.image.focus, backgroundColor: brand.image.background }}
                  />
                </div>
                <p className="mt-5 eyebrow text-stone">
                  <span className="text-ink">{categoryLabel(brand.category)}</span>
                  {brand.location && ` · ${brand.location}`}
                </p>
                <h3 className="mt-3 font-display text-[clamp(1.5rem,1.25rem+0.7vw,2rem)] leading-[1.1]">{brand.name}</h3>
                <p className="mt-3 text-stone">{line}</p>
              </RevealItem>
            ))}
          </ul>
        </Reveal>
        <div className="mt-14 flex border-t border-line pt-6 md:mt-16 md:justify-end md:pt-8">
          <ArrowLink href={content.cta.href}>{content.cta.label}</ArrowLink>
        </div>
      </Container>
    </section>
  );
}
