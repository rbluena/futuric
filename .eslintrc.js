module.exports = {
  env: {
    browser: true,
    commonjs: true,
    mocha: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  extends: [
    'plugin:react/recommended',
    'plugin:cypress/recommended',
    'airbnb',
    'airbnb/hooks',
    'plugin:import/errors',
    'plugin:import/warnings',
    'prettier',
  ],
  plugins: ['react', 'import', 'prettier', 'cypress'],
  rules: {
    'react/jsx-props-no-spreading': 'off',
    'no-underscore-dangle': 'off',
    'no-param-reassign': 'off',
  },
  settings: {
    'import/resolver': {
      alias: [
        ['@app', './src/client'],
        ['@app/screens', './src/client/screens'],
        ['@app/containers', './src/client/containers'],
        ['@app/actions', './src/client/actions'],
        ['@app/slices', './src/client/slices'],
        ['@app/hooks', './src/client/hooks'],
        ['@app/utils', './src/client/utils'],
        ['@app/services', './src/client/services'],
        ['@app/components', './src/client/components'],
        ['@app-utils', './src/client/utils'],
      ],
    },
  },
};
