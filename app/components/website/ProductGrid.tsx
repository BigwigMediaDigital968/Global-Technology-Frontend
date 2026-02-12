"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";

const products = [
  { name: "VVVF Control Panel", category: "Control Panels" },
  { name: "Automatic Door Operator", category: "Door Operators" },
  { name: "Geared Traction Machine", category: "Traction Machines" },
  { name: "Overspeed Governor", category: "Safety Components" },
  { name: "COP Push Button Panel", category: "Push Buttons" },
  { name: "Steel Wire Rope", category: "Cables & Belts" },
];

export default function ProductGrid() {
  const [filter, setFilter] = useState("All");

  const filtered =
    filter === "All" ? products : products.filter((p) => p.category === filter);

  return (
    <section className="bg-bg py-20">
      <div className="mx-auto max-w-7xl px-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => (
          <ProductCard key={product.name} {...product} />
        ))}
      </div>
    </section>
  );
}
