/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem', // or your preferred padding
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
    extend: {
      colors: {
        "primary": '#1d4058'
      },
      backgroundImage: {
        'homeHero': "url('/heroBackground.png')",
        'ServicesHeroImage': "url('/ourservicesBackground.png')",
        'bestProjecttsBackground': "url('/bestProjecttsBackground.png')",
      }
    },
  },
  plugins: [],
}

