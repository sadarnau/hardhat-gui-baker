/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        halloween: {
          ...require("daisyui/src/colors/themes")["[data-theme=halloween"],
          "color-scheme": "dark",
          primary: "#f28c18",
          "primary-content": "#131616",
          secondary: "#444444",

          // secondary: "#FCDDF2",
          accent: "#51a800",
          neutral: "#1b1d1d",
          //444444
          "base-100": "#212121",

          info: "#2563eb",
          success: "#16a34a",
          warning: "#d97706",
          error: "#dc2626",
        },
      },
    ],
  },
};
