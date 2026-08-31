import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Sublime Luxury Palette
        silk: {
          50: '#FCFAFF',
          100: '#FAF8F5',
          200: '#F3EFEA',
          300: '#EAE4DC',
          400: '#DCD4C9',
        },
        ebony: {
          DEFAULT: '#16131D',
          light: '#252030',
          muted: '#5A5468',
        },
        luxury: {
          champagne: '#D4C3B3',
          dustyrose: '#B88FA5',
          lavender: '#9884B6',
          deepviolet: '#7A61A2',
          sage: '#7C9082',
          gold: '#C5A059',
        },
        bg: {
          light: '#FAF8F5',
          lightcard: 'rgba(255, 255, 255, 0.72)',
          darkest: '#0A0810',
          dark: '#110D1B',
          card: 'rgba(23, 18, 35, 0.7)',
        },
      },
      boxShadow: {
        'luxury-glow': '0 0 50px -10px rgba(152, 132, 182, 0.2)',
        'rose-subtle': '0 0 50px -10px rgba(184, 143, 165, 0.2)',
        'glass-silk': '0 12px 40px -10px rgba(22, 19, 29, 0.05)',
        'glass-dark': '0 12px 40px -10px rgba(0, 0, 0, 0.3)',
      },
      backdropBlur: {
        glass: '20px',
        'glass-lg': '28px',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-syne)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
