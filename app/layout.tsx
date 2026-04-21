import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PageShell } from "@/app/components/PageShell";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cornerstonelawgroup.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Cornerstone Law Group",
    template: "%s | Cornerstone Law Group",
  },
  description:
    "Cornerstone Law Group is a Dallas family-law firm representing clients through divorce, custody, and family-law matters with clarity and care.",
  applicationName: "Cornerstone Law Group",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "Cornerstone Law Group",
    title: "Cornerstone Law Group",
    description:
      "Dallas family-law firm representing clients through divorce, custody, and family matters.",
    url: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <PageShell>{children}</PageShell>
      </body>
    </html>
  );
}
