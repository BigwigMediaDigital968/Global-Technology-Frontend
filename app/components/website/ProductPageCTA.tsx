"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ProductPageCTA() {
  const router = useRouter();
  return (
    <section className="bg-bg py-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-4xl px-6 text-center"
      >
        <h2 className="text-3xl font-bold">
          Need Help Choosing the Right Product?
        </h2>
        <p className="mt-4 text-muted">
          Our technical team is ready to assist you with specifications,
          compatibility, and bulk requirements.
        </p>

        <button
          onClick={() => router.push("/contact")}
          className="mt-8 rounded-md bg-accent border-2 cursor-pointer px-10 py-4 font-semibold text-bg shadow-glow hover:scale-105 transition"
        >
          Contact Sales Team
        </button>
      </motion.div>
    </section>
  );
}
