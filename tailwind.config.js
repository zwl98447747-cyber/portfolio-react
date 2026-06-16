/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0a',
        bg2: '#111111',
        bg3: '#181818',
        card: 'rgba(255,255,255,0.03)',
        'card-border': 'rgba(255,255,255,0.06)',
        text2: 'rgba(255,255,255,0.7)',
        text3: 'rgba(255,255,255,0.35)',
        accent: '#4488ff',
        'accent-glow': 'rgba(68,136,255,0.15)',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
    },
  },
  plugins: [],
}
