"use client";

import ProductCard from "./ProductCard";

const dummyProducts = Array.from({ length: 4 }).map((_, i) => ({
  id: i,
  title: `Elevator Component ${i + 1}`,
  image: "/products/sample.jpg",
}));

export default function RelatedProducts({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="py-24 bg-bg border-t border-border">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl font-bold text-center">{title}</h2>
        {subtitle && <p className="mt-4 text-muted text-center">{subtitle}</p>}

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {dummyProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
