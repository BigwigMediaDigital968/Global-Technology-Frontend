"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const API = process.env.NEXT_PUBLIC_BASE_URI;

export default function CollectionsPage() {
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/collections`)
      .then((res) => res.json())
      .then((res) => {
        setCollections(res.data || []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main className="bg-bg text-text">
      {/* HERO */}
      <section className="relative pt-48 overflow-hidden">
        <div className="absolute inset-0 bg-accent/10 blur-3xl opacity-40" />

        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Our Product Collections
          </h1>

          <p className="mt-6 text-muted max-w-3xl mx-auto">
            Comprehensive elevator spare part solutions engineered to support
            residential, commercial, industrial, and high-rise projects.
          </p>
        </div>
      </section>

      {/* COLLECTION GRID */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {loading && (
            <p className="col-span-full text-center text-muted">
              Loading collections...
            </p>
          )}

          {!loading &&
            collections.map((item: any, index: number) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative rounded-2xl border border-border bg-bg overflow-hidden shadow-lg hover:shadow-2xl transition"
              >
                {/* Image */}
                <div className="relative h-60 overflow-hidden bg-white">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-black/30" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{item.name}</h3>

                  <p className="mt-3 text-sm text-muted leading-relaxed line-clamp-3 min-h-[60px]">
                    {item.description}
                  </p>

                  <Link
                    href={`/collection/${item.slug}`}
                    className="inline-flex items-center gap-2 mt-6 font-medium text-accent"
                  >
                    Explore Collection
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>

                {/* Glow */}
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition">
                  <div className="absolute -inset-1 bg-accent/20 blur-2xl" />
                </div>
              </motion.div>
            ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 bg-muted/5">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold">
            Need Help Selecting the Right Collection?
          </h2>

          <p className="mt-4 text-muted">
            Our experts will guide you based on your project requirements,
            capacity, and budget.
          </p>

          <Link
            href="/contact"
            className="inline-block mt-10 rounded-lg bg-accent border-2 px-10 py-4 font-semibold text-bg shadow-glow hover:scale-105 transition hover:bg-amber-200 hover:text-black"
          >
            Talk to Our Experts
          </Link>
        </div>
      </section>
    </main>
  );
}
