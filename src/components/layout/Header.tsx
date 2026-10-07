"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { ContactLink } from "@/components/navigation/ContactLink";
import { DesktopNav } from "@/components/navigation/DesktopNav";
import { MenuToggle } from "@/components/navigation/MenuToggle";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { useScrolled } from "@/hooks/useScrolled";
import { Container } from "./Container";

const MENU_ID = "site-menu";
const DESKTOP_QUERY = "(width >= 64rem)";

/**
 * Fixed site header. Colour states (solid, transparent-over-hero, menu open)
 * are pure CSS keyed off the data attributes below — see "Header tone" in
 * globals.css. A page opts into the transparent state by rendering an element
 * with `data-header-overlay` at the top of the page.
 */
export function Header() {
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Close the menu on any route change, including browser back/forward.
  const pathname = usePathname();
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
  }

  // The full-screen menu only exists below the desktop breakpoint.
  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY);
    const onChange = (event: MediaQueryListEvent) => event.matches && setMenuOpen(false);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return (
    <header
      data-site-header=""
      data-scrolled={scrolled}
      data-menu-open={menuOpen}
      className="fixed inset-x-0 top-0 z-50"
    >
      <Container className="relative z-10 grid h-header grid-cols-[1fr_auto] items-center gap-x-8 lg:grid-cols-[1fr_auto_1fr]">
        <Link href="/" onClick={closeMenu} className="flex justify-self-start">
          <Logo tone="auto" />
        </Link>

        <DesktopNav />

        <div className="flex items-center justify-self-end">
          <ContactLink className="hidden text-nav lg:inline-flex" />
          <MenuToggle open={menuOpen} controls={MENU_ID} onToggle={() => setMenuOpen((open) => !open)} />
        </div>
      </Container>

      <MobileMenu id={MENU_ID} open={menuOpen} onClose={closeMenu} />
    </header>
  );
}
