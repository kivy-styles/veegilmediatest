const webpack= require('webpack');
const path = require('path')

module.exports = {
    mode: 'development',
    entry: {
        app: './src/app.jsx'
    },
    output: {
        path: path.resolve(__dirname, './static/js'),
        filename: '[name].js',
        chunkFilename: '[name].js',
        sourceMapFilename:'[name].js.map'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                default: false,
                vendor: false,
                vendor: {
                    name: 'vendor',
                    chunks: 'all',
                    test: /node.modules/
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env']
                    }
                }

            },
            {
                test:/\.js$/,
                enforce:'pre',
                use:['source-map-loader']
            }
        ]
    }
}