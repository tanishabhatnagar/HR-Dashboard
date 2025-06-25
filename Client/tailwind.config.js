/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        first: '#f70776',
        second: '#c3195d',
        third: '#680747',
        fourth: '#141010',
      },
    },
  },
  plugins: [],
}
