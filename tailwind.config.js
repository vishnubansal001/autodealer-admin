/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xxs: "300px",
      // => @media (min-width: 300px) { ... }

      xs: "390px",
      // => @media (min-width: 390px) { ... }
      s: "480px",
      // => @media (min-width: 480px) { ... }

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      fontFamily: {
        mon: "'Montserrat',sans-serif"
      },
      width: {
        128: "32rem",
      },
      height: {
        128: "32rem",
      },
      colors: {
        mainBlack: "#171618",
        mainBlue: "#2B44E7",
        lightBlack: "#222222",
        grey: "#5B5A59",
        pink: "#F9EBFB",
        purple: "#F1F4FF",
        darkBlue: "#404EDA"
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    nextui(),
  ],
}

