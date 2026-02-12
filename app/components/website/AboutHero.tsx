"use client";

import { motion } from "framer-motion";

export function AboutHero() {
  return (
    <section className="relative min-h-[70vh] bg-bg flex items-center">
      <div className="absolute inset-0 bg-accent/10 blur-3xl opacity-40" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold max-w-4xl"
        >
          Built on Reliability.
          <br />
          Driven by Precision.
        </motion.h1>

        <p className="mt-6 max-w-3xl text-muted text-lg">
          Global Technologies is a trusted supplier of elevator spare parts,
          supporting service companies, OEMs, and infrastructure projects with
          genuine components and technical clarity.
        </p>
      </div>
    </section>
  );
}
