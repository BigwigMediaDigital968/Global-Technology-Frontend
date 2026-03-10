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
    <section className="py-24 bg-bg border-t border-border">
      <div className="mx-auto max-w-7xl px-6 grid gap-16 lg:grid-cols-2 items-start">
        {/* ================= LEFT: CONTACT INFO ================= */}
        <div>
          <h2 className="text-3xl font-bold">Get in Touch</h2>
          <p className="mt-4 text-muted max-w-md">
            Reach out to us for product details, pricing, or technical guidance.
            Our team is always ready to help.
          </p>

          {/* Contact Cards */}
          <div className="mt-10 space-y-8">
            {/* 📞 Call Us */}
            <div>
              <h4 className="font-semibold mb-4 text-xl">Call Us</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                {[
                  "+917290079120",
                  "+917290079121",
                  "+917290079122",
                  "+917290079123",
                  "+918750068007",
                  "+918750068008",
                ].map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone}`}
                    className="text-muted text-center transition hover:text-amber-200 px-3 py-3 border hover:border-amber-200"
                  >
                    {phone.replace("+91", "+91 ")}
                  </a>
                ))}
              </div>
            </div>

            {/* ✉️ Email */}
            <div>
              <h4 className="font-semibold text-xl">Email</h4>
              <a
                href="mailto:sales@globaltechnologies.in"
                className="mt-2 block text-muted transition hover:text-amber-200 hover:underline underline-offset-4"
              >
                sales@globaltechnologies.in
              </a>
            </div>

            {/* 🕒 Business Hours */}
            <div>
              <h4 className="font-semibold text-xl">Business Hours</h4>
              <p className="mt-2 text-muted">
                Mon – Sat ( 10:00 AM – 7:00 PM )
              </p>
            </div>
          </div>
        </div>

        {/* ================= RIGHT: CONTACT FORM ================= */}
        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-border bg-white/10 backdrop-blur-xl p-8 shadow-xl"
        >
          <h3 className="text-2xl font-semibold">Request a Call Back</h3>
          <p className="mt-2 text-muted">
            Share your requirement and our technical team will reach out with
            the right solution.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
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
            className="mt-6 w-full rounded-lg bg-accent px-6 py-4 font-semibold text-bg shadow-glow transition hover:scale-[1.02] disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Enquiry"}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
