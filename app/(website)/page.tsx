import Hero from "@/app/components/website/Hero";
import ProductCategories from "../components/website/ProductCategories";
import AboutTrust from "../components/website/AboutTrust";
import Industries from "../components/website/Industries";
import LeadCTA from "../components/website/LeadCTA";
import NewsLetter from "../components/website/NewsLetter";
import ClientTestimonials from "../components/website/ClientTestimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <ProductCategories />
      <AboutTrust />
      <Industries />
      <LeadCTA />
      <ClientTestimonials />
      <NewsLetter />
    </>
  );
}
