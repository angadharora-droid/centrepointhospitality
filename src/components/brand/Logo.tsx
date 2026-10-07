import Image from "next/image";
import { cn } from "@/lib/cn";
import { site } from "@/content/site";

type LogoProps = {
  /**
   * `light` / `dark` describe the background the logo sits on.
   * `auto` crossfades between the two using the --logo-on-light / --logo-on-dark
   * variables set by the surrounding context (the header).
   */
  tone?: "light" | "dark" | "auto";
  className?: string;
};

// Intrinsic ratios of the cropped brand files in /public/brand.
const EMBLEM = { width: 382, height: 391 };
const WORDMARK = { width: 1600, height: 279 };

/**
 * Horizontal lockup composed from the official emblem and wordmark artwork.
 * Replace with the master SVG once supplied by the brand team.
 */
export function Logo({ tone = "light", className }: LogoProps) {
  const forDark = tone !== "light";
  const forLight = tone !== "dark";

  return (
    <span
      className={cn("inline-flex items-center gap-3 lg:gap-4", className)}
      style={tone === "auto" ? { filter: "var(--logo-filter, none)" } : undefined}
    >
      <Image
        src="/brand/cph-emblem.png"
        alt=""
        width={EMBLEM.width}
        height={EMBLEM.height}
        sizes="48px"
        loading="eager"
        className="h-9 w-auto lg:h-11"
      />
      <span className="relative block">
        {forLight && (
          <Image
            src="/brand/cph-wordmark-dark.png"
            alt={site.name}
            width={WORDMARK.width}
            height={WORDMARK.height}
            sizes="180px"
            loading="eager"
            className="h-5 w-auto transition-opacity duration-(--duration-base) ease-editorial lg:h-6"
            style={tone === "auto" ? { opacity: "var(--logo-on-light)" } : undefined}
          />
        )}
        {forDark && (
          <Image
            src="/brand/cph-wordmark-light.png"
            alt={forLight ? "" : site.name}
            width={WORDMARK.width}
            height={WORDMARK.height}
            sizes="180px"
            loading="eager"
            className={cn(
              "h-5 w-auto transition-opacity duration-(--duration-base) ease-editorial lg:h-6",
              forLight && "absolute inset-0",
            )}
            style={tone === "auto" ? { opacity: "var(--logo-on-dark)" } : undefined}
          />
        )}
      </span>
    </span>
  );
}
