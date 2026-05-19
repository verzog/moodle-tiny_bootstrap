import resolve from '@rollup/plugin-node-resolve';
import {createRequire} from 'module';
import path from 'path';
import {fileURLToPath} from 'url';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const babelCore = require('@babel/core');
const terserPlugin = require('rollup-plugin-terser').terser;

const babel = (options = {}) => ({
    name: 'babel',
    transform: (code, id) => {
        options.filename = id;
        const transformed = babelCore.transform(code, options);
        return {code: transformed.code, map: transformed.map};
    }
});

export default {
    input: 'amd/src/commands.js',
    output: {
        file: 'amd/build/commands.min.js',
        format: 'esm',
        sourcemap: true,
    },
    treeshake: false,
    context: 'window',
    external: (id, parentId) => parentId !== undefined,
    plugins: [
        resolve(),
        babel({
            sourceMaps: true,
            comments: false,
            compact: false,
            plugins: [
                'transform-es2015-modules-amd-lazy',
                'system-import-transformer',
                path.resolve(__dirname, '.grunt/babel-plugin-add-module-to-define.js'),
            ],
            presets: [
                ['@babel/preset-env', {modules: false, useBuiltIns: false}],
            ],
        }),
        terserPlugin({mangle: false, module: false}),
    ],
};
