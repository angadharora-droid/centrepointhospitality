import type { Transition, Variants } from "motion/react";

/**
 * Shared motion vocabulary. Mirrors the CSS tokens in globals.css so CSS and
 * Motion-driven transitions feel like one system. Components import presets
 * from here rather than defining their own curves.
 */

export const ease = {
  editorial: [0.22, 1, 0.36, 1],
  soft: [0.65, 0, 0.35, 1],
} as const;

export const duration = {
  fast: 0.2,
  base: 0.45,
  slow: 0.8,
} as const;

export const transition = {
  base: { duration: duration.base, ease: ease.editorial },
  slow: { duration: duration.slow, ease: ease.editorial },
} satisfies Record<string, Transition>;

/** Full-screen panel that wipes down from the header. */
export const panelReveal: Variants = {
  hidden: { clipPath: "inset(0% 0% 100% 0%)" },
  visible: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 0.7, ease: ease.soft } },
  exit: { clipPath: "inset(0% 0% 100% 0%)", transition: { duration: 0.5, ease: ease.soft } },
};

/** Parent that staggers its children in once the panel is open. */
export const staggerChildren = (stagger = 0.06, delay = 0.25): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  exit: {},
});

/** Child of a stagger: rises a short distance and fades in. */
export const riseIn: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: transition.slow },
  exit: { opacity: 0, transition: { duration: duration.fast } },
};

/** Child of a stagger: a headline line rising out of its overflow mask. */
export const lineReveal: Variants = {
  hidden: { y: "105%" },
  visible: { y: "0%", transition: { duration: 0.9, ease: ease.editorial } },
};

/** Child of a stagger: a plain fade, for small labels. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: ease.soft } },
};
