const { gray, red, white, blueGray, blue } = require('tailwindcss/colors');

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
      primary: blueGray,
      neutral: gray,
      danger: red,
      success: blue,
      white,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
