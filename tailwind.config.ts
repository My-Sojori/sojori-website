import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#e6b022",
          soft: "#f4cf5e",
          deep: "#b8881a",
        },
        secondary: {
          DEFAULT: "#8b5cf6",
        },
        accent: {
          DEFAULT: "#06b6d4",
        },
        success: "#10b981",
        warning: "#f59e0b",
        error: "#ef4444",
        bg: {
          0: "#08080b",
          1: "#0f0f14",
          2: "#16161e",
          3: "#1f1f2a",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        "2xl": "24px",
      },
      boxShadow: {
        glow: "0 20px 60px -12px rgba(230,176,34,0.35)",
        card: "0 12px 40px -12px rgba(0,0,0,0.5)",
        deep: "0 30px 80px -16px rgba(0,0,0,0.7)",
      },
      backdropBlur: {
        glass: "20px",
      },
    },
  },
  plugins: [],
};

export default config;
