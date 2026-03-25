"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Product } from "../../types/product";
import { useState } from "react";

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const handleNavigate = () => {
    router.push(`/products/${product.slug}`);
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      onClick={handleNavigate}
      className="group cursor-pointer rounded-2xl border border-border bg-card p-4 shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* IMAGE */}
      <div className="relative mb-4 h-44 w-full overflow-hidden rounded-xl bg-black/10">
        {/* Skeleton */}
        {isLoading && (
          <div className="absolute inset-0 animate-pulse bg-gray-300/20" />
        )}

        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className={`object-cover transition duration-500 group-hover:scale-105 ${
              isLoading ? "opacity-0" : "opacity-100"
            }`}
            sizes="(max-width: 768px) 100vw, 300px"
            onLoad={() => setIsLoading(false)}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-muted">
            No Image
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div>
        {/* Title Skeleton */}
        {isLoading ? (
          <div className="h-4 w-3/4 animate-pulse rounded bg-gray-300/20 mb-2" />
        ) : (
          <h3 className="font-semibold text-sm mb-1 group-hover:text-accent transition">
            {product.name}
          </h3>
        )}

        {/* Subtitle Skeleton */}
        {isLoading ? (
          <div className="h-3 w-1/2 animate-pulse rounded bg-gray-300/20 mb-3" />
        ) : (
          <p className="text-xs text-muted mb-3">
            {product.collectionName?.name}
          </p>
        )}

        {/* CTA */}
        <div className="mt-auto">
          <span className="inline-block text-xs font-medium text-accent border px-2 py-1 bg-amber-200 text-black hover:scale-105 transition-all ease-in-out">
            View Details →
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// Lead Verification version below

// "use client";

// import { motion } from "framer-motion";
// import { useRouter } from "next/navigation";
// import { Product } from "../../types/product";

// export default function ProductCard({ product }: { product: Product }) {
//   const router = useRouter();

//   const handleGetQuote = () => {
//     const verified = localStorage.getItem("lead_verified");
//     const expiry = localStorage.getItem("lead_expiry");

//     if (verified && expiry) {
//       const expiryTime = parseInt(expiry);

//       // Check if lead is still valid (15 days)
//       if (Date.now() < expiryTime) {
//         router.push(`/products/${product.slug}`);
//         return;
//       }

//       // expired → clear data
//       localStorage.removeItem("lead_verified");
//       localStorage.removeItem("lead_email");
//       localStorage.removeItem("lead_expiry");
//     }

//     // Not verified → go to lead form
//     router.push(`/user-login?redirect=/products/${product.slug}`);
//   };

//   return (
//     <motion.div
//       whileHover={{ y: -10 }}
//       className="group rounded-xl border border-border bg-card p-6 shadow-card transition"
//     >
//       {product.images?.[0] ? (
//         <img
//           src={product.images[0]}
//           alt={product.name}
//           className="mb-4 h-40 w-full rounded-lg object-cover"
//         />
//       ) : (
//         <div className="mb-4 h-40 rounded-lg bg-black/40 flex items-center justify-center text-muted text-sm">
//           No Image
//         </div>
//       )}

//       <h3 className="font-semibold mb-1 group-hover:text-accent transition">
//         {product.name}
//       </h3>

//       <p className="text-xs text-muted mb-4">{product.collectionName?.name}</p>

//       {/* <p className="text-xs text-amber-300 mb-4">From ${product.price}</p> */}

//       <button
//         onClick={handleGetQuote}
//         className="w-full rounded-md cursor-pointer text-black border-amber-200/40 bg-amber-200 border border-accent py-2 text-sm hover:bg-accent hover:text-bg transition"
//       >
//         Get Quote
//       </button>
//     </motion.div>
//   );
// }
