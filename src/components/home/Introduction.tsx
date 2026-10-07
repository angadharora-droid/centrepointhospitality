import { Fragment } from "react";
import { Container } from "@/components/layout/Container";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Emphasis } from "@/components/typography/Emphasis";
import { introduction as content } from "@/content/home";

const TITLE_ID = "who-we-are-title";

/**
 * "Who we are" — the calm, light pause after the photographic hero. A large
 * statement on the left, a short introduction set against its second line,
 * and a quiet colophon (heritage line and taxonomy) along the foot.
 */
export function Introduction() {
  return (
    <section
      id={content.id}
      aria-labelledby={TITLE_ID}
      tabIndex={-1}
      className="bg-paper py-section text-ink outline-none"
    >
      <Container>
        <Reveal className="grid-site">
          <RevealItem variant="fade" className="col-span-full mb-12 md:mb-16 lg:mb-[clamp(3.5rem,4.5vw,5rem)]">
            <p className="eyebrow flex flex-col gap-2 text-stone md:flex-row md:items-center md:gap-3">
              <span>{content.eyebrow.brand}</span>
              <span aria-hidden="true" className="hidden h-px w-8 bg-current opacity-50 md:block" />
              <span className="text-ink">{content.eyebrow.label}</span>
            </p>
          </RevealItem>

          <h2 id={TITLE_ID} className="col-span-full font-display text-statement lg:col-span-6 xl:col-span-7">
            {content.statement.map((line, i) => (
              <Fragment key={line}>
                {/* Mask for the line's rise; padding keeps ascenders and descenders unclipped. */}
                <span className="-my-[0.14em] block overflow-hidden py-[0.14em] pr-[0.08em]">
                  <RevealItem as="span" variant="line" className="block">
                    <Emphasis text={line} word={content.emphasis} />
                  </RevealItem>
                </span>
                {i < content.statement.length - 1 && " "}
              </Fragment>
            ))}
          </h2>

          {/* Set against the statement's second line on desktop; stacked below it elsewhere. */}
          <div className="col-span-full mt-12 md:col-span-5 md:col-start-4 md:mt-16 lg:col-span-6 lg:col-start-7 lg:mt-0 xl:col-span-5 xl:col-start-8 lg:max-w-[30rem] lg:pt-[calc(var(--text-statement)*0.92)]">
            <RevealItem as="p" className="text-lede">
              {content.lead}
            </RevealItem>
            <RevealItem as="p" className="mt-6 text-stone md:text-[1.0625rem] lg:mt-8 lg:text-[1.125rem] lg:leading-[1.65]">
              {content.body}
            </RevealItem>
          </div>

          <RevealItem
            variant="fade"
            className="col-span-full mt-section-sm grid-site gap-y-5 border-t border-line pt-6 md:items-baseline md:pt-8"
          >
            <p className="col-span-full font-display text-title italic md:col-span-3 lg:col-span-6">
              {content.heritage}
            </p>
            <ul className="col-span-full grid grid-cols-2 gap-y-3 eyebrow text-stone sm:flex sm:flex-wrap sm:items-center sm:gap-x-3 md:col-span-5 md:col-start-4 lg:col-span-6 lg:col-start-7 xl:col-span-5 xl:col-start-8">
              {content.taxonomy.map((item, i) => (
                <li key={item} className="flex items-center gap-x-3">
                  {i > 0 && (
                    <span aria-hidden="true" className="hidden opacity-60 sm:inline">
                      ·
                    </span>
                  )}
                  {item}
                </li>
              ))}
            </ul>
          </RevealItem>
        </Reveal>
      </Container>
    </section>
  );
}
