"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

/* ─────────────────────────────────────────
   Types
───────────────────────────────────────── */
type Stage =
  | "loading" // verifying token with server
  | "confirm" // show confirmation UI
  | "already" // already unsubscribed
  | "invalid" // bad token / not found
  | "submitting" // unsubscribe POST in flight
  | "done" // successfully unsubscribed
  | "error"; // unexpected error

const REASONS = [
  "I receive too many emails",
  "The content isn't relevant to me",
  "I never signed up for this",
  "I prefer to check the website directly",
  "Other",
];

/* ─────────────────────────────────────────
   Icons
───────────────────────────────────────── */
const IconCheck = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="14" r="13" stroke="#D4A017" strokeWidth="1.5" />
    <path
      d="M8.5 14.5l4 4 7-8"
      stroke="#D4A017"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconWarning = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path
      d="M14 3L26 24H2L14 3z"
      stroke="#ef4444"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <line
      x1="14"
      y1="11"
      x2="14"
      y2="17"
      stroke="#ef4444"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="14" cy="20.5" r="1" fill="#ef4444" />
  </svg>
);

const IconMail = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect
      x="3"
      y="6"
      width="22"
      height="16"
      rx="2"
      stroke="#D4A017"
      strokeWidth="1.5"
    />
    <path
      d="M3 9l11 8 11-8"
      stroke="#D4A017"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const IconSpinner = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    className="animate-spin"
  >
    <circle
      cx="10"
      cy="10"
      r="8"
      stroke="currentColor"
      strokeWidth="2"
      strokeDasharray="10 10"
      opacity="0.3"
    />
    <path
      d="M10 2a8 8 0 018 8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

/* ─────────────────────────────────────────
   Page
───────────────────────────────────────── */
export default function UnsubscribePage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const token = searchParams.get("token") || "";

  const [stage, setStage] = useState<Stage>("loading");
  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  /* ── Verify token on mount ── */
  useEffect(() => {
    if (!email || !token) {
      setStage("invalid");
      setErrorMsg(
        "Missing email or token. Please use the link from your email.",
      );
      return;
    }

    const verify = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URI}/api/newsletter/unsubscribe/verify?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`,
        );
        const data = await res.json();

        if (!res.ok || !data.success) {
          setStage("invalid");
          setErrorMsg(data.message || "Invalid unsubscribe link.");
          return;
        }

        if (data.alreadyUnsubscribed) {
          setStage("already");
          return;
        }

        setStage("confirm");
      } catch {
        setStage("error");
        setErrorMsg("Could not reach the server. Please try again.");
      }
    };

    verify();
  }, [email, token]);

  /* ── Submit unsubscribe ── */
  const handleUnsubscribe = async () => {
    const reason =
      selectedReason === "Other" ? customReason || "Other" : selectedReason;

    setStage("submitting");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URI}/api/newsletter/unsubscribe`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, token, reason }),
        },
      );
      const data = await res.json();

      if (!res.ok || !data.success) {
        setStage("error");
        setErrorMsg(data.message || "Something went wrong.");
        return;
      }

      setStage("done");
    } catch {
      setStage("error");
      setErrorMsg("Network error. Please try again.");
    }
  };

  /* ─────────────────────────────────────────
     Render helpers
  ───────────────────────────────────────── */
  const Shell = ({ children }: { children: React.ReactNode }) => (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-4 py-16">
      {/* Header */}
      <div className="w-full max-w-md mb-8">
        <a
          href="https://www.globaltechnologiesindia.com"
          className="flex items-center gap-3 group w-fit mx-auto"
        >
          {/* ✅ Logo */}
          <Image
            src="/global-tech-logo.png"
            alt="Global Technologies Logo"
            width={50}
            height={40}
            priority
            className="object-contain transition-all duration-300"
          />

          <span className="text-white font-bold text-sm tracking-tight group-hover:text-amber-400 transition">
            Global Technologies
          </span>
        </a>
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-[#111111] border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
        {/* Gold top bar */}
        <div className="h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600" />
        <div className="p-8 sm:p-10">{children}</div>
      </div>

      {/* Footer */}
      <p className="text-xs text-neutral-700 mt-8 text-center">
        © 2026 Global Technologies &nbsp;·&nbsp;
        <a
          href="https://www.globaltechnologiesindia.com/privacy-policy"
          className="hover:text-neutral-500 transition"
        >
          Privacy Policy
        </a>
      </p>
    </div>
  );

  /* ── LOADING ── */
  if (stage === "loading") {
    return (
      <Shell>
        <div className="flex flex-col items-center gap-4 py-6">
          <IconSpinner />
          <p className="text-sm text-neutral-400">Verifying your link…</p>
        </div>
      </Shell>
    );
  }

  /* ── INVALID / NOT FOUND ── */
  if (stage === "invalid") {
    return (
      <Shell>
        <div className="flex flex-col items-center gap-4 text-center py-4">
          <div className="w-14 h-14 bg-red-500/10 rounded-full flex items-center justify-center">
            <IconWarning />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white mb-2">Invalid Link</h1>
            <p className="text-sm text-neutral-400 leading-relaxed">
              {errorMsg}
            </p>
          </div>
          <a
            href="https://www.globaltechnologiesindia.com"
            className="mt-2 text-sm text-amber-400 hover:text-amber-300 transition"
          >
            Return to website →
          </a>
        </div>
      </Shell>
    );
  }

  /* ── ALREADY UNSUBSCRIBED ── */
  if (stage === "already") {
    return (
      <Shell>
        <div className="flex flex-col items-center gap-4 text-center py-4">
          <div className="w-14 h-14 bg-amber-400/10 rounded-full flex items-center justify-center">
            <IconCheck />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white mb-2">
              Already Unsubscribed
            </h1>
            <p className="text-sm text-neutral-400 leading-relaxed">
              <span className="text-white">{email}</span> is already removed
              from our mailing list. You won't receive any further emails from
              us.
            </p>
          </div>
          <a
            href="https://www.globaltechnologiesindia.com"
            className="mt-2 inline-block bg-amber-400 text-black text-sm font-bold px-6 py-2.5 rounded-lg hover:bg-amber-300 transition"
          >
            Visit Website
          </a>
        </div>
      </Shell>
    );
  }

  /* ── DONE ── */
  if (stage === "done") {
    return (
      <Shell>
        <div className="flex flex-col items-center gap-5 text-center py-4">
          <div className="w-16 h-16 bg-amber-400/10 border border-amber-400/20 rounded-full flex items-center justify-center">
            <IconCheck />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white mb-3">
              You're unsubscribed
            </h1>
            <p className="text-sm text-neutral-400 leading-relaxed mb-1">
              We've removed{" "}
              <span className="text-white font-medium">{email}</span> from our
              list.
            </p>
            <p className="text-sm text-neutral-500 leading-relaxed">
              No further newsletters will be sent. We're sorry to see you go.
            </p>
          </div>

          {/* Divider */}
          <div className="w-full border-t border-neutral-800 my-1" />

          {/* Re-subscribe nudge */}
          <div className="w-full bg-[#0d0d0d] rounded-xl p-5 text-center">
            <p className="text-xs text-neutral-500 mb-3">Changed your mind?</p>
            <a
              href="https://www.globaltechnologiesindia.com/#newsletter"
              className="inline-block border border-neutral-700 text-neutral-300 text-sm font-medium px-5 py-2 rounded-lg hover:border-amber-400 hover:text-amber-400 transition"
            >
              Re-subscribe
            </a>
          </div>

          <a
            href="https://www.globaltechnologiesindia.com"
            className="text-sm text-amber-400 hover:text-amber-300 transition"
          >
            Return to website →
          </a>
        </div>
      </Shell>
    );
  }

  /* ── ERROR ── */
  if (stage === "error") {
    return (
      <Shell>
        <div className="flex flex-col items-center gap-4 text-center py-4">
          <div className="w-14 h-14 bg-red-500/10 rounded-full flex items-center justify-center">
            <IconWarning />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white mb-2">
              Something went wrong
            </h1>
            <p className="text-sm text-neutral-400 leading-relaxed">
              {errorMsg}
            </p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 text-sm text-amber-400 hover:text-amber-300 transition cursor-pointer"
          >
            Try again →
          </button>
        </div>
      </Shell>
    );
  }

  /* ── CONFIRM (main UI) ── */
  return (
    <Shell>
      <div className="flex flex-col gap-6">
        {/* Icon + heading */}
        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-14 h-14 bg-[#1a1a1a] border border-neutral-800 rounded-full flex items-center justify-center">
            <IconMail />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white mb-1">Unsubscribe</h1>
            <p className="text-sm text-neutral-400">
              You're about to unsubscribe{" "}
              <span className="text-white font-medium break-all">{email}</span>{" "}
              from our newsletter.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-800" />

        {/* Reason selector */}
        <div>
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
            Help us improve — why are you leaving?{" "}
            <span className="text-neutral-700">(optional)</span>
          </p>
          <div className="space-y-2">
            {REASONS.map((reason) => (
              <label
                key={reason}
                className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${
                  selectedReason === reason
                    ? "border-amber-400 bg-amber-400/5"
                    : "border-neutral-800 hover:border-neutral-600"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition ${
                    selectedReason === reason
                      ? "border-amber-400"
                      : "border-neutral-600"
                  }`}
                >
                  {selectedReason === reason && (
                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                  )}
                </div>
                <input
                  type="radio"
                  name="reason"
                  value={reason}
                  checked={selectedReason === reason}
                  onChange={() => setSelectedReason(reason)}
                  className="sr-only"
                />
                <span className="text-sm text-neutral-300">{reason}</span>
              </label>
            ))}
          </div>

          {/* Custom reason textarea */}
          {selectedReason === "Other" && (
            <textarea
              placeholder="Tell us more (optional)..."
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              rows={3}
              className="mt-3 w-full p-3 bg-[#0d0d0d] border border-neutral-700 rounded-xl text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 transition resize-none"
            />
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-800" />

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleUnsubscribe}
            disabled={stage === "submitting"}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-semibold hover:bg-red-500/20 hover:border-red-500/60 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {stage === "submitting" ? (
              <>
                <IconSpinner />
                Unsubscribing…
              </>
            ) : (
              "Yes, unsubscribe me"
            )}
          </button>

          <a
            href="https://www.globaltechnologiesindia.com"
            className="w-full flex items-center justify-center py-3 rounded-xl border border-neutral-700 text-neutral-400 text-sm font-medium hover:border-neutral-500 hover:text-white transition"
          >
            No, keep me subscribed
          </a>
        </div>

        <p className="text-xs text-neutral-600 text-center leading-relaxed">
          Unsubscribing removes you from all Global Technologies newsletters.
          You can re-subscribe at any time on our website.
        </p>
      </div>
    </Shell>
  );
}
