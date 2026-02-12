"use client";

import { motion } from "framer-motion";

export default function ProductHero() {
  return (
    <section className="relative bg-bg pt-36 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-7xl px-6 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold">
          Elevator <span className="text-accent">Spare Parts</span>
        </h1>
        <p className="mt-4 text-muted max-w-2xl mx-auto">
          Complete range of certified elevator components sourced from
          authorized manufacturers and OEM partners.
        </p>
      </motion.div>
    </section>
  );
}
