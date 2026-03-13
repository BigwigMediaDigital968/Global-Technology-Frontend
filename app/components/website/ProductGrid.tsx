// "use client";

// import { useState } from "react";
// import ProductCard from "./ProductCard";

// const products = [
//   { name: "VVVF Control Panel", category: "Control Panels" },
//   { name: "Automatic Door Operator", category: "Door Operators" },
//   { name: "Geared Traction Machine", category: "Traction Machines" },
//   { name: "Overspeed Governor", category: "Safety Components" },
//   { name: "COP Push Button Panel", category: "Push Buttons" },
//   { name: "Steel Wire Rope", category: "Cables & Belts" },
// ];

// export default function ProductGrid() {
//   const [filter, setFilter] = useState("All");

//   const filtered =
//     filter === "All" ? products : products.filter((p) => p.category === filter);

//   return (
//     <section className="bg-bg py-20">
//       <div className="mx-auto max-w-7xl px-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
//         {filtered.map((product) => (
//           <ProductCard key={product.name} {...product} />
//         ))}
//       </div>
//     </section>
//   );
// }

"use client";

import ProductCard from "./ProductCard";

interface Product {
  _id: string;
  name: string;
  slug: string;
  images: string[];
  price: number;
  collectionName: { _id: string; name: string };
}

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
    <section id="product-grid" className="bg-bg py-20">
      <div className="mx-auto max-w-7xl px-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}
