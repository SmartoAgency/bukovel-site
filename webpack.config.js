const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const config = {
  mode: process.argv.includes('--production') ? 'production' : 'development',
  entry: {
    // 'immediate-loading': './src/assets/scripts/immediate-loading.js',
    notFound: './src/assets/scripts/notFound.js',
    home: './src/assets/scripts/home.js',
    header: './src/assets/scripts/modules/header/header.js',
    // footer: './src/assets/scripts/modules/footer/footer.js',
    aboutBukovel: './src/assets/scripts/gulp-modules/about-bukovel.js',
    purchaseTerms: './src/assets/scripts/gulp-modules/purchase-terms.js',
    swimmingPoolWn: './src/assets/scripts/gulp-modules/spa-swimming-pool-wn.js',
    documents: './src/assets/scripts/gulp-modules/documents.js',
    investors: './src/assets/scripts/gulp-modules/investors.js',
    aboutDeveloper: './src/assets/scripts/gulp-modules/about-developer.js',
    managementCompany: './src/assets/scripts/gulp-modules/management-company.js',
    contacts: './src/assets/scripts/gulp-modules/contacts.js',
    progress: './src/assets/scripts/gulp-modules/progress.js',
    news: './src/assets/scripts/gulp-modules/news.js',
    newsDetails: './src/assets/scripts/gulp-modules/news-details.js',
    progressDetails: './src/assets/scripts/gulp-modules/progress-details.js',
  },
  output: {
    filename: '[name].bundle.js',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks(chunk) {
            // exclude `my-excluded-chunk`
            return chunk.name !== 'immediate-loading';
          },
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        use: ['raw-loader', 'glslify-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new UglifyJSPlugin({
      sourceMap: true,
      uglifyOptions: {
        compress: {
          drop_console: process.argv.includes('--production'),
        },
      },
    }),
  ],
};

module.exports = config;
