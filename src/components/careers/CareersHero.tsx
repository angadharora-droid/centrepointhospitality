import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { RevealHeading } from "@/components/typography/RevealHeading";
import { careersHero as content } from "@/content/careers";

/**
 * Warm, people-led opener: the headline and intro on paper, then the team
 * photograph across the full content width.
 */
export function CareersHero() {
  return (
    <section aria-labelledby="careers-title" className="bg-paper text-ink">
      <Container className="pt-[clamp(2.5rem,7svh,6rem)] pb-[clamp(3rem,6vw,6rem)]">
        <Reveal className="grid-site items-end gap-y-8">
          <RevealItem variant="fade" className="col-span-full">
            <p className="eyebrow text-stone">{content.eyebrow}</p>
          </RevealItem>
          <RevealHeading
            as="h1"
            id="careers-title"
            lines={content.heading}
            emphasis={content.emphasis}
            className="col-span-full font-display text-page-title md:col-span-6 lg:col-span-8"
          />
          <RevealItem as="p" className="col-span-full max-w-[28rem] text-stone md:col-span-2 md:text-lede lg:col-span-4 lg:pb-3">
            {content.intro}
          </RevealItem>
        </Reveal>

        <div className="relative mt-12 aspect-[4/3] overflow-hidden bg-linen md:mt-16 md:aspect-[16/9] lg:aspect-[2/1]">
          <Image
            src={content.image.src}
            alt={content.image.alt}
            fill
            preload
            placeholder="blur"
            sizes="(min-width: 105rem) 1600px, 94vw"
            className="object-cover animate-settle [filter:contrast(1.02)_saturate(0.94)]"
            style={{ objectPosition: content.image.focus }}
          />
        </div>
      </Container>
    </section>
  );
}
