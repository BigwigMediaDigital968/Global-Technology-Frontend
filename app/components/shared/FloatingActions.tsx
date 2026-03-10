"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function FloatingActions() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const scrollProgress = (scrollTop / docHeight) * 100;
      setProgress(scrollProgress);
      setVisible(scrollTop > 200);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
      {/* 🔥 Scroll Progress + Top */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.8 }}
        className="relative group"
      >
        {/* Tooltip */}
        <motion.div
          initial={{ opacity: 0, x: 10, scale: 0.95 }}
          whileHover={{ opacity: 1, x: 0, scale: 1 }}
          className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-md bg-bg border border-white/20 px-3 py-1 text-xs font-medium text-text shadow-lg backdrop-blur"
        >
          {Math.round(progress)}% Scrolled
        </motion.div>

        {/* Button */}
        <button
          onClick={scrollToTop}
          className="relative h-12 w-12 rounded-full bg-bg/80 backdrop-blur cursor-pointer border border-white/20 shadow-lg flex items-center justify-center"
        >
          {/* Progress Ring */}
          <svg className="absolute inset-0 h-full w-full -rotate-90">
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="3"
              fill="none"
            />
            <motion.circle
              cx="24"
              cy="24"
              r="20"
              stroke="#fde687"
              strokeWidth="3"
              fill="none"
              strokeDasharray={2 * Math.PI * 20}
              strokeDashoffset={2 * Math.PI * 20 * (1 - progress / 100)}
              transition={{ ease: "easeOut", duration: 0.2 }}
            />
          </svg>

          {/* % Text */}
          <span className="relative z-10 text-xs font-semibold text-white">
            {Math.round(progress)}%
          </span>
        </button>
      </motion.div>

      {/* 💬 WhatsApp Button */}
      <motion.a
        href="https://wa.me/918750068007"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="h-14 w-14 rounded-full bg-amber-200 flex items-center justify-center shadow-xl"
      >
        <MessageCircle className="h-6 w-6 text-black" />
      </motion.a>
    </div>
  );
}
