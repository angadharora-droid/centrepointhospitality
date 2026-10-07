import { journal } from "./home";
import { press } from "@/data/press";

/** Stories page — the journal's own heading and intro, then every story, newest first. */
export const storiesHero = {
  eyebrow: "Stories",
  heading: journal.heading,
  emphasis: journal.emphasis,
  intro: journal.intro,
};

export const allStories = press;

export const storiesMeta = {
  title: "Stories",
  description:
    "News and press coverage from Centre Point Hospitality — awards, people, events and the stories behind Hotel Centre Point, Pablo and the group.",
};
