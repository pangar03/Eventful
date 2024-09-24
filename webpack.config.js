const path = require('path');

module.exports = {
entry: './src/indexAbuelo.ts',
module: {
    rules: [
    {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    },
    ],
},
resolve: {
    extensions: ['.tsx', '.ts', '.js'],
},
output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
},
};
module.exports = {
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
      ],
    },
  };