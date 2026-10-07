import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { RevealHeading } from "@/components/typography/RevealHeading";
import { aboutHero, aboutJourney as content } from "@/content/about";
import { cn } from "@/lib/cn";

const YEAR = "font-display leading-[0.9] tracking-[-0.02em] [font-variant-numeric:lining-nums]";

/**
 * The full chronology from the shared timeline data, in a calm vertical read:
 * year on the left, story on the right, photographs alternating sides where a
 * milestone has one. (The hero's photograph is not repeated here.)
 */
export function AboutJourney() {
  let imageIndex = 0;

  return (
    <section aria-labelledby="about-journey-title" className="bg-linen py-section text-ink">
      <Container>
        <Reveal className="grid-site gap-y-8 pb-[clamp(3rem,6vw,6rem)]">
          <RevealItem variant="fade" className="col-span-full">
            <p className="eyebrow text-stone">{content.eyebrow}</p>
          </RevealItem>
          <RevealHeading
            id="about-journey-title"
            lines={content.heading}
            emphasis={content.emphasis}
            className="col-span-full font-display text-statement max-md:text-[clamp(2.25rem,10vw,3.5rem)] lg:col-span-10"
          />
        </Reveal>

        <ol className="border-t border-ink/15">
          {content.milestones.map((milestone) => {
            const image = milestone.image && milestone.image.src !== aboutHero.image.src ? milestone.image : null;
            const imageLeft = image ? imageIndex++ % 2 === 1 : false;
            return (
              <Reveal
                as="li"
                key={milestone.year}
                amount={0.25}
                className="grid-site gap-y-6 border-b border-ink/15 py-12 md:py-14 lg:items-start lg:py-16"
              >
                <RevealItem as="p" variant="fade" className={`${YEAR} col-span-full text-[clamp(3rem,1.6rem+3.6vw,5.5rem)] md:col-span-3`}>
                  {milestone.year}
                </RevealItem>

                <RevealItem
                  className={cn(
                    "col-span-full md:col-span-5 lg:col-span-4",
                    image && imageLeft ? "lg:col-start-9" : "lg:col-start-5",
                  )}
                >
                  <h3 className="font-display text-heading">{milestone.title}</h3>
                  <p className="mt-4 max-w-[32rem] text-ink/80 md:text-[1.0625rem] md:leading-[1.7]">{milestone.body}</p>
                </RevealItem>

                {image && (
                  <RevealItem
                    className={cn(
                      "relative col-span-full aspect-[4/3] overflow-hidden bg-paper md:col-span-5 md:col-start-4 lg:row-start-1 lg:aspect-[4/5]",
                      imageLeft ? "lg:col-span-4 lg:col-start-5" : "lg:col-span-3 lg:col-start-10",
                    )}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 64rem) 30vw, (min-width: 48rem) 60vw, 92vw"
                      className="object-cover [filter:contrast(1.02)_saturate(0.94)]"
                      style={{ objectPosition: image.focus }}
                    />
                  </RevealItem>
                )}
              </Reveal>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
