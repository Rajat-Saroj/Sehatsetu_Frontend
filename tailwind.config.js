/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sehat: {
          primary: '#15803d', 
          bg: '#f0fdf4',      
        }
      }
    },
  },
  plugins: [],
}