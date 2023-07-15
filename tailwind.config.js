const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    'app/**/*.{js,ts,jsx,tsx,mdx}', // for next.js
    'src/**/*.{js,ts,jsx,tsx}',
    '../../packages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.indigo[500],
      },
    },
  },
  plugins: [],
};
