module.exports = {
  entry: './src/browser/index.js'  ,
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      Components: __dirname + '/src/browser/components',
      Actions: __dirname + '/src/browser/actions',
      Reducers: __dirname + '/src/browser/reducers',
      Utils: __dirname + '/src/utils',
      Root: __dirname + '/src/browser'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react', 'stage-2'],
            plugins: ["transform-class-properties"]
          }
        }
      },
      {
        test:  /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {}
        }
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ]
  },
  stats: {
    warnings: false
  },
  devtool: 'inline-source-map'
};