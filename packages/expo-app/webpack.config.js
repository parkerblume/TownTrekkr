const path = require('path');

module.exports = function (env, argv) {
    return {
        mode: 'development', // or 'production'
        // Disable Node.js polyfills for the browser environment
        entry: './__generated__/AppEntry.js',
        node: false,
        // fix react-native issues expo relies on       
        resolve: {
            alias: {
                'react-native': path.resolve(__dirname, 'node_modules', 'react-native')
            },
            extensions: ['.ts', '.tsx', '.js', '.jsx'],
        },
        module: {
            // rules for expo web app handling these file types (not working)
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                            plugins: ['@babel/plugin-transform-flow-strip-types']
                        }
                    }
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: 'flow-loader'
                },
                {
                    test: /\.(ts|tsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'ts-loader'
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
            ]
        },
    };
};

