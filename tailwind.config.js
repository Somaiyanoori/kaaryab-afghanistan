/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-plus-jakarta)"],
        sora: ["var(--font-sora)"],
      },
      colors: {
        dark: {
          bg: "#0F172A",
          card: "#1E293B",
          border: "#334155",
          text: "#F1F5F9",
        },
      },
      boxShadow: {
        "yellow-glow": "0 0 15px rgba(234, 179, 8, 0.3)",
        "yellow-glow-lg": "0 0 25px rgba(234, 179, 8, 0.5)",
        "blue-glow": "0 0 15px rgba(37, 99, 235, 0.25)",
      },
    },
  },
  plugins: [],
};
