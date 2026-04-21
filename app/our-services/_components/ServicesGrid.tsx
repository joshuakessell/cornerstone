import { services } from "@/app/content/services";
import { ServiceCard } from "@/app/our-services/_components/ServiceCard";

export function ServicesGrid() {
  return (
    <section
      data-testid="services-grid"
      className="grid grid-cols-1 gap-6 md:grid-cols-2"
    >
      {services.map(service => (
        <ServiceCard key={service.slug} service={service} />
      ))}
    </section>
  );
}
