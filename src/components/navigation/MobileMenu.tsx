"use client";

import { AnimatePresence, m } from "motion/react";
import { Container } from "@/components/layout/Container";
import { primaryNav } from "@/content/navigation";
import { contact } from "@/content/contact";
import { site } from "@/content/site";
import { usePageLock } from "@/hooks/usePageLock";
import { panelReveal, riseIn, staggerChildren } from "@/lib/motion";
import { ContactLink } from "./ContactLink";
import { NavLink } from "./NavLink";

type MobileMenuProps = {
  id: string;
  open: boolean;
  onClose: () => void;
};

const stagger = staggerChildren();

/**
 * Full-screen menu for mobile and tablet. Sits beneath the header bar, which
 * keeps the logo and toggle visible above it.
 */
export function MobileMenu({ id, open, onClose }: MobileMenuProps) {
  usePageLock(open, onClose, "[data-site-header]");

  return (
    <AnimatePresence>
      {open && (
        <m.div
          id={id}
          key="mobile-menu"
          variants={panelReveal}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 overflow-y-auto overscroll-contain bg-aubergine text-paper [--focus-ring:currentColor] lg:hidden"
        >
          <Container className="flex min-h-full flex-col pt-[calc(var(--header-h)+1.5rem)] pb-10 md:pt-[calc(var(--header-h)+4rem)]">
            <m.div variants={stagger} className="flex flex-1 flex-col">
              <nav aria-label="Primary">
                <ol className="border-t border-line-inverse">
                  {primaryNav.map((item) => (
                    <m.li key={item.href} variants={riseIn} className="border-b border-line-inverse">
                      <NavLink
                        item={item}
                        onNavigate={onClose}
                        className="group flex flex-col gap-1 py-4 sm:py-5 md:flex-row md:items-baseline md:justify-between md:gap-8 md:py-7"
                      >
                        <span className="font-display text-display-lg transition-colors duration-(--duration-base) group-hover:text-blush group-aria-[current=page]:text-blush">
                          {item.label}
                          {item.external && (
                            <span aria-hidden="true" className="ml-2 align-top text-[0.4em]">
                              ↗
                            </span>
                          )}
                        </span>
                        {item.note && <span className="text-small text-mist">{item.note}</span>}
                      </NavLink>
                    </m.li>
                  ))}
                </ol>
              </nav>

              <m.div
                variants={riseIn}
                className="mt-auto grid gap-6 pt-10 text-small text-mist md:grid-cols-2 md:items-end md:pt-20"
              >
                <p className="font-display text-title text-blush italic">{site.philosophy}</p>
                <div className="flex flex-col gap-1 md:items-end md:text-right">
                  <ContactLink onNavigate={onClose} className="mb-3 inline-flex text-body text-paper" />
                  <a href={`mailto:${contact.email}`} className="hover:text-paper">
                    {contact.email}
                  </a>
                  <a href={contact.phone.href} className="hover:text-paper">
                    {contact.phone.display}
                  </a>
                </div>
              </m.div>
            </m.div>
          </Container>
        </m.div>
      )}
    </AnimatePresence>
  );
}
