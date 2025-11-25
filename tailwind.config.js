/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'baseball-green': '#0F4C3A',
        'baseball-green-dark': '#0A3325',
        'baseball-green-light': '#1A5C4A',
        'baseball-gold': '#C5A059',
        'baseball-gold-dark': '#A0854A',
        'baseball-gold-light': '#D4B570',
      },
    },
  },
  plugins: [],
}

