export interface Service {
  slug: string;
  title: string;
  description: string;
  subServices?: ReadonlyArray<string>;
}

export const services: ReadonlyArray<Service> = [
  {
    slug: "divorce",
    title: "Divorce",
    description:
      "Guidance through contested and uncontested divorce, from filing to final decree.",
  },
  {
    slug: "child-custody",
    title: "Child Custody",
    description:
      "Custody and visitation strategies focused on stability and the child's best interest.",
  },
  {
    slug: "adoption",
    title: "Adoption",
    description:
      "Legal counsel for stepparent, relative, and private adoptions under Texas family law.",
  },
  {
    slug: "mediation",
    title: "Mediation",
    description:
      "Alternative dispute resolution that keeps family-law matters out of the courtroom when possible.",
  },
];
