import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { locations as content } from "@/content/contact-page";

/**
 * Group-level locations. Only the published Nagpur address is shown, with a
 * directions link — no embedded map, since the group's places are spread
 * across cities rather than one office.
 */
export function Locations() {
  return (
    <section aria-labelledby="locations-title" className="bg-linen py-section text-ink">
      <Container>
        <SectionHeader id="locations-title" eyebrow={content.eyebrow} lines={content.heading} emphasis={content.emphasis} />
        <Reveal amount={0.15} stagger={0.08}>
          <ul className="grid gap-x-(--spacing-grid) md:grid-cols-3">
            {content.items.map((location) => (
              <RevealItem as="li" key={location.city} className="border-t border-ink/15 pt-6 pb-10 md:pb-0">
                <h3 className="font-display text-heading">{location.city}</h3>
                <p className="mt-3 text-stone">{location.note}</p>
                {location.address && (
                  <address className="mt-6 text-ink not-italic">
                    {location.address.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                )}
                {location.directions && (
                  <ArrowLink href={location.directions} external className="mt-6">
                    Get directions
                  </ArrowLink>
                )}
              </RevealItem>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
