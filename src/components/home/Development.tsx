import Link from "next/link";
import { Fragment } from "react";
import { Container } from "@/components/layout/Container";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Emphasis } from "@/components/typography/Emphasis";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { development as content, developmentAreaHref } from "@/content/home";

const TITLE_ID = "development-title";

/**
 * Development & partnerships — the business chapter, on deep aubergine and
 * without imagery. A decisive statement, a short selective note and one CTA,
 * then the partnership areas as large typographic rows. Descriptions are
 * always visible: business information is never hidden behind hover.
 */
export function Development() {
  return (
    <section
      id="development"
      aria-labelledby={TITLE_ID}
      className="bg-aubergine py-section text-paper [--focus-ring:currentColor]"
    >
      <Container>
        <Reveal className="grid-site items-end gap-y-10">
          <RevealItem variant="fade" className="col-span-full mb-2 md:mb-4 lg:mb-8">
            <p className="eyebrow text-mist">{content.eyebrow}</p>
          </RevealItem>

          <h2
            id={TITLE_ID}
            className="col-span-full font-display text-[clamp(4.25rem,1rem+9.5vw,11rem)] leading-[0.86] font-medium tracking-[-0.025em] lg:col-span-7"
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

          <RevealItem className="col-span-full md:col-span-5 md:col-start-4 lg:col-span-4 lg:col-start-9 lg:pb-[0.6rem]">
            <p className="text-lede text-paper/90">{content.intro}</p>
            <p className="mt-5 text-mist">{content.selective}</p>
            <ButtonLink href={content.cta.href} fillText="var(--color-aubergine)" className="mt-9">
              {content.cta.label}
              <span className="sr-only"> with Centre Point Hospitality</span>
            </ButtonLink>
          </RevealItem>
        </Reveal>

        <Reveal amount={0.15} stagger={0.07}>
          <ol className="mt-[clamp(4.5rem,9vw,9rem)] border-t border-line-inverse">
            {content.areas.map((area, i) => (
              <RevealItem as="li" key={area.slug} className="border-b border-line-inverse">
                <Link
                  href={developmentAreaHref(area.slug)}
                  className="group grid grid-cols-[2.25rem_1fr_auto] items-baseline gap-x-4 gap-y-3 py-7 md:grid-cols-[3rem_1fr_auto] md:py-8 lg:grid-cols-12 lg:gap-x-(--spacing-grid) lg:py-[clamp(1.75rem,2.4vw,2.5rem)] focus-visible:[outline-offset:-2px]"
                >
                  <span aria-hidden="true" className="eyebrow text-mist tabular-nums lg:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-[clamp(1.75rem,1.2rem+1.5vw,2.75rem)] leading-[1.05] transition-transform duration-(--duration-base) ease-editorial group-hover:translate-x-2 group-focus-visible:translate-x-2 lg:col-span-5">
                    {area.title}
                  </span>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 12 12"
                    className="h-3 w-3 self-center fill-none stroke-current text-mist transition-[translate,color] duration-(--duration-base) ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-paper group-focus-visible:translate-x-0.5 group-focus-visible:-translate-y-0.5 group-focus-visible:text-paper lg:order-last lg:col-span-1 lg:justify-self-end"
                  >
                    <path d="M1.5 10.5 L10.5 1.5 M3.5 1.5 H10.5 V8.5" strokeWidth="1" />
                  </svg>
                  <span className="col-span-2 col-start-2 max-w-[30rem] text-mist transition-colors duration-(--duration-base) group-hover:text-paper/90 group-focus-visible:text-paper/90 md:text-[1.0625rem] lg:col-span-5 lg:col-start-7 lg:self-center">
                    {area.text}
                  </span>
                </Link>
              </RevealItem>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
