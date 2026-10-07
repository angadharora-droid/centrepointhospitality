import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { RevealHeading } from "@/components/typography/RevealHeading";
import { developmentHero as content, enquiry } from "@/content/development";

/**
 * Charcoal interior hero: the statement on the left, one architectural
 * photograph running to the right edge of the screen on desktop.
 */
export function DevelopmentHero() {
  return (
    <section aria-labelledby="development-page-title" className="relative overflow-hidden bg-ink text-paper [--focus-ring:currentColor]">
      <div className="relative aspect-[16/10] md:aspect-[16/8] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-[46%]">
        <Image
          src={content.image.src}
          alt={content.image.alt}
          fill
          preload
          placeholder="blur"
          sizes="(min-width: 64rem) 46vw, 100vw"
          className="object-cover animate-settle [filter:contrast(1.03)_saturate(0.9)]"
          style={{ objectPosition: content.image.focus }}
        />
        {/* Soft edge so the photograph meets the charcoal without a hard seam. */}
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-ink via-ink/40 via-30% to-transparent lg:bg-linear-to-r lg:from-ink lg:via-ink/0 lg:via-25%" />
      </div>

      <Container className="relative grid-site lg:min-h-[calc(78svh-var(--header-h))] lg:items-end">
        <Reveal className="col-span-full -mt-16 pb-[clamp(3.5rem,6vw,6rem)] md:-mt-24 lg:col-span-7 lg:mt-0 lg:pt-12">
          <RevealItem variant="fade">
            <p className="eyebrow text-mist">{content.eyebrow}</p>
          </RevealItem>
          <RevealHeading
            as="h1"
            id="development-page-title"
            lines={content.heading}
            emphasis={content.emphasis}
            className="mt-8 font-display text-[clamp(3.5rem,1rem+7.2vw,9rem)] leading-[0.88] font-medium tracking-[-0.025em] md:mt-10"
          />
          <RevealItem as="p" className="mt-8 max-w-[34rem] text-paper/90 md:mt-10 md:text-lede">
            {content.intro}
          </RevealItem>
          <RevealItem as="p" className="mt-4 max-w-[34rem] text-small text-mist md:text-body">
            {content.note}
          </RevealItem>
          <RevealItem className="mt-9">
            <a href={`#${enquiry.id}`} className="group inline-flex items-center gap-4 eyebrow">
              <span className="link-underline">Discuss a project</span>
              <span aria-hidden="true" className="transition-transform duration-(--duration-base) ease-editorial group-hover:translate-y-0.5">↓</span>
            </a>
          </RevealItem>
        </Reveal>
      </Container>
    </section>
  );
}
