"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "intro", title: "Introduction" },
  { id: "use", title: "Use of Website" },
  { id: "products", title: "Product Information" },
  { id: "pricing", title: "Pricing & Availability" },
  { id: "orders", title: "Orders & Inquiries" },
  { id: "ip", title: "Intellectual Property" },
  { id: "liability", title: "Limitation of Liability" },
  { id: "thirdparty", title: "Third-Party Links" },
  { id: "changes", title: "Changes to Terms" },
  { id: "contact", title: "Contact Information" },
];

export default function TermsConditions() {
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
          <h1 className="text-4xl md:text-5xl font-bold">Terms & Conditions</h1>

          <p className="mt-4 text-muted max-w-2xl">
            These Terms and Conditions outline the rules and regulations for
            using the Global Technologies website and services.
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

          {/* TERMS CONTENT */}
          <div className="space-y-14 leading-relaxed text-muted">
            <section id="intro">
              <h2 className="text-2xl font-semibold text-text">Introduction</h2>
              <p className="mt-3">
                By accessing this website, you agree to comply with and be bound
                by these Terms and Conditions. If you disagree with any part of
                these terms, you must not use this website.
              </p>
            </section>

            <section id="use">
              <h2 className="text-2xl font-semibold text-text">
                Use of Website
              </h2>
              <p className="mt-3">
                This website is intended to provide information about elevator
                spare parts, technical products, and related services offered by
                Global Technologies. Users agree to use the website only for
                lawful purposes and in a way that does not harm the website or
                its users.
              </p>
            </section>

            <section id="products">
              <h2 className="text-2xl font-semibold text-text">
                Product Information
              </h2>
              <p className="mt-3">
                We strive to ensure that all product descriptions, images, and
                specifications listed on this website are accurate. However,
                Global Technologies does not guarantee that product information
                is always complete, current, or error-free.
              </p>
            </section>

            <section id="pricing">
              <h2 className="text-2xl font-semibold text-text">
                Pricing & Availability
              </h2>
              <p className="mt-3">
                Prices, product availability, and specifications are subject to
                change without prior notice. Any price mentioned on the website
                is for informational purposes and may vary depending on order
                quantity, shipping location, and applicable taxes.
              </p>
            </section>

            <section id="orders">
              <h2 className="text-2xl font-semibold text-text">
                Orders & Inquiries
              </h2>
              <p className="mt-3">
                Submitting an inquiry or contacting us through the website does
                not constitute a confirmed order. Orders are considered valid
                only after confirmation from Global Technologies and agreement
                on pricing, delivery, and payment terms.
              </p>
            </section>

            <section id="ip">
              <h2 className="text-2xl font-semibold text-text">
                Intellectual Property
              </h2>
              <p className="mt-3">
                All content on this website including text, images, graphics,
                logos, and product data is the property of Global Technologies
                unless otherwise stated. Unauthorized use, reproduction, or
                distribution of website content is strictly prohibited.
              </p>
            </section>

            <section id="liability">
              <h2 className="text-2xl font-semibold text-text">
                Limitation of Liability
              </h2>
              <p className="mt-3">
                Global Technologies shall not be held responsible for any
                direct, indirect, incidental, or consequential damages arising
                from the use of this website or reliance on the information
                provided on it.
              </p>
            </section>

            <section id="thirdparty">
              <h2 className="text-2xl font-semibold text-text">
                Third-Party Links
              </h2>
              <p className="mt-3">
                Our website may include links to third-party websites. These
                links are provided for convenience only, and Global Technologies
                does not control or endorse the content or policies of these
                external sites.
              </p>
            </section>

            <section id="changes">
              <h2 className="text-2xl font-semibold text-text">
                Changes to Terms
              </h2>
              <p className="mt-3">
                Global Technologies reserves the right to update or modify these
                Terms and Conditions at any time. Changes will become effective
                immediately upon posting on this page.
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
