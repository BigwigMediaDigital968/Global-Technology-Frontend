"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

const categories = [
  { name: "All", count: 48 },
  { name: "Control Panels", count: 12 },
  { name: "Door Operators", count: 8 },
  { name: "Traction Machines", count: 6 },
  { name: "Safety Components", count: 10 },
  { name: "Push Buttons", count: 7 },
  { name: "Cables & Belts", count: 5 },
];

export default function ProductFilter({
  onChange,
}: {
  onChange: (value: string) => void;
}) {
  const [active, setActive] = useState("All");
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const select = (cat: string) => {
    setActive(cat);
    onChange(cat);
    setOpen(false);
    setQuery("");

    // 🎯 Auto scroll to product grid
    const el = document.getElementById("product-grid");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="sticky top-20 z-30 bg-bg/80 backdrop-blur border-y border-border">
      <div className="mx-auto max-w-7xl px-6 py-4">
        {/* 🖥 Desktop Pills */}
        <div className="hidden md:flex gap-3 flex-wrap justify-center">
          {categories.map((cat) => (
            <motion.button
              key={cat.name}
              onClick={() => select(cat.name)}
              whileTap={{ scale: 0.95 }}
              className={`rounded-full px-5 py-2 text-sm transition ${
                active === cat.name
                  ? "bg-accent text-black border border-amber-200/40 bg-amber-200"
                  : "border border-border text-muted hover:text-text"
              }`}
            >
              {cat.name} ({cat.count})
            </motion.button>
          ))}
        </div>

        {/* 📱 Mobile Dropdown (IN LAYOUT) */}
        <div className="md:hidden space-y-3">
          {/* Select Button */}
          <button
            onClick={() => setOpen(!open)}
            className="w-full flex items-center justify-between rounded-xl px-4 py-3 border border-border bg-white/10 backdrop-blur-xl"
          >
            <span className="text-sm font-medium">{active}</span>
            {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          {/* Dropdown Panel */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="rounded-xl border border-border bg-white/10 backdrop-blur-xl shadow-xl overflow-hidden"
              >
                {/* 🔍 Search */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
                  <Search size={16} className="opacity-60" />
                  <input
                    placeholder="Search category..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full bg-transparent outline-none text-sm"
                  />
                </div>

                {/* Category List */}
                <div className="max-h-64 overflow-y-auto">
                  {filtered.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => select(cat.name)}
                      className={`w-full px-4 py-3 flex justify-between text-sm transition ${
                        active === cat.name
                          ? "bg-accent text-bg"
                          : "hover:bg-white/10"
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="opacity-70">{cat.count}</span>
                    </button>
                  ))}

                  {filtered.length === 0 && (
                    <div className="px-4 py-3 text-sm opacity-60">
                      No categories found
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
