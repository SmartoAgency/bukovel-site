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
    roofSwimmingPoolWN: './src/assets/scripts/gulp-modules/roof-swimming-pool-wn.js',
    roofVip: './src/assets/scripts/gulp-modules/roof-vip.js',
    roofSolar: './src/assets/scripts/gulp-modules/roof-solar.js',
    roofBar: './src/assets/scripts/gulp-modules/roof-bar.js',
    skiIn: './src/assets/scripts/gulp-modules/ski-in.js',
    skiTerasa: './src/assets/scripts/gulp-modules/ski-terasa.js',
    skiTrevelator: './src/assets/scripts/gulp-modules/ski-trevelator.js',
    skiGirka : './src/assets/scripts/gulp-modules/ski-girka.js',
    skiInfrastructure: './src/assets/scripts/gulp-modules/ski-infrastructure.js',
    foodPanorama: './src/assets/scripts/gulp-modules/food-panorama.js',
    foodAziya: './src/assets/scripts/gulp-modules/food-aziya.js',
    foodBar: './src/assets/scripts/gulp-modules/food-bar.js',
    foodAllIn: './src/assets/scripts/gulp-modules/food-all-in.js',
    businessConferens: './src/assets/scripts/gulp-modules/business-conferens.js',
    businessBanket: './src/assets/scripts/gulp-modules/business-banket.js',
    businessCoworking: './src/assets/scripts/gulp-modules/business-coworking.js',
    servicesSalon: './src/assets/scripts/gulp-modules/services-salon.js',
    servicesTorgivelnaZona: './src/assets/scripts/gulp-modules/services-torgivelna-zona.js',
    servicesDutyachaKimnata: './src/assets/scripts/gulp-modules/services-dutyacha-kimnata.js',
    servicesReception: './src/assets/scripts/gulp-modules/services-reception.js',
    servicesConcierge: './src/assets/scripts/gulp-modules/services-concierge.js',
    servicesBikeParking: './src/assets/scripts/gulp-modules/services-bike-parking.js',
    servicesCarParking: './src/assets/scripts/gulp-modules/services-car-parking.js',
    servicesTransfer: './src/assets/scripts/gulp-modules/services-transfer.js',
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
