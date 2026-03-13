"use client";

import { useState } from "react";

const tabs = ["Description", "Extra Details", "FAQs"];

export default function ProductTabs({ product }: { product: any }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      {/* Tab bar */}
      <div className="flex border-b border-border mb-6">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActive(i)}
            className={`px-5 py-2.5 text-sm transition border-b-2 -mb-px ${
              active === i
                ? "border-accent text-text font-medium"
                : "border-transparent text-muted hover:text-text"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Description */}
      {active === 0 && (
        <p className="text-sm text-muted leading-relaxed max-w-2xl">
          {product.description || "No description provided."}
        </p>
      )}

      {/* Extra details */}
      {active === 1 && product.extraDetails && (
        <div className="grid grid-cols-2 gap-px bg-border rounded-xl overflow-hidden border border-border max-w-xl">
          {Object.entries(product.extraDetails as Record<string, string>).map(
            ([k, v]) => (
              <>
                <div
                  key={k + "_k"}
                  className="bg-card px-4 py-3 text-xs text-muted"
                >
                  {k}
                </div>
                <div key={k + "_v"} className="bg-card px-4 py-3 text-sm">
                  {v}
                </div>
              </>
            ),
          )}
        </div>
      )}

      {/* FAQs */}
      {active === 2 && product.faqs?.length > 0 && (
        <div className="flex flex-col divide-y divide-border border border-border rounded-xl overflow-hidden max-w-2xl">
          {product.faqs.map((faq: any, i: number) => (
            <FaqItem key={i} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      )}
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-card">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-4 py-3.5 text-sm font-medium text-left hover:bg-white/5 transition"
      >
        {question}
        <span
          className={`ml-4 text-muted transition-transform ${open ? "rotate-180" : ""}`}
        >
          ▾
        </span>
      </button>
      {open && (
        <p className="px-4 pb-4 text-sm text-muted leading-relaxed">{answer}</p>
      )}
    </div>
  );
}
