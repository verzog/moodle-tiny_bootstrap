const path = require('path');

// Replicates the Moodle grunt AMD build (webpack 4 style):
//   - Named AMD define() wrappers
//   - Non-relative + relative sibling imports kept as AMD externals
//   - ES5 Babel output for broad browser support
const srcDir = path.resolve(__dirname, 'amd/src');

const entries = {
    commands: path.join(srcDir, 'commands.js'),
    common: path.join(srcDir, 'common.js'),
    plugin: path.join(srcDir, 'plugin.js'),
    configuration: path.join(srcDir, 'configuration.js'),
};

module.exports = Object.entries(entries).map(([name, entryPath]) => ({
    mode: 'production',
    entry: entryPath,
    output: {
        filename: `${name}.min.js`,
        path: path.resolve(__dirname, 'amd/build'),
        library: `tiny_bootstrap/${name}`,
        libraryTarget: 'amd',
        sourceMapFilename: `${name}.min.js.map`,
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                                modules: false,
                                targets: {browsers: ['> 1%', 'last 2 versions', 'ie 11']},
                            }],
                        ],
                    },
                },
            },
        ],
    },
    externals: [
        function(context, request, callback) {
            if (context && context.startsWith(srcDir)) {
                return callback(null, `amd ${request}`);
            }
            callback();
        },
    ],
    optimization: {minimize: true},
    performance: {hints: false},
}));
