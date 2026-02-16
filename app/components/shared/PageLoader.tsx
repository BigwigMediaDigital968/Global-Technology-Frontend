"use client";

import { motion } from "framer-motion";

export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-bg">
      {/* Elevator shaft lines */}
      <div className="absolute inset-0 flex justify-around opacity-10">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-px bg-accent h-full"
            animate={{ y: ["-100%", "100%"] }}
            transition={{
              duration: 1.8 + i * 0.2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Center Loader */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 flex flex-col items-center"
      >
        <motion.div
          className="h-14 w-14 rounded-full border-4 border-accent border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />

        <p className="mt-6 text-sm tracking-widest text-muted">
          LOADING CONTENT
        </p>
      </motion.div>
    </div>
  );
}
