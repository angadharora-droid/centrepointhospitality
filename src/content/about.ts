import teamNamaste from "@/assets/journey/team-namaste.jpg";
import { development, philosophy, timeline } from "./home";
import { leadership } from "./people";

/**
 * Our Story page. Narrative copy is written from the current site's "Our
 * story" text and timeline; shared data (timeline, leadership, philosophy) is
 * referenced here, never copied.
 */

export const aboutHero = {
  eyebrow: "Our story",
  /** One entry per rendered line. `emphasis` is set in italic wherever it appears. */
  heading: ["A story shaped", "by people, places", "and possibility."],
  emphasis: "possibility",
  intro:
    "From a single hotel in Nagpur to a group spanning hotels, restaurants, food brands and experiences — this is how Centre Point Hospitality came to be.",
  image: {
    src: teamNamaste,
    alt: "Five members of the Centre Point team in uniform, greeting with a namaste.",
    focus: "50% 40%",
  },
};

export const openingStory = {
  eyebrow: "Where we come from",
  pull: ["Hospitality was", "the beginning.", "Not the boundary."],
  emphasis: "boundary",
  paragraphs: [
    "Centre Point Hospitality was founded in 2017, but its roots go back to 1988, when Centre Point Nagpur was built and became one of the premium hotels in Central India. Three decades of running that hotel gave the group its grounding in service, operations and people.",
    "From there it moved into restaurants, conventions and catering, then into food processing, water bottling and agribusiness — each step building on what the hotel had taught.",
    "Today the group is growing its food and beverage expertise through management contracts and franchising, for markets in India and beyond.",
  ],
};

export const evolution = {
  eyebrow: "How we evolved",
  heading: ["From one hotel to a", "house of hospitality."],
  emphasis: "house",
  chapters: [
    {
      title: "Hotels",
      line: "Where the story began.",
      text: "Centre Point Nagpur, built in 1988, and later Centre Point Navi Mumbai — the operating discipline behind everything the group does.",
    },
    {
      title: "Restaurants",
      line: "Where hospitality became more expressive.",
      text: "Standalone concepts such as Pablo, Nagpur’s first art café lounge, and Dali — The Art Café gave the group a voice beyond the hotel.",
    },
    {
      title: "Food",
      line: "Where our thinking moved beyond the dining room.",
      text: "Food processing, catering and retail brands such as Micky’s and Puro Soul take the kitchen’s standards into everyday life.",
    },
    {
      title: "Experiences",
      line: "Where the group continues to evolve.",
      text: "Gatherings at every scale — from Palacio, the 10,000 sq ft pillarless hall, to Pablo’s Art Attack, a six-day festival of art, music and food.",
    },
  ],
};

export const aboutPhilosophy = {
  eyebrow: "What we believe",
  statement: philosophy.statement,
  emphasis: philosophy.emphasis,
  narrative:
    "For us it means care that is noticed and consistency that is not. It means teams trusted to look after people, detail that is considered rather than decorative, and the willingness to adapt as guests and places change.",
  principlesLabel: "Four principles",
  principles: philosophy.principles.map((principle) => principle.title),
};

export const aboutJourney = {
  eyebrow: "Our journey",
  heading: ["Over three decades,", "one milestone", "at a time."],
  emphasis: "milestone",
  milestones: timeline,
};

/** The principal leadership team, in the order the group presents it. */
const principalSlugs = ["micky-arora", "angadh-singh-arora", "arjun-singh-arora"];

export const aboutLeadership = {
  eyebrow: "Leadership",
  heading: ["The people", "shaping CPH."],
  emphasis: "shaping",
  people: principalSlugs.map((slug) => leadership.find((person) => person.slug === slug)!),
};

export const futureDirection = {
  eyebrow: "What comes next",
  heading: ["Built for what", "comes next."],
  emphasis: "next",
  text: "CPH continues to grow through new hotels, hospitality concepts, food brands and strategic partnerships — while keeping its core belief in personal hospitality intact.",
};

export const aboutCta = {
  heading: "Build the next chapter with us.",
  text: "For owners, developers and partners exploring hospitality opportunities with CPH.",
  primary: { label: "Explore development", href: development.cta.href },
  secondary: { label: "Contact us", href: "/contact" },
};

export const aboutMeta = {
  title: "Our Story",
  description:
    "Founded in 2017 on the foundations of Centre Point Nagpur, built in 1988, Centre Point Hospitality is an Indian hospitality group spanning hotels, restaurants, food brands and experiences.",
};
