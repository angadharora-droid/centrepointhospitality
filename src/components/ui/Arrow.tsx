import { cn } from "@/lib/cn";

/** Hairline right arrow, sized by the caller and drawn in currentColor. */
export function Arrow({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 8" className={cn("h-2 w-4 shrink-0 fill-none stroke-current", className)}>
      <path d="M0 4 H15 M11.5 0.75 L15 4 L11.5 7.25" strokeWidth="1" />
    </svg>
  );
}
