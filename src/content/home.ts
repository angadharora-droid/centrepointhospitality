import type { StaticImageData } from "next/image";
import hcpCpSuite from "@/assets/hotel-centre-point/cp-suite.jpg";
import hcpPalacio from "@/assets/hotel-centre-point/palacio.jpg";
import hcpPremiumRoom from "@/assets/hotel-centre-point/premium-room.jpg";
import naviMumbaiExterior from "@/assets/navi-mumbai/exterior.jpg";
import restaurantMural from "@/assets/hero/restaurant-mural.jpg";
import rooftopBarDusk from "@/assets/hero/rooftop-bar-dusk.jpg";
import rooftopDiningNight from "@/assets/hero/rooftop-dining-night.jpg";
import createBakery from "@/assets/world/create-bakery.jpg";
import dineArtCafe from "@/assets/world/dine-art-cafe.jpg";
import experienceDjNight from "@/assets/world/experience-dj-night.jpg";
import boardroom from "@/assets/journey/boardroom.jpg";
import teamNamaste from "@/assets/journey/team-namaste.jpg";
import centrePointAmravatiFacade from "@/assets/portfolio/centre-point-amravati-facade.webp";
import daliGuests from "@/assets/portfolio/dali-guests.jpg";
import { contact } from "./contact";
import { brands, getBrand, type BrandSlug } from "./portfolio";
import { homepagePress } from "@/data/press";
import { portfolioCategories, portfolioHref, type PortfolioCategory, type TimelineEntry } from "./types";

export type HeroSlide = {
  image: StaticImageData;
  /** CSS object-position per layout. Portrait screens crop hard, so aim at the subject. */
  focus: { mobile: string; desktop: string };
  /**
   * Extra shade (0–1) for this photograph so every slide reads the same:
   * `floor` deepens the lower area where the type sits, `top` the band behind
   * the navigation. Tuned from measured luminance — darker images need none.
   */
  scrim: { floor: number; top: number };
};

export type HeroVideo = {
  src: string;
  /** Lighter encode for small screens. If omitted, small screens show the poster only. */
  mobileSrc?: string;
  poster: StaticImageData;
};

/** Section ids double as in-page anchors (the hero's Explore link targets the introduction). */
const sectionIds = { introduction: "who-we-are" } as const;

export const hero = {
  /** One entry per rendered line. `emphasis` is set in italic wherever it appears. */
  headline: ["Hospitality", "is love", "in action."],
  emphasis: "love",
  body: "Centre Point Hospitality creates hotels, restaurants, food brands and experiences built around one belief — hospitality should always feel personal.",
  cta: { label: "Explore our world", href: `#${sectionIds.introduction}` },

  /**
   * Background sequence. Sourced from the current centrepointhospitality.in
   * media library (max 1600px there) — replace with full-resolution originals.
   * The first slide is the LCP image; keep it the strongest frame.
   */
  slides: [
    {
      image: rooftopDiningNight,
      focus: { mobile: "36% 50%", desktop: "50% 60%" },
      scrim: { floor: 0, top: 0 },
    },
    {
      // The CP Suite at Hotel Centre Point (centrepointnagpur.com).
      image: hcpCpSuite,
      focus: { mobile: "48% 50%", desktop: "50% 60%" },
      scrim: { floor: 0.36, top: 0.34 },
    },
    {
      image: restaurantMural,
      focus: { mobile: "46% 50%", desktop: "50% 40%" },
      scrim: { floor: 0.2, top: 0 },
    },
    {
      image: rooftopBarDusk,
      focus: { mobile: "64% 50%", desktop: "50% 60%" },
      scrim: { floor: 0.2, top: 0.36 },
    },
  ] satisfies HeroSlide[],

  /** Set to play a looping film instead of the slides (poster shows until it can play). */
  video: undefined as HeroVideo | undefined,
};

export const introduction = {
  id: sectionIds.introduction,
  eyebrow: { brand: "Centre Point Hospitality", label: "Who we are" },
  /** One entry per rendered line. `emphasis` is set in italic wherever it appears. */
  statement: ["We create", "places people", "remember."],
  emphasis: "remember",
  lead: "Centre Point Hospitality is an Indian hospitality group creating hotels, restaurants, food brands and experiences shaped by a simple belief — great hospitality should feel personal.",
  body: "What began with hotels has evolved into a growing house of hospitality, bringing together distinctive brands, people and experiences across multiple categories.",
  heritage: "Born from a hospitality legacy. Built for what comes next.",
  taxonomy: ["Hotels", "Restaurants", "Food", "Experiences"],
};

type WorldDetail = {
  descriptor: string;
  /** Placeholder until category photography is supplied — see report. */
  image: StaticImageData;
  /** object-position: keep the subject inside narrow desktop panels and mobile crops. */
  focus: string;
};

const worldDetails: Record<PortfolioCategory, WorldDetail> = {
  stay: {
    descriptor: "Hotels shaped around place, comfort and character.",
    // A premium room at Hotel Centre Point (centrepointnagpur.com).
    image: hcpPremiumRoom,
    focus: "60% 55%",
  },
  dine: {
    descriptor: "Restaurants and bars built around food, culture and energy.",
    image: dineArtCafe,
    focus: "45% 50%",
  },
  create: {
    descriptor: "Food and beverage brands designed beyond the dining room.",
    image: createBakery,
    focus: "42% 45%",
  },
  experience: {
    descriptor: "Ideas and hospitality ventures that extend the Centre Point world.",
    image: experienceDjNight,
    focus: "42% 35%",
  },
};

export const ourWorld = {
  eyebrow: "Our world",
  /** One entry per rendered line. `emphasis` is set in italic wherever it appears. */
  heading: ["One house.", "Many expressions", "of hospitality."],
  emphasis: "house",
  intro: "From places to stay and dine, to brands designed for everyday life.",
  /** Desktop opens on this category, slightly widened, so the row reads as a choice. */
  defaultCategory: "stay" as PortfolioCategory,
  worlds: portfolioCategories.map((category, i) => ({
    id: category.id,
    number: String(i + 1).padStart(2, "0"),
    title: category.label,
    subtitle: category.description,
    // A category with no brands yet opens the full portfolio rather than an empty filter.
    href: brands.some((brand) => brand.category === category.id) ? portfolioHref(category.id) : "/portfolio",
    ...worldDetails[category.id],
  })),
};

export type World = (typeof ourWorld.worlds)[number];

const featured: BrandSlug[] = [
  "hotel-centre-point-nagpur",
  "pablo",
  "centre-point-navi-mumbai",
  "centre-point-amravati",
  "dali",
  "high-steaks",
  "mickys",
  "puro-soul",
];

/** Mobile stacks large blocks, so it shows a shorter, category-balanced set. */
const featuredOnMobile: BrandSlug[] = [
  "hotel-centre-point-nagpur",
  "pablo",
  "centre-point-amravati",
  "dali",
  "mickys",
  "puro-soul",
];

export const selectedPortfolio = {
  eyebrow: "Selected portfolio",
  /** One entry per rendered line. `emphasis` is set in italic wherever it appears. */
  heading: ["A portfolio built", "with its own", "character."],
  emphasis: "character",
  intro: "From hotels and destination dining to modern food brands, each concept is designed to stand on its own.",
  brands: featured.map(getBrand),
  mobileBrands: featuredOnMobile.map(getBrand),
  cta: { label: "View the full portfolio", href: "/portfolio" },
};

/** Hotel Centre Point Nagpur opened in 1988 (centrepointhospitality.in timeline). */
const HERITAGE_YEAR = 1988;
const heritageYears = Math.floor((new Date().getFullYear() - HERITAGE_YEAR) / 5) * 5;

export type Stat = {
  value: string;
  label: string;
  /** False while the figure is a placeholder awaiting confirmation. */
  confirmed: boolean;
};

export const atAGlance = {
  eyebrow: "CPH at a glance",
  note: "Growing across hospitality, food and experiences.",
  stats: [
    // Confirmed: derived from 1988, rounded down to the nearest five years.
    { value: `${heritageYears}+`, label: "Years of hospitality heritage", confirmed: true },
    // Confirmed: Nagpur, Navi Mumbai and Amravati (contact.ts locations; portfolio.ts properties).
    { value: String(contact.locations.length), label: "Cities — Nagpur, Navi Mumbai and Amravati", confirmed: true },
    // Confirmed: "growing to 136 rooms today" — Jasbir Singh Arora's approved biography (people.ts).
    { value: "136", label: "Rooms at Hotel Centre Point, Nagpur", confirmed: true },
    // Confirmed: Palacio, the pillarless hall at Hotel Centre Point (timeline, 2011).
    { value: "10,000", label: "Sq ft pillarless hall at Palacio", confirmed: true },
    // TODO: Owner to confirm group-wide figures (hotels & assets, restaurants & bars,
    // people). They stay hidden until marked confirmed — never show placeholders.
  ] satisfies Stat[],
};

export const philosophy = {
  eyebrow: "Our philosophy",
  /** One entry per rendered line. `emphasis` is set in italic (and the brand magenta). */
  statement: ["Hospitality is", "love in action."],
  emphasis: "love",
  intro:
    "It lives in the details — how we welcome, how we serve, what we create and how people feel when they leave.",
  principles: [
    { title: "People", text: "Hospitality begins with people — guests, teams, partners and communities." },
    { title: "Product", text: "Every experience deserves care, consistency and a point of view." },
    { title: "Place", text: "Spaces that belong to their setting, and give people a reason to return." },
    { title: "Progress", text: "We respect what has worked, and keep looking for what could be better." },
  ],
};

/**
 * Milestones from the centrepointhospitality.in timeline and "Our story" copy.
 * Entries without suitable photography are deliberately text-only. The
 * homepage shows the main chapters; Our Story shows every entry.
 */
const milestones: TimelineEntry[] = [
  {
    year: "1988",
    title: "A hotel takes shape.",
    body: "Centre Point Nagpur is built, becoming one of the premium hotels in Central India — the root of everything that followed.",
    confirmed: true,
  },
  {
    year: "1995",
    title: "Into new ground.",
    body: "The group ventures into fisheries and finds commercial success.",
    confirmed: true,
    extended: true,
  },
  {
    year: "1997–2000",
    title: "Supporting the hotel.",
    body: "An early grasp of forward and backward integration leads into agriculture and outdoor catering — streams that supplement hotel operations.",
    confirmed: true,
    extended: true,
  },
  {
    year: "2000–2010",
    title: "Hotels & Resorts.",
    body: "The portfolio of hotels and resorts grows, with Airport Centre Point and Bollywood Centre Point launched as Centre Point Hotels & Resorts.",
    confirmed: true,
    extended: true,
  },
  {
    year: "2011",
    title: "Room to gather.",
    body: "The hotel is renovated for banquets and events, opening Palacio — a 10,000 sq ft pillarless hall, the largest of its kind in Central India at the time.",
    image: {
      src: hcpPalacio,
      alt: "Palacio at Hotel Centre Point, set with round tables beneath a crystal chandelier.",
      focus: "50% 45%",
    },
    confirmed: true,
  },
  {
    // TODO: Owner to confirm. The current site's timeline lists Pablo under 2015,
    // but July 2017 coverage describes Pablo still being prepared to open, so
    // Pablo is not attributed to this year until a verified opening date exists.
    // TDT, beverage catering and food processing remain as the source gives them.
    year: "2015",
    title: "Beyond the hotel.",
    body: "The group moves into standalone restaurants with TDT, alongside beverage catering and food processing.",
    confirmed: false,
  },
  {
    year: "2017",
    title: "A house is formed.",
    body: "Centre Point Hospitality is founded, bringing three decades of hotel experience to a wider set of ventures.",
    image: {
      src: boardroom,
      alt: "A boardroom with a long table and the word “Unstoppables” on the wall.",
      focus: "55% 50%",
    },
    confirmed: true,
  },
  {
    year: "2018",
    title: "A new role.",
    body: "The group begins working as a management consultant, affiliating with potential investors for future projects.",
    confirmed: true,
    extended: true,
  },
  {
    year: "2019",
    title: "A second city.",
    body: "Centre Point Navi Mumbai opens, alongside an industrial catering unit at Datta Meghe Medical College, Wardha, and a food court plaza.",
    image: {
      src: naviMumbaiExterior,
      alt: "The glass-fronted building of Centre Point Navi Mumbai on the Thane–Belapur Road.",
      focus: "45% 50%",
    },
    confirmed: true,
  },
  {
    year: "2022",
    title: "Another art café.",
    body: "Dali — The Art Café opens, extending the art-led dining that began with Pablo.",
    image: {
      src: daliGuests,
      alt: "Guests sharing a table at Dali, with portrait artworks on the red wall behind.",
      focus: "55% 50%",
    },
    confirmed: true,
  },
  {
    year: "2026",
    title: "Centre Point arrives in Amravati.",
    body: "Centre Point Amravati opens, bringing the group’s signature hospitality, dining and event spaces to a third city.",
    image: {
      src: centrePointAmravatiFacade,
      alt: "The exterior of Centre Point Amravati at dusk.",
      focus: "50% 48%",
    },
    confirmed: true,
  },
  {
    // TODO: Confirm final timeline date and copy — present-day summary, no date claimed.
    year: "Today",
    title: "A house of hospitality.",
    body: "Hotels, restaurants and food brands such as Micky’s and Puro Soul — still growing, and still personal.",
    image: {
      src: teamNamaste,
      alt: "Five members of the Centre Point team in uniform, greeting with a namaste.",
      focus: "50% 40%",
    },
    confirmed: false,
  },
];

export const journey = {
  eyebrow: "Our journey",
  /** One entry per rendered line. `emphasis` is set in italic wherever it appears. */
  heading: ["Built over time.", "Always moving", "forward."],
  emphasis: "forward",
  intro: "A hospitality journey shaped by places, people and the courage to keep evolving.",
  milestones: milestones.filter((milestone) => !milestone.extended),
};

/** The complete chronology, including entries the homepage leaves out. */
export const timeline = milestones;

export const leadershipSection = {
  id: "leadership",
  eyebrow: "Leadership",
  /** One entry per rendered line. `emphasis` is set in italic wherever it appears. */
  heading: ["People behind", "the hospitality."],
  emphasis: "People",
  intro:
    "A leadership team combining hospitality experience, entrepreneurial thinking and a hands-on understanding of the business.",
};

/**
 * Partnership areas. "Franchising" and "management contracts" come from the
 * current site's Our Story copy; "consulting" from the 2018 timeline entry.
 * Each row anchors into the future /development page.
 */
export const development = {
  eyebrow: "Development & partnerships",
  /** One entry per rendered line. `emphasis` is set in italic wherever it appears. */
  heading: ["Let’s build", "what’s next."],
  emphasis: "next",
  intro:
    "We partner with owners and developers to create hospitality businesses with strong identities, thoughtful operations and long-term relevance.",
  selective: "We work with projects where the idea, location and long-term vision align.",
  areas: [
    {
      slug: "hotel-management",
      title: "Hotel Management",
      text: "Operational, commercial and guest-experience leadership for hotels and hospitality assets.",
    },
    {
      slug: "restaurant-fb-management",
      title: "Restaurant & F&B Management",
      text: "Concept, launch and ongoing management of standalone or hotel-based food and beverage businesses.",
    },
    {
      slug: "brand-concept-development",
      title: "Brand & Concept Development",
      text: "From positioning and identity to the guest journey and operating model.",
    },
    {
      slug: "pre-opening-launch",
      title: "Pre-opening & Launch",
      text: "Planning, staffing, systems and launch execution.",
    },
    {
      slug: "management-consulting",
      title: "Management Consulting",
      text: "Advice for owners and investors shaping a hospitality project, from first idea to operating plan.",
    },
    {
      slug: "franchising-partnerships",
      title: "Franchising & Partnerships",
      text: "Franchise and management-contract models for the group’s food and beverage concepts.",
    },
  ],
  cta: { label: "Discuss a project", href: "/development" },
};

export const developmentAreaHref = (slug: string) => `${development.cta.href}#${slug}`;

export const journal = {
  eyebrow: "Journal",
  /** One entry per rendered line. `emphasis` is set in italic wherever it appears. */
  heading: ["Stories from", "our world."],
  emphasis: "world",
  intro: "News, ideas, openings and stories from across Centre Point Hospitality.",
  featured: homepagePress[0],
  // The two most recent others that still link to their article (the layout is a pair).
  more: homepagePress.slice(1),
  cta: { label: "View all stories", href: "/stories" } as { label: string; href: string } | null,
};
