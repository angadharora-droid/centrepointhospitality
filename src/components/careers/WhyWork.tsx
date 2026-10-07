import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { whyWork as content } from "@/content/careers";

/** Four open editorial blocks on aubergine — a word, a line, a rule. No icons, no cards. */
export function WhyWork() {
  return (
    <section aria-labelledby="why-work-title" className="bg-aubergine py-section text-paper [--focus-ring:currentColor]">
      <Container>
        <SectionHeader id="why-work-title" eyebrow={content.eyebrow} lines={content.heading} emphasis={content.emphasis} tone="dark" />
        <Reveal amount={0.15} stagger={0.08}>
          <ul className="grid gap-x-(--spacing-grid) md:grid-cols-2 lg:grid-cols-4">
            {content.themes.map((theme, i) => (
              <RevealItem as="li" key={theme.title} className="border-t border-line-inverse pt-6 pb-10 md:pt-8 md:pb-0">
                <span aria-hidden="true" className="eyebrow text-mist tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 font-display text-[clamp(2.5rem,1.6rem+2.4vw,4.25rem)] leading-none text-blush italic md:mt-10">
                  {theme.title}
                </h3>
                <p className="mt-5 max-w-[19rem] text-paper/85 md:text-[1.0625rem]">{theme.text}</p>
              </RevealItem>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
