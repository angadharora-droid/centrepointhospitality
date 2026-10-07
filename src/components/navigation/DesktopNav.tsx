import { primaryNav } from "@/content/navigation";
import { NavLink } from "./NavLink";

export function DesktopNav() {
  return (
    <nav aria-label="Primary" className="hidden lg:block">
      <ul className="flex items-center gap-x-8 xl:gap-x-11">
        {primaryNav.map((item) => (
          <li key={item.href}>
            <NavLink item={item} className="link-underline text-nav font-medium">
              {item.label}
              {item.external && (
                <span aria-hidden="true" className="ml-1 inline-block text-[0.8em]">
                  ↗
                </span>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
