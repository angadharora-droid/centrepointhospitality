import boardroom from "@/assets/journey/boardroom.jpg";
import pabloEvening from "@/assets/journey/pablo-evening.jpg";
import teamNamaste from "@/assets/journey/team-namaste.jpg";
import daliGuests from "@/assets/portfolio/dali-guests.jpg";
import experienceDjNight from "@/assets/world/experience-dj-night.jpg";
import { emailFor } from "./contact";
import { site } from "./site";
import type { ImageAsset } from "./types";

/**
 * Careers page. Photography is the group's own (from centrepointhospitality.in);
 * no testimonials, headcounts or vacancies are invented.
 */

export const careerPaths = [
  { slug: "hotel-operations", title: "Hotel Operations", text: "Front office, housekeeping and the day-to-day running of the hotel." },
  { slug: "food-beverage-service", title: "Food & Beverage Service", text: "Restaurants, bars and banquets — the service floor." },
  { slug: "culinary", title: "Culinary", text: "Hotel and restaurant kitchens, from commis to chef." },
  { slug: "sales-marketing", title: "Sales & Marketing", text: "Rooms, events and banqueting sales, and the brands behind them." },
  { slug: "finance", title: "Finance", text: "Accounts, purchasing and control across the businesses." },
  { slug: "human-resources", title: "Human Resources", text: "Recruitment, training and the wellbeing of our teams." },
  { slug: "engineering-maintenance", title: "Engineering & Maintenance", text: "Keeping buildings, systems and equipment running well." },
  { slug: "corporate-group", title: "Corporate / Group Roles", text: "Strategy, brand and projects that support the whole group." },
] as const;

export type CareerPathSlug = (typeof careerPaths)[number]["slug"];

/** A published opening. Shape agreed for later — see `jobs`. */
export type Job = {
  slug: string;
  title: string;
  department: CareerPathSlug;
  location: string;
  employmentType: "Full-time" | "Part-time" | "Contract" | "Internship";
  /** Where to apply, if the role is handled elsewhere (e.g. the careers portal). */
  applyUrl?: string;
};

/**
 * Open positions shown on /careers. Empty until real, approved openings are
 * supplied — never fill with sample roles. (The group's portal at
 * careers.centrepointgroup.in also exposes its live roles at
 * careers-hcp.centrepointgroup.in/api/public/positions, which could feed this
 * list once the client approves it.)
 */
export const jobs: Job[] = [];

export const areasOfInterest = [...careerPaths.map((path) => path.title), "Not sure yet"];

export const experienceLevels = ["Just starting out", "Under 2 years", "2–5 years", "5–10 years", "10+ years"];

export const careersHero = {
  eyebrow: "Careers",
  heading: ["Build your career", "in hospitality."],
  emphasis: "hospitality",
  intro:
    "Join a growing hospitality group where hotels, restaurants, food brands and new ideas create multiple paths to learn, lead and grow.",
  image: {
    src: teamNamaste,
    alt: "Five members of the Centre Point team in uniform, greeting with a namaste.",
    focus: "50% 38%",
  } satisfies ImageAsset,
};

export const culture = {
  eyebrow: "Our culture",
  heading: ["Hospitality is built", "by people."],
  emphasis: "people",
  text: "Every stay, meal and celebration rests on teams most guests never meet — in operations and kitchens, on the service floor, and in sales, finance, engineering and leadership.",
};

export const whyWork = {
  eyebrow: "Why work with CPH",
  heading: ["What you’ll", "find here."],
  emphasis: "here",
  themes: [
    { title: "Learn", text: "Hands-on exposure across real hospitality businesses." },
    { title: "Grow", text: "Opportunities to take on responsibility as the group expands." },
    { title: "Create", text: "Work across hotels, restaurants, food brands and new concepts." },
    { title: "Belong", text: "A people-first culture built around respect, ownership and teamwork." },
  ],
};

export const paths = {
  eyebrow: "Career paths",
  heading: ["Where you can", "build your career."],
  emphasis: "career",
  intro: "Roles across the group’s hotels, restaurants, food brands and central teams.",
  items: careerPaths,
};

type LifeImage = ImageAsset & { caption?: string };

export const life = {
  eyebrow: "Life at CPH",
  heading: ["Different teams.", "One hospitality mindset."],
  emphasis: "mindset",
  // Captions only where the place is known.
  images: [
    { src: pabloEvening, alt: "A full house on an evening at Pablo, guests gathered around the bar and tables.", focus: "45% 50%", caption: "Pablo, Nagpur" },
    { src: experienceDjNight, alt: "A DJ at the decks under red light.", focus: "42% 35%" },
    { src: boardroom, alt: "A boardroom with a long table and the word “Unstoppables” on the wall.", focus: "55% 50%" },
    { src: daliGuests, alt: "Guests sharing a table at Dali, with portrait artworks on the red wall behind.", focus: "55% 50%", caption: "Dali, Nagpur" },
  ] satisfies LifeImage[],
};

export const openings = {
  id: "openings",
  eyebrow: "Open positions",
  heading: "Current opportunities",
  empty: "We’ll publish active openings here as they become available.",
  portal: {
    text: "Roles at Centre Point Amravati are posted on the Centre Point careers portal.",
    label: "Visit the careers portal",
    href: site.careersUrl,
  },
  cta: { label: "Send a general application", href: "#apply" },
};

export const application = {
  id: "apply",
  eyebrow: "General application",
  heading: ["Tell us where", "you’d like", "to grow."],
  emphasis: "grow",
  intro: "Not seeing the right role? Share a little about yourself and the work you’re looking for.",
  success: {
    title: "Thank you for your interest in Centre Point Hospitality.",
    text: "Our team will review your profile when a relevant opportunity is available.",
  },
  /** Used until an applications endpoint is connected (see CareersForm). */
  fallbackEmail: emailFor("careers"),
};

export const careersMeta = {
  title: "Careers",
  description:
    "Explore career opportunities across Centre Point Hospitality hotels, restaurants, food brands and group functions.",
};
