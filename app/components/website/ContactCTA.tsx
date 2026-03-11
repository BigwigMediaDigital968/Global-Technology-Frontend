"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function ContactCTA() {
  return (
    <section className="py-20 bg-bg">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-14 items-center">
        {/* ================= LEFT CONTENT ================= */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative w-full h-[320px] md:h-[380px] lg:h-[420px] rounded-2xl overflow-hidden shadow-xl"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="h-full w-full"
          >
            <Image
              src="/industry/residential-buildings.png"
              alt="Elevator spare parts and components"
              fill
              sizes="(max-width:768px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        </motion.div>

        {/* ================= RIGHT IMAGE ================= */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-xl"
        >
          <h3 className="text-2xl md:text-3xl font-bold">
            Trusted by Service Providers Across Industries
          </h3>

          <p className="mt-4 text-muted text-xl">
            Reliable elevator spare parts. Transparent sourcing. Technical
            clarity.
          </p>

          {/* Additional Description */}
          <p className="mt-6 text-muted leading-relaxed">
            At Global Technologies, we supply high-quality elevator components
            trusted by maintenance companies, contractors, and building
            operators. Our solutions ensure long-term reliability, safety
            compliance, and seamless compatibility with modern lift systems.
            From landing door systems to advanced control components, every
            product is selected for performance and durability.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
