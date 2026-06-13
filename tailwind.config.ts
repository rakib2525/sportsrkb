import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
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
        sport: {
          dark: "#0B0F19",
          card: "#111827",
          border: "#1F2937",
          primary: "#00FF66",
          secondary: "#F97316",
        },
      },
    },
  },
  plugins: [],
};
export default config;
