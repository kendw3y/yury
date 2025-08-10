/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'nunito': ['Nunito', 'sans-serif'],
      },
      colors: {
        'custom-dark': '#111420',
        'custom-pink': '#D40C63',
        'custom-yellow': '#FCCE08',
        'custom-blue': '#335BC6',
        'custom-white': '#ffffff',
      }
    },
  },
  plugins: [],
};