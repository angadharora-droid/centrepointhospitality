import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { capabilities as content } from "@/content/development";

/** A compact capability index on linen — four across on desktop, a title and a short line each. */
export function Capabilities() {
  return (
    <section aria-labelledby="capabilities-title" className="bg-linen py-section text-ink">
      <Container>
        <SectionHeader id="capabilities-title" eyebrow={content.eyebrow} lines={content.heading} emphasis={content.emphasis} />
        <Reveal amount={0.1} stagger={0.05}>
          <ul className="grid gap-x-(--spacing-grid) border-t border-ink/15 md:grid-cols-2 lg:grid-cols-4">
            {content.items.map((item, i) => (
              <RevealItem as="li" key={item.title} className="flex gap-5 border-b border-ink/15 py-7 md:py-8 lg:flex-col lg:gap-4">
                <span aria-hidden="true" className="eyebrow w-7 shrink-0 pt-2 text-stone tabular-nums lg:pt-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-title">{item.title}</h3>
                  <p className="mt-2 text-ink/75">{item.text}</p>
                </div>
              </RevealItem>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
