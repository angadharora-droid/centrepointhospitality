import { development, ourWorld, selectedPortfolio } from "./home";
import { brands } from "./portfolio";
import { portfolioCategories, type PortfolioCategory } from "./types";

/**
 * Portfolio page. Every line here is reused from the homepage modules and the
 * brand registry (portfolio.ts) — the page adds structure, not new claims.
 */

export const portfolioHero = {
  eyebrow: "Our portfolio",
  heading: selectedPortfolio.heading,
  emphasis: selectedPortfolio.emphasis,
  intro: selectedPortfolio.intro,
};

export function isPortfolioCategory(value: unknown): value is PortfolioCategory {
  return typeof value === "string" && portfolioCategories.some((category) => category.id === value);
}

/** One group per category, in the house order, with its brands. */
export const portfolioGroups = ourWorld.worlds.map((world) => ({
  id: world.id,
  number: world.number,
  title: world.title,
  subtitle: world.subtitle,
  descriptor: world.descriptor,
  brands: brands.filter((brand) => brand.category === world.id),
}));

export const portfolioCta = development.cta;

export const portfolioMeta = {
  title: "Portfolio",
  description:
    "Hotels, restaurants and food brands from Centre Point Hospitality — Hotel Centre Point, Pablo, Dali, High Steaks, Micky’s, Puro Soul and more.",
};
