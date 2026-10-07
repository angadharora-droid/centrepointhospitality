import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { opportunities as content } from "@/content/development";

/** The kinds of project that fit, as a typographic list on aubergine. */
export function Opportunities() {
  return (
    <section aria-labelledby="opportunities-title" className="bg-aubergine py-section text-paper [--focus-ring:currentColor]">
      <Container>
        <SectionHeader
          id="opportunities-title"
          eyebrow={content.eyebrow}
          lines={content.heading}
          emphasis={content.emphasis}
          intro={content.intro}
          tone="dark"
        />
        <Reveal amount={0.15} stagger={0.06}>
          <ul className="grid border-t border-line-inverse md:grid-cols-2 md:gap-x-(--spacing-grid)">
            {content.types.map((type) => (
              <RevealItem
                as="li"
                key={type}
                className="border-b border-line-inverse py-6 font-display text-[clamp(1.625rem,1.2rem+1.3vw,2.5rem)] leading-tight"
              >
                {type}
              </RevealItem>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
