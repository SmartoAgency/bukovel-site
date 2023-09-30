const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const config = {
  mode: process.argv.includes('--production') ? 'production' : 'development',
  entry: {
    // 'immediate-loading': './src/assets/scripts/immediate-loading.js',
    notFound: './src/assets/scripts/notFound.js',
    home: './src/assets/scripts/home.js',
    header: './src/assets/scripts/modules/header/header.js',
    aboutBukovel: './src/assets/scripts/gulp-modules/about-bukovel.js',
    purchaseTerms: './src/assets/scripts/gulp-modules/purchase-terms.js',
    swimmingPoolWn: './src/assets/scripts/gulp-modules/spa-swimming-pool-wn.js',
    swimmingPoolLaguna: './src/assets/scripts/gulp-modules/spa-swimming-pool-laguna.js',
    spaBanyaMolfara: './src/assets/scripts/gulp-modules/spa-banya-molfara.js',
    spaPanoramaSS: './src/assets/scripts/gulp-modules/spa-panorama-ss.js',
    spaJaponBanyaOfuro: './src/assets/scripts/gulp-modules/spa-japon-banya-ofuro.js',
    spaBanyaMagichniKyli: './src/assets/scripts/gulp-modules/spa-banya-magichni-kyli.js',
    spaMedutaciynaBanya: './src/assets/scripts/gulp-modules/spa-medutaciyna-banya.js',
    spaTurkishHamam: './src/assets/scripts/gulp-modules/spa-turkish-hamam.js',
    spaRumBanya: './src/assets/scripts/gulp-modules/spa-rum-banya.js',
    spaProcedurniKimnatu: './src/assets/scripts/gulp-modules/spa-procedurni-kimnatu.js',
    spaFitoKimnata: './src/assets/scripts/gulp-modules/spa-fito-kimnata.js',
    spaKimnataRelax: './src/assets/scripts/gulp-modules/spa-kimnata-relax.js',
    spaMasajniKimnatu: './src/assets/scripts/gulp-modules/spa-masajni-kimnatu.js',
    spaVudovuiZal: './src/assets/scripts/gulp-modules/spa-vudovui-zal.js',
    roofVip: './src/assets/scripts/gulp-modules/roof-vip.js',
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
