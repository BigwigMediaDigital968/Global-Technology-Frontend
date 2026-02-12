"use client";

import { AboutCTA } from "@/app/components/website/AboutCTA";
import { AboutHero } from "@/app/components/website/AboutHero";
import { AboutPromise } from "@/app/components/website/AboutPromise";
import { AboutStats } from "@/app/components/website/AboutStats";
import { AboutStory } from "@/app/components/website/AboutStory";
import { AboutWhatWeDo } from "@/app/components/website/AboutWhatWeDo";
import AuthorizedPartners from "@/app/components/website/AuthorizedPartners";

export default function About() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <AboutWhatWeDo />
      <AboutPromise />
      <AboutStats />
      <AuthorizedPartners />
      <AboutCTA />
    </>
  );
}
