"use client";

import ClientTestimonials from "@/app/components/website/ClientTestimonials";
import { ContactCTA } from "@/app/components/website/ContactCTA";
import { ContactForm } from "@/app/components/website/ContactForm";
import { ContactHero } from "@/app/components/website/ContactHero";

export default function Contact() {
  return (
    <>
      <ContactHero />
      <ContactForm />
      <ContactCTA />
      <ClientTestimonials />
    </>
  );
}
