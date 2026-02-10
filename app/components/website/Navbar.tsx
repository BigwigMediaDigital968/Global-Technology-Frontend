"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MobileMenu from "./MobileMenu";
import { MenuIcon } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 z-30 w-full transition-all ${
          scrolled
            ? "bg-bg/90 backdrop-blur border-b border-amber-100/20"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          {/* Logo */}
          <a href="/" className="text-xl font-bold tracking-wide">
            Global <span className="text-accent">Technologies</span>
          </a>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.label} className="relative group">
                <a
                  href={item.href}
                  className="text-sm uppercase tracking-wider text-muted hover:text-text transition"
                >
                  {item.label}
                </a>

                {/* Hover underline */}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </li>
            ))}

            {/* CTA */}
            <a
              href="/contact"
              className="ml-4 rounded-md bg-accent px-5 py-2 text-sm font-semibold text-bg shadow-glow transition hover:scale-105 border-2"
            >
              Get Quote
            </a>

            <a
              href="/login"
              className="ml-4 rounded-md bg-accent px-5 py-2 text-sm font-semibold text-black bg-amber-200 shadow-glow transition hover:scale-105 border-2 border-white/50"
            >
              Login
            </a>
          </ul>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden relative z-40 flex flex-col gap-1 cursor-pointer"
            aria-label="Open menu"
          >
            <MenuIcon />
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
