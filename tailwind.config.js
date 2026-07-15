/** @type {import('tailwindcss').Config} */

const config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: "#EAB308",
          blue: "#2563EB",
          green: "#16A34A",
        },
        dark: {
          bg: "#0F172A",
          card: "#1E293B",
          border: "#334155",
          text: "#F1F5F9",
        },
      },

      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
        display: ["Sora", "sans-serif"],
        arabic: ["Noto Naskh Arabic", "serif"],
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideLeft: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideRight: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glowYellow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(234,179,8,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(234,179,8,0.6)" },
        },
        glowBlue: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(37,99,235,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(37,99,235,0.6)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(0.8)" },
        },
        spinSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },

      animation: {
        fadeIn: "fadeIn 0.5s ease-out",
        slideUp: "slideUp 0.5s ease-out",
        slideDown: "slideDown 0.3s ease-out",
        slideLeft: "slideLeft 0.3s ease-out",
        slideRight: "slideRight 0.3s ease-out",
        scaleIn: "scaleIn 0.3s ease-out",
        shimmer: "shimmer 2s infinite linear",
        float: "float 3s ease-in-out infinite",
        glowYellow: "glowYellow 2s ease-in-out infinite",
        glowBlue: "glowBlue 2s ease-in-out infinite",
        pulseDot: "pulseDot 1.5s ease-in-out infinite",
        spinSlow: "spinSlow 3s linear infinite",
      },

      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.1)",
        "card-hover": "0 10px 25px rgba(0,0,0,0.1)",
        "yellow-glow": "0 0 20px rgba(234,179,8,0.35)",
        "blue-glow": "0 0 20px rgba(37,99,235,0.25)",
        "yellow-glow-lg": "0 0 40px rgba(234,179,8,0.4)",
        "blue-glow-lg": "0 0 40px rgba(37,99,235,0.35)",
      },

      borderRadius: {
        card: "12px",
        button: "8px",
        badge: "6px",
      },

      backgroundImage: {
        "gradient-yellow-blue":
          "linear-gradient(135deg, #EAB308 0%, #2563EB 100%)",
        "gradient-blue-dark":
          "linear-gradient(135deg, #1E3A8A 0%, #0F172A 100%)",
        "gradient-yellow": "linear-gradient(135deg, #EAB308 0%, #F59E0B 100%)",
      },

      screens: {
        xs: "475px",
      },
    },
  },
  plugins: [],
};

export default config;
