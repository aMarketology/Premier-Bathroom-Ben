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
        primary: '#ff8c00',
        dark: '#1a1a1a',
        darkAlt: '#2d2d2d',
        light: '#f8f9fa',
      },
    },
  },
  plugins: [],
}
export default config
