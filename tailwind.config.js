const { fontFamily } = require("tailwindcss/defaultTheme")
const colors = require("tailwindcss/colors")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{tsx,html}"],
  darkMode: "media",
  plugins: [require("daisyui")],
  theme: {
    extend: {
      colors: {
        primary: colors.green
      },
      fontFamily: {
        sans: ["Rubik", ...fontFamily.sans]
      }
    }
  }
}
