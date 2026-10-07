"use client";

import { m, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Container } from "@/components/layout/Container";
import { hero } from "@/content/home";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useSlideshow } from "@/hooks/useSlideshow";
import { HeroContent, MediaControl } from "./HeroContent";
import { HeroMedia } from "./HeroMedia";

const TITLE_ID = "hero-title";

/**
 * Full-viewport opening statement. Marks itself with `data-header-overlay` so
 * the header starts transparent above it. Scrolling away drifts the text up
 * slightly and eases the image forward — no pinning, no scroll-jacking.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  // Read via useSyncExternalStore so server and first client render agree.
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const slideshow = useSlideshow(hero.slides.length, { root: ref, reduceMotion });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.03]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.5]);

  const hasMotion = Boolean(hero.video) || hero.slides.length > 1;

  return (
    <section
      ref={ref}
      data-header-overlay=""
      aria-labelledby={TITLE_ID}
      className="relative isolate flex min-h-screen flex-col justify-end overflow-hidden bg-aubergine text-paper [--focus-ring:currentColor] supports-[min-height:100svh]:min-h-svh"
    >
      <m.div className="absolute inset-0 -z-10" style={reduceMotion ? undefined : { scale: mediaScale }}>
        <HeroMedia slides={hero.slides} video={hero.video} slideshow={slideshow} />
      </m.div>

      <m.div style={reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}>
        <HeroContent titleId={TITLE_ID} />
      </m.div>

      {/* Supporting UI: always the bottom-right corner, inside the safe area. */}
      {hasMotion && (
        <Container className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-end pb-[clamp(1.25rem,3.5svh,2.25rem)]">
          <MediaControl
            playing={slideshow.playing}
            onToggle={slideshow.toggle}
            index={hero.video ? undefined : slideshow.active}
            count={hero.video ? undefined : slideshow.count}
          />
        </Container>
      )}

    </section>
  );
}
