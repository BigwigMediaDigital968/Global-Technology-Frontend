"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const images = [
  "/industry/residential-buildings.png",
  "/industry/shopping-mall.png",
  "/industry/industrial-lift.png",
  "/industry/hospital-healthcare.png",
];

const orbitFeatures = ["Hospitals", "Commercial", "Industrial", "Hotels"];

export function IndustriesContent() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-32 md:py-24 bg-bg overflow-hidden mt-10">
      <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* LEFT SIDE SOLAR SYSTEM */}

        <div className="relative flex items-center justify-center">
          {/* glowing pulse circle */}

          <div className="absolute w-[420px] h-[420px] rounded-full border-2 border-amber-200 animate-pulse"></div>

          {/* rotating orbit container */}

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            className="absolute w-[420px] h-[420px] border-2 border-amber-200"
          >
            {orbitFeatures.map((item, i) => {
              const angle = (i / orbitFeatures.length) * 360;

              return (
                <div
                  key={i}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    transform: `rotate(${angle}deg) translate(200px) rotate(-${angle}deg)`,
                  }}
                >
                  {/* <div className="bg-white shadow-lg rounded-full px-4 py-2 text-xs font-medium">
                    {item}
                  </div> */}
                </div>
              );
            })}
          </motion.div>

          {/* CENTER GIF IMAGE */}

          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-[360px] h-[360px] rounded-full overflow-hidden shadow-2xl border-4 border-amber-200"
          >
            <img
              src={images[index]}
              className="w-full h-full object-cover"
              alt="industry"
            />
          </motion.div>
        </div>

        {/* RIGHT SIDE CONTENT */}

        <div className="space-y-10">
          <h2 className="text-3xl md:text-4xl font-bold">
            Engineered for Every Environment
          </h2>

          <p className="text-muted">
            Each industry demands specific safety standards, load capacities,
            operational frequencies, and compliance requirements. Our wide range
            of elevator spare parts is selected to match these precise needs.
          </p>

          <ul className="grid gap-6 sm:grid-cols-2">
            <li>✔ Fire-rated elevator components for hospitals</li>
            <li>✔ High-speed lift spares for commercial towers</li>
            <li>✔ Heavy-load traction systems for industrial use</li>
            <li>✔ Silent operation systems for hospitality</li>
            <li>✔ Long-life control panels for high traffic areas</li>
            <li>✔ Government-approved safety components</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
