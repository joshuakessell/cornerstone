import { siteConfig } from "@/app/config/site.config";

function FooterBrand() {
  const { firmName, address } = siteConfig;
  return (
    <div>
      <p className="text-base font-semibold">{firmName}</p>
      <address className="mt-2 not-italic text-sm opacity-90">
        {address.line1}
        <br />
        {address.line2}
      </address>
    </div>
  );
}

function FooterContact() {
  const { phone, email } = siteConfig;
  return (
    <div className="text-sm opacity-90">
      <p>Phone: <a href={`tel:${phone}`}>{phone}</a></p>
      <p>Email: <a href={`mailto:${email}`}>{email}</a></p>
    </div>
  );
}

function FooterCopyright() {
  const year = new Date().getFullYear();
  return (
    <div className="text-sm opacity-80 md:text-right">
      <p>&copy; {year} {siteConfig.firmName}. All rights reserved.</p>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer
      data-testid="site-footer"
      className="mt-16 border-t border-brand-navy-100 bg-brand-navy-900 text-brand-gold-50"
    >
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 md:grid-cols-3">
        <FooterBrand />
        <FooterContact />
        <FooterCopyright />
      </div>
    </footer>
  );
}
