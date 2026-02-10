"use client";

import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.aside
            className="fixed right-0 top-0 z-60 h-full w-72 bg-bg border-l border-border p-6"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <button
              onClick={onClose}
              className="mb-8 text-muted hover:text-text border-2 px-2 cursor-pointer"
            >
              ✕
            </button>

            <ul className="space-y-6">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={onClose}
                    className="block text-lg font-medium text-text hover:text-accent transition"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="/contact"
              onClick={onClose}
              className="mt-10 block rounded-md bg-accent py-3 font-semibold text-center text-bg shadow-glow border-2"
            >
              Get Quote
            </a>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
