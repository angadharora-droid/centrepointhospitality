import Image from "next/image";
import { Fragment } from "react";
import { Container } from "@/components/layout/Container";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Emphasis } from "@/components/typography/Emphasis";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { journal as content } from "@/content/home";
import { FOCUS_FRAME, OutArrow, STORY_IMAGE, StoryLink, StoryMeta } from "@/components/stories/StoryParts";

const TITLE_ID = "journal-title";

/**
 * Journal — a calm, magazine-like close to the page on paper: one featured
 * story given real weight, then a short run of secondary stories as image +
 * headline rows (no excerpts, no filters).
 */
export function Journal() {
  const { featured, more } = content;

  return (
    <section id="journal" aria-labelledby={TITLE_ID} className="bg-paper py-section text-ink">
      <Container>
        <Reveal className="grid-site items-end gap-y-8 pb-[clamp(3rem,6vw,6rem)]">
          <RevealItem variant="fade" className="col-span-full mb-4 md:mb-6 lg:mb-10">
            <p className="eyebrow text-stone">{content.eyebrow}</p>
          </RevealItem>

          <h2
            id={TITLE_ID}
            className="col-span-full font-display text-statement max-md:text-statement-sm md:col-span-6 lg:col-span-7"
          >
            {content.heading.map((line, i) => (
              <Fragment key={line}>
                <span className="-my-[0.14em] block overflow-hidden py-[0.14em] pr-[0.08em]">
                  <RevealItem as="span" variant="line" className="block">
                    <Emphasis text={line} word={content.emphasis} />
                  </RevealItem>
                </span>
                {i < content.heading.length - 1 && " "}
              </Fragment>
            ))}
          </h2>

          <RevealItem
            as="p"
            className="col-span-full max-w-[26rem] text-lede text-stone md:col-span-4 md:col-start-5 lg:col-span-4 lg:col-start-9"
          >
            {content.intro}
          </RevealItem>
        </Reveal>

        <Reveal amount={0.15} stagger={0.1}>
          {/* Featured story */}
          <RevealItem>
            <article className={`group grid-site relative gap-y-8 lg:items-end ${FOCUS_FRAME}`}>
              <div className="relative col-span-full aspect-[4/3] overflow-hidden bg-linen lg:col-span-7 lg:aspect-[16/11]">
                <Image
                  src={featured.image!.src}
                  alt={featured.image!.alt}
                  fill
                  sizes="(min-width: 64rem) 58vw, 92vw"
                  className={STORY_IMAGE}
                  style={{ objectPosition: featured.image!.focus }}
                />
              </div>
              <div className="col-span-full md:col-span-6 lg:col-span-5 lg:col-start-8 lg:pb-2 lg:pl-6 xl:col-span-4 xl:col-start-9 xl:pl-0">
                <StoryMeta story={featured} />
                <h3 className="mt-5 font-display text-[clamp(2.25rem,0.6rem+2.9vw,3.75rem)] leading-[1.02] tracking-[-0.015em]">
                  <StoryLink story={featured} />
                </h3>
                {featured.excerpt && <p className="mt-5 text-stone md:text-[1.0625rem]">{featured.excerpt}</p>}
                <p className="mt-4 text-small text-stone">Via <span className="text-ink">{featured.publication}</span></p>
                <span aria-hidden="true" className="mt-8 inline-flex items-center gap-4 eyebrow">Read original<OutArrow /></span>
              </div>
            </article>
          </RevealItem>

          {/* Secondary stories */}
          <ul className="mt-[clamp(4rem,7vw,7rem)] grid gap-x-(--spacing-grid) gap-y-10 border-t border-line pt-10 md:grid-cols-2 md:pt-12 lg:grid-cols-12">
            {more.map((story) => (
              <RevealItem as="li" key={story.id} className="lg:col-span-4">
                <article className={`group relative grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] items-start gap-5 md:grid-cols-1 md:gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-(--spacing-grid) ${FOCUS_FRAME}`}>
                  <div className="relative aspect-[4/5] overflow-hidden bg-linen md:aspect-[4/3] lg:aspect-[4/5]">
                    <Image
                      src={story.image!.src}
                      alt={story.image!.alt}
                      fill
                      sizes="(min-width: 64rem) 22vw, (min-width: 48rem) 45vw, 35vw"
                      className={STORY_IMAGE}
                      style={{ objectPosition: story.image!.focus }}
                    />
                  </div>
                  <div>
                    <StoryMeta story={story} />
                    <h3 className="mt-3 font-display text-[clamp(1.375rem,1.1rem+0.9vw,2rem)] leading-[1.12] md:mt-4">
                      <StoryLink story={story} />
                    </h3>
                    <p aria-hidden="true" className="mt-4 hidden text-small text-stone md:block">{story.publication} <OutArrow className="ml-1 text-ink" /></p>
                  </div>
                </article>
              </RevealItem>
            ))}
          </ul>
        </Reveal>

        {content.cta && (
          <div className="mt-14 flex border-t border-line pt-6 md:mt-16 md:justify-end md:pt-8">
            <ArrowLink href={content.cta.href}>{content.cta.label}</ArrowLink>
          </div>
        )}
      </Container>
    </section>
  );
}
