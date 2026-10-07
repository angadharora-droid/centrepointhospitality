import Link from "next/link";
import { Fragment } from "react";
import { Logo } from "@/components/brand/Logo";
import { Emphasis } from "@/components/typography/Emphasis";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { footer } from "@/content/footer";
import type { NavItem } from "@/content/navigation";
import { site } from "@/content/site";
import { Container } from "./Container";

// The ::before extends the hit area to ~34px without changing the look (::after is the underline).
// Long addresses may wrap anywhere so the two-column mobile footer never overflows at 320px.
const LINK =
  "link-underline [overflow-wrap:anywhere] text-paper/85 transition-colors duration-(--duration-base) hover:text-paper focus-visible:text-paper before:absolute before:-inset-x-1 before:-inset-y-2 before:content-['']";

/** Internal routes use next/link; mail, phone and external links are plain anchors. */
function FooterLink({ item }: { item: NavItem }) {
  const label = (
    <>
      {item.label}
      {item.note && <span className="sr-only"> — {item.note}</span>}
    </>
  );
  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener" className={LINK}>
        {label}
        <span aria-hidden="true" className="ml-1.5 inline-block text-[0.8em] text-mist">↗</span>
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  if (/^(mailto|tel):/.test(item.href)) {
    return (
      <a href={item.href} className={LINK}>
        {label}
      </a>
    );
  }
  return (
    <Link href={item.href} className={LINK}>
      {label}
    </Link>
  );
}

function GroupTitle({ id, children }: { id: string; children: string }) {
  return (
    <h2 id={id} className="eyebrow text-mist">
      {children}
    </h2>
  );
}

/**
 * Global footer on charcoal: logo, a closing statement and one understated
 * CTA; then four short groups (explore, connect, locations, brands); then a
 * quiet legal row. Every visible contact detail is published by CPH today.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      data-site-footer=""
      className="bg-ink pt-[clamp(4.5rem,2rem+6vw,8.75rem)] pb-[max(clamp(2.5rem,4vw,3.75rem),env(safe-area-inset-bottom))] text-paper [--focus-ring:currentColor]"
    >
      <Container>
        <div className="grid-site gap-y-12 lg:items-end">
          <div className="col-span-full lg:col-span-8">
            <Link href="/" aria-label={`${site.name} — home`} className="inline-flex">
              <Logo tone="dark" />
            </Link>
            <p className="mt-12 font-display text-[clamp(2.75rem,1rem+5vw,6.5rem)] leading-[0.92] tracking-[-0.02em] md:mt-16">
              {footer.statement.map((line, i) => (
                <Fragment key={line}>
                  <span className="block">
                    <Emphasis text={line} word={footer.emphasis} />
                  </span>
                  {i < footer.statement.length - 1 && " "}
                </Fragment>
              ))}
            </p>
          </div>
          <div className="col-span-full md:col-span-4 lg:col-span-3 lg:col-start-10 lg:pb-3">
            <p className="text-mist">For enquiries, partnerships and press.</p>
            <ArrowLink href={footer.cta.href} className="mt-5">
              {footer.cta.label}
            </ArrowLink>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-x-(--spacing-grid) gap-y-12 border-t border-line-inverse pt-12 md:mt-20 md:pt-14 lg:mt-24 lg:grid-cols-4">
          {footer.groups.slice(0, 2).map((group) => (
            <nav key={group.id} aria-labelledby={`footer-${group.id}`}>
              <GroupTitle id={`footer-${group.id}`}>{group.title}</GroupTitle>
              <ul className="mt-6 space-y-4 md:space-y-3">
                {group.links.map((item) => (
                  <li key={item.href}>
                    <FooterLink item={item} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <GroupTitle id="footer-locations">{footer.locations.title}</GroupTitle>
            <ul aria-labelledby="footer-locations" className="mt-6 space-y-4 md:space-y-3">
              {footer.locations.items.map((location) => (
                <li key={location.city}>
                  <a href={location.href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                    {location.city} <span aria-hidden="true">↗</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                  {location.detail && (
                    <span className="mt-1 block max-w-[15rem] text-small leading-relaxed text-mist">
                      {location.detail}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {footer.groups.slice(2).map((group) => (
            <nav key={group.id} aria-labelledby={`footer-${group.id}`}>
              <GroupTitle id={`footer-${group.id}`}>{group.title}</GroupTitle>
              <ul className="mt-6 space-y-4 md:space-y-3">
                {group.links.map((item) => (
                  <li key={item.href}>
                    <FooterLink item={item} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-5 border-t border-line-inverse pt-7 text-small text-mist md:mt-20 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <p>
              © {year} {site.name}
            </p>
            {footer.legal.length > 0 && (
              <ul className="flex gap-6">
                {footer.legal.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={LINK}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* Each separator stays with the word before it, so a wrap never starts with "·". */}
          <p className="eyebrow">
            {footer.taxonomy.map((item, i) => (
              <Fragment key={item}>
                <span className="whitespace-nowrap">
                  {item}
                  {i < footer.taxonomy.length - 1 && " ·"}
                </span>{" "}
              </Fragment>
            ))}
          </p>
        </div>
      </Container>
    </footer>
  );
}
