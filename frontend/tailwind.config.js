/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0F172A',
        surface: '#1E293B',
        primary: '#8B5CF6',
        secondary: '#06B6D4',
        accent: '#F59E0B',
      }
    },
  },
  plugins: [],
}