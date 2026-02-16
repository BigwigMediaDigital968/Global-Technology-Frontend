"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

const testimonials = [
  {
    name: "Neeraj Gupta",
    company: "Prime Elevators",
    text: "We trust Global Technologies for all our elevator component requirements.",
    image: "/images/profile.png",
    rating: 5,
  },
  {
    name: "Kunal Shah",
    company: "Shah Lift Systems",
    text: "Excellent build quality and compliance with safety standards.",
    image: "/images/profile.png",
    rating: 5,
  },
  {
    name: "Vikas Sharma",
    company: "Metro Elevators",
    text: "Reliable partner for large-scale elevator projects.",
    image: "/images/profile.png",
    rating: 5,
  },
  {
    name: "Amit Verma",
    company: "Urban Lift Solutions",
    text: "Professional team and genuine spare parts.",
    image: "/images/profile.png",
    rating: 5,
  },
];

const logos = [
  "/images/logo.jpeg",
  "/images/logo.jpeg",
  "/images/logo.jpeg",
  "/images/logo.jpeg",
  "/images/logo.jpeg",
];

export default function ClientTestimonials() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, []);

  const visible = [
    testimonials[index],
    testimonials[(index + 1) % testimonials.length],
    testimonials[(index + 2) % testimonials.length],
  ];

  return (
    <section className="relative bg-bg py-20 px-6 overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Client Testimonials
        </h2>
        <p className="mt-4 text-white/70 max-w-2xl mx-auto">
          Industry leaders rely on Global Technologies for high-performance
          elevator components that meet strict safety and quality standards. Our
          reputation is built on trust, timely delivery, and uncompromising
          craftsmanship.
        </p>
      </div>
      <div className="max-w-7xl mx-auto flex justify-end items-center mb-12">
        <div className="flex gap-3">
          <button
            onClick={prev}
            className="border border-white/30 rounded-lg p-3 hover:border-amber-200/80 cursor-pointer"
          >
            ←
          </button>
          <button
            onClick={next}
            className="border border-white/30 rounded-lg p-3 hover:border-amber-200/80 cursor-pointer"
          >
            →
          </button>
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-7xl mx-auto">
        {/* Mobile: Only 1 Card */}
        <div className="block md:hidden">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-amber-200/50 backdrop-blur-xl bg-white/5 p-8"
          >
            <div className="flex items-center gap-4 mb-4">
              <Image
                src={testimonials[index].image}
                alt={testimonials[index].name}
                width={56}
                height={56}
                className="rounded-full object-cover"
              />
              <div className="flex text-yellow-400">
                {"★".repeat(testimonials[index].rating)}
              </div>
            </div>

            <p className="text-white text-lg leading-relaxed">
              “{testimonials[index].text}”
            </p>

            <div className="mt-6">
              <p className="text-white font-semibold">
                {testimonials[index].name}
              </p>
              <p className="text-sm text-white/60">
                {testimonials[index].company}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Desktop: 3 Cards Layout */}
        <div className="hidden md:grid grid-cols-4 gap-6">
          {visible.map((item, i) => {
            const featured = i === 0;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`rounded-2xl border border-amber-200/50 backdrop-blur-xl bg-white/5 p-8 ${
                  featured ? "col-span-2" : ""
                }`}
              >
                {featured && (
                  <div className="flex items-center gap-4 mb-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={56}
                      height={56}
                      className="rounded-full object-cover"
                    />
                    <div className="flex text-yellow-400">
                      {"★".repeat(item.rating)}
                    </div>
                  </div>
                )}

                <p className="text-white text-lg leading-relaxed">
                  “{item.text}”
                </p>

                <div className="mt-6">
                  <p className="text-white font-semibold">{item.name}</p>
                  <p className="text-sm text-white/60">{item.company}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Client Logos */}
      <div className="max-w-6xl mx-auto mt-16 flex flex-wrap justify-center gap-10 opacity-70">
        {logos.map((logo, i) => (
          <Image
            key={i}
            src={logo}
            alt="Client logo"
            width={120}
            height={40}
            className="object-contain grayscale hover:grayscale-0 transition"
          />
        ))}
      </div>
    </section>
  );
}
