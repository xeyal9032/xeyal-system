/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        foreground: "#ffffff",
        card: "rgba(255, 255, 255, 0.05)",
        border: "rgba(255, 255, 255, 0.1)",
        primary: "#3b82f6",
        secondary: "#8b5cf6",
      },
      backdropBlur: {
        xs: "2px",
      }
    },
  },
  plugins: [],
}
