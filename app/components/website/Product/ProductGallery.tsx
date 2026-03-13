// "use client";

// import { motion } from "framer-motion";

// const images = ["/products/p1.jpg", "/products/p2.jpg", "/products/p3.jpg"];

// export default function ProductGallery() {
//   return (
//     <motion.div
//       initial={{ opacity: 0, x: -30 }}
//       animate={{ opacity: 1, x: 0 }}
//       className="space-y-4"
//     >
//       <img
//         src={images[0]}
//         className="rounded-2xl border border-border object-cover"
//       />

//       <div className="flex gap-4">
//         {images.map((img) => (
//           <img
//             key={img}
//             src={img}
//             className="h-24 w-24 rounded-lg border border-border object-cover opacity-80 hover:opacity-100 cursor-pointer"
//           />
//         ))}
//       </div>
//     </motion.div>
//   );
// }

"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ProductGallery({ images }: { images: string[] }) {
  const [active, setActive] = useState(0);
  const fallback = "/images/placeholder.png";

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col gap-3"
    >
      {/* Main image */}
      <div className="relative rounded-xl border border-border bg-card overflow-hidden h-[340px] flex items-center justify-center">
        <span className="absolute top-3 left-3 text-xs font-medium px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
          In Stock
        </span>
        <img
          src={images?.[active] || fallback}
          alt="Product"
          className="max-h-[280px] max-w-full object-contain"
        />
      </div>

      {/* Thumbnails */}
      {images?.length > 1 && (
        <div className="flex gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-[72px] h-[72px] rounded-lg border flex items-center justify-center overflow-hidden flex-shrink-0 transition ${
                active === i
                  ? "border-accent"
                  : "border-border opacity-60 hover:opacity-100"
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}
