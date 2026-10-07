import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { RevealHeading } from "@/components/typography/RevealHeading";
import { aboutHero as content } from "@/content/about";

/**
 * Interior hero — deliberately calmer than the homepage: paper ground, a solid
 * header, the headline on the left and one framed photograph beside it.
 * No slideshow, no overlay.
 */
export function AboutHero() {
  return (
    <section aria-labelledby="about-title" className="bg-paper text-ink">
      <Container className="grid-site gap-y-8 pt-[clamp(2rem,5svh,5rem)] pb-[clamp(3rem,8vw,8rem)] md:min-h-[min(calc(80svh-var(--header-h)),44rem)] md:items-stretch lg:min-h-[calc(80svh-var(--header-h))]">
        <Reveal className="col-span-full flex flex-col justify-end md:col-span-4 md:pb-1 lg:col-span-6 lg:pb-2">
          <RevealItem variant="fade">
            <p className="eyebrow text-stone">{content.eyebrow}</p>
          </RevealItem>
          <RevealHeading
            as="h1"
            id="about-title"
            lines={content.heading}
            emphasis={content.emphasis}
            className="mt-6 font-display text-[clamp(2.75rem,0.9rem+5vw,6.25rem)] leading-[0.95] tracking-[-0.02em] md:mt-10"
          />
          <RevealItem as="p" className="mt-6 max-w-[30rem] text-stone md:mt-10 md:text-lede">
            {content.intro}
          </RevealItem>
        </Reveal>

        <div className="relative col-span-full aspect-[16/10] overflow-hidden bg-linen md:col-span-4 md:col-start-5 md:aspect-auto md:min-h-[24rem] lg:col-span-6 lg:col-start-7 lg:min-h-[28rem]">
          <Image
            src={content.image.src}
            alt={content.image.alt}
            fill
            preload
            placeholder="blur"
            sizes="(min-width: 48rem) 50vw, 92vw"
            className="object-cover animate-settle [filter:contrast(1.02)_saturate(0.94)]"
            style={{ objectPosition: content.image.focus }}
          />
        </div>
      </Container>
    </section>
  );
}
