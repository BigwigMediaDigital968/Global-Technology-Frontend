"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function LeadCTA() {
  return (
    <section className="relative bg-bg py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 rounded-2xl border border-accent/30 bg-white/5 backdrop-blur-xl p-10 md:p-14 shadow-glow"
        >
          {/* Left Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative w-full h-80 md:h-full rounded-xl overflow-hidden"
          >
            <Image
              src="/images/elevator-cta.jpg" // replace with your image
              alt="Elevator Solutions"
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Right Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">
              Get a <span className="text-accent">Quick Quote</span>
            </h2>

            <p className="mt-4 text-muted max-w-xl">
              Share your requirement and our team will contact you with the best
              solution for your elevator needs.
            </p>

            <form className="mt-8 grid gap-6 md:grid-cols-2">
              <input
                className="rounded-md bg-bg/70 border border-border px-4 py-3 outline-none focus:border-accent"
                placeholder="Full Name"
              />
              <input
                className="rounded-md bg-bg/70 border border-border px-4 py-3 outline-none focus:border-accent"
                placeholder="Company Name"
              />
              <input
                className="rounded-md bg-bg/70 border border-border px-4 py-3 outline-none focus:border-accent"
                placeholder="Phone Number"
              />
              <input
                className="rounded-md bg-bg/70 border border-border px-4 py-3 outline-none focus:border-accent"
                placeholder="Email Address"
              />

              <textarea
                className="md:col-span-2 rounded-md bg-bg/70 border border-border px-4 py-3 outline-none focus:border-accent"
                placeholder="Product Requirement"
                rows={4}
              />

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="mt-2 w-full rounded-md bg-accent cursor-pointer border-2 px-10 py-4 font-semibold text-bg shadow-glow transition hover:scale-[1.03]"
                >
                  Submit Requirement
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
