import { Container } from "@/components/layout/Container";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { RevealHeading } from "@/components/typography/RevealHeading";
import { proposition as content } from "@/content/development";

/** "More than an operator." — the statement, a short explanation and six plain pillars. */
export function Proposition() {
  return (
    <section aria-labelledby="proposition-title" className="bg-paper py-section text-ink">
      <Container>
        <Reveal className="grid-site gap-y-10">
          <RevealItem variant="fade" className="col-span-full">
            <p className="eyebrow text-stone">{content.eyebrow}</p>
          </RevealItem>
          <RevealHeading
            id="proposition-title"
            lines={content.statement}
            emphasis={content.emphasis}
            className="col-span-full font-display text-statement max-md:text-statement-sm lg:col-span-6"
          />
          <div className="col-span-full md:col-span-6 md:col-start-3 lg:col-span-5 lg:col-start-8 lg:pt-4">
            <RevealItem as="p" className="text-lede">
              {content.text}
            </RevealItem>
            <RevealItem as="ul" className="mt-10 grid grid-cols-2 gap-x-(--spacing-grid) border-t border-line">
              {content.pillars.map((pillar) => (
                <li key={pillar} className="border-b border-line py-4 text-[1.0625rem]">
                  {pillar}
                </li>
              ))}
            </RevealItem>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
