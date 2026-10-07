import { Fragment, type CSSProperties } from "react";
import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Emphasis } from "@/components/typography/Emphasis";
import { hero } from "@/content/home";

// Entrance choreography (ms). Media settles first; lines follow in sequence.
// Nothing moves again once this completes.
const timing = { line: 250, lineStagger: 110, body: 950, cta: 1250, control: 1600 };
const delay = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });

export function HeroContent({ titleId }: { titleId: string }) {
  return (
    <Container className="pt-[calc(var(--header-h)+2rem)] pb-[clamp(3.25rem,8svh,4.5rem)] md:pb-[clamp(3.5rem,11svh,8rem)] short:pt-[calc(var(--header-h)+0.75rem)] short:pb-10">
      <Grid className="items-end gap-y-8 md:gap-y-12 short:gap-y-4">
        <h1
          id={titleId}
          className="col-span-full font-display text-hero font-medium max-md:short:col-span-2 md:max-lg:short:col-span-4 lg:col-span-7"
        >
          {hero.headline.map((line, i) => (
            <Fragment key={line}>
              {/* Each line rises inside its own mask. The padding/negative margin
                  pair keeps ascenders, descenders and italics clear of the clip
                  without changing the line spacing. */}
              <span className="-my-[0.14em] block overflow-hidden py-[0.14em] pr-[0.08em]">
                <span className="block animate-line-reveal" style={delay(timing.line + i * timing.lineStagger)}>
                  <Emphasis text={line} word={hero.emphasis} />
                </span>
              </span>
              {i < hero.headline.length - 1 && " "}
            </Fragment>
          ))}
        </h1>

        {/* Bottom padding sets the CTA on the headline's last baseline: 0.1015em above its line box (Cormorant at line-height 0.84) less the CTA's own 0.7rem baseline offset. */}
        <div className="col-span-full md:col-span-4 md:col-start-5 lg:col-start-9 lg:pb-[calc(var(--hero-size)*0.1015-0.7rem)] max-md:short:col-span-2 max-md:short:col-start-3 short:pb-[calc(var(--hero-size)*0.1015-0.7rem)]">
          <p
            className="text-[1.0625rem] leading-[1.6] text-paper/95 animate-rise md:text-lede md:leading-[1.55] lg:max-w-[clamp(20rem,26vw,28rem)] short:text-body"
            style={delay(timing.body)}
          >
            {hero.body}
          </p>
          <ExploreLink />
        </div>
      </Grid>
    </Container>
  );
}

function ExploreLink() {
  return (
    <a
      href={hero.cta.href}
      className="group mt-7 inline-flex items-center gap-4 eyebrow animate-fade-in md:mt-9 short:mt-4"
      style={delay(timing.cta)}
    >
      <span className="relative pb-2">
        {hero.cta.label}
        {/* A resting hairline, and a full-strength one that draws over it on hover. */}
        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-current opacity-30" />
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-current transition-transform duration-(--duration-slow) ease-editorial group-hover:scale-x-100 group-focus-visible:scale-x-100"
        />
      </span>
      <svg
        aria-hidden="true"
        viewBox="0 0 8 14"
        className="-mt-2 h-3.5 w-2 fill-none stroke-current transition-transform duration-(--duration-base) ease-editorial group-hover:translate-y-0.5 group-focus-visible:translate-y-0.5"
      >
        <path d="M4 0.5 V13 M0.75 9.75 L4 13 L7.25 9.75" strokeWidth="1" />
      </svg>
    </a>
  );
}

type MediaControlProps = { playing: boolean; onToggle: () => void; index?: number; count?: number };

const pad = (n: number) => String(n).padStart(2, "0");

/** Supporting UI only: a quiet slide index and a hairline pause / play toggle. */
export function MediaControl({ playing, onToggle, index, count }: MediaControlProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={playing ? "Pause background imagery" : "Play background imagery"}
      className="pointer-events-auto -m-3 flex items-center gap-2.5 p-3 text-[0.625rem] leading-none tracking-[0.16em] text-paper/45 tabular-nums animate-fade-in transition-colors duration-(--duration-base) hover:text-paper focus-visible:text-paper"
      style={delay(timing.control)}
    >
      {index !== undefined && count !== undefined && (
        <span aria-hidden="true" className="hidden items-center gap-2 sm:flex">
          {pad(index + 1)}
          <span className="h-px w-3 bg-current opacity-50" />
          {pad(count)}
        </span>
      )}
      <svg aria-hidden="true" viewBox="0 0 8 10" className="h-2 w-1.5 fill-none stroke-current">
        {playing ? (
          <path d="M2 1 V9 M6 1 V9" strokeWidth="1" />
        ) : (
          <path d="M1.5 1 L7 5 L1.5 9 Z" strokeWidth="1" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  );
}
