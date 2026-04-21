import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { PaymentButton } from "./PaymentButton";

interface PageShellProps {
  children: ReactNode;
}

export function PageShell({ children }: PageShellProps) {
  return (
    <div
      data-testid="page-shell"
      className="relative flex min-h-full flex-col"
    >
      <SiteHeader />
      <div className="flex-1">{children}</div>
      <SiteFooter />
      <PaymentButton />
    </div>
  );
}
