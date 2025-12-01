/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6366f1", // Indigo 500
          dark: "#4f46e5",    // Indigo 600
          light: "#818cf8",   // Indigo 400
        },
        secondary: {
          DEFAULT: "#ec4899", // Pink 500
          dark: "#db2777",    // Pink 600
        },
        background: {
          light: "#f8fafc",   // Slate 50
          dark: "#0f172a",    // Slate 900
        },
        card: {
          light: "#ffffff",
          dark: "#1e293b",    // Slate 800
        },
        text: {
          light: "#334155",   // Slate 700
          dark: "#e2e8f0",    // Slate 200
          muted: "#64748b",   // Slate 500
        },
        border: {
          light: "#e2e8f0",   // Slate 200
          dark: "#334155",    // Slate 700
        }
      },
      fontFamily: {
        display: ["Outfit", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'glow': '0 0 15px rgba(99, 102, 241, 0.5)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ],
}