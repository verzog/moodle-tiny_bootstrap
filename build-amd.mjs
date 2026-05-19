/**
 * AMD build script replicating Moodle's grunt AMD pipeline.
 * Matches Moodle's grunt-rollup config: babel-plugin-transform-es2015-modules-amd-lazy,
 * @babel/preset-env (no targets = all browsers), terser mangle:false.
 */

import * as babel from '@babel/core';
import { minify } from 'terser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoDir = __dirname;

const COMPONENT = 'tiny_bootstrap'; // from version.php $plugin->component
const SRC_DIR = path.join(__dirname, 'amd/src');
const BUILD_DIR = path.join(__dirname, 'amd/build');

// Matches Moodle's babel-plugin-add-module-to-define.js:
// inserts the module ID as first arg of define() if not already a string.
function makeAddModuleToDefinePlugin(moduleId) {
    return ({ types: t }) => ({
        visitor: {
            Program: {
                exit(programPath) {
                    programPath.traverse({
                        CallExpression(nodePath) {
                            const callee = nodePath.node.callee;
                            if (
                                t.isIdentifier(callee, { name: 'define' }) &&
                                nodePath.node.arguments.length >= 1 &&
                                !t.isStringLiteral(nodePath.node.arguments[0])
                            ) {
                                nodePath.node.arguments.unshift(t.stringLiteral(moduleId));
                            }
                        },
                    });
                },
            },
        },
    });
}

// Removes "use strict" directives that babel's AMD transform inserts.
function stripUseStrictPlugin() {
    return {
        visitor: {
            Directive(nodePath) {
                if (nodePath.node.value.value === 'use strict') {
                    nodePath.remove();
                }
            },
        },
    };
}

// Post-process: wrap the factory function in parens to match Moodle's output format.
// define("m",[...],function(...){...}); → define("m",[...],(function(...){...}));
function wrapFactoryInParens(code) {
    const factoryStart = code.search(/,function\s*\(/);
    if (factoryStart === -1) return code;

    // Insert '(' before 'function'
    const insertAt = factoryStart + 1;
    let result = code.slice(0, insertAt) + '(' + code.slice(insertAt);

    // Change the closing '}); ' before the sourceMappingURL to '})); '
    const mapIdx = result.indexOf('\n//# sourceMappingURL=');
    const codePart = mapIdx !== -1 ? result.slice(0, mapIdx) : result;
    const lastClose = codePart.lastIndexOf('});');
    if (lastClose !== -1) {
        result = result.slice(0, lastClose) + '}));' + result.slice(lastClose + 3);
    }

    return result;
}

const files = ['commands.js'];

for (const file of files) {
    const srcFile = path.join(SRC_DIR, file);
    const baseName = path.basename(file, '.js');
    const moduleId = `${COMPONENT}/${baseName}`;
    const outFile = path.join(BUILD_DIR, baseName + '.min.js');
    const outMapFile = outFile + '.map';

    console.log(`Building ${file} → amd/build/${baseName}.min.js  [${moduleId}]`);

    const source = fs.readFileSync(srcFile, 'utf8');

    // Step 1: Babel transform matching Moodle's grunt config exactly.
    // Key: NO targets in preset-env → compiles for all browsers (incl. IE),
    // converting const/let → var, arrow functions, template literals, etc.
    const babelResult = babel.transformSync(source, {
        filename: srcFile,
        sourceMaps: true,
        comments: false,
        compact: false,
        babelrc: false,
        configFile: false,
        plugins: [
            path.join(repoDir, 'node_modules/babel-plugin-transform-es2015-modules-amd-lazy/lib/index.js'),
            makeAddModuleToDefinePlugin(moduleId),
            stripUseStrictPlugin,
            // Explicit template literal transform: Moodle's caniuse-lite resolves browserslist
            // to include browsers without template literal support, so .concat() is generated.
            '@babel/plugin-transform-template-literals',
        ],
        presets: [
            [path.join(repoDir, 'node_modules/@babel/preset-env/lib/index.js'), {
                modules: false,
                useBuiltIns: false,
                // Browser targets matching Moodle's package.json browserslist config.
                // Explicit targets needed to preserve async/await (no regenerator transform).
                targets: {
                    browsers: ['>0.3%', 'last 2 versions', 'not dead', 'not ie > 0', 'not op_mini all'],
                },
            }],
        ],
    });

    // Step 2: Minify with terser (mangle:false matches Moodle's grunt config)
    const terserResult = await minify(babelResult.code, {
        mangle: false,
        sourceMap: {
            content: JSON.stringify(babelResult.map),
            url: `${baseName}.min.js.map`,
            filename: `${baseName}.min.js`,
        },
    });

    // Step 3: Post-process to wrap factory in parens and ensure trailing newline
    const finalCode = wrapFactoryInParens(terserResult.code + '\n');

    // Write files
    fs.writeFileSync(outFile, finalCode);
    fs.writeFileSync(outMapFile, terserResult.map + '\n');

    console.log(`  Written: ${path.relative(__dirname, outFile)} (${finalCode.length} bytes)`);
}
