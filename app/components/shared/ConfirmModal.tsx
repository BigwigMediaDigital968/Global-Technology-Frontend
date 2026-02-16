"use client";

import { motion, AnimatePresence } from "framer-motion";

interface Props {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  danger?: boolean;
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  danger = false,
}: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/60 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div className="bg-[#111] border border-white/10 rounded-2xl p-8 w-full max-w-md shadow-2xl">
              <h2 className="text-xl font-bold mb-3">{title}</h2>

              <p className="text-gray-400 text-sm mb-6">{message}</p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={onCancel}
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition cursor-pointer"
                >
                  {cancelText}
                </button>

                <button
                  onClick={onConfirm}
                  className={`px-4 py-2 rounded-lg font-semibold transition cursor-pointer ${
                    danger
                      ? "bg-red-600 hover:bg-red-500"
                      : "bg-[#c5a37e] hover:opacity-90 text-black"
                  }`}
                >
                  {confirmText}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
