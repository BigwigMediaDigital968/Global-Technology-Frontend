"use client";

import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: "success" | "error";
  title: string;
  message: string;
}

export default function Modal({
  isOpen,
  onClose,
  type = "success",
  title,
  message,
}: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="fixed z-50 inset-0 flex items-center justify-center px-4"
          >
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
              <div
                className={`mx-auto w-14 h-14 flex items-center justify-center rounded-full mb-4 ${
                  type === "success"
                    ? "bg-green-200 text-green-600 font-bold"
                    : "bg-red-200 text-red-600 font-bold"
                }`}
              >
                {type === "success" ? "✓" : "✕"}
              </div>

              <h3 className="text-xl text-amber-400 font-bold">{title}</h3>
              <p className="mt-2 text-gray-600">{message}</p>

              <button
                onClick={onClose}
                className="rounded-xl bg-accent px-8 py-2 mt-2 font-semibold text-black shadow-glow disabled:opacity-60 border-2 cursor-pointer bg-amber-200 hover:bg-transparent hover:text-amber-400 hover:border-amber-200"
              >
                Close
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
