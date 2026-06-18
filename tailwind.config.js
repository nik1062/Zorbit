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
          'brand-dark-3/60': 'rgba(26, 26, 36, 0.6)',
          'brand-dark-2/60': 'rgba(17, 17, 24, 0.6)',
          'brand-dark-2/50': 'rgba(17, 17, 24, 0.5)',
          'brand-dark-2/40': 'rgba(17, 17, 24, 0.4)',
          'brand-dark-2/95': 'rgba(17, 17, 24, 0.95)',
          'dark-4': '#22222F',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
