/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['VT323', 'monospace'],
      },
      colors: {
        greenlite: '#aaffcc',
      },
    },
  },
  plugins: [],
};