"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ProductCard({
  name,
  category,
}: {
  name: string;
  category: string;
}) {
  const router = useRouter();
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group rounded-xl border border-border bg-card p-6 shadow-card transition"
    >
      {/* Placeholder image */}
      <div className="mb-4 h-40 rounded-lg bg-black/40 flex items-center justify-center text-muted text-sm">
        Product Image
      </div>

      <h3 className="font-semibold mb-1 group-hover:text-accent transition">
        {name}
      </h3>

      <p className="text-xs text-muted mb-4">Category: {category}</p>

      <button
        onClick={() => router.push("/user-login")}
        className="w-full rounded-md cursor-pointer text-black border-amber-200/40 bg-amber-200 border border-accent py-2 text-sm text-accent hover:bg-accent hover:text-bg transition"
      >
        Get Quote
      </button>
    </motion.div>
  );
}
