"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "intro", title: "Introduction" },
  { id: "what", title: "What Are Cookies" },
  { id: "usage", title: "How We Use Cookies" },
  { id: "types", title: "Types of Cookies We Use" },
  { id: "thirdparty", title: "Third-Party Cookies" },
  { id: "manage", title: "Managing Cookies" },
  { id: "changes", title: "Changes to This Policy" },
  { id: "contact", title: "Contact Information" },
];

export default function CookiePolicy() {
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
          <h1 className="text-4xl md:text-5xl font-bold">Cookie Policy</h1>

          <p className="mt-4 text-muted max-w-2xl">
            This Cookie Policy explains how Global Technologies uses cookies and
            similar technologies to recognize you when you visit our website.
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
                This Cookie Policy explains how Global Technologies uses cookies
                and related technologies when users visit our website. By
                continuing to browse the website, you agree to the use of
                cookies as described in this policy.
              </p>
            </section>

            <section id="what">
              <h2 className="text-2xl font-semibold text-text">
                What Are Cookies
              </h2>
              <p className="mt-3">
                Cookies are small text files that are stored on your device when
                you visit a website. They help websites remember user
                preferences, improve functionality, and analyze site usage.
              </p>
            </section>

            <section id="usage">
              <h2 className="text-2xl font-semibold text-text">
                How We Use Cookies
              </h2>
              <p className="mt-3">
                Global Technologies uses cookies to enhance website performance,
                understand visitor behavior, and improve user experience.
                Cookies may also be used to analyze traffic patterns and
                optimize website content.
              </p>
            </section>

            <section id="types">
              <h2 className="text-2xl font-semibold text-text">
                Types of Cookies We Use
              </h2>

              <ul className="mt-4 list-disc pl-6 space-y-2">
                <li>
                  <strong>Essential Cookies:</strong> Required for basic website
                  functionality.
                </li>
                <li>
                  <strong>Performance Cookies:</strong> Help us understand how
                  visitors interact with our website.
                </li>
                <li>
                  <strong>Functionality Cookies:</strong> Remember user
                  preferences to enhance experience.
                </li>
                <li>
                  <strong>Analytics Cookies:</strong> Used for tracking website
                  usage and performance insights.
                </li>
              </ul>
            </section>

            <section id="thirdparty">
              <h2 className="text-2xl font-semibold text-text">
                Third-Party Cookies
              </h2>
              <p className="mt-3">
                Some cookies may be placed by third-party services such as
                analytics providers. These services help us analyze website
                traffic and improve our services. We do not control the use of
                cookies by these third parties.
              </p>
            </section>

            <section id="manage">
              <h2 className="text-2xl font-semibold text-text">
                Managing Cookies
              </h2>
              <p className="mt-3">
                Most web browsers allow users to control or disable cookies
                through browser settings. However, disabling cookies may affect
                certain functionalities of the website.
              </p>
            </section>

            <section id="changes">
              <h2 className="text-2xl font-semibold text-text">
                Changes to This Policy
              </h2>
              <p className="mt-3">
                Global Technologies reserves the right to update this Cookie
                Policy from time to time. Updates will be posted on this page
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
