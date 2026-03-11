"use client";

import { motion } from "framer-motion";

export function AboutPromise() {
  return (
    <section className="py-24 bg-bg overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* LEFT IMAGE */}

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* decorative background shape */}
          <div className="absolute -top-6 -left-6 w-full h-full bg-accent/20 rounded-3xl blur-2xl"></div>

          <img
            src="/trusted-gt.png"
            alt="Global Technologies Trust image"
            className="relative rounded-3xl shadow-2xl w-[90%] border border-amber-200 object-cover"
          />
        </motion.div>

        {/* RIGHT CONTENT */}

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            Why Clients Trust Global Technologies
          </h2>

          <ul className="mt-10 space-y-5">
            {[
              "Transparent product sourcing",
              "Industry-compliant components",
              "Practical technical guidance",
              "Consistent availability & supply",
              "Long-term vendor relationships",
            ].map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ x: 6 }}
                className="flex items-start gap-3 text-muted cursor-pointer"
              >
                <span className="text-accent text-lg">✔</span>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
