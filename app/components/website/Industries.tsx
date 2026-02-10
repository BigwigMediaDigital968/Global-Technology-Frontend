"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const industries = [
  {
    title: "Residential Buildings",
    description:
      "Safe, smooth, and reliable elevator solutions for modern homes.",
    bgImage:
      "https://yapita-production.s3.ap-south-1.amazonaws.com/uploads/facility/seo_image/03060920-69f3-4d09-b224-5a2940884d52/file.webp",
  },
  {
    title: "Commercial Complexes",
    description:
      "High-capacity elevators built for heavy footfall and efficiency.",
    bgImage:
      "https://yapita-production.s3.ap-south-1.amazonaws.com/uploads/facility/seo_image/03060920-69f3-4d09-b224-5a2940884d52/file.webp",
  },
  {
    title: "Hospitals & Healthcare",
    description: "Precision elevators designed for patient safety and hygiene.",
    bgImage:
      "https://yapita-production.s3.ap-south-1.amazonaws.com/uploads/facility/seo_image/03060920-69f3-4d09-b224-5a2940884d52/file.webp",
  },
  {
    title: "Hotels & Hospitality",
    description: "Premium elevator experiences for comfort and luxury.",
    bgImage:
      "https://yapita-production.s3.ap-south-1.amazonaws.com/uploads/facility/seo_image/03060920-69f3-4d09-b224-5a2940884d52/file.webp",
  },
  {
    title: "Industrial Plants",
    description: "Heavy-duty elevators for demanding industrial environments.",
    bgImage:
      "https://yapita-production.s3.ap-south-1.amazonaws.com/uploads/facility/seo_image/03060920-69f3-4d09-b224-5a2940884d52/file.webp",
  },
  {
    title: "Shopping Malls",
    description: "Fast and durable elevator systems for retail spaces.",
    bgImage:
      "https://yapita-production.s3.ap-south-1.amazonaws.com/uploads/facility/seo_image/03060920-69f3-4d09-b224-5a2940884d52/file.webp",
  },
  {
    title: "Corporate Offices",
    description: "Smart elevators for seamless vertical mobility.",
    bgImage:
      "https://yapita-production.s3.ap-south-1.amazonaws.com/uploads/facility/seo_image/03060920-69f3-4d09-b224-5a2940884d52/file.webp",
  },
];

// Duplicate list for seamless loop
const marqueeItems = [...industries, ...industries];

export default function Industries() {
  const controls = useAnimation();

  const startAnimation = () => {
    controls.start({
      x: "-50%",
      transition: {
        duration: 30,
        ease: "linear",
        repeat: Infinity,
      },
    });
  };

  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <section className="relative bg-bg py-10 overflow-hidden">
      {/* Header */}
      <div className="mb-14 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          Industries <span className="text-accent">We Serve</span>
        </h2>
        <p className="mt-4 text-muted max-w-2xl mx-auto">
          Delivering reliable elevator solutions across diverse industries with
          strict quality and safety standards.
        </p>
      </div>

      {/* Marquee */}
      <div
        className="overflow-hidden"
        onMouseEnter={() => controls.stop()}
        onMouseLeave={startAnimation}
      >
        <motion.div
          className="flex gap-6 px-6 w-max"
          animate={controls}
          drag="x"
          dragConstraints={{ left: -800, right: 0 }}
        >
          {marqueeItems.map((item, i) => (
            <div
              key={i}
              className="relative min-w-[320px] h-55 rounded-xl overflow-hidden shadow-card"
              style={{
                backgroundImage: `url(${item.bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Black Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 p-5 text-white">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-white/80 mt-1 max-w-65">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Gradient fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-bg to-transparent" />
    </section>
  );
}
