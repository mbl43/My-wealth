/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary palette — deep navy / charcoal
        navy: {
          50: '#eef2ff',
          100: '#dce4ff',
          200: '#b9c9ff',
          300: '#8ba6ff',
          400: '#5c7cff',
          500: '#3b5bdb',
          600: '#1e3a8a',
          700: '#152a5e',
          800: '#0f1d3d',
          900: '#0a1128',
          950: '#060b1a',
        },
        // Emerald accents
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        // Cyan highlights
        cyan: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
        // Surface colors for cards/backgrounds
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
        'display': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'headline': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        'title': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
      },
      borderRadius: {
        '4xl': '2rem',
        'card': '1rem',
        'button': '0.75rem',
      },
      boxShadow: {
        'glow-emerald': '0 0 20px rgba(16, 185, 129, 0.15)',
        'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.15)',
        'glow-navy': '0 0 20px rgba(59, 91, 219, 0.15)',
        'card': '0 1px 3px rgba(0, 0, 0, 0.06), 0 6px 16px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.08), 0 12px 32px rgba(0, 0, 0, 0.06)',
        'premium': '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.06)',
        'inner-glow': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-down': 'fadeInDown 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'shimmer': 'shimmer 2s infinite linear',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'counter': 'counter 2s ease-out',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(16, 185, 129, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)' },
        },
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [],
}