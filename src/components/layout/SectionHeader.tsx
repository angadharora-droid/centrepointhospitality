import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { RevealHeading } from "@/components/typography/RevealHeading";
import { cn } from "@/lib/cn";

type SectionHeaderProps = {
  id: string;
  eyebrow: string;
  lines: readonly string[];
  emphasis?: string;
  intro?: string;
  /** Surface the header sits on — sets the muted text colour. */
  tone?: "light" | "dark";
  className?: string;
};

/**
 * The interior-page section opener: eyebrow, a line-revealed statement on the
 * left and, optionally, a short intro set to the right.
 */
export function SectionHeader({ id, eyebrow, lines, emphasis, intro, tone = "light", className }: SectionHeaderProps) {
  const muted = tone === "dark" ? "text-mist" : "text-stone";
  return (
    <Reveal className={cn("grid-site items-end gap-y-8 pb-[clamp(3rem,6vw,5.5rem)]", className)}>
      <RevealItem variant="fade" className="col-span-full">
        <p className={cn("eyebrow", muted)}>{eyebrow}</p>
      </RevealItem>
      <RevealHeading
        id={id}
        lines={lines}
        emphasis={emphasis}
        className="col-span-full font-display text-statement max-md:text-[clamp(2.5rem,11.5vw,3.5rem)] md:col-span-6 lg:col-span-7"
      />
      {intro && (
        <RevealItem
          as="p"
          className={cn("col-span-full max-w-[28rem] text-lede md:col-span-4 md:col-start-5 lg:col-span-4 lg:col-start-9", muted)}
        >
          {intro}
        </RevealItem>
      )}
    </Reveal>
  );
}
