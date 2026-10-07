import { Container } from "@/components/layout/Container";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { RevealHeading } from "@/components/typography/RevealHeading";
import { openingStory as content } from "@/content/about";

/** The narrative opening: a pull statement on the left, the story on the right. */
export function OpeningStory() {
  return (
    <section aria-labelledby="opening-title" className="bg-paper pb-section text-ink">
      <Container>
        <Reveal className="grid-site gap-y-10 border-t border-line pt-[clamp(3.5rem,6vw,6rem)]">
          <RevealItem variant="fade" className="col-span-full">
            <p className="eyebrow text-stone">{content.eyebrow}</p>
          </RevealItem>
          <RevealHeading
            id="opening-title"
            lines={content.pull}
            emphasis={content.emphasis}
            className="col-span-full font-display text-[clamp(2.25rem,1rem+3.4vw,4.5rem)] leading-[1] tracking-[-0.015em] lg:col-span-6"
          />
          <div className="col-span-full space-y-6 md:col-span-6 md:col-start-3 lg:col-span-5 lg:col-start-8 lg:pt-3">
            {content.paragraphs.map((paragraph, i) => (
              <RevealItem
                as="p"
                key={paragraph.slice(0, 24)}
                className={i === 0 ? "text-lede" : "text-stone md:text-[1.0625rem] md:leading-[1.7]"}
              >
                {paragraph}
              </RevealItem>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
