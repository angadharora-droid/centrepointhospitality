"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import type { HeroSlide, HeroVideo } from "@/content/home";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { Slideshow } from "@/hooks/useSlideshow";
import { cn } from "@/lib/cn";

type HeroMediaProps = {
  slides: HeroSlide[];
  video?: HeroVideo;
  slideshow: Slideshow;
};

// Portrait screens crop a landscape frame to its height, so the image renders
// wider than the viewport — tell the browser so it picks a sharp source.
const SIZES = "(max-aspect-ratio: 3/2) 150vh, 100vw";

const noSubscription = () => () => {};
const useIsClient = () => useSyncExternalStore(noSubscription, () => true, () => false);

const imageClass =
  "object-cover object-[position:var(--focus-mobile)] md:object-[position:var(--focus-desktop)] [filter:contrast(1.04)_saturate(0.94)]";

function focusStyle(focus: HeroSlide["focus"]) {
  return { "--focus-mobile": focus.mobile, "--focus-desktop": focus.desktop } as CSSProperties;
}

/**
 * Decorative background for the hero: a slow crossfade between photographs,
 * or a muted looping film when one is configured. Everything here is
 * aria-hidden; the hero's meaning lives in its text.
 */
export function HeroMedia({ slides, video, slideshow }: HeroMediaProps) {
  return (
    <div aria-hidden="true" className="absolute inset-0 animate-settle">
      {video ? (
        <HeroFilm video={video} focus={slides[0].focus} playing={slideshow.playing} />
      ) : (
        <HeroSlides slides={slides} slideshow={slideshow} />
      )}
      <Scrim />
    </div>
  );
}

function HeroSlides({ slides, slideshow }: { slides: HeroSlide[]; slideshow: Slideshow }) {
  const { active, previous, loadRest, markLoaded } = slideshow;

  return slides.map((slide, index) => {
    if (index > 0 && !loadRest) return null;
    // The incoming slide fades in on top; the outgoing one holds underneath
    // until covered, so the frame never dips through to the background.
    const state = index === active ? "active" : index === previous ? "previous" : "idle";

    return (
      <div
        key={slide.image.src}
        className={cn(
          "absolute inset-0",
          // Only the incoming slide transitions; the rest change instantly beneath it.
          state === "active" && "z-10 opacity-100 transition-opacity duration-[2400ms] ease-soft",
          state === "previous" && "z-0 opacity-100",
          state === "idle" && "z-0 opacity-0",
        )}
      >
        <Image
          src={slide.image}
          alt=""
          fill
          sizes={SIZES}
          preload={index === 0}
          placeholder={index === 0 ? "blur" : "empty"}
          fetchPriority={index === 0 ? undefined : "low"}
          onLoad={() => markLoaded(index)}
          className={imageClass}
          style={focusStyle(slide.focus)}
        />
        <SlideShade {...slide.scrim} />
      </div>
    );
  });
}

const INK = "26 21 23";

/**
 * Per-photograph balancing, crossfading with its slide, so a bright frame
 * reads like a dark one without flattening every image under one heavy layer.
 */
function SlideShade({ floor, top }: HeroSlide["scrim"]) {
  const layers = [
    top > 0 && `linear-gradient(to bottom, rgb(${INK} / ${top}) 0%, rgb(${INK} / 0) 32%)`,
    floor > 0 &&
      `linear-gradient(to top, rgb(${INK} / ${floor}) 0%, rgb(${INK} / ${floor * 0.6}) 50%, rgb(${INK} / 0) 85%)`,
  ].filter(Boolean);
  if (!layers.length) return null;
  return <div className="absolute inset-0" style={{ background: layers.join(", ") }} />;
}

function HeroFilm({
  video,
  focus,
  playing,
}: {
  video: HeroVideo;
  focus: HeroSlide["focus"];
  playing: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [requested, setRequested] = useState(false);
  const isClient = useIsClient();
  const wide = useMediaQuery("(min-width: 48rem)");
  const src = isClient ? (wide ? video.src : video.mobileSrc) : undefined;

  // Mount the film only once playback is wanted (never for reduced motion or
  // Save-Data until the visitor presses play), and only on the client.
  if (playing && !requested) setRequested(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (playing) el.play().catch(() => {});
    else el.pause();
  }, [playing, src, requested]);

  return (
    <>
      <Poster image={video.poster} focus={focus} />
      {requested && src && (
        <video
          ref={ref}
          key={src}
          src={src}
          muted
          loop
          playsInline
          autoPlay={playing}
          preload="auto"
          tabIndex={-1}
          disablePictureInPicture
          onPlaying={() => setReady(true)}
          className={cn(
            "absolute inset-0 h-full w-full object-cover object-[position:var(--focus-mobile)] transition-opacity duration-(--duration-slow) md:object-[position:var(--focus-desktop)]",
            ready ? "opacity-100" : "opacity-0",
          )}
          style={focusStyle(focus)}
        />
      )}
    </>
  );
}

function Poster({ image, focus }: { image: StaticImageData; focus: HeroSlide["focus"] }) {
  return (
    <Image
      src={image}
      alt=""
      fill
      sizes={SIZES}
      preload
      placeholder="blur"
      className={imageClass}
      style={focusStyle(focus)}
    />
  );
}

/**
 * Shared readability treatment, kept light so the photography stays the
 * subject: a faint overall tone, a vignette, and a deeper floor for the type.
 * Brighter frames add their own SlideShade on top.
 */
function Scrim() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      <div className="absolute inset-0 bg-ink/10" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_35%,transparent_55%,rgb(26_21_23/0.35)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[90%] bg-linear-to-t from-ink/80 via-ink/45 via-50% to-transparent md:h-[72%] md:from-ink/65 md:via-ink/30 md:via-45%" />
    </div>
  );
}
