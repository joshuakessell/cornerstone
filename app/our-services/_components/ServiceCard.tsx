import type { Service } from "@/app/content/services";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const subs = service.subServices ?? [];
  return (
    <article className="rounded-lg border border-brand-navy-100 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-brand-navy-900">{service.title}</h2>
      <p className="prose-body mt-3 text-brand-navy-700">{service.description}</p>
      {subs.length > 0 && (
        <ul className="mt-4 list-disc pl-5 text-brand-navy-700">
          {subs.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </article>
  );
}
