import { Fragment } from "react";
import { Container } from "@/components/layout/Container";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { RevealHeading } from "@/components/typography/RevealHeading";
import { aboutPhilosophy as content } from "@/content/about";

/**
 * The belief as a single quotation, a short narrative, and the four principle
 * names as a quiet line — the homepage carries the full principles.
 */
export function AboutPhilosophy() {
  return (
    <section aria-labelledby="about-philosophy-title" className="bg-paper py-section text-ink">
      <Container>
        <Reveal className="grid-site gap-y-10">
          <RevealItem variant="fade" className="col-span-full">
            <p className="eyebrow text-stone">{content.eyebrow}</p>
          </RevealItem>

          <RevealHeading
            id="about-philosophy-title"
            lines={[`“${content.statement[0]}`, `${content.statement[1]}”`]}
            emphasis={content.emphasis}
            emphasisClassName="text-magenta"
            className="col-span-full font-display text-statement max-md:text-[clamp(2.75rem,12.5vw,3.5rem)] lg:col-span-10"
          />

          <RevealItem
            as="p"
            className="col-span-full text-lede text-stone md:col-span-6 md:col-start-3 lg:col-span-5 lg:col-start-7"
          >
            {content.narrative}
          </RevealItem>

          <RevealItem
            className="col-span-full mt-6 flex flex-col gap-4 border-t border-line pt-6 md:flex-row md:items-baseline md:gap-10 lg:mt-10"
          >
            <p className="eyebrow shrink-0 text-stone">{content.principlesLabel}</p>
            <p className="font-display text-heading">
              {content.principles.map((principle, i) => (
                <Fragment key={principle}>
                  <span className="whitespace-nowrap">
                    {principle}
                    {i < content.principles.length - 1 && <span className="text-stone"> · </span>}
                  </span>{" "}
                </Fragment>
              ))}
            </p>
          </RevealItem>
        </Reveal>
      </Container>
    </section>
  );
}
