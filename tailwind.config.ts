import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: { extend: { fontFamily: { display: ['Cormorant Garamond', 'Georgia', 'serif'], sans: ['DM Sans', 'sans-serif'] } } },
  plugins: [],
} satisfies Config
