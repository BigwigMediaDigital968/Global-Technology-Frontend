// "use client";

// import { useState } from "react";
// import ProductHero from "@/app/components/website/ProductHero";
// import ProductFilter from "@/app/components/website/ProductFilter";
// import ProductGrid from "@/app/components/website/ProductGrid";
// import ProductPageCTA from "@/app/components/website/ProductPageCTA";
// import AuthorizedPartners from "@/app/components/website/AuthorizedPartners";

// export default function ProductsPage() {
//   const [filter, setFilter] = useState("All");

//   return (
//     <>
//       <ProductHero />
//       <ProductFilter onChange={setFilter} />
//       <ProductGrid />
//       <AuthorizedPartners />
//       <ProductPageCTA />
//     </>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import ProductHero from "@/app/components/website/ProductHero";
import ProductFilter from "@/app/components/website/ProductFilter";
import ProductGrid from "@/app/components/website/ProductGrid";
import ProductPageCTA from "@/app/components/website/ProductPageCTA";
import AuthorizedPartners from "@/app/components/website/AuthorizedPartners";

interface Product {
  _id: string;
  name: string;
  slug: string;
  images: string[];
  price: number;
  collectionName: { _id: string; name: string };
}

export default function ProductsPage() {
  const [filter, setFilter] = useState("All");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/api/products`)
      .then((r) => r.json())
      .then((res) => setProducts(res.data || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <ProductHero />
      <ProductFilter onChange={setFilter} />
      <ProductGrid products={products} loading={loading} filter={filter} />
      <AuthorizedPartners />
      <ProductPageCTA />
    </>
  );
}
