"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface CollectionProps {
  collection: {
    name: string;
    description: string;
    banner: string;
    highlights: string[];
  };
  products: {
    id: number;
    name: string;
    image: string;
    slug: string;
  }[];
}

export default function CollectionDetail({
  collection,
  products,
}: CollectionProps) {
  return (
    <main className="bg-bg text-text">
      {/* ================= HERO ================= */}
      <section className="relative h-[60vh] overflow-hidden">
        <Image
          src={collection.banner}
          alt={collection.name}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 flex h-full items-center justify-center px-6 text-center"
        >
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              {collection.name}
            </h1>
            <p className="mt-4 text-white/80">{collection.description}</p>
          </div>
        </motion.div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold">Why Choose This Collection?</h2>

            <ul className="mt-8 space-y-4">
              {collection.highlights.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-xl"
          >
            <Image
              src="/images/collections/collection-detail.jpg"
              alt="Collection"
              width={800}
              height={600}
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* ================= PRODUCTS ================= */}
      <section className="py-20 bg-muted/5">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold text-center">
            Products in This Collection
          </h2>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-border p-5 hover:shadow-xl transition"
              >
                <div className="relative h-56 rounded-xl overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover hover:scale-105 transition"
                  />
                </div>

                <h3 className="mt-5 font-semibold">{p.name}</h3>

                <Link
                  href={`/products/${p.slug}`}
                  className="mt-4 inline-block text-accent font-medium"
                >
                  View Product →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold">Need Technical Assistance?</h2>
          <p className="mt-4 text-muted">
            Talk to our experts for the right solution.
          </p>

          <Link
            href="/contact"
            className="inline-block mt-8 rounded-md bg-accent px-10 py-4 font-semibold text-bg shadow-glow hover:scale-105 transition"
          >
            Contact Sales Team
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
