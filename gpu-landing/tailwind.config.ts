import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1360px",
      },
    },
    extend: {
      colors: {
        paper: "#F7F7F4",
        surface: "#FFFFFF",
        ink: {
          DEFAULT: "#15181D",
          2: "#5A6470",
          3: "#828B96",
        },
        line: {
          DEFAULT: "#E5E7EC",
          strong: "#D4D8DF",
        },
        accent: {
          DEFAULT: "#1E5AA8",
          strong: "#17457F",
          hover: "#1A4F95",
          soft: "#EAF1FA",
          ring: "#9EC0E8",
        },
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Arial", "sans-serif"],
      },
      maxWidth: {
        prose: "68ch",
      },
      fontSize: {
        "display": ["clamp(2.25rem, 1.2rem + 4.4vw, 4.5rem)", { lineHeight: "1.04", letterSpacing: "-0.02em" }],
        "h2": ["clamp(1.75rem, 1.2rem + 2.2vw, 2.75rem)", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
        "power": ["clamp(2.75rem, 1.5rem + 4.6vw, 5rem)", { lineHeight: "0.85", letterSpacing: "-0.03em" }],
      },
      boxShadow: {
        card: "0 1px 2px rgba(21,24,29,0.04), 0 8px 24px -12px rgba(21,24,29,0.12)",
        "card-hover": "0 2px 4px rgba(21,24,29,0.06), 0 18px 40px -16px rgba(21,24,29,0.18)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
