const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');


const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  }

  if (isProd) {
    config.minimizer = [
      new CssMinimizerWebpackPlugin(),
      new TerserWebpackPlugin()
    ]
  }

  return config;
}

const filenameJs = ext => isDev ? `js/[name].${ext}` : `js/[name].[contenthash].${ext}`;
const filenameCss = ext => isDev ? `styles/[name].${ext}` : `styles/[name].[contenthash].${ext}`;



const cssLoaders = extra => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        esModule: isDev,
        emit: true,
      },
    },
    'css-loader',
    'less-loader',
  ]

  if (extra) {
    loaders.push(extra)
  }

  return loaders;
}

const plugins = () => {
  const base = [
    new HtmlWebpackPlugin({
      template: './pug/pages/index.pug',
      filename: 'index.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets/logo.jpg'),
          to: path.resolve(__dirname, 'dist/assets'),
        },
        {
          from: path.resolve(__dirname, 'src/assets/logo.svg'),
          to: path.resolve(__dirname, 'dist/assets'),
        },
        {
          from: path.resolve(__dirname, 'src/assets/hero.png'),
          to: path.resolve(__dirname, 'dist/assets'),
        },
        {
          from: path.resolve(__dirname, 'src/assets/posters/posters1.png'),
          to: path.resolve(__dirname, 'dist/assets/posters'),
        },
        {
          from: path.resolve(__dirname, 'src/assets/posters/posters2.png'),
          to: path.resolve(__dirname, 'dist/assets/posters'),
        },
        {
          from: path.resolve(__dirname, 'src/assets/posters/posters3.png'),
          to: path.resolve(__dirname, 'dist/assets/posters'),
        },
        {
          from: path.resolve(__dirname, 'src/assets/posters/posters4.png'),
          to: path.resolve(__dirname, 'dist/assets/posters'),
        },
        {
          from: path.resolve(__dirname, 'src/assets/posters/posters5.png'),
          to: path.resolve(__dirname, 'dist/assets/posters'),
        },
        {
          from: path.resolve(__dirname, 'src/assets/posters/posters6.png'),
          to: path.resolve(__dirname, 'dist/assets/posters'),
        },
        {
          from: path.resolve(__dirname, 'src/assets/posters/posters7.png'),
          to: path.resolve(__dirname, 'dist/assets/posters'),
        },
        {
          from: path.resolve(__dirname, 'src/assets/posters/posters8.png'),
          to: path.resolve(__dirname, 'dist/assets/posters'),
        },
        {
          from: path.resolve(__dirname, 'src/assets/posters/posters9.png'),
          to: path.resolve(__dirname, 'dist/assets/posters'),
        },
        {
          from: path.resolve(__dirname, 'src/assets/posters/posters10.png'),
          to: path.resolve(__dirname, 'dist/assets/posters'),
        },
        {
          from: path.resolve(__dirname, 'src/assets/posters/posters11.png'),
          to: path.resolve(__dirname, 'dist/assets/posters'),
        },
        {
          from: path.resolve(__dirname, 'src/assets/posters/posters12.png'),
          to: path.resolve(__dirname, 'dist/assets/posters'),
        },
        {
          from: path.resolve(__dirname, 'src/assets/romance.svg'),
          to: path.resolve(__dirname, 'dist/assets'),
        },
        {
          from: path.resolve(__dirname, 'src/assets/cinema.svg'),
          to: path.resolve(__dirname, 'dist/assets'),
        },
        {
          from: path.resolve(__dirname, 'src/assets/history.svg'),
          to: path.resolve(__dirname, 'dist/assets'),
        },
        {
          from: path.resolve(__dirname, 'src/assets/killer.svg'),
          to: path.resolve(__dirname, 'dist/assets'),
        },
        {
          from: path.resolve(__dirname, 'src/assets/rocket.svg'),
          to: path.resolve(__dirname, 'dist/assets'),
        },
        {
          from: path.resolve(__dirname, 'src/assets/ghost.svg'),
          to: path.resolve(__dirname, 'dist/assets'),
        },
        {
          from: path.resolve(__dirname, 'src/assets/smile.svg'),
          to: path.resolve(__dirname, 'dist/assets'),
        },
        {
          from: path.resolve(__dirname, 'src/assets/castle.svg'),
          to: path.resolve(__dirname, 'dist/assets'),
        },
        {
          from: path.resolve(__dirname, 'src/assets/one.png'),
          to: path.resolve(__dirname, 'dist/assets'),
        },
        {
          from: path.resolve(__dirname, 'src/assets/two.png'),
          to: path.resolve(__dirname, 'dist/assets'),
        },
        {
          from: path.resolve(__dirname, 'src/assets/three.png'),
          to: path.resolve(__dirname, 'dist/assets'),
        },
        {
          from: path.resolve(__dirname, 'src/assets/four.png'),
          to: path.resolve(__dirname, 'dist/assets'),
        },
        {
          from: path.resolve(__dirname, 'src/assets/five.png'),
          to: path.resolve(__dirname, 'dist/assets'),
        },
        {
          from: path.resolve(__dirname, 'src/assets/six.png'),
          to: path.resolve(__dirname, 'dist/assets'),
        },
        {
          from: path.resolve(__dirname, 'src/assets/marketing/1.png'),
          to: path.resolve(__dirname, 'dist/assets/marketing'),
        },
        {
          from: path.resolve(__dirname, 'src/assets/marketing/2.png'),
          to: path.resolve(__dirname, 'dist/assets/marketing'),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: filenameCss('css'),
    }),
  ]

  if (isProd) {
    base.push(new BundleAnalyzerPlugin())
  }

  return base;
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: ['@babel/polyfill', './index.js'],
    slickCustom: './scripts/slickCustom.js'
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: filenameJs('js'),
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.json', '.png', '.jpg', '.less', '.gif', '.icon', '.pug'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  optimization: optimization(),
  plugins: plugins(),
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        use: cssLoaders('less-loader'),
      },
      {
        test: /\.(?:jpg|jpeg|gif|png|ico|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(?:ttf|woff2|eot|otf)$/i,
        type: 'asset/inline',
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }, 
        },
      },
      {
        test: /\.pug$/,
        exclude: /(node_modules|bower_component)/,
        use: {
          loader: 'pug-loader',
          options: {
            pretty: isDev
          },
        },
      },
      {
        test: require.resolve("jquery"),
        use: [
          {
            loader: "expose-loader",
            options: {
              exposes: ["$", "jquery"],
            },
          },
        ]
      },
    ],
  },
};