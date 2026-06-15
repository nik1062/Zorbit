/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#2563EB',
          'blue-light': '#3B82F6',
          'blue-glow': '#60A5FA',
          dark: '#0A0A0F',
          'dark-2': '#111118',
          'dark-3': '#1A1A24',
          'dark-4': '#22222F',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
