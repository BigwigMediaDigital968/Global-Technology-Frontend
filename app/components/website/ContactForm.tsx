"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export function ContactForm() {
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // API call later
    setTimeout(() => {
      setLoading(false);
      alert("Thank you! Our team will contact you shortly.");
    }, 1000);
  };

  return (
    <section className="py-24 bg-bg">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-start">
        {/* Left Content */}
        <div>
          <h2 className="text-3xl font-bold">Request a Call Back</h2>
          <p className="mt-4 text-muted max-w-md">
            Share your requirement and our technical team will reach out with
            the right solution.
          </p>

          <ul className="mt-8 space-y-3 text-muted">
            <li>✔ Genuine & authorized products</li>
            <li>✔ Industry-compliant solutions</li>
            <li>✔ Fast response & support</li>
          </ul>
        </div>

        {/* Glass Form */}
        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-border bg-white/10 backdrop-blur-xl p-8 shadow-xl"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <input className="input" placeholder="Full Name" required />
            <input className="input" placeholder="Company Name" />
            <input className="input" placeholder="Phone Number" required />
            <input className="input" placeholder="Email Address" type="email" />
          </div>

          <select className="input mt-4">
            <option>Select Industry</option>
            <option>Residential</option>
            <option>Commercial</option>
            <option>Hospital</option>
            <option>Industrial</option>
            <option>Other</option>
          </select>

          <textarea
            className="input mt-4 h-32 resize-none"
            placeholder="Product / Requirement Details"
          />

          <button
            disabled={loading}
            className="mt-6 w-full rounded-lg bg-accent px-6 py-4 font-semibold text-bg shadow-glow hover:scale-[1.02] transition disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Enquiry"}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
