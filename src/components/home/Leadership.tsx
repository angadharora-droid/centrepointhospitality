import { Fragment } from "react";
import { Container } from "@/components/layout/Container";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Emphasis } from "@/components/typography/Emphasis";
import { leadershipSection as content } from "@/content/home";
import { leadership } from "@/content/people";
import { LeadershipPeople } from "./LeadershipPeople";

const TITLE_ID = "leadership-title";

/**
 * Leadership — after the dark timeline the page returns to paper for large,
 * evenly weighted portraits (the source site presents the team as equals).
 */
export function Leadership() {
  return (
    <section id={content.id} aria-labelledby={TITLE_ID} className="bg-paper py-section text-ink">
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

        <Reveal amount={0.15} stagger={0.1}>
          <LeadershipPeople people={leadership} />
        </Reveal>
      </Container>
    </section>
  );
}
