"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MobileMenu from "./MobileMenu";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
        transition={{ duration: 0.5 }}
        className={`fixed top-0 z-50 w-full transition-all ${
          scrolled
            ? "bg-bg/90 backdrop-blur border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:py-5">
          {/* ✅ Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/global-tech-logo.png"
              alt="Global Technologies Logo"
              width={scrolled ? 40 : 50}
              height={40}
              priority
              className="object-contain transition-all duration-300"
            />

            {/* Optional Text Logo */}
            <span className="text-white font-semibold">
              Global <span className="text-accent">Technologies</span>
            </span>
          </Link>

          {/* ✅ Desktop Menu */}
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.label} className="relative group">
                <Link
                  href={item.href}
                  className="text-sm uppercase tracking-wider text-white/70 hover:text-white transition"
                >
                  {item.label}
                </Link>

                {/* Hover underline */}
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-amber-200 transition-all duration-300 group-hover:w-full" />
              </li>
            ))}

            {/* CTA */}
            <Link
              href="/contact"
              className="ml-4 rounded-md bg-amber-200 px-5 py-2 text-sm font-semibold text-black shadow-lg transition hover:scale-105 border border-white/30"
            >
              Get Quote
            </Link>
          </ul>

          {/* ✅ Mobile Toggle */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden z-50 p-2 text-white cursor-pointer"
            aria-label="Open menu"
          >
            <MenuIcon size={26} />
          </button>
        </nav>
      </motion.header>

      {/* ✅ Mobile Menu */}
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
