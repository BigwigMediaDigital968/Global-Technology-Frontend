"use client";

import { motion } from "framer-motion";

export default function ProductCard({ product }: any) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="rounded-2xl border border-border bg-white/5 backdrop-blur-xl overflow-hidden"
    >
      <img src={product.image} className="h-48 w-full object-cover" />

      <div className="p-5">
        <h3 className="font-semibold">{product.title}</h3>
        <button className="mt-4 text-sm text-accent hover:underline">
          View Details →
        </button>
      </div>
    </motion.div>
  );
}
