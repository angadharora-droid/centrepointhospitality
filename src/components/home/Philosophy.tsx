import { Fragment } from "react";
import { Container } from "@/components/layout/Container";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Emphasis } from "@/components/typography/Emphasis";
import { philosophy as content } from "@/content/home";
import { cn } from "@/lib/cn";

const TITLE_ID = "philosophy-title";

/**
 * The brand belief, then four principles as chapters of it. Typography only:
 * one magenta word, one long hairline, and a gentle stagger in the principle
 * row so it reads as an editorial sequence rather than a values grid.
 */
export function Philosophy() {
  return (
    <section
      aria-labelledby={TITLE_ID}
      className="bg-paper py-[clamp(5.75rem,3rem+7.5vw,11rem)] text-ink"
    >
      <Container>
        <Reveal className="grid-site">
          <RevealItem variant="fade" className="col-span-full mb-10 md:mb-14 lg:mb-[clamp(3.5rem,4.5vw,5rem)]">
            <p className="eyebrow text-stone">{content.eyebrow}</p>
          </RevealItem>

          <h2
            id={TITLE_ID}
            className="col-span-full font-display text-statement max-md:text-statement-sm lg:col-span-9"
          >
            {content.statement.map((line, i) => (
              <Fragment key={line}>
                <span className="-my-[0.14em] block overflow-hidden py-[0.14em] pr-[0.08em]">
                  <RevealItem as="span" variant="line" className="block">
                    <Emphasis text={line} word={content.emphasis} className="text-magenta" />
                  </RevealItem>
                </span>
                {i < content.statement.length - 1 && " "}
              </Fragment>
            ))}
          </h2>

          {/* Stepped in under the statement rather than set beside it. */}
          <RevealItem
            as="p"
            className="col-span-full mt-10 max-w-[30rem] text-lede text-stone md:col-span-5 md:col-start-4 md:mt-14 lg:col-span-5 lg:col-start-7 lg:mt-16"
          >
            {content.intro}
          </RevealItem>
        </Reveal>

        <Reveal amount={0.2} stagger={0.1}>
          <RevealItem variant="fade" aria-hidden="true" className="mt-20 h-px bg-line md:mt-24 lg:mt-[clamp(6rem,8vw,9rem)]" />

          <ol className="mt-4 grid gap-y-0 md:mt-10 md:grid-cols-2 md:gap-x-(--spacing-grid) md:gap-y-14 min-[90rem]:grid-cols-4">
            {content.principles.map((principle, i) => (
              <RevealItem
                as="li"
                key={principle.title}
                className={cn(
                  "border-b border-line py-9 last:border-b-0 md:border-b-0 md:py-0",
                  // A slight step on alternate chapters keeps the row from reading as a grid.
                  i % 2 === 1 && "min-[90rem]:mt-16",
                )}
              >
                <p aria-hidden="true" className="eyebrow text-stone tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 font-display text-[clamp(1.875rem,1.5rem+1vw,2.5rem)] leading-none md:mt-5">
                  {principle.title}
                </h3>
                <p className="mt-4 max-w-[22rem] text-[1.0625rem] leading-[1.6] text-stone md:mt-5">
                  {principle.text}
                </p>
              </RevealItem>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
