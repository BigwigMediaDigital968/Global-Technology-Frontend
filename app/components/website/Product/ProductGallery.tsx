"use client";

import { motion } from "framer-motion";

const images = ["/products/p1.jpg", "/products/p2.jpg", "/products/p3.jpg"];

export default function ProductGallery() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-4"
    >
      <img
        src={images[0]}
        className="rounded-2xl border border-border object-cover"
      />

      <div className="flex gap-4">
        {images.map((img) => (
          <img
            key={img}
            src={img}
            className="h-24 w-24 rounded-lg border border-border object-cover opacity-80 hover:opacity-100 cursor-pointer"
          />
        ))}
      </div>
    </motion.div>
  );
}
