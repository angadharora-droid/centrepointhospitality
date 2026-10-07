import { Container } from "@/components/layout/Container";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { LeadershipPeople } from "@/components/home/LeadershipPeople";
import { RevealHeading } from "@/components/typography/RevealHeading";
import { aboutLeadership as content } from "@/content/about";

/** The principal three, using the same data and profile drawer as the homepage. */
export function AboutLeadership() {
  return (
    <section aria-labelledby="about-leadership-title" className="bg-paper py-section text-ink">
      <Container>
        <Reveal className="grid-site gap-y-8 pb-[clamp(3rem,6vw,5rem)]">
          <RevealItem variant="fade" className="col-span-full">
            <p className="eyebrow text-stone">{content.eyebrow}</p>
          </RevealItem>
          <RevealHeading
            id="about-leadership-title"
            lines={content.heading}
            emphasis={content.emphasis}
            className="col-span-full font-display text-statement max-md:text-statement-sm lg:col-span-8"
          />
        </Reveal>
        <Reveal amount={0.15} stagger={0.1}>
          <LeadershipPeople people={content.people} columns={3} />
        </Reveal>
      </Container>
    </section>
  );
}
