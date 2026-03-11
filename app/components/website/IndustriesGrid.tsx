"use client";

import { motion } from "framer-motion";

const industries = [
  {
    title: "Residential Buildings",
    image: "/industry/residential-buildings.png",
    desc: "Reliable elevator components for apartments, societies & towers.",
  },
  {
    title: "Commercial Offices",
    image: "/industry/commercial-complex.png",
    desc: "High-performance parts for corporate & IT buildings.",
  },
  {
    title: "Hospitals & Healthcare",
    image: "/industry/hospital-healthcare.png",
    desc: "Precision & safety-focused elevator spares for healthcare.",
  },
  {
    title: "Hotels & Hospitality",
    image: "/industry/hotels-hospitality.png",
    desc: "Silent, smooth, and reliable elevator solutions.",
  },
  {
    title: "Shopping Malls",
    image: "/industry/shopping-mall.png",
    desc: "High-traffic handling elevator components.",
  },
  {
    title: "Manufacturing Units",
    image: "/industry/industrial-lift.png",
    desc: "Industrial-grade lift spare parts.",
  },
  {
    title: "Warehouses & Logistics",
    image: "/industry/warehouse-lifts.png",
    desc: "Heavy-duty elevator & freight lift parts.",
  },
  {
    title: "Airports & Metro Stations",
    image: "/industry/airport-lifts.png",
    desc: "Mission-critical public infrastructure solutions.",
  },
  {
    title: "Educational Institutions",
    image: "/industry/educational-buildings.png",
    desc: "Safe & durable elevator systems for campuses.",
  },
];

export function IndustriesGrid() {
  return (
    <section className="py-10 bg-bg">
      <div className="mx-auto max-w-7xl px-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="group relative overflow-hidden rounded-2xl border border-amber-300/50 bg-white/5 backdrop-blur-xl"
          >
            {/* image */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* content */}
            <div className="p-6">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
