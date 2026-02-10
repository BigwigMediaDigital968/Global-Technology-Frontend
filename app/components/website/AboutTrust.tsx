"use client";

import { motion } from "framer-motion";
import StatCounter from "./StatCounter";

const partners = ["SHARP ENGINEERS", "ARKEL", "APSON", "NESL", "GT"];

export default function AboutTrust() {
  return (
    <section className="relative bg-bg py-10">
      <div className="mx-auto max-w-7xl px-6 grid gap-16 lg:grid-cols-2 items-center">
        {/* ABOUT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            About <span className="text-accent">Global Technologies</span>
          </h2>

          <p className="mt-6 text-muted leading-relaxed">
            Global Technologies is a trusted name in the elevator industry,
            specializing in the supply of premium-quality elevator spare parts.
            We work closely with OEMs, builders, and elevator service companies
            to deliver reliable, certified, and performance-driven components.
          </p>

          <p className="mt-4 text-muted leading-relaxed">
            We are an{" "}
            <span className="text-text font-medium">
              Authorized Distributor & Stockist
            </span>{" "}
            for industry-leading brands, ensuring authenticity, technical
            support, and consistent availability of critical elevator
            components.
          </p>

          {/* Authorized Brands */}
          <div className="mt-8">
            <h4 className="mb-4 font-semibold uppercase tracking-wide text-sm">
              Authorized Distributor / Stockist
            </h4>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {partners.map((brand) => (
                <div
                  key={brand}
                  className="rounded-lg border border-border bg-card px-4 py-3 text-center text-sm text-muted hover:text-accent transition"
                >
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* TRUST STATS */}
        <div className="grid grid-cols-2 gap-6">
          <StatCounter value={20} label="Years of Experience" />
          <StatCounter value={5000} label="Products Supplied" />
          <StatCounter value={300} label="B2B Clients" />
          <StatCounter value={25} label="Cities Served" />
        </div>
      </div>
    </section>
  );
}
