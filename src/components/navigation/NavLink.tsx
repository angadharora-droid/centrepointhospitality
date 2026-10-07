"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import type { NavItem } from "@/content/navigation";

type NavLinkProps = {
  item: NavItem;
  className?: string;
  children?: ReactNode;
  onNavigate?: () => void;
};

/** Internal links get aria-current; external links open in a new tab. */
export function NavLink({ item, className, children, onNavigate }: NavLinkProps) {
  const pathname = usePathname();
  const content = children ?? item.label;

  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener" className={className} onClick={onNavigate}>
        {content}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  const current = pathname === item.href || pathname.startsWith(`${item.href}/`);

  return (
    <Link
      href={item.href}
      className={className}
      aria-current={current ? "page" : undefined}
      onClick={onNavigate}
    >
      {content}
    </Link>
  );
}
