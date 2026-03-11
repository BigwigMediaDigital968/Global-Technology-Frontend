"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const slides = [
  {
    title: "Precision Components",
    text: "We supply high-quality elevator spare parts sourced from trusted global manufacturers, ensuring safety, durability, and consistent performance.",
  },
  {
    title: "Certified Reliability",
    text: "Every component we provide meets international standards so technicians can confidently install and maintain systems.",
  },
  {
    title: "Industry Expertise",
    text: "Our experience working with elevator professionals allows us to understand real installation challenges and deliver dependable solutions.",
  },
  {
    title: "Reliable Supply",
    text: "We help businesses avoid project delays by maintaining consistent availability of genuine spare parts.",
  },
];

export function AboutStory() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-bg overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-30 items-center">
        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight text-primary">
            Our Story <br /> Precision & Reliability
          </h2>

          {/* Italian Flag Divider */}

          <div className="flex items-center mt-6 mb-8">
            <div className="w-14 h-[4px] bg-amber-200"></div>
          </div>

          <p className="text-muted leading-relaxed text-[16px]">
            Global Technologies was founded with a simple belief that elevator
            systems demand precision, reliability, and genuine components.
            Delays or compromises in quality directly impact safety and
            performance.
          </p>

          <p className="text-muted leading-relaxed text-[16px] mt-6">
            Over the years, we’ve partnered with leading manufacturers and
            supported a wide range of industries by supplying certified elevator
            spare parts that technicians can trust on-site.
          </p>

          {/* CTA BUTTON */}

          <Link
            href="/contact"
            className="inline-block mt-10 bg-amber-500 hover:bg-amber-600 text-white font-medium px-7 py-3 rounded-lg transition"
          >
            Inquire Now
          </Link>
        </div>

        {/* RIGHT SLIDESHOW */}
        <div className="relative flex justify-center items-center">
          {/* Background rotated shape */}

          <div className="absolute w-[420px] h-[420px] bg-amber-200 rotate-12 rounded-[40px]"></div>

          {/* Slider Card */}

          <div className="relative bg-white rounded-[32px] shadow-2xl px-12 py-14 text-center max-w-md transition-all duration-500 h-[320px]">
            <h3 className="text-2xl font-semibold text-amber-700">
              {slides[index].title}
            </h3>

            <p className="mt-5 text-gray-600 leading-relaxed">
              {slides[index].text}
            </p>

            {/* Indicators */}

            <div className="flex justify-center gap-3 mt-10">
              {slides.map((_, i) => (
                <span
                  key={i}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === i ? "w-8 bg-amber-700" : "w-2 bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
