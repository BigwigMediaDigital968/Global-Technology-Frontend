"use client";

import ProductCard from "./ProductCard";
import { Product } from "../../types/product";

interface Props {
  products: Product[];
  loading: boolean;
  filter: string;
}

export default function ProductGrid({ products, loading, filter }: Props) {
  const filtered =
    filter === "All"
      ? products
      : products.filter((p) => p.collectionName?.name === filter);

  if (loading)
    return (
      <div className="py-20 text-center text-muted animate-pulse">
        Loading products...
      </div>
    );

  if (!filtered.length)
    return (
      <div className="py-20 text-center text-muted">No products found.</div>
    );

  return (
    <section id="product-grid" className="bg-bg py-16 md:py-20 scroll-mt-32">
      <div className="mx-auto max-w-7xl px-6 grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}
