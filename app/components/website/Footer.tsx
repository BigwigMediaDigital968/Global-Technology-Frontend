"use client";

import { Phone, Mail, Clock } from "lucide-react";

export default function Footer() {
  const phones = [
    "+917290079120",
    "+917290079121",
    "+918750068007",
    "+918750068008",
  ];

  return (
    <footer className="bg-[#05080d] border-t border-amber-100/50">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-8 md:grid-cols-5">
        {/* Brand */}
        <div>
          <h3 className="text-xl font-bold text-amber-300">
            Global <span className="text-white">Technologies</span>
          </h3>
          <p className="mt-4 text-sm text-muted">
            Trusted manufacturer & supplier of premium elevator spare parts
            across India.
          </p>
        </div>

        {/* Products */}
        <div>
          <h4 className="mb-4 font-semibold text-amber-300">Categories</h4>
          <ul className="space-y-2 text-sm text-muted">
            <li>Control Panels</li>
            <li>Door Operators</li>
            <li>Traction Machines</li>
            <li>Safety Components</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="mb-4 font-semibold text-amber-300">Company</h4>
          <ul className="space-y-2 text-sm text-muted">
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/industries">Industries</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>Careers</li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h4 className="mb-4 font-semibold text-amber-300">Policies</h4>
          <ul className="space-y-2 text-sm text-muted">
            <li>
              <a href="/privacy-policy">Privacy Policy</a>
            </li>
            <li>
              <a href="/terms-and-conditions">Terms & Conditions</a>
            </li>
            <li>
              <a href="/refund-policy">Refund Policy</a>
            </li>
            <li>
              <a href="/disclaimer">Disclaimer</a>
            </li>
            <li>
              <a href="/cookie-policy">Cookie Policy</a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="mb-4 font-semibold text-amber-300">Contact</h4>

          {/* Phone Numbers */}
          <div className="grid grid-cols-1 gap-y-2 text-sm">
            {phones.map((phone) => (
              <a
                key={phone}
                href={`tel:${phone}`}
                className="flex items-center gap-2 text-muted hover:text-amber-200 hover:underline underline-offset-4 transition"
              >
                <Phone size={16} className="text-amber-300" />
                {phone.replace("+91", "+91 ")}
              </a>
            ))}
          </div>

          {/* Email */}
          <div className="flex items-center gap-2 mt-4">
            <Mail size={20} className="text-amber-300" />
            <a
              href="mailto:sales@globaltechnologies.in"
              className="text-sm text-muted hover:text-amber-200 hover:underline underline-offset-4 transition"
            >
              support@globaltechnologiesindia.com
            </a>
          </div>

          {/* Business Hours */}
          <div className="flex items-center gap-2 mt-3">
            <Clock size={16} className="text-amber-300" />
            <p className="text-sm text-muted">Mon – Sat | 10 AM – 6 PM</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-amber-100/50 py-6 text-center text-sm text-muted">
        © {new Date().getFullYear()} Global Technologies. All rights reserved.
      </div>
    </footer>
  );
}
