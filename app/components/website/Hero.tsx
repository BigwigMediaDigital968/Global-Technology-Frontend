"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-[80vh] md:h-[80vh] w-full overflow-hidden bg-bg">
      <div className="absolute inset-0 z-0">
        <video
          className="h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        >
          <source src="/videos/elevator-video.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/50" />
      </div>

      <motion.div
        className="absolute inset-0 z-0 bg-metal-gradient opacity-30"
        animate={{ opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="pointer-events-none absolute inset-0 z-0 flex justify-around opacity-10">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-px bg-accent h-full"
            animate={{ y: ["-100%", "100%"] }}
            transition={{
              duration: 14 + i,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.25 } },
        }}
      >
        <motion.h1
          className="text-4xl font-bold tracking-tight sm:text-5xl md:text-7xl"
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          Global <span className="text-accent">Technologies</span>
        </motion.h1>

        <motion.div
          className="mx-auto mt-4 h-1 w-32 bg-accent"
          initial={{ width: 0 }}
          animate={{ width: 128 }}
          transition={{ duration: 1 }}
        />

        <motion.p
          className="mt-6 max-w-2xl text-base text-muted sm:text-lg md:text-xl"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          Premium Elevator Spare Parts Manufacturer & Supplier
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-6"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
        >
          <button className="rounded-md bg-accent px-8 py-4 font-semibold text-bg shadow-glow cursor-pointer transition hover:scale-105">
            Get Quote
          </button>

          <button className="rounded-md border border-accent px-8 py-4 text-accent transition cursor-pointer hover:bg-accent hover:text-bg">
            View Products
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
