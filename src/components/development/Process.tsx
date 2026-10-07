import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { process as content } from "@/content/development";

/**
 * Five steps as a staggered sequence on desktop (each step sits a little lower
 * than the last, along a shared hairline) and a simple vertical list on mobile.
 * No durations are implied.
 */
export function Process() {
  return (
    <section aria-labelledby="process-title" className="bg-paper py-section text-ink">
      <Container>
        <SectionHeader id="process-title" eyebrow={content.eyebrow} lines={content.heading} emphasis={content.emphasis} />
        <Reveal amount={0.15} stagger={0.12}>
          <ol className="grid border-t border-line lg:grid-cols-5 lg:gap-x-(--spacing-grid) lg:border-t-0 lg:[--step-offset:2.5rem]">
            {content.steps.map((step, i) => (
              <RevealItem
                as="li"
                key={step.title}
                className="relative grid grid-cols-[3rem_1fr] gap-x-4 border-b border-line py-8 lg:block lg:border-t lg:border-b-0 lg:py-0 lg:pt-8"
                style={{ marginTop: `calc(${i} * var(--step-offset, 0rem))` }}
              >
                <span className="font-display text-title text-magenta tabular-nums [font-variant-numeric:lining-nums]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="lg:mt-10">
                  <h3 className="eyebrow text-ink">{step.title}</h3>
                  <p className="mt-3 max-w-[22rem] text-stone">{step.text}</p>
                </div>
              </RevealItem>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
