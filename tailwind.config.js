/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0efff',
          200: '#baddff',
          300: '#7cc3ff',
          400: '#38a8ff',
          500: '#0088ff',
          600: '#0062dd',
          700: '#0052b3',
          800: '#004494',
          900: '#003872',
        },
      },
    },
  },
  plugins: [],
};