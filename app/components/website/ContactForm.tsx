"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const API = process.env.NEXT_PUBLIC_BASE_URI;

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
    };

    try {
      setLoading(true);

      const res = await fetch(`${API}/api/lead/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      toast.success(
        "Query submitted successfully. Our team will contact you shortly.",
      );

      form.reset();

      router.push("/");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-10 md:py-24 bg-bg">
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
                support@globaltechnologiesindia.com
              </a>
            </div>

            {/* 🕒 Business Hours */}
            <div>
              <h4 className="font-semibold text-xl">Business Hours</h4>
              <p className="mt-2 text-muted">
                Mon – Sat ( 10:00 AM – 06:00 PM )
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

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <input
              name="name"
              className="input"
              placeholder="Full Name"
              required
            />

            <input className="input" placeholder="Company Name" />

            <input
              name="phone"
              className="input"
              placeholder="Phone Number"
              required
            />

            <input
              name="email"
              className="input"
              placeholder="Email Address"
              type="email"
              required
            />
          </div>

          <textarea
            name="message"
            className="input mt-4 h-32 resize-none"
            placeholder="Product / Requirement Details"
            required
          />

          <button
            disabled={loading}
            className="mt-6 w-full border border-amber-300 hover:bg-amber-200 hover:text-black rounded-lg bg-accent px-6 py-4 font-semibold text-bg shadow-glow transition hover:scale-[1.02] disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Enquiry"}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
