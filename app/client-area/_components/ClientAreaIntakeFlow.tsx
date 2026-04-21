"use client";

import { useState } from "react";
import { PreIntakeForm } from "./PreIntakeForm";
import { ClioEmbed } from "./ClioEmbed";
import type { PreIntakeData } from "./preIntakeSchema";

export function ClientAreaIntakeFlow() {
  const [data, setData] = useState<PreIntakeData | null>(null);

  if (data) {
    return (
      <section aria-label="Clio intake" data-testid="intake-step-2" className="mt-10">
        <ClioEmbed data={data} />
      </section>
    );
  }

  return (
    <section aria-label="Pre-intake" data-testid="intake-step-1" className="mt-10">
      <p className="prose-body mb-6 text-brand-navy-700">
        Tell us who you are and how you would like us to reach you. Your answers stay in
        this page and are handed to the Clio intake form as you continue.
      </p>
      <PreIntakeForm onSubmit={setData} />
    </section>
  );
}
