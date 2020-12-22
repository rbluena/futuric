const { gray, fuchsia } = require('tailwindcss/colors');

module.exports = {
  darkMode: false, // or 'media' or 'class'
  purge: {
    layers: ['components', 'pages'],
    content: ['./src/client/**/*.jsx'],
  },
  theme: {
    fontFamily: {
      sans: ['Lato', 'Roboto', 'Arial', 'sans-serif'],
    },
    colors: {
      primary: fuchsia,
      neutral: gray,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
