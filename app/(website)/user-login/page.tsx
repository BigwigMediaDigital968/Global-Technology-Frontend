"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

const LEAD_API_URL = process.env.NEXT_PUBLIC_BASE_URI;

export default function LeadLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

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

  /* ---------------- VALIDATION ---------------- */
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

  /* ---------------- SUBMIT LEAD ---------------- */
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

      toast.success("OTP sent to your email!");
      setShowOtpModal(true);
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- VERIFY OTP ---------------- */
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

      toast.success("Verified successfully!");

      // Save verification (temporary auth)
      localStorage.setItem("lead_verified", "true");
      localStorage.setItem("lead_email", formData.email);

      router.push(redirectTo);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  /* ---------------- RESEND OTP ---------------- */
  const handleResendOtp = async () => {
    setResendLoading(true);
    try {
      await fetch(`${LEAD_API_URL}/api/lead/create-lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      toast.success("OTP resent!");
    } catch {
      toast.error("Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <>
      <section className="relative bg-bg py-28 min-h-screen flex items-center">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-10 rounded-2xl border border-accent/30 bg-white/5 backdrop-blur-xl p-10 shadow-glow"
          >
            {/* IMAGE */}
            <div className="relative hidden md:block rounded-xl overflow-hidden">
              <Image
                src="/images/elvator-lobby.png"
                alt="Lead Login"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* FORM */}
            <div>
              <h1 className="text-3xl font-bold">Access Details</h1>

              <p className="mt-4 text-muted">
                Verify your details to continue and view technical information.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
                <input
                  name="name"
                  required
                  placeholder="Full Name"
                  onChange={handleChange}
                  className="rounded-md bg-bg/70 border px-4 py-3"
                />

                <input
                  name="phone"
                  required
                  placeholder="Phone Number"
                  onChange={handleChange}
                  className="rounded-md bg-bg/70 border px-4 py-3"
                />

                <input
                  name="email"
                  required
                  type="email"
                  placeholder="Email Address"
                  onChange={handleChange}
                  className="rounded-md bg-bg/70 border px-4 py-3"
                />

                <textarea
                  name="message"
                  required
                  rows={3}
                  placeholder="Requirement / Product Interest"
                  onChange={handleChange}
                  className="rounded-md bg-bg/70 border px-4 py-3"
                />

                <button
                  disabled={loading}
                  className="mt-3 rounded-md border-2 hover:bg-amber-200 hover:text-black cursor-pointer bg-accent py-4 font-semibold text-bg shadow-glow hover:scale-105 transition"
                >
                  {loading ? "Sending OTP..." : "Continue"}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= OTP MODAL ================= */}
      {/* {showOtpModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="p-8 w-[90%] max-w-md space-y-5 text-center  border-2 rounded-2xl border-amber-300/50">
            <h3 className="text-xl font-semibold text-center">Verify OTP</h3>

            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full border px-4 py-3 rounded-md outline-amber-300/50"
            />

            <button
              onClick={handleVerifyOtp}
              className="w-full bg-accent py-3 cursor-pointer border-2 rounded-md font-semibold border-amber-300/50"
            >
              Verify & Continue
            </button>

            <button
              onClick={handleResendOtp}
              disabled={resendLoading}
              className="text-sm text-accent border-2 px-2 py-1 cursor-pointer border-amber-300/50"
            >
              {resendLoading ? "Resending..." : "Resend OTP"}
            </button>
          </div>
        </div>
      )} */}

      {/* ================= OTP MODAL ================= */}
      {showOtpModal && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center"
          onClick={() => setShowOtpModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative p-8 w-[90%] max-w-md space-y-5 text-center border-2 rounded-2xl border-amber-300/50 bg-bg backdrop-blur-xl shadow-glow"
          >
            {/* Close Icon Button */}
            <button
              onClick={() => setShowOtpModal(false)}
              className="absolute top-4 right-4 text-accent border-2 px-2 py-1 rounded-md border-amber-300/50 hover:bg-amber-200 hover:text-black transition"
            >
              ✕
            </button>

            <h3 className="text-xl font-semibold">Verify OTP</h3>

            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full border px-4 py-3 rounded-md outline-amber-300/50 bg-bg/70"
            />

            {/* Verify Button */}
            <button
              onClick={handleVerifyOtp}
              className="w-full bg-accent py-3 cursor-pointer border-2 rounded-md font-semibold border-amber-300/50 hover:bg-amber-200 hover:text-black transition"
            >
              Verify & Continue
            </button>

            {/* Resend Button */}
            <button
              onClick={handleResendOtp}
              disabled={resendLoading}
              className="w-full text-sm text-accent border-2 px-2 py-2 cursor-pointer border-amber-300/50 hover:bg-amber-200 hover:text-black transition"
            >
              {resendLoading ? "Resending..." : "Resend OTP"}
            </button>

            {/* Cancel Button */}
            {/* <button
              onClick={() => setShowOtpModal(false)}
              className="w-full border-2 py-2 rounded-md font-medium border-amber-300/50 hover:bg-amber-200 hover:text-black transition"
            >
              Cancel
            </button> */}
          </div>
        </div>
      )}
    </>
  );
}
