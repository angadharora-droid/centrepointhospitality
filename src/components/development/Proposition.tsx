import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { RevealHeading } from "@/components/typography/RevealHeading";
import { proposition as content } from "@/content/development";

/**
 * "More than an operator." — the page's photographic pause: the statement and
 * one short explanation beside a single CPH photograph of service in progress.
 */
export function Proposition() {
  return (
    <section aria-labelledby="proposition-title" className="bg-paper py-section text-ink">
      <Container>
        <Reveal className="grid-site gap-y-10 lg:items-end">
          <div className="col-span-full lg:col-span-6">
            <RevealItem variant="fade">
              <p className="eyebrow text-stone">{content.eyebrow}</p>
            </RevealItem>
            <RevealHeading
              id="proposition-title"
              lines={content.statement}
              emphasis={content.emphasis}
              className="mt-10 font-display text-statement max-md:text-statement-sm"
            />
            <RevealItem as="p" className="mt-10 max-w-[30rem] text-lede">
              {content.text}
            </RevealItem>
          </div>
          <RevealItem className="relative col-span-full aspect-[4/3] overflow-hidden bg-linen md:col-span-6 md:col-start-3 lg:col-span-5 lg:col-start-8 lg:aspect-[4/5]">
            <Image
              src={content.image.src}
              alt={content.image.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 64rem) 40vw, (min-width: 48rem) 75vw, 92vw"
              className="object-cover [filter:contrast(1.02)_saturate(0.94)]"
              style={{ objectPosition: content.image.focus }}
            />
          </RevealItem>
        </Reveal>
      </Container>
    </section>
  );
}
