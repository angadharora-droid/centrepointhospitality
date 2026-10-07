import { contactNav } from "@/content/navigation";
import { cn } from "@/lib/cn";
import { NavLink } from "./NavLink";

type ContactLinkProps = { className?: string; onNavigate?: () => void };

export function ContactLink({ className, onNavigate }: ContactLinkProps) {
  return (
    <NavLink
      item={contactNav}
      onNavigate={onNavigate}
      className={cn("group link-underline items-center gap-2 font-medium", className)}
    >
      {contactNav.label}
      <span
        aria-hidden="true"
        className="inline-block transition-transform duration-(--duration-base) ease-editorial group-hover:translate-x-1 group-focus-visible:translate-x-1"
      >
        →
      </span>
    </NavLink>
  );
}
