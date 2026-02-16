"use client";

import { IndustriesHero } from "@/app/components/website/IndustryHero";
import { IndustriesContent } from "@/app/components/website/IndustriesContent";
import { IndustriesGrid } from "@/app/components/website/IndustriesGrid";
import { IndustriesStats } from "@/app/components/website/IndustriesStats";
import { IndustriesCTA } from "@/app/components/website/IndustryCTA";
import Newsletter from "@/app/components/website/NewsLetter";

export default function IndustryPage() {
  return (
    <>
      <IndustriesHero />
      <IndustriesGrid />
      <IndustriesContent />
      <IndustriesStats />
      <IndustriesCTA />
      <Newsletter />
    </>
  );
}
