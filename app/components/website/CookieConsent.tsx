"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");

    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShow(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="fixed bottom-6 left-1/2 z-50 w-[92%] max-w-3xl -translate-x-1/2 rounded-2xl border border-border bg-bg/95 backdrop-blur-xl shadow-xl"
        >
          <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
            {/* Text */}
            <p className="text-sm text-muted leading-relaxed">
              We use cookies to improve website performance, analyze traffic,
              and enhance your browsing experience. By clicking “Accept”, you
              agree to our use of cookies.
            </p>

            {/* Buttons */}
            <div className="flex gap-3 shrink-0">
              <button
                onClick={declineCookies}
                className="rounded-lg border border-border px-4 py-2 text-sm text-muted hover:bg-muted/20 transition cursor-pointer hover:bg-amber-200 hover:text-black"
              >
                Decline
              </button>

              <button
                onClick={acceptCookies}
                className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition cursor-pointer hover:border-amber-200 hover:text-amber-200 hover:border"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
