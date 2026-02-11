"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

const LEAD_API_URL = process.env.NEXT_PUBLIC_BASE_URI;

export default function LeadCTA() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [otp, setOtp] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  // Validation
  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!emailRegex.test(formData.email)) {
      toast.error("Invalid email address");
      return false;
    }

    if (!phoneRegex.test(formData.phone)) {
      toast.error("Invalid phone number");
      return false;
    }

    return true;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit Lead
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const res = await fetch(`${LEAD_API_URL}/api/lead/create-lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      toast.success("OTP sent successfully!");
      setShowOtpModal(true); // auto open modal
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp) return toast.error("Enter OTP");

    try {
      const res = await fetch(`${LEAD_API_URL}/api/lead/verify-lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          otp,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      toast.success("Lead verified successfully!");

      setShowOtpModal(false);
      setOtp("");

      // reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    setResendLoading(true);

    try {
      const res = await fetch(`${LEAD_API_URL}/api/lead/create-lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success("OTP resent successfully!");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <>
      <section className="relative bg-bg py-28">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 rounded-2xl border border-accent/30 bg-white/5 backdrop-blur-xl p-10 md:p-14 shadow-glow"
          >
            {/* Image */}
            <div className="relative w-full h-80 md:h-full rounded-xl overflow-hidden">
              <Image
                src="/images/elevator-cta.png"
                alt="Elevator Solutions"
                fill
                sizes="auto"
                className="object-cover"
                priority
              />
            </div>

            {/* Form */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">
                Get a <span className="text-accent">Quick Quote</span>
              </h2>

              <p className="mt-4 text-muted max-w-xl">
                Share your requirement and our team will contact you.
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-8 grid gap-6 md:grid-cols-2"
              >
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Full Name"
                  className="rounded-md bg-bg/70 border border-border px-4 py-3 outline-none focus:border-accent"
                />

                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Phone Number"
                  className="rounded-md bg-bg/70 border border-border px-4 py-3 outline-none focus:border-accent"
                />

                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Email Address"
                  className="rounded-md bg-bg/70 border border-border px-4 py-3 outline-none focus:border-accent"
                />

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Product Requirement"
                  className="md:col-span-2 rounded-md bg-bg/70 border border-border px-4 py-3 outline-none focus:border-accent"
                />

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-2 w-full rounded-md bg-accent border-2 px-10 py-4 font-semibold text-bg shadow-glow transition hover:scale-[1.03]"
                  >
                    {loading ? "Submitting..." : "Submit Requirement"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= OTP MODAL ================= */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-amber-200/50 rounded-xl p-8 w-[90%] max-w-md space-y-6">
            <h3 className="text-xl font-semibold text-center">Verify OTP</h3>

            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full border px-4 py-3 rounded-md outline-none focus:border-accent"
            />

            <button
              onClick={handleVerifyOtp}
              className="w-full bg-accent text-black py-3 rounded-md border-2 font-semibold"
            >
              Verify OTP
            </button>

            <button
              onClick={handleResendOtp}
              disabled={resendLoading}
              className="w-full text-sm text-accent font-medium"
            >
              {resendLoading ? "Resending..." : "Resend OTP"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
