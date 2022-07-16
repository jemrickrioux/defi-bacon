/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        rubik: ["Rubik", "sans-serif"],
      },
      colors: {
        primary: "#6D95AF",
        secondary: "#B8D1DD",
        dark: "#393838"
      }
    },
  },
  plugins: [require("tailwind-heropatterns")({
    // as per tailwind docs you can pass variants
    variants: [],

    // the list of patterns you want to generate a class for
    // the names must be in kebab-case
    // an empty array will generate all 87 patterns
    patterns: [],

    // The foreground colors of the pattern
    colors: {
      default: "#547586",
      "blue-dark": "#000044" //also works with rgb(0,0,205)
    },

    // The foreground opacity
    opacity: {
      default: "0.1",
      "100": "1.0"
    }
  })],
};
