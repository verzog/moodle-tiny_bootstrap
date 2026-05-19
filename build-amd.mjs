#!/usr/bin/env node
// Replicates Moodle 5.0's grunt amd pipeline:
//   rollup (esm) → babel (AMD lazy + preset-env) → terser (mangle:false)

import {rollup} from 'rollup';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import {transform} from '@babel/core';
import {createRequire} from 'module';
import path from 'path';
import {fileURLToPath} from 'url';

const require = createRequire(import.meta.url);
const {terser} = require('rollup-plugin-terser');

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const babelPlugin = (options = {}) => ({
    name: 'babel',
    transform: (code, id) => {
        const opts = {...options, filename: id};
        const result = transform(code, opts);
        return {code: result.code, map: result.map};
    },
});

const bundle = await rollup({
    input: 'amd/src/commands.js',
    external: (id, parentId) => parentId !== undefined,
    treeshake: false,
    context: 'window',
    plugins: [
        nodeResolve(),
        babelPlugin({
            sourceMaps: true,
            comments: false,
            compact: false,
            plugins: [
                'transform-es2015-modules-amd-lazy',
                'system-import-transformer',
                path.resolve(__dirname, '.grunt/babel-plugin-add-module-to-define.js'),
            ],
            presets: [
                ['@babel/preset-env', {
                    modules: false,
                    useBuiltIns: false,
                    targets: {
                        browsers: ['>0.3%', 'last 2 versions', 'not ie >= 0',
                            'not op_mini all', 'not Opera > 0', 'not dead'],
                    },
                }],
            ],
        }),
        terser({mangle: false}),
    ],
});

await bundle.write({
    file: 'amd/build/commands.min.js',
    format: 'esm',
    sourcemap: true,
});

console.log('Built amd/build/commands.min.js');
