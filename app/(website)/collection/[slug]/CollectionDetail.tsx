"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
interface CollectionProps {
  collection: {
    name: string;
    description: string;
    image: string;
    highlights: string[];
  };
  products: {
    id: string;
    name: string;
    images: string[];
    slug: string;
  }[];
}

/* ─────────────────────────────────────────────
   REUSABLE: FADE-UP ON SCROLL
───────────────────────────────────────────── */
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   REUSABLE: PRODUCT CARD
───────────────────────────────────────────── */
function ProductCard({
  product,
  index,
}: {
  product: CollectionProps["products"][0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative flex flex-col rounded-2xl border border-amber-200 bg-bg overflow-hidden shadow-sm hover:shadow-xl hover:border-accent/40 transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative h-52 sm:h-60 overflow-hidden bg-muted/10">
        <Image
          src={product.images?.[0] || "/images/placeholder.jpg"}
          alt={product.name || "Product image"}
          fill
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-4">
        <h3 className="font-semibold text-text leading-snug line-clamp-2 group-hover:text-accent transition-colors duration-200">
          {product.name}
        </h3>

        {/* Actions */}
        <div className="mt-auto flex items-center gap-3">
          {/* <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:gap-2.5 transition-all duration-200"
          >
            View Product
            <span aria-hidden className="text-base">
              →
            </span>
          </Link> */}

          <Link
            href={`/contact?product=${product.slug}`}
            className="ml-auto inline-flex items-center gap-1.5 text-sm font-semibold bg-accent text-bg px-4 py-2 rounded-lg hover:brightness-110 active:scale-95 transition-all duration-200 shadow-sm border hover:bg-amber-200 hover:text-black"
          >
            Inquiry
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function CollectionDetail({
  collection,
  products,
}: CollectionProps) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Parallax effect on hero image
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className="bg-bg text-text overflow-x-hidden">
      {/* ══════════════════════════════════════
          HERO — PARALLAX
      ══════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative h-[55vh] sm:h-[65vh] lg:h-[75vh] overflow-hidden"
      >
        {/* Parallax image */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 scale-110">
          <Image
            src={collection.image}
            alt={collection.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>

        {/* Layered overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />

        {/* Decorative accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-0 left-0 h-[3px] w-full bg-accent origin-left"
        />

        {/* Hero content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 flex h-full items-end justify-start px-4 sm:px-6 lg:px-36 pb-12 sm:pb-16"
        >
          <div className="max-w-3xl">
            {/* Label */}
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-accent mb-4 border border-accent/40 px-3 py-1 rounded-full"
            >
              Collection
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
            >
              {collection.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-4 text-white/75 text-sm sm:text-base lg:text-lg max-w-xl leading-relaxed line-clamp-3"
            >
              {collection.description}
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════ */}
      <FadeUp>
        <section className="border-border bg-bg/80 backdrop-blur-sm p-2">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-wrap items-center justify-between gap-4 border mt-10 rounded-2xl border-amber-200">
            <div className="flex items-center gap-6 sm:gap-10 flex-wrap">
              <div className="text-center">
                <p className="text-2xl font-bold text-accent">
                  {products.length}+
                </p>
                <p className="text-xs text-muted mt-0.5 uppercase tracking-widest">
                  Products
                </p>
              </div>
              <div className="w-px h-8 bg-border hidden sm:block" />
              <div className="text-center">
                <p className="text-2xl font-bold text-accent">
                  {collection.highlights.length}
                </p>
                <p className="text-xs text-muted mt-0.5 uppercase tracking-widest">
                  Key Features
                </p>
              </div>
              <div className="w-px h-8 bg-border hidden sm:block" />
              <div className="text-center">
                <p className="text-2xl font-bold text-accent">CE</p>
                <p className="text-xs text-muted mt-0.5 uppercase tracking-widest">
                  Certified
                </p>
              </div>
            </div>

            <Link
              href="/contact"
              className="text-sm font-semibold text-accent border border-accent/40 hover:bg-accent hover:text-bg px-5 py-2.5 rounded-lg transition-all duration-200"
            >
              Get a Quote →
            </Link>
          </div>
        </section>
      </FadeUp>

      {/* ══════════════════════════════════════
          ABOUT / HIGHLIGHTS
      ══════════════════════════════════════ */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">
            {/* Left: highlights */}
            <FadeUp>
              <div>
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">
                  Why This Collection
                </span>
                <h2 className="mt-3 text-3xl sm:text-4xl font-bold leading-tight">
                  Built for Performance,
                  <br className="hidden sm:block" /> Trusted by Industry
                </h2>
                <p className="mt-5 text-muted leading-relaxed max-w-lg">
                  {collection.description}
                </p>

                <ul className="mt-10 space-y-5">
                  {collection.highlights.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="flex items-start gap-4 group"
                    >
                      {/* Icon */}
                      <span className="mt-0.5 flex-shrink-0 h-6 w-6 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center group-hover:bg-accent transition-colors duration-200">
                        <svg
                          className="w-3 h-3 text-accent group-hover:text-bg transition-colors duration-200"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                      <span className="text-text/85 leading-snug">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </FadeUp>

            {/* Right: image with decorative frame */}
            <FadeUp delay={0.15}>
              <div className="relative">
                {/* Decorative bg shape */}
                <div className="absolute -inset-4 rounded-3xl bg-accent/5 border border-accent/10 -z-10" />
                <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full bg-accent/10 blur-2xl -z-10" />

                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl">
                  <Image
                    src={collection.image || "/images/placeholder.jpg"}
                    alt={collection.name || "Collection"}
                    fill
                    sizes="(max-width:1024px) 100vw, 50vw"
                    className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle inner shadow */}
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />
                </div>

                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5, ease: "backOut" }}
                  className="absolute -bottom-5 -left-5 bg-bg border border-border bg-amber-600 rounded-xl px-4 py-3 shadow-xl flex items-center gap-3 ms-3"
                >
                  <div className="h-9 w-9 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-accent"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-text">
                      Certified Quality
                    </p>
                    <p className="text-xs text-muted">TSG · CE · EAC</p>
                  </div>
                </motion.div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          PRODUCTS GRID
      ══════════════════════════════════════ */}
      <section className="py-16 sm:py-20 bg-muted/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <FadeUp className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">
              Product Lineup
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold">
              Products in This Collection
            </h2>
            <p className="mt-4 text-muted">
              Explore our curated range of certified components engineered for
              modern lift systems.
            </p>
          </FadeUp>

          {/* Grid */}
          {products.length > 0 ? (
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          ) : (
            <FadeUp delay={0.2}>
              <div className="mt-14 text-center py-20 rounded-2xl border border-dashed border-border">
                <p className="text-muted text-sm">
                  No products in this collection yet.
                </p>
              </div>
            </FadeUp>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA
      ══════════════════════════════════════ */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl" />
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-accent/5 blur-2xl" />
        </div>

        <FadeUp className="text-center px-4 sm:px-6">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">
            Let's Work Together
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold max-w-xl mx-auto leading-tight">
            Need Technical Assistance?
          </h2>
          <p className="mt-5 text-muted max-w-md mx-auto leading-relaxed">
            Talk to our elevator specialists to find the right components for
            your project.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-accent text-bg px-8 py-4 font-semibold shadow-lg hover:brightness-110 hover:scale-105 active:scale-95 transition-all duration-200 hover:border hover:rounded-xl hover:border-amber-200"
            >
              Contact Sales Team
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>

            <Link
              href="/collections"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-border text-text px-8 py-4 font-medium hover:border-accent/50 hover:text-accent transition-all duration-200 hover:bg-amber-200 hover:text-black"
            >
              Browse All Collections
            </Link>
          </div>
        </FadeUp>
      </section>
    </main>
  );
}
