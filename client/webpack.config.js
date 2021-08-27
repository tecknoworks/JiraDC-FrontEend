const webpack = require('webpack');
const dotenv = require('dotenv');

const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = () => {
    // call dotenv and it will return an Object with a parsed key 
    const env = dotenv.config().parsed;

    // reduce it to a nice object, the same as before
    const envKeys = Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {});

    return {
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: "html-loader"
                        }
                    ]
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: ['style-loader', 'css-loader', 'sass-loader'],
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                },
                {

                    test: /\.(jpg|png)$/,
            
                    use: {
            
                      loader: 'url-loader',
            
                    },
            
                },
                {
                    test: /\.svg$/,
                    use: ['@svgr/webpack'],
                  },
                  
                 
            ]
        },
        output: {
            publicPath: '/'
        },
        devServer: {
            historyApiFallback: true,
        },
        plugins: [
            new HtmlWebPackPlugin({
                template: "./index.html",
                filename: "./index.html"
            }),
            new webpack.DefinePlugin(envKeys),
            new CopyPlugin({
                patterns: [
                    { from: 'public', to: 'public' },
                ],
            })
        ]
    }
};