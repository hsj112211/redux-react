const path = require('path')                                        
const HtmlWebpackPlugin = require('html-webpack-plugin')            

module.exports = {                                      
    entry: {
        app: ['babel-polyfill', './src/index.js']
    },                            
    output: {      
        path: path.resolve(__dirname, 'dist/'),
        filename: 'index_bundle.js',
        publicPath: '/'
    },
    module: {                                           
        rules: [
            {
                test: /\.js$/,                          
                exclude: /node_module/,                 
                use:{
                    loader: 'babel-loader'				
                }
            },
        ]
    },
    devServer: {
        contentBase: 'public',
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'                
        }),
    ],
}