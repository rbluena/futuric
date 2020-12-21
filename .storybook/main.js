const path = require('path');

module.exports = {
  stories: [
    '../src/client/components/**/*.stories.@(mdx|js|jsx|ts|tsx)',
    '../src/client/containers/**/*.stories.@(mdx|js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.css$/,
      use: [
        // Loader for webpack to process CSS with PostCSS
        {
          loader: 'postcss-loader',
          options: {
            /*
              Enable Source Maps
             */
            sourceMap: true,
            /*
              Set postcss.config.js config path && ctx
             */
            config: {
              path: './.storybook/',
            },
          },
        },
      ],

      include: path.resolve(__dirname, '../'),
    });

    // Return the altered config
    return config;
  },
};
