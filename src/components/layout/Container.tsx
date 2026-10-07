import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/cn";

const sizes = {
  /** Content ceiling of 1680px with fluid outer gutters. The default. */
  site: "max-w-site",
  /** Edge to edge apart from the gutters — for wide editorial compositions. */
  full: "",
  /** Reading measure for long-form text. */
  prose: "max-w-prose",
} as const;

type ContainerProps<T extends ElementType> = {
  as?: T;
  size?: keyof typeof sizes;
} & ComponentPropsWithoutRef<T>;

export function Container<T extends ElementType = "div">({
  as,
  size = "site",
  className,
  ...props
}: ContainerProps<T>) {
  const Component = as ?? "div";
  return <Component className={cn("mx-auto w-full px-gutter", sizes[size], className)} {...props} />;
}
