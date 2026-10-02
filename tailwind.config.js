/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#0F2238', 2: '#17375E' },
        brand: { DEFAULT: '#1E88F5', 2: '#42A5F5' },
        lightbg: '#F8FAFC',
        borderc: '#DCE3EA',
        ink: '#0F172A',
        muted: '#64748B',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-inter-tight)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [],
};
