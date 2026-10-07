import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { culture as content } from "@/content/careers";

/** One large statement and a single supporting line — no more. */
export function Culture() {
  return (
    <section aria-labelledby="culture-title" className="bg-paper pb-section text-ink">
      <Container>
        <SectionHeader
          id="culture-title"
          eyebrow={content.eyebrow}
          lines={content.heading}
          emphasis={content.emphasis}
          intro={content.text}
          className="border-t border-line pt-[clamp(3.5rem,6vw,6rem)] pb-0"
        />
      </Container>
    </section>
  );
}
