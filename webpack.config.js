const autoprefixer = require('autoprefixer');
const { WebpackWarPlugin } = require('webpack-war-plugin');

module.exports = {
    entry: ['./app.scss', './app.js'],
    output: {
      filename: 'bundle.js',
    },
    plugins: [
        new WebpackWarPlugin({
            archiveName: 'website',
            additionalElements: [
                {path: 'index.html'}
            ]
        }),
    ],
    module: {
      rules: [
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
        {
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                presets: ['@babel/preset-env'],
            },
        }
      ],
    },
  };