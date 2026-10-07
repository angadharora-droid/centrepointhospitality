import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/cn";

type GridProps<T extends ElementType> = { as?: T } & ComponentPropsWithoutRef<T>;

/**
 * The site column grid — 4 columns on mobile, 8 from md, 12 from lg.
 * Place children with Tailwind: `col-span-full md:col-span-5 lg:col-start-2`.
 */
export function Grid<T extends ElementType = "div">({ as, className, ...props }: GridProps<T>) {
  const Component = as ?? "div";
  return <Component className={cn("grid-site", className)} {...props} />;
}
