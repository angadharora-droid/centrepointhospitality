import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { paths as content } from "@/content/careers";

/** The departments people join, as a clean two-column index. */
export function CareerPaths() {
  return (
    <section aria-labelledby="paths-title" className="bg-paper py-section text-ink">
      <Container>
        <SectionHeader id="paths-title" eyebrow={content.eyebrow} lines={content.heading} emphasis={content.emphasis} intro={content.intro} />
        <Reveal amount={0.1} stagger={0.05}>
          <ul className="grid gap-x-(--spacing-grid) border-t border-line md:grid-cols-2">
            {content.items.map((path, i) => (
              <RevealItem as="li" key={path.slug} id={path.slug} className="flex gap-5 border-b border-line py-7 md:py-8">
                <span aria-hidden="true" className="eyebrow w-7 shrink-0 pt-2 text-stone tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-title">{path.title}</h3>
                  <p className="mt-2 text-stone">{path.text}</p>
                </div>
              </RevealItem>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
