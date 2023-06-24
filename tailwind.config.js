/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./src/**/*.{html,js}",
    "./node_modules/tw-elements/dist/js/**/*.js",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        anuphan: ["Anuphan", "sans-serif"],
      },
      colors: {
        "primary-orange": "#FF5722",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("daisyui"),require("tw-elements/dist/plugin.cjs"), require('flowbite/plugin')],
  daisyui: {
    themes: [
      {
        shopTheme: {
          primary: "#4b6bfb",
          secondary: "#7b92b2",
          accent: "#67cba0",
          neutral: "#181a2a",
          "base-100": "#ffffff",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
        },
      },
    ],
  },
};