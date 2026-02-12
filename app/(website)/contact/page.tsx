"use client";

import { ContactCTA } from "@/app/components/website/ContactCTA";
import { ContactForm } from "@/app/components/website/ContactForm";
import { ContactHero } from "@/app/components/website/ContactHero";
import { ContactInfo } from "@/app/components/website/ContactInfo";

export default function Contact() {
  return (
    <>
      <ContactHero />
      <ContactInfo />
      <ContactForm />
      <ContactCTA />
    </>
  );
}
