"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useModal } from "@/app/Context/ModalContext";

interface NewsletterProps {
  title?: string;
  subtitle?: string;
}

export default function Newsletter({
  title = "Stay Updated with Elevator Industry Insights",
  subtitle = "Product updates, technical tips, and industry trends delivered occasionally.",
}: NewsletterProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { showModal } = useModal();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URI}/api/newsletter/subscribe`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setEmail("");

      showModal(
        "success",
        "Subscription Successful 🎉",
        "Thank you for subscribing to our newsletter.",
      );
    } catch (error: any) {
      showModal(
        "error",
        "Subscription Failed",
        error.message || "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  // 🔥 THIS RETURN WAS MISSING
  return (
    <section className="relative md:py-24 overflow-hidden">
      <div className="relative mx-auto max-w-4xl px-6">
        <div className="rounded-3xl border border-border bg-white/10 backdrop-blur-xl shadow-xl p-10 text-center">
          <h3 className="text-2xl md:text-3xl font-bold">{title}</h3>
          <p className="mt-4 text-muted max-w-2xl mx-auto">{subtitle}</p>

          <form
            onSubmit={submit}
            className="mt-10 flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 rounded-xl border border-border px-5 py-4 outline-none text-sm"
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              disabled={loading}
              className="rounded-xl bg-accent px-8 py-4 font-semibold text-black shadow-glow disabled:opacity-60 border-2 cursor-pointer bg-amber-200 hover:bg-transparent hover:text-white hover:border-amber-200/50"
            >
              {loading ? "Joining..." : "Subscribe"}
            </motion.button>
          </form>
        </div>
      </div>
    </section>
  );
}
