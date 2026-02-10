"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function StatCounter({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const increment = value / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(counter);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-xl border border-border bg-card p-6 text-center shadow-card"
    >
      <div className="text-4xl font-bold text-accent">{count}+</div>
      <p className="mt-2 text-sm text-muted uppercase tracking-wide">{label}</p>
    </motion.div>
  );
}
