/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/**/*.ejs'],
  theme: {
    extend: {
      colors: {
        'brutal-bg': '#f2f2f2',
        'brutal-text': '#1a1a1a',
        'brutal-border': '#000000',
        'brutal-accent': '#ffdd00',
        'brutal-error': '#ff0033',
        'brutal-muted': '#999999',
        'brutal-hover': '#eeeeee'
      },
      fontFamily: {
        brutal: ['Courier New', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '0px',
      },
      boxShadow: {
        brutal: '4px 4px 0 #000',
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
