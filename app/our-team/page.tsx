import type { Metadata } from "next";
import { Fragment } from "react";
import { PageShell } from "@/app/components/PageShell";
import { team } from "@/app/content/team";
import { TeamMember } from "@/app/our-team/_components/TeamMember";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the Cornerstone Law Group team — Dallas family-law attorneys and staff who walk alongside clients through divorce, custody, and family matters.",
};

export default function OurTeamPage() {
  return (
    <PageShell>
      <main className="px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-4xl font-semibold tracking-tight text-brand-navy-900 md:text-5xl">
            Our Team
          </h1>
          <TeamList />
        </div>
      </main>
    </PageShell>
  );
}

function TeamList() {
  return (
    <div data-testid="team-list" className="mt-10 flex flex-col">
      {team.map((member, i) => (
        <Fragment key={member.name}>
          {i > 0 && (
            <hr
              data-role="divider"
              className="border-t border-brand-navy-100"
            />
          )}
          <TeamMember member={member} />
        </Fragment>
      ))}
    </div>
  );
}
