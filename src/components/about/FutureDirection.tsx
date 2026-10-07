import { Container } from "@/components/layout/Container";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { RevealHeading } from "@/components/typography/RevealHeading";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { aboutCta, futureDirection } from "@/content/about";

/**
 * The close of the story: a forward-looking statement on aubergine with plenty
 * of air, then a quiet invitation for owners and partners on paper.
 */
export function FutureDirection() {
  return (
    <>
      <section aria-labelledby="future-title" className="bg-aubergine py-section text-paper [--focus-ring:currentColor]">
        <Container>
          <Reveal className="grid-site gap-y-10">
            <RevealItem variant="fade" className="col-span-full">
              <p className="eyebrow text-mist">{futureDirection.eyebrow}</p>
            </RevealItem>
            <RevealHeading
              id="future-title"
              lines={futureDirection.heading}
              emphasis={futureDirection.emphasis}
              className="col-span-full font-display text-[clamp(3.5rem,1rem+7.5vw,9.5rem)] leading-[0.9] tracking-[-0.025em] lg:col-span-9"
            />
            <RevealItem
              as="p"
              className="col-span-full max-w-[32rem] text-lede text-paper/85 md:col-span-5 md:col-start-4 lg:col-span-4 lg:col-start-9"
            >
              {futureDirection.text}
            </RevealItem>
          </Reveal>
        </Container>
      </section>

      <section aria-labelledby="about-cta-title" className="bg-paper py-[clamp(5rem,3rem+6vw,9rem)] text-ink">
        <Container>
          <Reveal className="grid-site items-end gap-y-8">
            <RevealItem className="col-span-full lg:col-span-7">
              <h2 id="about-cta-title" className="font-display text-[clamp(2.25rem,1.2rem+3vw,4.25rem)] leading-[1.02] tracking-[-0.015em]">
                {aboutCta.heading}
              </h2>
              <p className="mt-5 max-w-[30rem] text-stone md:text-[1.0625rem]">{aboutCta.text}</p>
            </RevealItem>
            <RevealItem className="col-span-full flex flex-wrap items-center gap-x-10 gap-y-6 lg:col-span-5 lg:justify-end">
              <ButtonLink href={aboutCta.primary.href} fillText="var(--color-paper)">
                {aboutCta.primary.label}
              </ButtonLink>
              <ArrowLink href={aboutCta.secondary.href}>{aboutCta.secondary.label}</ArrowLink>
            </RevealItem>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
