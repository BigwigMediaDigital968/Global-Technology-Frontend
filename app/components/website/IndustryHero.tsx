"use client";

import { motion } from "framer-motion";

export function IndustriesHero() {
  return (
    <section className="relative min-h-[70vh] bg-bg flex items-center overflow-hidden">
      {/* background glow */}
      <div className="absolute inset-0 bg-accent/10 blur-3xl opacity-40" />

      <div className="relative mx-auto max-w-7xl px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold"
        >
          Industries We Serve
        </motion.h1>

        <p className="mt-6 max-w-3xl mx-auto text-muted text-lg">
          From high-rise commercial buildings to critical industrial facilities,
          Global Technologies delivers certified elevator spare parts across
          diverse sectors.
        </p>
      </div>
    </section>
  );
}
