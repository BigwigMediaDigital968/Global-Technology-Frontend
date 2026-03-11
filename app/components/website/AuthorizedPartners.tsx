"use client";

import { motion } from "framer-motion";

const partners = [
  { name: "SHARP ENGINEERS", logo: "/sharp-logo.jpg" },
  { name: "ARKEL", logo: "/logotype-dark.png" },
  { name: "APSON MOTOR", logo: "/apson.png" },
  { name: "NBSL", logo: "/nbsl.jpeg" },
  { name: "MARAZZI", logo: "/logo-marazzi.jpg" },
];

export default function AuthorizedPartners() {
  const loopPartners = [...partners, ...partners];

  return (
    <section className="relative md:py-14 bg-bg overflow-hidden">
      {/* Background vertical lines */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px bg-accent"
            style={{ left: `${15 + i * 14}%` }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Authorized Distributor & Stockist
          </h2>

          <p className="mt-4 text-muted">
            We proudly represent globally trusted elevator technology brands,
            ensuring genuine parts, certified compatibility, and long-term
            reliability.
          </p>
        </motion.div>

        {/* Infinite Marquee Slider */}

        <div className="relative mt-14 overflow-hidden py-5">
          <motion.div
            className="flex gap-10"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 25,
            }}
          >
            {loopPartners.map((partner, i) => (
              <motion.div
                key={i}
                whileHover={{
                  y: -10,
                  scale: 1.05,
                }}
                className="relative group min-w-[220px]"
              >
                {/* Glow */}
                <div className="absolute inset-0 bg-accent/20 blur-2xl opacity-0 group-hover:opacity-100 transition duration-500" />

                {/* Card */}
                <div className="relative h-40 rounded-2xl border border-border bg-white shadow-xl overflow-hidden flex items-center justify-center">
                  {/* Light sweep animation */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-12 group-hover:animate-[shine_1.2s]" />
                  </div>

                  {/* Logo */}
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-12 object-contain transition duration-500 group-hover:scale-110 group-hover:opacity-10"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 opacity-0 group-hover:opacity-100 transition duration-500">
                    <h3 className="text-lg font-semibold tracking-wide text-black">
                      {partner.name}
                    </h3>

                    <p className="text-sm text-black mt-1">
                      Authorized Partner
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Shine animation */}
      <style jsx>{`
        @keyframes shine {
          0% {
            left: -100%;
          }
          100% {
            left: 200%;
          }
        }
      `}</style>
    </section>
  );
}
