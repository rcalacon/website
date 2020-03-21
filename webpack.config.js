const autoprefixer = require('autoprefixer');
const { WebpackWarPlugin } = require('webpack-war-plugin');

module.exports = {
    entry: ['./app.scss', './app.jsx'],
    output: {
      filename: 'bundle.js',
    },
    plugins: [
        new WebpackWarPlugin({
            archiveName: 'website',
            additionalElements: [
                {path: 'index.html'},
                {path: 'WEB-INF'}
            ]
        }),
    ],
    module: {
      rules: [
        {
          test: /\.jsx$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          },
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'bundle.css',
              },
            },
            { loader: 'extract-loader' },
            { loader: 'css-loader' },
            {
                loader: 'postcss-loader',
                options: {
                    plugins: () => [autoprefixer()]
                }
            },
            {
              loader: 'sass-loader',
              options: {
                // Prefer Dart Sass
                implementation: require('sass'),
                sassOptions: {
                    includePaths: ['./node_modules']
                },
              },
            },
          ],
        },
      ],
    },
  };