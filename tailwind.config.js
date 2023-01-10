/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: ["./views/**/*.ejs"],
  
  theme: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        black: colors.black,
        white: colors.white,
        gray: colors.gray,
        emerald: colors.emerald,
        indigo: colors.indigo,
        purple: colors.purple,
        rebeccapurple: colors.rebeccapurple,
        blueviolet: colors.blueviolet,
        darkorchid: colors.darkorchid,
        mediumpurple: colors.mediumpurple,
        whitesmoke: colors.whitesmoke,
      },
  },
  plugins: [
    require("daisyui"),
  ]
}
