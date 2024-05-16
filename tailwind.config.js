/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      animation: {
        'infinite-scroll': 'infinite-scroll 40s linear infinite',
      },
      keyframes: { 
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        }
      }                    
    },
  },
  plugins: [],
}