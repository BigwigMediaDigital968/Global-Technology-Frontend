import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--gt-primary))",
        secondary: "rgb(var(--gt-secondary))",
        accent: "rgb(var(--gt-accent))",
        bg: "rgb(var(--gt-bg))",
        card: "rgb(var(--gt-card))",
        border: "rgb(var(--gt-border))",
        text: "rgb(var(--gt-text))",
        muted: "rgb(var(--gt-muted))",
      },
      boxShadow: {
        glow: "0 0 30px rgba(201,162,77,0.35)",
        card: "0 20px 40px rgba(0,0,0,0.4)",
      },
      backgroundImage: {
        "metal-gradient":
          "linear-gradient(135deg, rgba(201,162,77,0.25), rgba(201,162,77,0.05), transparent)",
      },
    },
  },
  plugins: [],
};

export default config;
