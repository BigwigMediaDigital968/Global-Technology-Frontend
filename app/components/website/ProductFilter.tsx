"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

interface Props {
  categories: string[];
  active: string;
  onChange: (value: string) => void;
}

export default function ProductFilter({ categories, active, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const select = (cat: string) => {
    onChange(cat);
    setOpen(false);
    setQuery("");

    const el = document.getElementById("product-grid");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const filtered = categories.filter((c) =>
    c.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="sticky top-20 z-30 bg-bg/80 backdrop-blur border-y border-border">
      <div className="mx-auto max-w-7xl px-6 py-4">
        {/* Desktop Pills */}
        <div className="hidden md:flex gap-3 flex-wrap justify-center">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => select(cat)}
              whileTap={{ scale: 0.95 }}
              className={`rounded-full px-5 py-2 text-sm transition cursor-pointer ${
                active === cat
                  ? "bg-amber-200 text-black border border-amber-200/40"
                  : "border border-border text-muted hover:text-text"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Mobile */}
        <div className="md:hidden space-y-3">
          <button
            onClick={() => setOpen(!open)}
            className="w-full flex items-center justify-between rounded-xl px-4 py-3 border border-border bg-white/10 backdrop-blur-xl"
          >
            <span className="text-sm font-medium">{active}</span>
            {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="rounded-xl border border-border bg-white/10 backdrop-blur-xl shadow-xl overflow-hidden"
              >
                {/* Search */}
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
                      key={cat}
                      onClick={() => select(cat)}
                      className={`w-full px-4 py-3 text-sm text-left transition ${
                        active === cat
                          ? "bg-accent text-bg"
                          : "hover:bg-white/10"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
