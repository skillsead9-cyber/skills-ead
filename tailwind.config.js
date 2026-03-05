/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0B132B',
          dark: '#1A237E',
        },
        secondary: {
          DEFAULT: '#00E676',
          dark: '#00C853',
        },
        accent: {
          DEFAULT: '#FFD600',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Montserrat', 'Poppins', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
