"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ProductCard({ product }: any) {
  console.log(product);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="rounded-2xl border border-border bg-white/5 backdrop-blur-xl overflow-hidden"
    >
      <img
        src={product.images[0]}
        alt={product.title}
        className="h-48 w-full object-cover"
      />

      <div className="p-5">
        <h3 className="font-semibold">{product.name}</h3>

        <Link
          href={`/products/${product.slug}`}
          className="mt-4 inline-block text-sm text-accent hover:underline"
        >
          View Details →
        </Link>
      </div>
    </motion.div>
  );
}

// "use client";

// import { motion } from "framer-motion";
// import { useRouter } from "next/navigation";

// export default function ProductCard({ product }: any) {
//   const router = useRouter();

//   const handleViewDetails = () => {
//     const verified = localStorage.getItem("lead_verified");
//     const expiry = localStorage.getItem("lead_expiry");

//     if (verified && expiry) {
//       const expiryTime = parseInt(expiry);

//       if (Date.now() < expiryTime) {
//         router.push(`/products/${product.slug}`);
//         return;
//       }

//       // Lead expired → clear storage
//       localStorage.removeItem("lead_verified");
//       localStorage.removeItem("lead_email");
//       localStorage.removeItem("lead_expiry");
//     }

//     // Redirect to lead login if not verified
//     router.push(`/user-login?redirect=/products/${product.slug}`);
//   };

//   return (
//     <motion.div
//       whileHover={{ y: -8 }}
//       className="rounded-2xl border border-border bg-white/5 backdrop-blur-xl overflow-hidden"
//     >
//       <img
//         src={product.image}
//         alt={product.title}
//         className="h-48 w-full object-cover"
//       />

//       <div className="p-5">
//         <h3 className="font-semibold">{product.title}</h3>

//         <button
//           onClick={handleViewDetails}
//           className="mt-4 text-sm text-accent hover:underline"
//         >
//           View Details →
//         </button>
//       </div>
//     </motion.div>
//   );
// }
