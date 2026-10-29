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
        cosmos: {
          950: '#070A0F',
          900: '#0B0F19',
          850: '#0F1422',
          800: '#151B2E',
          750: '#1C243B',
          border: 'rgba(255, 255, 255, 0.08)',
          line: 'rgba(255, 255, 255, 0.12)',
        },
        cyan: {
          300: '#67E8F9',
          400: '#22D3EE',
          500: '#06B6D4',
          DEFAULT: '#00D2FF',
        },
        azure: {
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
        },
        cobalt: {
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
        },
        frost: {
          DEFAULT: '#F8FAFC',
          muted: '#94A3B8',
          faint: '#64748B',
        },
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'cyan-glow': '0 0 25px rgba(0, 210, 255, 0.25)',
        'blue-glow': '0 0 30px rgba(59, 130, 246, 0.2)',
        'card-prestige': '0 8px 32px -4px rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.08)',
      }
    },
  },
  plugins: [],
}
