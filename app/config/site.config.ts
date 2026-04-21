export interface NavLink {
  label: string;
  href: string;
}

export interface SiteAddress {
  line1: string;
  line2: string;
}

export interface SiteConfig {
  firmName: string;
  navLinks: ReadonlyArray<NavLink>;
  paymentUrl: string;
  phone: string;
  email: string;
  address: SiteAddress;
}

const defaultPaymentUrl =
  process.env.NEXT_PUBLIC_PAYMENT_URL ?? "https://pay.example.com/cornerstone";

export const siteConfig: SiteConfig = {
  firmName: "Cornerstone Law Group",
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Our Team", href: "/our-team" },
    { label: "Our Approach", href: "/our-approach" },
    { label: "Our Services", href: "/our-services" },
    { label: "Contact", href: "/contact" },
  ],
  paymentUrl: defaultPaymentUrl,
  phone: "214-555-0100",
  email: "info@cornerstonelawgroup.com",
  address: {
    line1: "1234 Main Street, Suite 500",
    line2: "Dallas, TX 75201",
  },
};
