"use client";

import { motion } from "framer-motion";
import { Instagram, Youtube, Linkedin, Twitter, Facebook } from "lucide-react";

const socials = [
  {
    name: "Instagram",
    username: "GT Instagram",
    icon: Instagram,
    url: "https://instagram.com",
    color: "bg-pink-500",
  },
  {
    name: "YouTube",
    username: "GT YouTube",
    icon: Youtube,
    url: "https://youtube.com",
    color: "bg-red-600",
  },
  {
    name: "LinkedIn",
    username: "GT LinkedIn",
    icon: Linkedin,
    url: "https://linkedin.com",
    color: "bg-blue-600",
  },
  {
    name: "Twitter",
    username: "GT Twitter",
    icon: Twitter,
    url: "https://twitter.com",
    color: "bg-sky-500",
  },
  {
    name: "Facebook",
    username: "GT Facebook",
    icon: Facebook,
    url: "https://facebook.com",
    color: "bg-blue-700",
  },
];

export default function StickySocials() {
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
      {socials.map((social, i) => {
        const Icon = social.icon;

        return (
          <motion.a
            key={i}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center"
          >
            <motion.div
              initial={{ x: 115 }}
              whileHover={{ x: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`flex items-center gap-3 pl-4 pr-6 py-3 rounded-l-full shadow-xl text-white ${social.color}`}
            >
              <Icon size={20} />

              <span className="whitespace-nowrap text-sm font-medium">
                {social.username}
              </span>
            </motion.div>
          </motion.a>
        );
      })}
    </div>
  );
}
