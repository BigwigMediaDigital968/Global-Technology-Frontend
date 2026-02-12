"use client";

import { motion } from "framer-motion";

const industries = [
  {
    title: "Residential Buildings",
    image: "/industries/residential.jpg",
    desc: "Reliable elevator components for apartments, societies & towers.",
  },
  {
    title: "Commercial Offices",
    image: "/industries/commercial.jpg",
    desc: "High-performance parts for corporate & IT buildings.",
  },
  {
    title: "Hospitals & Healthcare",
    image: "/industries/hospital.jpg",
    desc: "Precision & safety-focused elevator spares for healthcare.",
  },
  {
    title: "Hotels & Hospitality",
    image: "/industries/hotel.jpg",
    desc: "Silent, smooth, and reliable elevator solutions.",
  },
  {
    title: "Shopping Malls",
    image: "/industries/mall.jpg",
    desc: "High-traffic handling elevator components.",
  },
  {
    title: "Manufacturing Units",
    image: "/industries/factory.jpg",
    desc: "Industrial-grade lift spare parts.",
  },
  {
    title: "Warehouses & Logistics",
    image: "/industries/warehouse.jpg",
    desc: "Heavy-duty elevator & freight lift parts.",
  },
  {
    title: "Airports & Metro Stations",
    image: "/industries/airport.jpg",
    desc: "Mission-critical public infrastructure solutions.",
  },
  {
    title: "Educational Institutions",
    image: "/industries/school.jpg",
    desc: "Safe & durable elevator systems for campuses.",
  },
  {
    title: "Government Buildings",
    image: "/industries/government.jpg",
    desc: "Certified & compliant elevator spare parts.",
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
            className="group relative overflow-hidden rounded-2xl border border-border bg-white/5 backdrop-blur-xl"
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
