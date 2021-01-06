const { parsed: localEnv } = require('dotenv').config();
const withCSS = require('@zeit/next-css');

const webpack = require('webpack');
const apiKey = JSON.stringify(process.env.SHOPIFY_API_KEY);
const tawkSrc = JSON.stringify(process.env.TAWK_SRC);
console.log({ tawkSrc });

module.exports = withCSS({
  webpack: (config) => {
    const env = { API_KEY: apiKey, TAWK_SRC: tawkSrc };
    config.plugins.push(new webpack.DefinePlugin(env));
    config.module.rules.push({
      test: /\.liquid$/,
      use: 'raw-loader'
    });
    return config;
  }
});
