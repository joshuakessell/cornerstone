export interface Testimonial {
  id: string;
  firstName: "Jennifer" | "Joshua" | "Elizabeth" | "Cameron" | "Catherine";
  quote: string;
}

export const heroIntro =
  "We walk with our clients through some of the hardest moments of their lives. Our approach is direct, prepared, and unwavering in your corner.";

export const testimonials: readonly Testimonial[] = [
  {
    id: "jennifer",
    firstName: "Jennifer",
    quote:
      "[PLACEHOLDER_TESTIMONIAL:Jennifer] From the first consultation I felt heard and not rushed. The team laid out my options plainly, explained the realistic outcomes, and never pressured me toward the most expensive path. When the other side got aggressive they matched the energy without losing composure, and my kids and I came out of this on steadier ground than I thought possible.",
  },
  {
    id: "joshua",
    firstName: "Joshua",
    quote:
      "[PLACEHOLDER_TESTIMONIAL:Joshua] Custody cases feel like standing on a dock in a storm, but my attorney gave me a map for every hearing, every deadline, every document. I always knew what was coming next and what my part was. The preparation showed up in court; the opposing counsel clearly had not done the same homework, and the judge noticed.",
  },
  {
    id: "elizabeth",
    firstName: "Elizabeth",
    quote:
      "[PLACEHOLDER_TESTIMONIAL:Elizabeth] I came in ashamed and exhausted, convinced I had waited too long to get help. Instead of judgment I got a concrete plan within the first hour. Every email got a same-day reply, every call was returned, and the final agreement protected the financial future I had honestly given up on rebuilding. I cannot thank the team enough for the dignity they showed me.",
  },
  {
    id: "cameron",
    firstName: "Cameron",
    quote:
      "[PLACEHOLDER_TESTIMONIAL:Cameron] What stood out was how carefully they listened before giving advice. Other attorneys I had spoken with started typing a strategy in the first five minutes; here we spent a full session understanding what I actually wanted my life to look like on the other side of the case, and the legal approach was built from that picture outward.",
  },
  {
    id: "catherine",
    firstName: "Catherine",
    quote:
      "[PLACEHOLDER_TESTIMONIAL:Catherine] My adoption had layers of interstate paperwork that had stalled for almost a year with previous counsel. Within weeks of moving the file, every filing was caught up, every contact re-opened, and a court date was on the calendar. The day we finalized I could not stop smiling. They treated my family like their own family.",
  },
];
