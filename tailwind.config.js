/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Pastel colors
        'pastel-blue': {
          light: 'var(--pastel-blue-light)',
          DEFAULT: '#e0f2ff',
        },
        'pastel-purple': {
          light: 'var(--pastel-purple-light)',
          DEFAULT: '#f0e6ff',
        },
        'pastel-pink': {
          light: 'var(--pastel-pink-light)',
          DEFAULT: '#ffe6f2',
        },
        'pastel-indigo': {
          light: 'var(--pastel-indigo-light)',
          DEFAULT: '#e6e6ff',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-shadow': 'pulse 2s infinite',
      },
      boxShadow: {
        'pastel': '0 4px 20px -2px rgba(160, 170, 230, 0.25)',
        'pastel-lg': '0 10px 30px -3px rgba(160, 170, 230, 0.3)',
      },
    },
  },
  plugins: [],
}
