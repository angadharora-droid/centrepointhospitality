import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Arrow } from "./Arrow";

type ArrowLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  /** Opens in a new tab, with a ↗ in place of the arrow. */
  external?: boolean;
};

/**
 * Understated text link: small caps label on a resting hairline that fills
 * from the left on hover/focus, with an arrow that nudges forward.
 */
export function ArrowLink({ href, children, className, external = false }: ArrowLinkProps) {
  const inner = (
    <>
      <span className="relative pb-2">
        {children}
        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-current opacity-25" />
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-current transition-transform duration-(--duration-slow) ease-editorial group-hover:scale-x-100 group-focus-visible:scale-x-100"
        />
      </span>
      {external ? (
        <>
          <span aria-hidden="true" className="-mt-2 transition-transform duration-(--duration-base) ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            ↗
          </span>
          <span className="sr-only">(opens in a new tab)</span>
        </>
      ) : (
        <Arrow className="-mt-2 transition-transform duration-(--duration-base) ease-editorial group-hover:translate-x-1 group-focus-visible:translate-x-1" />
      )}
    </>
  );

  // The ::before pads the tap target to ~46px tall without changing the look.
  const classes = cn("group relative inline-flex items-center gap-4 eyebrow before:absolute before:inset-x-0 before:-inset-y-3 before:content-['']", className);
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}
