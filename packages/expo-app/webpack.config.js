const path = require('path');

module.exports = function (env, argv) {
    return {
        mode: 'development', // or 'production'
        // Disable Node.js polyfills for the browser environment
        entry: './__generated__/AppEntry.js',
        node: false,
        module: {
            // rules for expo web app handling these file types (not working)
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react']
                        }
                    }
                },
                {
                    test: /\.(png|jpe?g|gif)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                outputPath: 'images',
                            },
                        },
                    ],
                },
                {
                    test: /\.svg$/,
                    use: ['@svgr/webpack'],
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                },
            ]
        }
    };
};

