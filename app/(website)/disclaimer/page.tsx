"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "intro", title: "Introduction" },
  { id: "accuracy", title: "Information Accuracy" },
  { id: "professional", title: "Professional Disclaimer" },
  { id: "external", title: "External Links Disclaimer" },
  { id: "liability", title: "Limitation of Liability" },
  { id: "changes", title: "Changes to Disclaimer" },
  { id: "contact", title: "Contact Information" },
];

export default function Disclaimer() {
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
          <h1 className="text-4xl md:text-5xl font-bold">Disclaimer</h1>

          <p className="mt-4 text-muted max-w-2xl">
            This Disclaimer outlines the limitations of liability and
            responsibilities related to the information provided on the Global
            Technologies website.
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

          {/* DISCLAIMER CONTENT */}
          <div className="space-y-14 leading-relaxed text-muted">
            <section id="intro">
              <h2 className="text-2xl font-semibold text-text">Introduction</h2>
              <p className="mt-3">
                The information provided on this website by Global Technologies
                is for general informational purposes only. By accessing and
                using this website, you acknowledge and agree to the terms of
                this disclaimer.
              </p>
            </section>

            <section id="accuracy">
              <h2 className="text-2xl font-semibold text-text">
                Information Accuracy
              </h2>
              <p className="mt-3">
                While we strive to ensure that all information on this website
                is accurate and up to date, Global Technologies makes no
                guarantees regarding the completeness, reliability, or accuracy
                of the information provided. Product descriptions,
                specifications, and availability may change without prior
                notice.
              </p>
            </section>

            <section id="professional">
              <h2 className="text-2xl font-semibold text-text">
                Professional Disclaimer
              </h2>
              <p className="mt-3">
                The technical or product information shared on this website is
                provided for general reference only and should not be considered
                professional engineering or technical advice. Users should
                verify product compatibility and specifications before
                implementation.
              </p>
            </section>

            <section id="external">
              <h2 className="text-2xl font-semibold text-text">
                External Links Disclaimer
              </h2>
              <p className="mt-3">
                Our website may contain links to external websites or
                third-party resources. These links are provided for convenience
                only. Global Technologies does not control or endorse the
                content, policies, or practices of third-party websites.
              </p>
            </section>

            <section id="liability">
              <h2 className="text-2xl font-semibold text-text">
                Limitation of Liability
              </h2>
              <p className="mt-3">
                Under no circumstances shall Global Technologies be liable for
                any direct, indirect, incidental, or consequential damages
                arising from the use of this website or reliance on the
                information provided on it.
              </p>
            </section>

            <section id="changes">
              <h2 className="text-2xl font-semibold text-text">
                Changes to Disclaimer
              </h2>
              <p className="mt-3">
                Global Technologies reserves the right to update or modify this
                Disclaimer at any time without prior notice. Continued use of
                the website indicates your acceptance of the updated terms.
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
