/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#8B5CF6", // purple-500
          light: "#A78BFA", // purple-400
          dark: "#7C3AED",  // purple-600
        },
      },
      fontFamily: {
        sans: ["Atkinson Hyperlegible", "sans-serif"],
      },
      animation: {
        'gradient-x': 'gradient-x 4s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'morph': 'morph 8s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'bounce-in': 'bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'pulse-color': 'pulse-color 4s ease-in-out infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { backgroundSize: '200% 200%', backgroundPosition: 'left center' },
          '50%': { backgroundSize: '200% 200%', backgroundPosition: 'right center' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px) rotate(0deg)' },
          '25%': { transform: 'translateY(-20px) translateX(10px) rotate(90deg)' },
          '50%': { transform: 'translateY(0px) translateX(20px) rotate(180deg)' },
          '75%': { transform: 'translateY(20px) translateX(10px) rotate(270deg)' },
        },
        'morph': {
          '0%, 100%': { borderRadius: '40% 60% 60% 40% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '60% 40% 30% 70% / 40% 70% 30% 60%' },
        },
        'glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(139, 92, 246, 0.6), 0 0 60px rgba(139, 92, 246, 0.4)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'bounce-in': {
          '0%': { transform: 'scale(0.3) rotate(-180deg)', opacity: '0' },
          '50%': { transform: 'scale(1.1) rotate(-90deg)', opacity: '0.7' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        'pulse-color': {
          '0%, 100%': { filter: 'hue-rotate(0deg) saturate(1)' },
          '25%': { filter: 'hue-rotate(90deg) saturate(1.2)' },
          '50%': { filter: 'hue-rotate(180deg) saturate(1.4)' },
          '75%': { filter: 'hue-rotate(270deg) saturate(1.2)' },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}; 