/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,ts}', './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {
      aspectRatio: {
        '11/17': '11 / 17',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
