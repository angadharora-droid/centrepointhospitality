import type { CSSProperties } from "react";
import { Container } from "@/components/layout/Container";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { atAGlance as content } from "@/content/home";
import { cn } from "@/lib/cn";

const TITLE_ID = "at-a-glance-title";

// Sized so the widest value ("10,000", ~2.56em in lining figures) fits its
// column at every breakpoint, up to five figures in a row on desktop.
const NUMBER =
  "font-display leading-[0.9] tracking-[-0.02em] [font-variant-numeric:lining-nums] text-[clamp(3.25rem,15vw,4.25rem)] md:text-[4.5rem] lg:text-[clamp(3.5rem,5.6vw,6.5rem)]";

// Only confirmed figures are shown. Unconfirmed ones stay in home.ts (with
// TODOs) and appear automatically once marked confirmed.
const stats = content.stats.filter((stat) => stat.confirmed);

/**
 * A short typographic pause on deep aubergine: large figures, small labels,
 * hairlines between them. No count-up — a single staggered reveal, then still.
 */
export function Stats() {
  return (
    <section
      aria-labelledby={TITLE_ID}
      className="bg-aubergine py-[clamp(5rem,2.5rem+7vw,10rem)] text-paper [--focus-ring:currentColor]"
    >
      <Container>
        <Reveal amount={0.3}>
          <RevealItem variant="fade">
            <h2 id={TITLE_ID} className="eyebrow text-mist">
              {content.eyebrow}
            </h2>
          </RevealItem>

          <dl
            style={{ "--stat-count": stats.length } as CSSProperties}
            className="mt-12 grid grid-cols-2 gap-x-(--spacing-grid) gap-y-12 md:mt-16 lg:mt-20 lg:grid-cols-[repeat(var(--stat-count),minmax(0,1fr))] lg:gap-x-0"
          >
            {stats.map((stat, i) => (
              <RevealItem
                key={stat.label}
                className={cn(
                  "flex flex-col-reverse justify-end border-t border-line-inverse pt-6",
                  // Mobile and tablet: pairs, with an odd last figure across the full width.
                  i === stats.length - 1 && stats.length % 2 === 1 && "col-span-2",
                  // Desktop: one row, hairlines between figures instead of above.
                  "lg:col-span-1 lg:border-t-0 lg:pt-0",
                  i > 0 && "lg:border-l lg:pl-[clamp(1.25rem,2vw,2.25rem)]",
                )}
              >
                <dt className="mt-4 max-w-[13rem] text-small leading-snug text-mist lg:mt-5">{stat.label}</dt>
                <dd className={NUMBER}>{stat.value}</dd>
              </RevealItem>
            ))}
          </dl>

          <RevealItem as="p" className="mt-14 font-display text-title text-paper/80 italic md:mt-16 lg:mt-20">
            {content.note}
          </RevealItem>
        </Reveal>
      </Container>
    </section>
  );
}
