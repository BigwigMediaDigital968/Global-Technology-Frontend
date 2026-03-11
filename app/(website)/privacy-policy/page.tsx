"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "intro", title: "Introduction" },
  { id: "info", title: "Information We Collect" },
  { id: "usage", title: "How We Use Your Information" },
  { id: "protection", title: "Data Protection" },
  { id: "sharing", title: "Sharing of Information" },
  { id: "cookies", title: "Cookies & Analytics" },
  { id: "thirdparty", title: "Third-Party Links" },
  { id: "rights", title: "Your Rights" },
  { id: "changes", title: "Policy Changes" },
  { id: "contact", title: "Contact Us" },
];

export default function PrivacyPolicy() {
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
      <section className="md:pt-48 md:py-24 pt-20 pb-12 border-b border-amber-200">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="text-4xl md:text-5xl font-bold">Privacy Policy</h1>

          <p className="mt-4 text-muted max-w-2xl">
            This Privacy Policy explains how Global Technologies collects, uses,
            and protects your information when you interact with our website.
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
                Global Technologies respects your privacy and is committed to
                protecting the information you share with us through our website
                and communication channels.
              </p>
            </section>

            <section id="info">
              <h2 className="text-2xl font-semibold text-text">
                Information We Collect
              </h2>
              <ul className="mt-4 list-disc pl-6 space-y-2">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Company name</li>
                <li>Inquiry details</li>
              </ul>
            </section>

            <section id="usage">
              <h2 className="text-2xl font-semibold text-text">
                How We Use Your Information
              </h2>
              <p className="mt-3">
                The information collected is used to respond to inquiries,
                provide product information, and improve our services.
              </p>
            </section>

            <section id="protection">
              <h2 className="text-2xl font-semibold text-text">
                Data Protection
              </h2>
              <p className="mt-3">
                We implement appropriate security measures to safeguard your
                personal information.
              </p>
            </section>

            <section id="sharing">
              <h2 className="text-2xl font-semibold text-text">
                Sharing of Information
              </h2>
              <p className="mt-3">
                We do not sell or rent personal information to third parties.
              </p>
            </section>

            <section id="cookies">
              <h2 className="text-2xl font-semibold text-text">
                Cookies & Analytics
              </h2>
              <p className="mt-3">
                Our website may use cookies to enhance user experience and
                analyze site traffic.
              </p>
            </section>

            <section id="thirdparty">
              <h2 className="text-2xl font-semibold text-text">
                Third-Party Links
              </h2>
              <p className="mt-3">
                Our website may contain links to third-party websites.
              </p>
            </section>

            <section id="rights">
              <h2 className="text-2xl font-semibold text-text">Your Rights</h2>
              <p className="mt-3">
                You may request access or deletion of your personal data.
              </p>
            </section>

            <section id="changes">
              <h2 className="text-2xl font-semibold text-text">
                Policy Changes
              </h2>
              <p className="mt-3">This policy may be updated periodically.</p>
            </section>

            <section id="contact">
              <h2 className="text-2xl font-semibold text-text">Contact Us</h2>

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
