/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-shadow': ' 17px 4px 7px rgba(0,0,0,0.6);'
      }
    },
  },
  plugins: [],
}

