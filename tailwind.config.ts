import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        pink: {
          DEFAULT: "#ffa7ee",
          light: "#ffdaed",
          soft: "#f7eef6",
        },
        beige: {
          DEFAULT: "#f8f8f2",
          tint: "#f3f3ea",
          warm: "#FAF7F2",
        },
        blue: {
          DEFAULT: "#147c98",
          hover: "#0f6278",
          dark: "#0b4554",
        },
        dark: {
          DEFAULT: "#112229",
          soft: "#1d323b",
        },
        cream: {
          50: "#FFFDF9",
          100: "#FAF7F2",
          200: "#F5EFEB",
          300: "#EFE6DF",
        },
        caramel: {
          DEFAULT: "#C68B59",
          hover: "#B37440",
          light: "#EAD6C5",
        },
        espresso: {
          DEFAULT: "#2D1E18",
          dark: "#1A110E",
          soft: "#45322A",
        },
        rose: {
          soft: "#FCEEE9",
          muted: "#D98880",
        },
        lakeview: {
          blue: "#147c98",
          navy: "#2D3594",
          red: "#D51919",
          gold: "#D4AF37",
        },
      },
      fontFamily: {
        apfel: ["'Apfel Grotezk'", "sans-serif"],
        title: ["'Apfel Grotezk'", "sans-serif"],
        hero: ["'Apfel Grotezk'", "sans-serif"],
        serif: ["var(--font-serif)", "Cormorant Garamond", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "sans-serif"],
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(45, 30, 24, 0.08)",
        "glass-hover": "0 16px 40px 0 rgba(45, 30, 24, 0.14)",
        "glass-inner": "inset 0 1px 1px 0 rgba(255, 255, 255, 0.6)",
      },
    },
  },
  plugins: [],
};
export default config;
