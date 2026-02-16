"use client";

import { motion } from "framer-motion";

export default function ProductInfo() {
  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
      <h1 className="text-3xl font-bold">Elevator Control Panel – GT Series</h1>

      <p className="mt-4 text-muted">
        High-performance elevator control panel designed for commercial and
        residential applications.
      </p>

      <ul className="mt-6 space-y-2 text-sm text-muted">
        <li>✔ Compatible with multiple elevator systems</li>
        <li>✔ Industry safety compliant</li>
        <li>✔ Long operational lifespan</li>
        <li>✔ Easy installation & maintenance</li>
      </ul>

      <button className="mt-8 px-8 py-4 bg-accent text-bg rounded-lg shadow-glow hover:scale-105 transition">
        Request Quote
      </button>
    </motion.div>
  );
}
