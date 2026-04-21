"use client";

import type { PreIntakeData } from "./preIntakeSchema";

interface ClioEmbedProps {
  data: PreIntakeData;
}

/**
 * Pre-intake data is held in component state only — never sent to a backend
 * by this codebase. It is optionally interpolated into the Clio iframe src
 * via {name} / {contact} placeholders so Clio receives it via its own flow.
 */
export function ClioEmbed({ data }: ClioEmbedProps) {
  const raw = process.env.NEXT_PUBLIC_CLIO_EMBED_URL;
  const wrapperClass =
    "clio-embed-wrapper aspect-[4/5] min-h-[700px] w-full overflow-hidden rounded-2xl bg-brand-navy-50";

  if (!raw) {
    return (
      <div
        role="status"
        data-testid="clio-placeholder"
        className={`${wrapperClass} flex items-center justify-center px-6 text-center text-brand-navy-700`}
      >
        The intake form will appear here once connected.
      </div>
    );
  }

  // TODO(CSP): add `frame-src <clio-origin>` to a Content-Security-Policy
  // header (middleware.ts or next.config.ts `headers()`) once the final
  // NEXT_PUBLIC_CLIO_EMBED_URL is known. Until then the iframe is constrained
  // by `sandbox` and `referrerPolicy` only — defense-in-depth is deferred.
  return (
    <div className={wrapperClass}>
      <iframe
        data-testid="clio-embed"
        src={interpolate(raw, data)}
        title="Clio intake form"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
        className="h-full w-full border-0"
      />
    </div>
  );
}

function interpolate(template: string, data: PreIntakeData): string {
  const contact = data.preferredContact === "email" ? data.emailAddress : data.phoneNumber;
  return template
    .replace(/\{name\}/g, encodeURIComponent(data.fullName))
    .replace(/\{contact\}/g, encodeURIComponent(contact));
}
