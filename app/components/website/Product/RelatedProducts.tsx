// "use client";

// import ProductCard from "./ProductCard";

// const dummyProducts = Array.from({ length: 4 }).map((_, i) => ({
//   id: i,
//   title: `Elevator Component ${i + 1}`,
//   image: "/products/sample.jpg",
// }));

// export default function RelatedProducts({
//   title,
//   subtitle,
// }: {
//   title: string;
//   subtitle?: string;
// }) {
//   return (
//     <section className="py-24 bg-bg border-t border-border">
//       <div className="mx-auto max-w-7xl px-6">
//         <h2 className="text-3xl font-bold text-center">{title}</h2>
//         {subtitle && <p className="mt-4 text-muted text-center">{subtitle}</p>}

//         <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
//           {dummyProducts.map((p) => (
//             <ProductCard key={p.id} product={p} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useEffect, useState } from "react";
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
  title: string;
  subtitle?: string;
  collectionId: string;
  excludeSlug: string;
}

export default function RelatedProducts({
  title,
  subtitle,
  collectionId,
  excludeSlug,
}: Props) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!collectionId) return;

    fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/api/products`)
      .then((r) => r.json())
      .then((res) => {
        const related = (res.data as Product[])
          .filter(
            (p) =>
              p.collectionName?._id === collectionId && // same collection
              p.slug !== excludeSlug, // not the current product
          )
          .slice(0, 4); // max 4 cards
        setProducts(related);
      });
  }, [collectionId, excludeSlug]);

  if (!products.length) return null;

  return (
    <section className="py-20 bg-bg border-t border-border">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-2xl font-semibold text-center">{title}</h2>
        {subtitle && (
          <p className="mt-3 text-sm text-muted text-center">{subtitle}</p>
        )}

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
