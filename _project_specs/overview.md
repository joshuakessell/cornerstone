# Project Overview

## Vision
Modern front-end redesign of the **Cornerstone Law Group** website (Dallas family-law firm). Shift palette from peach → yellow/gold + navy, rework typography and hierarchy, and replace the current intake experience with a dedicated **Client Area** page that embeds the firm's **Clio** CRM intake widget.

## Goals
- [ ] Global rebrand: yellow/gold + navy palette, refreshed typography, consistent justified body copy
- [ ] Redesigned Home page (hero emphasis on "Family", looping video, removed audio bar, consolidated Make-a-Payment CTA)
- [ ] Redesigned Our Team page (picture-left/bio-right, dividing lines, no diamond overlays, updated bios for Clint C. Brown & Tyra Miller)
- [ ] Redesigned Our Approach page (new hero photo, expanded testimonials from Jennifer/Joshua/Elizabeth/Cameron/Catherine)
- [ ] Preserve Our Services page structure (already solid)
- [ ] Build Contact + Client Area shell containing an embedded Clio intake widget (iframe/script)
- [ ] Deploy to Vercel

## Non-Goals
- Building a custom intake form (Clio handles this entirely)
- Backend services / database (no persistence owned by this codebase)
- Accepting payments in-app (link out to existing payment portal via Make-a-Payment button)
- AI / LLM features (out of scope for this redesign)

## Success Metrics
- All pages pass WCAG AA contrast checks with the new palette
- Lighthouse: Performance ≥ 90, SEO ≥ 95, Accessibility ≥ 95 on mobile
- Clio intake widget loads successfully in the Client Area without layout shift (CLS < 0.1)
- Stakeholder sign-off on every page listed in the spec below

---

## Claude AI Skill Outline: Cornerstone Law Group Website Redesign Specification

**1. Role & Tech Stack**
* **Role:** You are an expert UX/UI Designer and Frontend Web Developer.
* **Objective:** Execute a complete front-end redesign for the Cornerstone Law Group website.
* **Architecture:** Focus on modern, responsive design principles. Build a dedicated, streamlined "Client Area" that will serve as the host container for a third-party CRM intake widget (Clio).

**2. Global Design & Branding Constraints**
* **Color Palette:** Shift the current peach colors to a more yellow/gold tone, moving the overall site palette closer to a yellow and navy blue aesthetic[cite: 751].
* **Typography & Formatting:**
    * Rework headers across the site for better visual hierarchy and evaluate font changes[cite: 752, 754].
    * Ensure body text is justified throughout the site[cite: 753, 766].
    * Decrease the font size slightly on the main menu options[cite: 760].

**3. Page-by-Page Design Specifications**

* **Home Page / Main Page:**
    * **Hero Section:** Redesign the word "Family" so it stands out as the primary focus; use a different font or an underline rather than just a subtle bold effect[cite: 71, 72, 73].
    * **Media Elements:** Include a short looping background video to make the page feel welcoming[cite: 124]. Ensure any background audio is music, not speaking, and completely remove the audio player bar[cite: 758, 759].
    * **Copy Removals:** Strip the phrase "Exemplary Representation from a Dallas Legal Firm" from the page[cite: 761].
    * **Navigation / UI:** Fix alignment issues caused by the "Make a Payment" button in the top right; consolidate the payment action to a single button in the lower right corner[cite: 736, 738, 739].

* **Our Team Page:**
    * **Layout Structure:** Reorganize the profiles by placing the team member's picture on the left and their description on the right[cite: 98]. Include clear dividing lines or boundaries between each team member[cite: 97].
    * **Images:** Remove the overlapping diamond design from the pictures and fix image boxes so they do not cut off the subject's hair[cite: 93, 94, 765].
    * **Content:** Keep the text concise and add clear titles to indicate which bio belongs to which person[cite: 98, 99, 100]. Insert the updated bios for Clint C. Brown (Managing Partner and Founder) [cite: 454, 455] and Tyra Miller (Board Certified Paralegal)[cite: 448, 449].

* **Our Approach Page:**
    * **Media:** Replace the main photo on this page[cite: 740, 763].
    * **Testimonial Section:** Redesign this block to feature longer, more in-depth quotes so it feels more natural and less underwhelming[cite: 77, 78]. Include the specific quotes from Jennifer, Joshua, Elizabeth, Cameron, and Catherine[cite: 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91]. Remove the text "Cornerstone Law Group, P.C." from the testimonials[cite: 768].

* **Our Services Page:**
    * Maintain the current structural layout for this page, as it is already professional, organized, and complete[cite: 120, 121].

* **Contact Us & "Client Area" (Clio Integration Zone):**
    * **Visual Upgrade:** These pages currently feel bland; integrate client testimonials and welcoming pictures to elevate the design[cite: 124, 125].
    * **The Intake Placeholder:** Do not build custom intake forms[cite: 772]. Instead, design a clean, responsive container labeled "Client Area"[cite: 770]. Ensure the flow of this area prompts the user for basic information first before leading them into the detailed areas, which will be handled entirely by the embedded Clio widget[cite: 771]. Ensure the page layout supports a seamless iframe or script embed for this widget.
