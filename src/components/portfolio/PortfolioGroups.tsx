import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { portfolioCta, portfolioGroups } from "@/content/portfolio-page";
import type { PortfolioCategory } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * The brand registry grouped by category — all four, or just the one chosen.
 * Each brand carries its slug as an id, so homepage links (/portfolio#pablo)
 * land on it. Brands have no detail pages yet; their own channels are linked.
 */
export function PortfolioGroups({ active }: { active?: PortfolioCategory }) {
  const groups = portfolioGroups.filter((group) => (active ? group.id === active : group.brands.length > 0));

  return (
    <div className="bg-paper pb-section text-ink">
      <Container>
        {groups.map((group, i) => (
          <section key={group.id} aria-labelledby={`${group.id}-title`} className="mt-[clamp(3.5rem,6vw,6rem)] first:mt-[clamp(2.5rem,4vw,4rem)]">
            {/* The filter's rule already sits above the first group. */}
            <Reveal className={cn("grid-site items-end gap-y-4 pb-10 md:pb-12", i > 0 && "border-t border-line pt-8")}>
              <RevealItem className="col-span-full md:col-span-4 lg:col-span-6">
                <p className="eyebrow text-stone">
                  <span className="tabular-nums">{group.number}</span>
                  <span aria-hidden="true"> · </span>
                  {group.subtitle}
                </p>
                <h2 id={`${group.id}-title`} className="mt-4 font-display text-heading">
                  {group.title}
                </h2>
              </RevealItem>
              <RevealItem as="p" className="col-span-full max-w-[28rem] text-stone md:col-span-4 lg:col-span-5 lg:col-start-8">
                {group.descriptor}
              </RevealItem>
            </Reveal>

            {group.brands.length > 0 ? (
              <Reveal amount={0.1} stagger={0.08}>
                <ul className="grid gap-x-(--spacing-grid) gap-y-14 md:grid-cols-2 lg:grid-cols-3">
                  {group.brands.map((brand) => (
                    <RevealItem as="li" key={brand.slug} id={brand.slug} className="scroll-mt-[calc(var(--header-h)+1.5rem)]">
                      <div className="relative aspect-[4/3] overflow-hidden bg-linen lg:aspect-[4/5]">
                        <Image
                          src={brand.image.src}
                          alt={brand.image.alt}
                          fill
                          placeholder="blur"
                          sizes="(min-width: 64rem) 30vw, (min-width: 48rem) 45vw, 92vw"
                          className={`${brand.image.fit === "contain" ? "object-contain" : "object-cover"} [filter:contrast(1.02)_saturate(0.94)]`}
                          style={{ objectPosition: brand.image.focus, backgroundColor: brand.image.background }}
                        />
                      </div>
                      <p className="mt-5 eyebrow text-stone">{[brand.type, brand.location].filter(Boolean).join(" · ")}</p>
                      <h3 className="mt-3 font-display text-[clamp(1.75rem,1.4rem+1vw,2.5rem)] leading-[1.05] tracking-[-0.01em]">{brand.name}</h3>
                      <p className="mt-3 max-w-[30rem] text-stone">{brand.summary}</p>
                      {brand.links?.map((link) => (
                        <ArrowLink key={link.href} href={link.href} external className="mt-5 mr-8">
                          {link.label}
                          <span className="sr-only"> — {brand.name}</span>
                        </ArrowLink>
                      ))}
                    </RevealItem>
                  ))}
                </ul>
              </Reveal>
            ) : (
              <div className="max-w-[34rem]">
                <p className="text-lede">No brands are listed under {group.title} yet.</p>
                <ArrowLink href="/portfolio" className="mt-8">
                  View the full portfolio
                </ArrowLink>
              </div>
            )}
          </section>
        ))}

        <div className="mt-[clamp(4rem,7vw,7rem)] flex border-t border-line pt-6 md:justify-end md:pt-8">
          <ArrowLink href={portfolioCta.href}>{portfolioCta.label}</ArrowLink>
        </div>
      </Container>
    </div>
  );
}
