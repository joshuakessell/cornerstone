import { siteConfig } from "@/app/config/site.config";

export function PaymentButton() {
  return (
    <div
      data-testid="payment-button"
      className="fixed bottom-6 right-6 z-50"
    >
      <a
        href={siteConfig.paymentUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Make a payment"
        className="inline-flex items-center rounded-full bg-brand-gold-500 px-5 py-3 text-sm font-semibold text-brand-navy-900 shadow-lg hover:bg-brand-gold-700 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy-700"
      >
        Make a Payment
      </a>
    </div>
  );
}
