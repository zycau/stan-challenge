const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const { DefinePlugin } = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = () => {
    return {
        entry: {
            main: './src/index.tsx'
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'app.js',
            publicPath: '/'
        },
        // mode: 'development',
        plugins: [
            new HtmlWebpackPlugin({template: `./index.html`}),
            new DefinePlugin({}),
            new OptimizeCssAssetsPlugin(),
            new MiniCssExtractPlugin({
                filename: 'styles.css'
            }),
            new CleanWebpackPlugin()
        ],
        devServer: {
            port: 3000,
            historyApiFallback: true
        },
        resolve: {            
            extensions: ['*', '.ts', '.tsx', '.js'],
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx|js)$/,
                    use: ['babel-loader'] 
                },
                {
                    test: /\.svg$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                // outputPath: path.resolve(__dirname, 'dist'),
                                publicPath: '/'
                            }
                        }
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',                            
                            options: {
                                modules: true
                            }
                        },
                        'sass-loader',
                    ]
                },
            ]
        }
    }
}