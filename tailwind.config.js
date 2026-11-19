/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mic: {
          black: '#000000',
          dark: '#0B0B0C',
          card: '#141416',
          cardHover: '#1B1B1E',
          anthracite: '#202020',
          border: '#28282C',
          silver: '#D9D9D9',
          silverLight: '#ECECED',
          silverMuted: '#9CA3AF',
          gold: '#C5A880',
          red: '#DC2626'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
        'glow-silver': '0 0 25px rgba(217, 217, 217, 0.15)',
        'glow-gold': '0 0 25px rgba(197, 168, 128, 0.2)',
      }
    },
  },
  plugins: [],
}
