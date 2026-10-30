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
        primary: { DEFAULT: "#e6b022", soft: "#f4cf5e", deep: "#b8881a" },
        secondary: { DEFAULT: "#8b5cf6" },
        accent: { DEFAULT: "#06b6d4" },
        success: "#10b981",
        warning: "#f59e0b",
        error: "#ef4444",
        bg: { 0: "#fbfaf6", 1: "#ffffff", 2: "#f5f3ec", 3: "#ebe7da" },
        ink: { 0: "#1a1408", 1: "#4a4234", 2: "#8a8170", 3: "#b8b09b" },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      borderRadius: { sm: "8px", md: "12px", lg: "16px", xl: "20px", "2xl": "24px" },
      boxShadow: {
        glow: "0 4px 12px rgba(230,176,34,0.30)",
        card: "0 1px 2px rgba(26,20,8,0.03), 0 8px 24px -12px rgba(26,20,8,0.05)",
        deep: "0 20px 40px -16px rgba(230,176,34,0.18)",
      },
      backdropBlur: { glass: "20px" },
    },
  },
  plugins: [],
};

export default config;
