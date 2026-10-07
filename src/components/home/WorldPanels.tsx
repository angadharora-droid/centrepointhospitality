"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type CSSProperties, type FocusEvent } from "react";
import { Arrow } from "@/components/ui/Arrow";
import { ourWorld, type World } from "@/content/home";

// Desktop flex-grow per state. Kept modest so inactive titles always fit:
// "Experience" is ~4.07em wide, so desktop titles are capped at 4vw.
const GROW = { active: 1.8, resting: 1.4, idle: 1 };

const TITLE = "font-display text-[3.25rem] leading-[0.95] tracking-[-0.02em] lg:text-[clamp(2.5rem,4vw,5.5rem)]";
const SIZES = "(min-width: 64rem) 40vw, (min-width: 48rem) 50vw, 100vw";

/**
 * The four categories. Mobile stacks full-width panels, tablet sets them
 * 2 × 2, and from lg they share one full-bleed row where the hovered or
 * focused panel widens. With no pointer or focus inside, the row rests on
 * the default category. Only the panels move; the section never changes size.
 */
export function WorldPanels() {
  const [active, setActive] = useState<number | null>(null);
  const resting = ourWorld.worlds.findIndex((w) => w.id === ourWorld.defaultCategory);
  const current = active ?? resting;

  const onBlur = (event: FocusEvent<HTMLUListElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setActive(null);
  };

  return (
    <ul
      className="grid grid-cols-1 gap-px bg-ink md:grid-cols-2 lg:flex lg:h-[clamp(34rem,80svh,54rem)]"
      onPointerLeave={() => setActive(null)}
      onBlur={onBlur}
    >
      {ourWorld.worlds.map((world, i) => {
        const grow = i === active ? GROW.active : active === null && i === resting ? GROW.resting : GROW.idle;
        return (
          <WorldPanel
            key={world.id}
            world={world}
            open={i === current}
            grow={grow}
            onActivate={() => setActive(i)}
          />
        );
      })}
    </ul>
  );
}

type WorldPanelProps = {
  world: World;
  open: boolean;
  grow: number;
  onActivate: () => void;
};

function WorldPanel({ world, open, grow, onActivate }: WorldPanelProps) {
  return (
    <li
      data-open={open}
      onPointerEnter={onActivate}
      style={{ "--grow": grow } as CSSProperties}
      className="group/panel relative h-[clamp(22rem,58svh,32rem)] overflow-hidden md:h-[clamp(26rem,52svh,36rem)] lg:h-auto lg:min-w-0 lg:basis-0 lg:grow-[var(--grow)] lg:transition-[flex-grow] lg:duration-700 lg:ease-editorial"
    >
      {/* On desktop the image is fixed at the open width and centred, so a
          resizing panel reveals more of a still photograph instead of
          re-cropping it every frame. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 transition-[scale] duration-[900ms] ease-editorial lg:inset-y-0 lg:right-auto lg:left-1/2 lg:w-[40vw] lg:-translate-x-1/2 lg:scale-[1.02] lg:group-data-[open=true]/panel:scale-100"
      >
        <Image
          src={world.image}
          alt=""
          fill
          sizes={SIZES}
          className="object-cover [filter:contrast(1.03)_saturate(0.92)]"
          style={{ objectPosition: world.focus }}
        />
      </div>

      {/* Common treatment: a floor for the type, a lighter top for the number,
          and a veil that lifts on the open panel. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-ink/15 transition-opacity duration-700 ease-editorial lg:bg-ink/35 lg:group-data-[open=true]/panel:opacity-30" />
        <div className="absolute inset-x-0 bottom-0 h-[70%] bg-linear-to-t from-ink/80 via-ink/35 via-45% to-transparent" />
        <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-ink/35 to-transparent" />
      </div>

      <Link
        href={world.href}
        onFocus={onActivate}
        className="group/link relative flex h-full flex-col justify-between p-[clamp(1.5rem,2.2vw,2.5rem)] text-paper focus-visible:[outline-offset:-0.75rem]"
      >
        <span aria-hidden="true" className="eyebrow text-paper/75 tabular-nums">
          {world.number}
        </span>

        <div>
          <div className="flex items-end justify-between gap-4">
            <h3 className={TITLE}>{world.title}</h3>
            <Arrow className="mb-2 md:hidden" />
          </div>
          <span className="mt-3 block eyebrow text-paper/85 md:mt-4">{world.subtitle}</span>

          {/* Descriptor: always shown on tablet; on desktop it opens with its panel.
              Fixed inner width (no wider than the resting panel) so the text
              never reflows or clips while the panel resizes. */}
          <span className="hidden md:grid md:grid-rows-[1fr] lg:grid-rows-[0fr] lg:transition-[grid-template-rows] lg:duration-700 lg:ease-editorial lg:group-data-[open=true]/panel:grid-rows-[1fr]">
            <span className="block overflow-hidden">
              <span className="block w-[min(20rem,100%)] pt-5 transition-opacity duration-500 ease-soft lg:w-[min(20rem,27vw)] lg:opacity-0 lg:group-data-[open=true]/panel:opacity-100 lg:group-data-[open=true]/panel:delay-150">
                <span className="block text-body text-paper/90">{world.descriptor}</span>
                {/* Visual cue only — the link's name already comes from the title and copy. */}
                <span aria-hidden="true" className="mt-5 inline-flex items-center gap-3 eyebrow">
                  Explore {world.title}
                  <Arrow className="transition-transform duration-(--duration-base) ease-editorial group-hover/link:translate-x-1 group-focus-visible/link:translate-x-1" />
                </span>
              </span>
            </span>
          </span>
        </div>
      </Link>
    </li>
  );
}
