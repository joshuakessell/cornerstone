import Link from "next/link";
import type { NavLink } from "@/app/config/site.config";

interface PrimaryNavProps {
  links: ReadonlyArray<NavLink>;
}

export function PrimaryNav({ links }: PrimaryNavProps) {
  return (
    <nav aria-label="Primary">
      <ul className="flex items-center gap-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm font-medium text-brand-navy-700 hover:text-brand-gold-700"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
