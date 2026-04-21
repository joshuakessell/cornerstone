import { siteConfig } from "@/app/config/site.config";

const LINK_CLASS =
  "prose-body font-semibold text-brand-navy-900 underline-offset-4 hover:underline";
const DT_CLASS = "text-sm uppercase tracking-wide text-brand-navy-700";

export function ContactInfo() {
  return (
    <section
      aria-labelledby="contact-info-heading"
      data-testid="contact-info"
      className="bg-brand-navy-50 px-6 py-16 md:px-10 md:py-20"
    >
      <div className="mx-auto max-w-3xl">
        <h2
          id="contact-info-heading"
          className="text-3xl font-semibold tracking-tight text-brand-navy-900"
        >
          Reach Us
        </h2>
        <dl className="mt-8 grid gap-6 text-brand-navy-900 md:grid-cols-3">
          <PhoneDetail />
          <EmailDetail />
          <OfficeDetail />
        </dl>
      </div>
    </section>
  );
}

function PhoneDetail() {
  const telHref = `tel:${siteConfig.phone.replace(/\D/g, "")}`;
  return (
    <div>
      <dt className={DT_CLASS}>Phone</dt>
      <dd className="mt-1">
        <a href={telHref} className={LINK_CLASS}>
          {siteConfig.phone}
        </a>
      </dd>
    </div>
  );
}

function EmailDetail() {
  const mailHref = `mailto:${siteConfig.email}`;
  return (
    <div>
      <dt className={DT_CLASS}>Email</dt>
      <dd className="mt-1">
        <a href={mailHref} className={LINK_CLASS}>
          {siteConfig.email}
        </a>
      </dd>
    </div>
  );
}

function OfficeDetail() {
  return (
    <div>
      <dt className={DT_CLASS}>Office</dt>
      <dd className="mt-1">
        <address className="prose-body not-italic font-semibold">
          {siteConfig.address.line1}
          <br />
          {siteConfig.address.line2}
        </address>
      </dd>
    </div>
  );
}
