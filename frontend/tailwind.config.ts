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
          100: '#fce4e4',
          200: '#f7c9c9',
          300: '#f0a3a3',
          400: '#e57373',
          500: '#d32f2f',
          600: '#c62828',
          700: '#b71c1c',
          800: '#8b0000',
          900: '#5c0000',
          DEFAULT: '#8b0000',
        },
        marron: {
          50: '#f8f4f0',
          100: '#e8ddd3',
          200: '#d1bba6',
          300: '#b9997a',
          400: '#a27d5a',
          500: '#8b6140',
          600: '#6b4a30',
          700: '#4b3320',
          800: '#2b1c10',
          900: '#150e05',
          DEFAULT: '#6b4a30',
        },
      },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}
export default config