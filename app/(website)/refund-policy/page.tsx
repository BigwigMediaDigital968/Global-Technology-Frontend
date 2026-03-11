"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "intro", title: "Introduction" },
  { id: "returns", title: "Return Eligibility" },
  { id: "process", title: "Return Process" },
  { id: "refunds", title: "Refund Policy" },
  { id: "damaged", title: "Damaged or Defective Products" },
  { id: "shipping", title: "Return Shipping" },
  { id: "exceptions", title: "Non-Returnable Items" },
  { id: "changes", title: "Policy Updates" },
  { id: "contact", title: "Contact Information" },
];

export default function RefundReturnPolicy() {
  const [active, setActive] = useState("intro");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-40% 0px -50% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="bg-bg text-text">
      {/* HEADER */}
      <section className="md:pt-48 md:py-24 pt-20 pb-12 border-b border-border">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="text-4xl md:text-5xl font-bold">
            Refund & Return Policy
          </h1>

          <p className="mt-4 text-muted max-w-2xl">
            This Refund and Return Policy explains the conditions under which
            products purchased from Global Technologies may be returned or
            refunded.
          </p>

          <p className="mt-2 text-sm text-muted">
            Last updated: March 11, 2026
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-[250px_1fr] gap-14">
          {/* SIDEBAR */}
          <aside className="hidden lg:block sticky top-28 h-fit">
            <nav className="space-y-3 text-sm">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`block transition ${
                    active === s.id
                      ? "text-accent font-semibold"
                      : "text-muted hover:text-text"
                  }`}
                >
                  {s.title}
                </a>
              ))}
            </nav>
          </aside>

          {/* POLICY CONTENT */}
          <div className="space-y-14 leading-relaxed text-muted">
            <section id="intro">
              <h2 className="text-2xl font-semibold text-text">Introduction</h2>
              <p className="mt-3">
                Global Technologies aims to provide high-quality elevator spare
                parts and technical products. This policy outlines the terms
                under which returns, replacements, or refunds may be processed.
              </p>
            </section>

            <section id="returns">
              <h2 className="text-2xl font-semibold text-text">
                Return Eligibility
              </h2>
              <p className="mt-3">
                Returns may be accepted within a reasonable timeframe if the
                product received is incorrect, defective, or damaged during
                transit. The product must be unused and in its original
                packaging with all components included.
              </p>
            </section>

            <section id="process">
              <h2 className="text-2xl font-semibold text-text">
                Return Process
              </h2>
              <p className="mt-3">
                To request a return, customers should contact Global
                Technologies with their order details and reason for return. Our
                team will review the request and provide instructions for
                returning the product if applicable.
              </p>
            </section>

            <section id="refunds">
              <h2 className="text-2xl font-semibold text-text">
                Refund Policy
              </h2>
              <p className="mt-3">
                Refunds are issued only after returned products are received and
                inspected. If the return is approved, the refund will be
                processed through the original payment method or by another
                mutually agreed method.
              </p>
            </section>

            <section id="damaged">
              <h2 className="text-2xl font-semibold text-text">
                Damaged or Defective Products
              </h2>
              <p className="mt-3">
                If a product arrives damaged or defective, customers should
                notify us as soon as possible with supporting details or images.
                We will assess the situation and arrange for replacement or
                refund where applicable.
              </p>
            </section>

            <section id="shipping">
              <h2 className="text-2xl font-semibold text-text">
                Return Shipping
              </h2>
              <p className="mt-3">
                Return shipping arrangements depend on the reason for return. In
                cases where the error is from our side, Global Technologies may
                assist with return logistics. Otherwise, shipping costs may be
                borne by the customer.
              </p>
            </section>

            <section id="exceptions">
              <h2 className="text-2xl font-semibold text-text">
                Non-Returnable Items
              </h2>
              <p className="mt-3">
                Certain customized, specially ordered, or installed products may
                not be eligible for return unless found defective or damaged
                upon delivery.
              </p>
            </section>

            <section id="changes">
              <h2 className="text-2xl font-semibold text-text">
                Policy Updates
              </h2>
              <p className="mt-3">
                Global Technologies reserves the right to modify this Refund and
                Return Policy at any time. Updates will be posted on this page
                with the revised date.
              </p>
            </section>

            <section id="contact">
              <h2 className="text-2xl font-semibold text-text">
                Contact Information
              </h2>

              <p className="mt-3">Global Technologies</p>
              <p>Email: support@globaltechnologiesindia.in</p>
              <p>Phone: +91 7290079120</p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
