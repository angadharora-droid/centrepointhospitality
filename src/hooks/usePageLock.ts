"use client";

import { useEffect } from "react";

/**
 * While `active`: stops the page scrolling, makes everything outside
 * `keepSelector` inert (so focus and screen readers stay in the overlay), and
 * calls `onEscape` when Escape is pressed. `onEscape` should be stable.
 */
export function usePageLock(active: boolean, onEscape: () => void, keepSelector: string) {
  useEffect(() => {
    if (!active) return;

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const outside = Array.from(document.body.children).filter(
      (el): el is HTMLElement => el instanceof HTMLElement && !el.matches(keepSelector) && !el.inert,
    );
    outside.forEach((el) => (el.inert = true));

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onEscape();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      root.style.overflow = previousOverflow;
      outside.forEach((el) => (el.inert = false));
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [active, onEscape, keepSelector]);
}
