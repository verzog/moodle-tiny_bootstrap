const babel = require('@babel/core');
const terser = require('terser');
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'amd/src');
const buildDir = path.join(__dirname, 'amd/build');

const modules = ['commands', 'common', 'plugin', 'configuration'];

(async () => {
    for (const name of modules) {
        const srcFile = path.join(srcDir, `${name}.js`);
        const outFile = path.join(buildDir, `${name}.min.js`);
        const mapFile = path.join(buildDir, `${name}.min.js.map`);
        const moduleId = `tiny_bootstrap/${name}`;

        // Babel: AMD transform only. No preset-env so const/let are preserved
        // and the output closely matches the Moodle grunt build.
        const babelResult = await babel.transformFileAsync(srcFile, {
            plugins: [
                ['@babel/plugin-transform-modules-amd', {moduleId}],
            ],
            sourceMaps: true,
            sourceFileName: `../src/${name}.js`,
        });

        // Terser v5 async API; ecma:2015 preserves const/let; mangle:false
        // keeps _exports/_utils style names to match the Moodle grunt output.
        const minified = await terser.minify(babelResult.code, {
            sourceMap: {
                content: JSON.stringify(babelResult.map),
                url: `${name}.min.js.map`,
                includeSources: true,
            },
            ecma: 2015,
            mangle: false,
            compress: {defaults: true},
            format: {
                comments: /^\*!|@license|@preserve|@copyright/,
            },
        });

        fs.writeFileSync(outFile, minified.code);
        fs.writeFileSync(mapFile, minified.map);
        console.log(`Built ${name}.min.js`);
    }
})();
