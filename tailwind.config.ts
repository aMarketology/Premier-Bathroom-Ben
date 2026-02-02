import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5a6e7f', // tile-slate
        dark: '#1a1a1a',
        darkAlt: '#2d2d2d',
        light: '#f5f1e8', // tile-cream
        'tile-cream': '#f5f1e8',
        'tile-beige': '#e8dcc8',
        'tile-taupe': '#b8a99a',
        'tile-slate': '#5a6e7f',
        'tile-charcoal': '#3d4852',
        'tile-marble': '#ffffff',
        'tile-accent': '#8b7355',
        'tile-gold': '#c9a567',
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
