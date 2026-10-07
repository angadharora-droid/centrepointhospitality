"use client";

import { m, type HTMLMotionProps } from "motion/react";
import { fadeIn, lineReveal, riseIn, staggerChildren } from "@/lib/motion";

const containers = { div: m.div, li: m.li };

type RevealProps = HTMLMotionProps<"div"> & {
  /** Render as a list item when each entry of a long list should reveal on its own. */
  as?: keyof typeof containers;
  /** Fraction of the element that must be visible before it plays. */
  amount?: number;
  stagger?: number;
  delay?: number;
};

/**
 * Plays its RevealItems once, in document order, the first time it scrolls
 * into view — then stays still. Reduced motion (via MotionConfig) drops the
 * movement and keeps only the fades.
 */
export function Reveal({ as = "div", amount = 0.25, stagger = 0.08, delay = 0, ...props }: RevealProps) {
  const Element = containers[as] as typeof m.div;
  return (
    <Element
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={staggerChildren(stagger, delay)}
      {...props}
    />
  );
}

const variants = { rise: riseIn, line: lineReveal, fade: fadeIn };
const elements = { div: m.div, span: m.span, p: m.p, li: m.li, ul: m.ul, ol: m.ol };

type RevealItemProps = HTMLMotionProps<"div"> & {
  as?: keyof typeof elements;
  /** `line` expects an overflow-hidden parent to act as its mask. */
  variant?: keyof typeof variants;
};

export function RevealItem({ as = "div", variant = "rise", ...props }: RevealItemProps) {
  const Element = elements[as] as typeof m.div;
  return <Element variants={variants[variant]} {...props} />;
}
