import Image from "next/image";
import type { TimelineEntry } from "@/content/types";

export const YEAR =
  "font-display leading-[0.85] tracking-[-0.03em] [font-variant-numeric:lining-nums]";

/**
 * The timeline as chapters read top to bottom. Used on mobile and tablet, and
 * on desktop when the visitor prefers reduced motion.
 */
export function JourneyChronology({ milestones }: { milestones: TimelineEntry[] }) {
  return (
    <ol className="border-t border-line-inverse">
      {milestones.map((milestone) => (
        <li
          key={milestone.year}
          className="grid-site border-b border-line-inverse py-14 md:py-16 lg:py-20"
        >
          <p className={`${YEAR} col-span-full text-[clamp(4.5rem,19vw,7.5rem)] md:col-span-3 md:text-[5.5rem] lg:col-span-5 lg:text-[clamp(6rem,10vw,10rem)]`}>
            {milestone.year}
          </p>
          <div className="col-span-full mt-8 md:col-span-5 md:mt-3 lg:col-span-6 lg:col-start-7">
            <h3 className="font-display text-heading">{milestone.title}</h3>
            <p className="mt-4 max-w-[32rem] text-mist md:text-[1.0625rem]">{milestone.body}</p>
            {milestone.image && (
              <div className="relative mt-8 aspect-[4/3] overflow-hidden bg-aubergine md:mt-10">
                <Image
                  src={milestone.image.src}
                  alt={milestone.image.alt}
                  fill
                  sizes="(min-width: 64rem) 50vw, (min-width: 48rem) 60vw, 90vw"
                  className="object-cover [filter:contrast(1.02)_saturate(0.92)]"
                  style={{ objectPosition: milestone.image.focus }}
                />
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
