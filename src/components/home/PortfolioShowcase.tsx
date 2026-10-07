"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { Arrow } from "@/components/ui/Arrow";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { brandHref, categoryLabel, type Brand } from "@/content/types";
import { cn } from "@/lib/cn";

const PREVIEW_ID = "portfolio-preview";
const SIZES = "(min-width: 80rem) 58vw, (min-width: 64rem) 55vw, 100vw";

/**
 * Tablet and desktop: a brand list beside (lg) or below (md) one large framed
 * image. Hover, focus or click selects a brand and the selection stays put, so
 * the preview never flickers back as the pointer moves away.
 */
export function PortfolioShowcase({ brands }: { brands: Brand[] }) {
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const brand = brands[active];

  const select = (index: number) => {
    if (index === active) return;
    setPrevious(active);
    setActive(index);
  };

  return (
    <div className="grid-site gap-y-10 lg:items-start">
      <ol className="col-span-full border-t border-line md:grid md:grid-cols-2 md:gap-x-(--spacing-grid) lg:col-span-5 lg:block xl:col-span-4">
        {brands.map((item, i) => {
          const selected = i === active;
          return (
            <li key={item.slug} className="border-b border-line">
              <button
                type="button"
                aria-pressed={selected}
                aria-controls={PREVIEW_ID}
                onPointerEnter={() => select(i)}
                onFocus={() => select(i)}
                onClick={() => select(i)}
                className="group flex w-full items-baseline gap-5 py-4 text-left lg:py-[1.05rem]"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "eyebrow w-6 shrink-0 tabular-nums transition-colors duration-(--duration-base)",
                    selected ? "text-magenta" : "text-stone",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={cn(
                      "block text-[1.1875rem] leading-snug font-medium transition-colors duration-(--duration-base) lg:text-[1.3125rem]",
                      selected ? "text-ink" : "text-stone group-hover:text-ink",
                    )}
                  >
                    {item.name}
                  </span>
                  <span className="mt-1 block eyebrow text-stone">
                    {item.location ?? item.type} · {categoryLabel(item.category)}
                  </span>
                </span>
                {/* Selection is shown by shape as well as colour. */}
                <Arrow
                  className={cn(
                    "self-center text-ink transition-[opacity,translate] duration-(--duration-base) ease-editorial",
                    selected ? "opacity-100" : "-translate-x-2 opacity-0",
                  )}
                />
              </button>
            </li>
          );
        })}
      </ol>

      <div
        id={PREVIEW_ID}
        className="col-span-full md:order-first lg:order-none lg:col-span-7 lg:col-start-6 xl:col-span-8 xl:col-start-5"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-linen">
          {brands.map((item, i) => {
            const state = i === active ? "active" : i === previous ? "previous" : "idle";
            return (
              <Image
                key={item.slug}
                src={item.image.src}
                alt={state === "active" ? item.image.alt : ""}
                aria-hidden={state !== "active"}
                fill
                sizes={SIZES}
                className={cn(
                  item.image.fit === "contain" ? "object-contain" : "object-cover",
                  "[filter:contrast(1.02)_saturate(0.95)]",
                  // The incoming image fades and settles on top of the outgoing one.
                  state === "active" &&
                    "z-10 scale-100 opacity-100 transition-[opacity,scale] duration-700 ease-editorial",
                  state === "previous" && "z-0 opacity-100",
                  state === "idle" && "z-0 scale-[1.03] opacity-0",
                )}
                style={{ objectPosition: item.image.focus, backgroundColor: item.image.background }}
              />
            );
          })}
        </div>

        {/* Re-keyed per brand so the caption replays a short rise on change. */}
        <div
          key={brand.slug}
          className="mt-6 grid min-h-[9.5rem] gap-x-(--spacing-grid) gap-y-5 animate-rise lg:mt-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]"
          style={{ animationDuration: "600ms" } as CSSProperties}
        >
          <div>
            <p className="eyebrow text-stone">
              <span className="text-ink">{categoryLabel(brand.category)}</span>
              {[brand.location, brand.type].filter(Boolean).map((part) => ` · ${part}`)}
            </p>
            <h3 className="mt-3 font-display text-[clamp(2.25rem,3.4vw,3.75rem)] leading-[0.98] tracking-[-0.015em]">
              {brand.name}
            </h3>
          </div>
          <div className="lg:pt-7">
            <p className="max-w-[26rem] text-stone">{brand.summary}</p>
            <ArrowLink href={brandHref(brand.slug)} className="mt-5">
              View {brand.name}
            </ArrowLink>
          </div>
        </div>
      </div>
    </div>
  );
}
