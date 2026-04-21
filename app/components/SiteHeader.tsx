import Link from "next/link";
import { siteConfig } from "@/app/config/site.config";

export function SiteHeader() {
  return (
    <header
      data-testid="site-header"
      className="sticky top-0 z-40 w-full border-b border-brand-navy-100 bg-white/95 backdrop-blur"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-brand-navy-700"
        >
          {siteConfig.firmName}
        </Link>
        <nav aria-label="Primary">
          <ul className="flex items-center gap-6">
            {siteConfig.navLinks.map((link) => (
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
      </div>
    </header>
  );
}
