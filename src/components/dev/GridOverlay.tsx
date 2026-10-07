"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";

/** Development aid: Shift+G toggles the site column grid over the page. */
export function GridOverlay() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
      if (event.shiftKey && event.key.toLowerCase() === "g") setVisible((v) => !v);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  if (!visible) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100]">
      <Container className="h-full">
        <Grid className="h-full">
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              className={`h-full bg-magenta/10 outline outline-magenta/20 ${i >= 4 ? "hidden md:block" : ""} ${i >= 8 ? "md:hidden lg:block" : ""}`}
            />
          ))}
        </Grid>
      </Container>
    </div>
  );
}
