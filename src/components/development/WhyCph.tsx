import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { whyCph as content } from "@/content/development";

/** Five plain differentiators on charcoal — no figures, no superlatives. */
export function WhyCph() {
  return (
    <section aria-labelledby="why-title" className="bg-ink py-section text-paper [--focus-ring:currentColor]">
      <Container>
        <SectionHeader id="why-title" eyebrow={content.eyebrow} lines={content.heading} emphasis={content.emphasis} tone="dark" />
        <Reveal amount={0.1} stagger={0.08}>
          <ul className="border-t border-line-inverse">
            {content.reasons.map((reason) => (
              <RevealItem
                as="li"
                key={reason.title}
                className="grid gap-y-3 border-b border-line-inverse py-8 md:py-9 lg:grid-cols-12 lg:items-baseline lg:gap-x-(--spacing-grid)"
              >
                <h3 className="font-display text-[clamp(1.75rem,1.25rem+1.5vw,2.75rem)] leading-[1.05] lg:col-span-6">
                  {reason.title}
                </h3>
                <p className="max-w-[32rem] text-mist md:text-[1.0625rem] lg:col-span-5 lg:col-start-8">{reason.text}</p>
              </RevealItem>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
