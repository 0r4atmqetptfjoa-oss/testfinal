
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html','./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        card: 'var(--card)',
        text: 'var(--text)',
        muted: 'var(--muted)',
        primary: 'var(--primary)',
        accent: 'var(--accent)',
        border: 'var(--border)',
      },
      borderRadius: { '2xl': '1.25rem' }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
