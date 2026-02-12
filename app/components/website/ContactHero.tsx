"use client";

import { motion } from "framer-motion";

export function ContactHero() {
  return (
    <section className="relative min-h-[60vh] bg-bg flex items-center">
      <div className="absolute inset-0 bg-accent/10 blur-3xl opacity-40" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold max-w-4xl"
        >
          Let’s Discuss Your
          <br /> Elevator Requirements
        </motion.h1>

        <p className="mt-6 max-w-3xl text-muted text-lg">
          From product compatibility to bulk pricing and technical guidance, our
          team is ready to assist you.
        </p>
      </div>
    </section>
  );
}
