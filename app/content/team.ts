export interface TeamMember {
  readonly name: string;
  readonly role: string;
  readonly bio: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
}

export const team: readonly TeamMember[] = [
  {
    name: "Clint C. Brown",
    role: "Managing Partner and Founder",
    bio: "[UPDATED_BIO_TBD] Clint C. Brown is the managing partner and founder of Cornerstone Law Group, representing Dallas-area families through divorce, custody, and complex property matters with clarity and care.",
    imageSrc: "/team/clint-brown.placeholder.jpg",
    imageAlt: "Portrait of Clint C. Brown",
  },
  {
    name: "Tyra Miller",
    role: "Board Certified Paralegal",
    bio: "[UPDATED_BIO_TBD] Tyra Miller is a Board Certified Paralegal at Cornerstone Law Group with extensive family-law case experience and a steady, detail-oriented approach to client matters.",
    imageSrc: "/team/tyra-miller.placeholder.jpg",
    imageAlt: "Portrait of Tyra Miller",
  },
];
