import rooftopBarDusk from "@/assets/hero/rooftop-bar-dusk.jpg";
import { development } from "./home";
import { getBrand, type BrandSlug } from "./portfolio";
import { emailFor } from "./contact";

/**
 * Development & Partnerships page. Partnership areas and portfolio brands are
 * the shared datasets (home.ts, portfolio.ts); everything else is page copy.
 * No commercial terms, fees, minimums or durations are stated anywhere.
 */

export const developmentHero = {
  eyebrow: development.eyebrow,
  heading: development.heading,
  emphasis: development.emphasis,
  intro:
    "We work with owners and developers to create hospitality businesses with strong identities, disciplined operations and long-term relevance.",
  note: "Hotels, restaurants and hospitality concepts shaped around the opportunity — not a fixed template.",
  image: {
    src: rooftopBarDusk,
    alt: "A rooftop bar at dusk: a white pergola over a lit counter, planted walls and the city skyline beyond.",
    focus: "62% 55%",
  },
};

export const proposition = {
  eyebrow: "Our proposition",
  statement: ["More than", "an operator."],
  emphasis: "operator",
  text: "CPH brings together what owners usually source separately: hospitality operations, brand and concept thinking, commercial discipline, and an understanding of the guest and the local market.",
  pillars: [
    "Hospitality operations",
    "Brand thinking",
    "Commercial discipline",
    "Guest experience",
    "Local understanding",
    "Concept development",
  ],
};

export const partnershipModels = {
  eyebrow: "Partnership models",
  heading: ["Ways we", "work together."],
  emphasis: "together",
  intro: "Each engagement is shaped around the asset and the owner’s ambitions. Terms are agreed project by project.",
  // The same six areas shown on the homepage — one source of truth.
  models: development.areas,
};

export const capabilities = {
  eyebrow: "Capabilities",
  heading: ["Across the whole", "lifecycle."],
  emphasis: "lifecycle",
  items: [
    { title: "Strategy & Feasibility", text: "Reading the site, the market and the opportunity before anything is designed." },
    { title: "Concept Development", text: "Shaping what the place is, who it is for and why they will return." },
    { title: "Brand Positioning", text: "Names, identities and guest journeys that hold together." },
    { title: "Pre-opening Planning", text: "The plan, budget and sequence that take a project to opening day." },
    { title: "Recruitment & Training", text: "Building teams and the standards they work to." },
    { title: "F&B Strategy", text: "Menus, formats and outlets that suit the property and its guests." },
    { title: "Operating Systems", text: "Processes, controls and reporting that keep service consistent." },
    { title: "Revenue & Sales", text: "Pricing, distribution and the sales effort behind rooms, covers and events." },
  ],
};

export const whyCph = {
  eyebrow: "Why CPH",
  heading: ["What owners", "get from us."],
  emphasis: "owners",
  reasons: [
    { title: "Owner mindset", text: "We approach every asset with commercial discipline and long-term thinking." },
    { title: "Operating experience", text: "Our perspective comes from running hospitality businesses, not advising on them from a distance." },
    { title: "Multi-category thinking", text: "Hotels, restaurants and food brands give us a wider view of what a property can be." },
    { title: "Local understanding", text: "Concepts should respond to their market rather than copy a template." },
    { title: "People-first operations", text: "Strong hospitality depends on capable teams and practical systems." },
  ],
};

export const process = {
  eyebrow: "How we work",
  heading: ["From first idea", "to daily operation."],
  emphasis: "daily",
  steps: [
    { title: "Understand", text: "Opportunity, location, market and owner objectives." },
    { title: "Define", text: "Positioning, concept, commercial model and operating approach." },
    { title: "Build", text: "Brand, systems, team, sales and pre-opening preparation." },
    { title: "Launch", text: "Operational readiness and introduction to the market." },
    { title: "Operate", text: "Ongoing performance, guest experience and commercial management." },
  ],
};

/** Project types that reflect what the group has actually run (see Our Story timeline). */
export const opportunities = {
  eyebrow: "Ideal opportunities",
  heading: ["Where we see", "opportunity."],
  emphasis: "opportunity",
  intro: "We look for projects where location, product potential and long-term ambition align.",
  types: [
    "City & business hotels",
    "Hotels & resorts",
    "Banqueting & events",
    "Standalone restaurants",
    "Hotel food & beverage",
    "Food & beverage concepts",
    "Catering operations",
  ],
};

const proofSlugs: BrandSlug[] = ["hotel-centre-point-nagpur", "centre-point-navi-mumbai", "pablo", "mickys"];

/** The expertise each property demonstrates — factual, from the brand registry and timeline. */
const proofLines: Record<string, string> = {
  "hotel-centre-point-nagpur": "Hotel operations, F&B and banqueting — including Palacio, a 10,000 sq ft hall.",
  "centre-point-navi-mumbai": "Taking Centre Point hotel operations to a second city.",
  pablo: "A standalone restaurant concept, from daily service to a six-day festival.",
  mickys: "A retail food brand built beyond the restaurant.",
};

export const portfolioProof = {
  eyebrow: "Operating experience",
  heading: ["Proof in", "practice."],
  emphasis: "practice",
  items: proofSlugs.map((slug) => ({ brand: getBrand(slug), line: proofLines[slug] })),
  cta: { label: "View our portfolio", href: "/portfolio" },
};

export const enquiry = {
  id: "enquiry",
  eyebrow: "Development enquiries",
  heading: ["Have a project", "worth building", "together?"],
  emphasis: "together",
  intro:
    "Tell us about the opportunity, location and your vision. Our team can review whether there is a strategic fit.",
  projectTypes: ["Hotel", "Resort", "Restaurant / F&B", "Mixed-use", "Other"],
  projectStatuses: ["Land / Site Identified", "Existing Operating Asset", "Under Construction", "Planning Stage", "Other"],
  success: {
    title: "Thank you.",
    text: "Our development team will review your enquiry and get in touch if the opportunity aligns with CPH.",
  },
  /** Used until an enquiry endpoint is connected (see DevelopmentForm). */
  fallbackEmail: emailFor("development"),
};

export const developmentMeta = {
  title: "Development & Partnerships",
  description:
    "Explore hospitality development and partnership opportunities with Centre Point Hospitality — hotel and restaurant management, concept development, pre-opening and franchising.",
};
