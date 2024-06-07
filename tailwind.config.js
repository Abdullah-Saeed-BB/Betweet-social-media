/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
      },
      maxWidth: {
        128: "34rem",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
