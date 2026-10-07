import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { partnershipModels as content } from "@/content/development";

/**
 * The six partnership areas as numbered chapters. Each row carries its slug as
 * an id, so the homepage rows (/development#hotel-management …) land here.
 */
export function PartnershipModels() {
  return (
    <section aria-labelledby="models-title" className="bg-paper pb-section text-ink">
      <Container>
        <SectionHeader id="models-title" eyebrow={content.eyebrow} lines={content.heading} emphasis={content.emphasis} intro={content.intro} className="border-t border-line pt-[clamp(3.5rem,6vw,6rem)]" />
        <Reveal amount={0.1} stagger={0.07}>
          <ol className="border-t border-line">
            {content.models.map((model, i) => (
              <RevealItem
                as="li"
                key={model.slug}
                id={model.slug}
                className="grid grid-cols-[2.25rem_1fr] gap-x-4 gap-y-3 border-b border-line py-8 md:grid-cols-[3rem_1fr] md:py-9 lg:grid-cols-12 lg:items-baseline lg:gap-x-(--spacing-grid) lg:py-10"
              >
                <span aria-hidden="true" className="eyebrow text-stone tabular-nums lg:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-[clamp(1.875rem,1.3rem+1.7vw,3rem)] leading-[1.05] lg:col-span-5">
                  {model.title}
                </h3>
                <p className="col-start-2 max-w-[32rem] text-stone md:text-[1.0625rem] lg:col-span-5 lg:col-start-8">
                  {model.text}
                </p>
              </RevealItem>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
