import { Container } from "@/components/layout/Container";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { RevealHeading } from "@/components/typography/RevealHeading";
import { evolution as content } from "@/content/about";

/**
 * Hotels → Restaurants → Food → Experiences, as four explanatory chapters on
 * charcoal. Typographic rather than photographic, so it reads as the story of
 * the group, not a second category gallery.
 */
export function Evolution() {
  const last = content.chapters.length - 1;

  return (
    <section aria-labelledby="evolution-title" className="bg-ink py-section text-paper [--focus-ring:currentColor]">
      <Container>
        <Reveal className="grid-site gap-y-8 pb-[clamp(3rem,6vw,6rem)]">
          <RevealItem variant="fade" className="col-span-full">
            <p className="eyebrow text-mist">{content.eyebrow}</p>
          </RevealItem>
          <RevealHeading
            id="evolution-title"
            lines={content.heading}
            emphasis={content.emphasis}
            className="col-span-full font-display text-statement max-md:text-[clamp(2.5rem,11vw,3.5rem)] lg:col-span-9"
          />
        </Reveal>

        <Reveal amount={0.15} stagger={0.1}>
          <ol className="border-t border-line-inverse">
            {content.chapters.map((chapter, i) => (
              <RevealItem
                as="li"
                key={chapter.title}
                className="grid-site gap-y-4 border-b border-line-inverse py-10 md:py-12 lg:items-baseline lg:py-14"
              >
                <p aria-hidden="true" className="eyebrow col-span-full text-mist tabular-nums lg:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="col-span-full flex items-baseline gap-5 font-display text-[clamp(2.75rem,1.2rem+4.4vw,6rem)] leading-[0.95] tracking-[-0.02em] lg:col-span-5">
                  {chapter.title}
                  {i < last && (
                    <span aria-hidden="true" className="text-[0.4em] text-mist">
                      →
                    </span>
                  )}
                </h3>
                <div className="col-span-full md:col-span-6 md:col-start-3 lg:col-span-5 lg:col-start-8">
                  <p className="font-display text-title italic">{chapter.line}</p>
                  <p className="mt-3 text-mist md:text-[1.0625rem]">{chapter.text}</p>
                </div>
              </RevealItem>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
