import { cn } from "@/lib/cn";
import type { PressItem } from "@/data/press";
import { formatEditorialDate } from "@/lib/date";

/** Shared by the homepage journal and the Stories page. */

// One link per story: the headline link is stretched over the whole card.
export const STRETCHED = "after:absolute after:inset-0 after:content-[''] focus-visible:outline-none";
export const FOCUS_FRAME =
  "has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-8 has-[a:focus-visible]:outline-magenta has-[a:focus-visible]:outline-solid";
export const STORY_IMAGE =
  "object-cover transition-[scale] duration-700 ease-editorial [filter:contrast(1.02)_saturate(0.94)] group-hover:scale-[1.02] group-has-[a:focus-visible]:scale-[1.02]";

/** Category · date (the date is left out when the article doesn't give one). */
export function StoryMeta({ story }: { story: PressItem }) {
  return (
    <p className="eyebrow flex flex-wrap gap-x-3 gap-y-1 text-stone">
      <span className="text-ink">{story.category}</span>
      {story.date && (
        <>
          <span aria-hidden="true">·</span>
          <time dateTime={story.date}>{formatEditorialDate(story.date)}</time>
        </>
      )}
    </p>
  );
}

/**
 * Stories are press coverage, so the headline links to the original article
 * in a new tab. Without a working link the title is plain text.
 */
export function StoryLink({ story }: { story: PressItem }) {
  return (
    <a href={story.url} target="_blank" rel="noopener noreferrer" className={STRETCHED}>
      {story.headline}
      <span className="sr-only">
        {" "}— {story.publication} (opens in a new tab)
      </span>
    </a>
  );
}

/** Small ↗ that nudges up and right with the card. */
export function OutArrow({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-block transition-transform duration-(--duration-base) ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
        className,
      )}
    >
      ↗
    </span>
  );
}
