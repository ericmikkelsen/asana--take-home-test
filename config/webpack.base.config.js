
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')

module.exports = {
  module: {
        rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins: [
        new Dotenv(),
        new HtmlWebpackPlugin({ 
            template: './src/index.html', 
            filename: './index.html' 
        }),
    ],
    "resolve": {
        "alias": {
            "react": "preact-compat",
            "react-dom": "preact-compat"
        }
    }
}