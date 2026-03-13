// "use client";

// import { motion } from "framer-motion";
// import { useRouter } from "next/navigation";

// export default function ProductCard({
//   name,
//   category,
// }: {
//   name: string;
//   category: string;
// }) {
//   const router = useRouter();
//   return (
//     <motion.div
//       whileHover={{ y: -10 }}
//       className="group rounded-xl border border-border bg-card p-6 shadow-card transition"
//     >
//       {/* Placeholder image */}
//       <div className="mb-4 h-40 rounded-lg bg-black/40 flex items-center justify-center text-muted text-sm">
//         Product Image
//       </div>

//       <h3 className="font-semibold mb-1 group-hover:text-accent transition">
//         {name}
//       </h3>

//       <p className="text-xs text-muted mb-4">Category: {category}</p>

//       <button
//         onClick={() => router.push("/user-login")}
//         className="w-full rounded-md cursor-pointer text-black border-amber-200/40 bg-amber-200 border border-accent py-2 text-sm text-accent hover:bg-accent hover:text-bg transition"
//       >
//         Get Quote
//       </button>
//     </motion.div>
//   );
// }

"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface Product {
  _id: string;
  name: string;
  slug: string;
  images: string[];
  price: number;
  collectionName: { _id: string; name: string };
}

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter();

  const handleGetQuote = () => {
    // Passes the product detail page as redirect param
    // LeadLoginPage reads ?redirect= and pushes there after OTP verification
    router.push(`/user-login?redirect=/products/${product.slug}`);
  };

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group rounded-xl border border-border bg-card p-6 shadow-card transition"
    >
      {product.images?.[0] ? (
        <img
          src={product.images[0]}
          alt={product.name}
          className="mb-4 h-40 w-full rounded-lg object-cover"
        />
      ) : (
        <div className="mb-4 h-40 rounded-lg bg-black/40 flex items-center justify-center text-muted text-sm">
          No Image
        </div>
      )}

      <h3 className="font-semibold mb-1 group-hover:text-accent transition">
        {product.name}
      </h3>
      <p className="text-xs text-muted mb-1">{product.collectionName?.name}</p>
      <p className="text-xs text-amber-300 mb-4">From ${product.price}</p>

      <button
        onClick={handleGetQuote}
        className="w-full rounded-md cursor-pointer text-black border-amber-200/40 bg-amber-200 border border-accent py-2 text-sm hover:bg-accent hover:text-bg transition"
      >
        Get Quote
      </button>
    </motion.div>
  );
}
