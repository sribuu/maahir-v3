/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./src/features/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/core/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    animation: {
      fadeIn: "fadeIn 2s ease-in-out",
      slideRight: "slideRight 1s ease-in-out",
      slideLeft: "slideLeft 1s ease-in-out",
    },

    keyframes: (theme) => ({
      fadeIn: {
        "0%": { opacity: 0 },
        "100%": { opacity: 1 },
      },
      slideRight: {
        "0%": { left: -200 },
        "100%": { left: 0 },
      },
      slideLeft: {
        "0%": { right: -200 },
        "100%": { right: 0 },
      },
    }),

    colors: {
      verdigris: "#59c4af",
      "caribbean-green": "#00D6A1",
      mauve: "#D8A7FF",
      white: "#FFFFFF",
      "ocean-boat-blue": "#0077C1",
      "dark-charcoal": "#333333",
      independence: "#4F5A66",
      "cetacean-blue": "#0D1140",
      "charleston-green": "#232931",
      wenge: "#63605A",
      "mint-cream": "#F3FAFA",
      "bright-gray": "#EBF0F4",
      "taupe-gray": "#85888B",
      gainsboro: "#D6DAE0",
      "dark-charcoal": "#333333",
      "ocean-boat-blue-4": "rgba(0, 119, 193, 0.04)",
    },

    extend: {
      boxShadow: {
        1: "0px 16px 48px rgba(0, 0, 0, 0.08)",
        2: "0px 2px 12px rgba(0, 0, 0, 0.08)",
      },
      fontFamily: {
        DMSans: ["DM Sans", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
