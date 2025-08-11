/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#111420',
        pink: {
          DEFAULT: '#D40C63',
          dark: '#B00A54',
        },
        yellow: {
          DEFAULT: '#FCCE08',
          dark: '#E6B907',
        },
        blue: {
          DEFAULT: '#335BC6',
          dark: '#2A4BA3',
        },
        accent: '#335BC6',
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
      fontWeight: {
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
      },
    },
  },
  plugins: [],
};