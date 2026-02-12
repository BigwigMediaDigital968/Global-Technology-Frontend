"use client";

import { useState } from "react";
import ProductHero from "@/app/components/website/ProductHero";
import ProductFilter from "@/app/components/website/ProductFilter";
import ProductGrid from "@/app/components/website/ProductGrid";
import ProductPageCTA from "@/app/components/website/ProductPageCTA";
import AuthorizedPartners from "@/app/components/website/AuthorizedPartners";

export default function ProductsPage() {
  const [filter, setFilter] = useState("All");

  return (
    <>
      <ProductHero />
      <ProductFilter onChange={setFilter} />
      <ProductGrid />
      <AuthorizedPartners />
      <ProductPageCTA />
    </>
  );
}
