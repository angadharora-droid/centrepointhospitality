import Link from "next/link";
import { portfolioGroups } from "@/content/portfolio-page";
import type { PortfolioCategory } from "@/content/types";
import { cn } from "@/lib/cn";

const options = [{ id: undefined, title: "All" }, ...portfolioGroups.map(({ id, title }) => ({ id, title }))];

/**
 * Category filter as plain links (/portfolio?category=…), so every state is
 * shareable and works without JavaScript. The active link carries
 * aria-current and a magenta bar — a shape as well as a colour.
 */
export function PortfolioFilter({ active }: { active?: PortfolioCategory }) {
  return (
    <nav aria-label="Filter the portfolio by category">
      <ul className="grid grid-cols-3 md:flex md:gap-x-10 md:border-b md:border-ink/20">
        {options.map((option) => {
          const current = option.id === active;
          return (
            <li key={option.title} className="min-w-0">
              <Link
                href={option.id ? `/portfolio?category=${option.id}` : "/portfolio"}
                scroll={false}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "relative flex min-h-14 items-center border-b border-ink/20 eyebrow text-stone transition-colors duration-(--duration-base) hover:text-ink md:min-h-0 md:border-b-0 md:py-5",
                  "after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:origin-left after:scale-x-0 after:bg-magenta after:transition-transform after:duration-(--duration-base) after:ease-editorial",
                  "aria-[current=page]:text-ink aria-[current=page]:after:scale-x-100",
                )}
              >
                {option.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
