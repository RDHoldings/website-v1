/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        onyx: '#0a0a0a',
        'onyx-alt': '#111111',
      },
      backgroundImage: {
        'gradient-crimson': 'linear-gradient(to top, #390000 0%, #990000 70%, #420000 100%)',
        'gradient-gold': 'linear-gradient(to top, #3b2f1a 0%, #7a5a2e 12%, #c49a3a 28%, #f2d675 45%, #fff2c7 62%, #d9b44a 78%, #8a6a2a 100%)',
      },
      fontFamily: {
        pirulen: ['Pirulen', 'Inter', 'sans-serif'],
        felix: ['Felix Titling', 'Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
