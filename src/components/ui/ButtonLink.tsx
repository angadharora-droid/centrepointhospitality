import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Arrow } from "./Arrow";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  /** Label colour once the frame has filled — normally the surface colour behind the button. */
  fillText?: string;
};

const FRAME =
  "group relative inline-flex items-center gap-5 overflow-hidden border border-current/40 px-7 py-[1.15rem] eyebrow transition-colors duration-(--duration-base) ease-editorial hover:border-current focus-visible:border-current";

/** Shared inner markup: the fill, then label and arrow that switch to the surface colour. */
function ButtonInner({ children }: { children: ReactNode }) {
  return (
    <>
      <span
        aria-hidden="true"
        className="absolute inset-0 origin-left scale-x-0 bg-current transition-transform duration-(--duration-slow) ease-editorial group-hover:scale-x-100 group-focus-visible:scale-x-100"
      />
      <span className="relative transition-colors duration-(--duration-base) group-hover:text-(--fill-text) group-focus-visible:text-(--fill-text)">
        {children}
      </span>
      <Arrow className="relative transition-[translate,color] duration-(--duration-base) ease-editorial group-hover:translate-x-1 group-hover:text-(--fill-text) group-focus-visible:translate-x-1 group-focus-visible:text-(--fill-text)" />
    </>
  );
}

/**
 * Restrained rectangular call to action: a hairline frame in the current text
 * colour that fills from the left on hover/focus. Square corners, small caps.
 */
export function ButtonLink({ href, children, className, fillText = "var(--color-paper)" }: ButtonLinkProps) {
  return (
    <Link href={href} style={{ "--fill-text": fillText } as CSSProperties} className={cn(FRAME, className)}>
      <ButtonInner>{children}</ButtonInner>
    </Link>
  );
}

type ButtonProps = Omit<ButtonLinkProps, "href"> & {
  type?: "button" | "submit";
  disabled?: boolean;
};

/** The same treatment as ButtonLink, for form actions. */
export function Button({ children, className, fillText = "var(--color-paper)", type = "button", disabled }: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      style={{ "--fill-text": fillText } as CSSProperties}
      className={cn(FRAME, "cursor-pointer disabled:cursor-wait disabled:opacity-60", className)}
    >
      <ButtonInner>{children}</ButtonInner>
    </button>
  );
}
