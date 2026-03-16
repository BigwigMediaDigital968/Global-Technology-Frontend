"use client";

import { useState, useEffect } from "react";
import ProductHero from "@/app/components/website/ProductHero";
import ProductFilter from "@/app/components/website/ProductFilter";
import ProductGrid from "@/app/components/website/ProductGrid";
import ProductPageCTA from "@/app/components/website/ProductPageCTA";
import AuthorizedPartners from "@/app/components/website/AuthorizedPartners";
import { Product } from "../../types/product";

const API_BASE = process.env.NEXT_PUBLIC_BASE_URI;

export default function ProductsPage() {
  const [filter, setFilter] = useState<string>("All");
  const [products, setProducts] = useState<Product[]>([]);
  const [collections, setCollections] = useState<string[]>(["All"]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/products`);
        const json = await res.json();

        const data: Product[] = json.data || [];

        setProducts(data);

        /* Extract unique collections safely */
        const uniqueCollections = [
          "All",
          ...Array.from(
            new Set(
              data.map((p) => p.collectionName?.name).filter(Boolean), // removes undefined
            ),
          ),
        ] as string[];

        setCollections(uniqueCollections);
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <ProductHero />

      <ProductFilter
        categories={collections}
        active={filter}
        onChange={setFilter}
      />

      <ProductGrid products={products} loading={loading} filter={filter} />

      <AuthorizedPartners />

      <ProductPageCTA />
    </>
  );
}
