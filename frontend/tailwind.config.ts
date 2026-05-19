import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bordeaux: {
          50: '#fdf2f2',
          100: '#f8e0e0',
          200: '#f0c6c6',
          300: '#e29e9e',
          400: '#cf6e6e',
          500: '#b83b3b',  // bordeaux principal
          600: '#9a2e2e',
          700: '#7a2424',
          800: '#5e1b1b',
          900: '#461414',
          DEFAULT: '#8B1E1E',
        },
        brown: {
          50: '#fdf8f2',
          100: '#f6ede3',
          200: '#ecd9c7',
          300: '#e0c0a3',
          400: '#d1a27c',
          500: '#b8824f',
          600: '#9e6940',
          700: '#7e4f2e',
          800: '#633c22',
          900: '#4a2d18',
          DEFAULT: '#6B3A1F',
        },
        primary: '#8B1E1E',   // bordeaux
        secondary: '#6B3A1F', // marron
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'modern': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.02)',
        'modern-lg': '0 20px 35px -8px rgba(0, 0, 0, 0.15)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
      },
    },
  },
  plugins: [],
}
export default config