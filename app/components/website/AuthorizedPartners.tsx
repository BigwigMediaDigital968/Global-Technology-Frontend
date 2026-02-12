"use client";

import { motion } from "framer-motion";

const partners = [
  "SHARP ENGINEERS",
  "ARKEL",
  "APSON MOTOR (INDIA) PVT. LTD.",
  "NESL",
  "GT",
];

export default function AuthorizedPartners() {
  return (
    <section className="relative py-28 bg-bg overflow-hidden">
      {/* ambient background lines */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px bg-accent"
            style={{ left: `${15 + i * 14}%` }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Authorized Distributor & Stockist
          </h2>
          <p className="mt-4 text-muted">
            We proudly represent globally trusted elevator technology brands,
            ensuring genuine parts, certified compatibility, and long-term
            reliability.
          </p>
        </motion.div>

        {/* Partner Cards */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {partners.map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="relative group"
            >
              {/* glow */}
              <div className="absolute inset-0 bg-accent/20 blur-2xl opacity-0 group-hover:opacity-100 transition" />

              {/* card */}
              <div className="relative h-full rounded-2xl border border-border bg-white/10 backdrop-blur-xl px-6 py-10 text-center shadow-xl">
                {/* elevator line */}
                <div className="mx-auto mb-6 h-12 w-px bg-accent" />

                <h3 className="text-sm font-semibold tracking-wide">{name}</h3>

                <p className="mt-4 text-xs text-muted">Authorized Partner</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
