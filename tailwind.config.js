/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Nunito', 'system-ui', 'sans-serif'],
      },
      colors: {
        blossom: {
          50: '#fff5f8',
          100: '#ffe4ee',
          200: '#ffc9dc',
          300: '#ffa0c2',
          400: '#ff6b9d',
          500: '#f43f7a',
          600: '#be3a6f',
          700: '#9b2258',
          800: '#7d1d49',
          900: '#4a102b',
        },
        dusk: {
          50: '#f6f3ff',
          100: '#ece6ff',
          200: '#d8ccff',
          400: '#a78bfa',
          600: '#7c3aed',
        },
      },
      boxShadow: {
        card: '0 18px 40px -24px rgba(155, 34, 88, 0.35)',
        glow: '0 0 0 6px rgba(244, 63, 122, 0.12)',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.85' },
          '50%': { transform: 'scale(1.35)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        spinSlow: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        breathe: 'breathe 4s ease-in-out infinite',
        float: 'float 4s ease-in-out infinite',
        'spin-slow': 'spinSlow 8s linear infinite',
        'fade-up': 'fadeUp 0.4s ease-out both',
      },
    },
  },
  plugins: [],
};
