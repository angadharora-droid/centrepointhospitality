import { Container } from "@/components/layout/Container";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { RevealHeading } from "@/components/typography/RevealHeading";
import { enquiry as content } from "@/content/development";
import { DevelopmentForm } from "./DevelopmentForm";

/** The close of the page: the invitation on the left, the enquiry form beside it. */
export function Enquiry() {
  return (
    <section
      id={content.id}
      aria-labelledby="enquiry-title"
      className="bg-ink py-section text-paper [--focus-ring:currentColor]"
    >
      <Container className="grid-site gap-y-14">
        <Reveal className="col-span-full lg:col-span-5">
          <RevealItem variant="fade">
            <p className="eyebrow text-mist">{content.eyebrow}</p>
          </RevealItem>
          <RevealHeading
            id="enquiry-title"
            lines={content.heading}
            emphasis={content.emphasis}
            className="mt-8 font-display text-[clamp(2.75rem,1rem+4.6vw,6rem)] leading-[0.95] tracking-[-0.02em]"
          />
          <RevealItem as="p" className="mt-8 max-w-[28rem] text-lede text-paper/85">
            {content.intro}
          </RevealItem>
          <RevealItem as="p" className="mt-6 text-small text-mist">
            Prefer email?{" "}
            <a href={`mailto:${content.fallbackEmail}`} className="link-underline text-paper">
              {content.fallbackEmail}
            </a>
          </RevealItem>
        </Reveal>

        <div className="col-span-full lg:col-span-6 lg:col-start-7 lg:pt-2">
          <DevelopmentForm />
        </div>
      </Container>
    </section>
  );
}
