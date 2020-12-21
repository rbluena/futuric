module.exports = {
  darkMode: false, // or 'media' or 'class'
  purge: {
    layers: ['components', 'pages'],
    content: ['./src/client/**/*.jsx'],
  },
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
