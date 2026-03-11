import Hero from "@/app/components/website/Hero";
import ProductCategories from "../components/website/ProductCategories";
import AboutTrust from "../components/website/AboutTrust";
import Industries from "../components/website/Industries";
import LeadCTA from "../components/website/LeadCTA";
import NewsLetter from "../components/website/NewsLetter";
import ClientTestimonials from "../components/website/ClientTestimonials";
import AuthorizedPartners from "../components/website/AuthorizedPartners";

export default function Home() {
  return (
    <>
      <Hero />
      <ProductCategories />
      <AuthorizedPartners />
      <AboutTrust />
      <Industries />
      <LeadCTA />
      <ClientTestimonials />
      <NewsLetter />
    </>
  );
}
