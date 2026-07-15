/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: "#0F172A",
          card: "#1E293B",
          border: "#334155",
          text: "#F1F5F9",
        },
      },
    },
  },
  plugins: [],
};
