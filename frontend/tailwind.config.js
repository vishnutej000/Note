/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Dark mode colors
        'dark-bg': '#11120D',
        'dark-secondary': '#565449',
        'dark-accent': '#d8cfbc',
        'dark-text': '#fffbf4',
        
        // Light mode colors (from original config)
        'light-bg': '#FFFDF6',
        'light-secondary': '#E2D4E0',
        'light-accent': '#949AB1',
        'light-text': '#4C5372'
      }
    },
  },
  plugins: [],
}