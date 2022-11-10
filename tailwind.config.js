/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./src/features/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/core/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      // sm: "0.8rem",
      // base: "1rem",
      // xl: "1.25rem",
      // "2xl": "1.563rem",
      // "3xl": "34px",
      // "4xl": "2.441rem",
      // "5xl": "3.052rem",
    },
    colors: {
      // verdigris: {
      //   DEFAULT: "#59c4af",
      //   light: "#59c4af",
      //   dark: "#59c4af",
      // },
      verdigris: "#59c4af",
    },
    extend: {
      fontFamily: {
        Montserrat: ["Montserrat", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
