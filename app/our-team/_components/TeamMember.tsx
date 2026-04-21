import Image from "next/image";
import type { TeamMember as TeamMemberData } from "@/app/content/team";

interface TeamMemberProps {
  member: TeamMemberData;
}

export function TeamMember({ member }: TeamMemberProps) {
  return (
    <article
      data-testid="team-member"
      className="team-member grid gap-6 py-8 md:grid-cols-[240px_1fr] md:gap-10 md:py-12"
    >
      <Image
        src={member.imageSrc}
        alt={member.imageAlt}
        width={480}
        height={600}
        sizes="(min-width: 768px) 240px, 100vw"
        style={{ objectPosition: "top" }}
        className="h-auto w-full rounded-lg object-cover object-top md:max-w-[240px]"
      />
      <TeamMemberInfo member={member} />
    </article>
  );
}

function TeamMemberInfo({ member }: TeamMemberProps) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-2xl font-semibold tracking-tight text-brand-navy-900 md:text-3xl">
        {member.name}
      </h2>
      <p
        data-testid="team-member-role"
        className="text-base font-medium text-brand-gold-700"
      >
        {member.role}
      </p>
      <p
        data-testid="team-member-bio"
        className="prose-body text-brand-navy-700"
      >
        {member.bio}
      </p>
    </div>
  );
}
