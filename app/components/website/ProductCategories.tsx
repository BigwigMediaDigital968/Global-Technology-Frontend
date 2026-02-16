"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const categories = [
  {
    title: "Control Panels",
    desc: "Advanced elevator control & automation panels",
  },
  {
    title: "Door Operators",
    desc: "Smooth & reliable automatic door systems",
  },
  {
    title: "Traction Machines",
    desc: "High-performance elevator traction machines",
  },
  {
    title: "Safety Components",
    desc: "Brakes, governors & safety devices",
  },
  {
    title: "Push Buttons",
    desc: "Premium COP & LOP push button panels",
  },
  {
    title: "Cables & Belts",
    desc: "Durable steel ropes & flat belts",
  },
];

export default function ProductCategories() {
  const router = useRouter();

  return (
    <section className="relative bg-bg py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            Elevator <span className="text-accent">Spare Parts</span>
          </h2>
          <p className="mt-4 text-muted max-w-2xl mx-auto">
            Engineered for safety, durability, and smooth performance across all
            elevator types.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group relative rounded-xl border border-amber-100/50 hover:border-amber-100 bg-card p-8 shadow-card transition"
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition bg-metal-gradient" />

              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-3 group-hover:text-accent transition">
                  {item.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {item.desc}
                </p>

                <span
                  onClick={() => router.push("/user-login")}
                  className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent cursor-pointer transition-all duration-300 ease-out hover:text-amber-400 hover:scale-110"
                >
                  Explore
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center py-5">
          <span
            onClick={() => router.push("/collection")}
            className="mt-6 inline-flex items-center gap-1 border-2 px-3 py-2 text-sm font-medium text-accent cursor-pointer transition-all duration-300 ease-out hover:text-amber-400 hover:scale-110"
          >
            Explore Collections
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
