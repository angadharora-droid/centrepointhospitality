"use client";

import Image from "next/image";
import { m, useMotionValue, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/Container";
import type { TimelineEntry } from "@/content/types";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/cn";
import { JourneyChronology, YEAR } from "./JourneyChronology";

// Vertical scroll spent per milestone (in svh). 7 milestones ≈ 5.2 viewports.
const SCROLL_PER_MILESTONE = 70;
// Fraction of the scroll at each end where the row holds still.
const HOLD = 0.05;

/**
 * Desktop: vertical scroll drives a horizontal row of chapters inside a sticky
 * viewport. The track only translates (no layout per frame) and the section
 * releases on its own once the last chapter is in place. Reduced motion gets
 * the stacked chronology instead.
 */
export function JourneyScroller({ milestones }: { milestones: TimelineEntry[] }) {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  if (reduceMotion) {
    return (
      <Container className="pb-section">
        <JourneyChronology milestones={milestones} />
      </Container>
    );
  }
  return <StickyJourney milestones={milestones} />;
}

function StickyJourney({ milestones }: { milestones: TimelineEntry[] }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const offsets = useRef<number[]>([]);
  const distance = useMotionValue(0);
  const [active, setActive] = useState(0);

  // Measure once and on resize: how far the track must travel, and where each
  // chapter starts, so the counter follows the chapter actually in view.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () => {
      distance.set(Math.max(0, el.scrollWidth - window.innerWidth));
      offsets.current = Array.from(el.children, (child) => (child as HTMLElement).offsetLeft);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [distance]);

  const { scrollYProgress } = useScroll({ target: wrapper, offset: ["start start", "end end"] });
  // A short hold at each end so the first chapter starts fully in view and the
  // last one settles before the section releases.
  const travel = useTransform(scrollYProgress, [HOLD, 1 - HOLD], [0, 1], { clamp: true });
  const x = useTransform(() => -travel.get() * distance.get());

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    // The reading line drifts from 20% to 80% of the viewport as the row
    // travels, so the first chapter starts active and the last one finishes it.
    const t = Math.min(1, Math.max(0, (progress - HOLD) / (1 - 2 * HOLD)));
    const travelled = t * distance.get() + window.innerWidth * (0.2 + 0.6 * t);
    let index = 0;
    offsets.current.forEach((left, i) => {
      if (left <= travelled) index = i;
    });
    setActive((current) => (current === index ? current : index));
  });

  const total = milestones.length;

  return (
    <div
      ref={wrapper}
      className="relative"
      style={{ height: `calc(100svh + ${(total - 1) * SCROLL_PER_MILESTONE}svh)` }}
    >
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden pt-[calc(var(--header-h)+1.75rem)] pb-10">
        <Container className="flex items-baseline justify-between" aria-hidden="true">
          <span className="eyebrow text-mist">Chapter</span>
          <span className="eyebrow tabular-nums text-mist">
            <span className="text-paper">{String(active + 1).padStart(2, "0")}</span> / {String(total).padStart(2, "0")}
          </span>
        </Container>

        <m.ol
          ref={track}
          style={{ x }}
          className="flex w-max flex-1 items-center gap-[clamp(5rem,9vw,10rem)] px-gutter will-change-transform"
        >
          {milestones.map((milestone, i) => (
            <li
              key={milestone.year}
              className={cn(
                "flex h-[min(64svh,42rem)] items-stretch gap-[clamp(2.5rem,4vw,4.5rem)] transition-opacity duration-700 ease-editorial",
                i === active ? "opacity-100" : "opacity-40",
              )}
            >
              {/* The year holds the top of the chapter, the story its foot. */}
              <div className="flex h-full w-[clamp(20rem,27vw,29rem)] flex-col justify-between">
                <p className={`${YEAR} -mt-[0.06em] text-[clamp(5rem,11vw,13rem)]`}>{milestone.year}</p>
                <div className="pb-1">
                  <h3 className="font-display text-heading">{milestone.title}</h3>
                  {/* Reserve three lines so titles align across chapters. */}
                  <p className="mt-4 min-h-[4.9em] text-mist lg:text-[1.0625rem]">{milestone.body}</p>
                </div>
              </div>
              {milestone.image && (
                <div className="relative aspect-[4/5] h-full shrink-0 overflow-hidden bg-aubergine">
                  <Image
                    src={milestone.image.src}
                    alt={milestone.image.alt}
                    fill
                    sizes="(min-width: 80rem) 34vw, (min-width: 64rem) 39vw, 1px"
                    className="object-cover [filter:contrast(1.02)_saturate(0.92)]"
                    style={{ objectPosition: milestone.image.focus }}
                  />
                </div>
              )}
            </li>
          ))}
        </m.ol>

        <Container aria-hidden="true">
          <div className="h-px bg-line-inverse">
            <m.div className="h-px origin-left bg-paper/70" style={{ scaleX: scrollYProgress }} />
          </div>
        </Container>
      </div>
    </div>
  );
}
