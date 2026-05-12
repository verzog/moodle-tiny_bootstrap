// Minimal Moodle-equivalent AMD build for tiny_bootstrap.
// Reproduces the babel + terser pipeline that Moodle's grunt 'amd' task uses,
// so the resulting amd/build/*.min.js bytes match what CI would regenerate.
//
// Usage:  node build.js  (from the repo root)

const path = require('path');
const fs = require('fs');

process.chdir(path.resolve(__dirname, '..'));

// Load the Moodle deps installed in /tmp/mbuild/node_modules.
const MOODLE_NODE_MODULES = '/tmp/mbuild/node_modules';
require('module').Module._nodeModulePaths = (function (orig) {
    return function (from) {
        return orig.call(this, from).concat(MOODLE_NODE_MODULES);
    };
})(require('module').Module._nodeModulePaths);

const babel = require('@babel/core');
const terser = require('rollup-plugin-terser').terser;
const rollup = require('rollup');

// The babel-plugin-add-module-to-define plugin that ships in Moodle's tree
// looks up the component name via .grunt/components.js. We don't have that
// here, so we use a wrapper that takes the moduleName as a parameter.
const addModuleNamePlugin = ({template, types}, opts) => ({
    pre() {
        this.seenDefine = false;
        this.addedReturnForDefaultExport = false;
    },
    visitor: {
        Program: {
            exit(p) {
                const moduleName = opts.moduleName;
                if (!moduleName) {
                    throw new Error('moduleName option not set');
                }
                const self = this;
                p.traverse({
                    CallExpression(p2) {
                        if (!self.seenDefine && p2.get('callee').isIdentifier({name: 'define'})) {
                            self.seenDefine = true;
                            if (p2.node.arguments.length > 0
                                && p2.node.arguments[0].type === 'StringLiteral') {
                                p2.node.arguments.shift();
                            }
                            p2.node.arguments.unshift(types.stringLiteral(moduleName));
                            p2.node.callee.name = 'define ';
                        }
                        if (!self.addedReturnForDefaultExport
                            && p2.get('callee').matchesPattern('Object.defineProperty')) {
                            const [identifier, prop] = p2.get('arguments');
                            const objectName = identifier.get('name').node;
                            const propertyName = prop.get('value').node;
                            if ((objectName === 'exports' || objectName === '_exports')
                                && propertyName === 'default') {
                                addModuleExportsDefaults(p2, objectName);
                                self.addedReturnForDefaultExport = true;
                            }
                        }
                    },
                    AssignmentExpression(p2) {
                        if (!self.addedReturnForDefaultExport
                            && (p2.get('left').matchesPattern('exports.default')
                                || p2.get('left').matchesPattern('_exports.default'))) {
                            const objectName = p2.get('left.object.name').node;
                            addModuleExportsDefaults(p2, objectName);
                            self.addedReturnForDefaultExport = true;
                        }
                    },
                }, self);

                function addModuleExportsDefaults(p3, exportObjectName) {
                    const rootPath = p3.findParent((q) => q.key === 'body' || !q.parentPath);
                    rootPath.node.body.push(template(`return ${exportObjectName}.default`)());
                }
            },
        },
    },
});

const componentDir = 'tiny_bootstrap';

const babelOptions = (moduleName) => ({
    sourceMaps: true,
    comments: false,
    compact: false,
    plugins: [
        'transform-es2015-modules-amd-lazy',
        'system-import-transformer',
        [addModuleNamePlugin, {moduleName}],
    ],
    presets: [
        ['@babel/preset-env', {
            modules: false,
            useBuiltIns: false,
            targets: {
                browsers: [
                    '>0.3%',
                    'last 2 versions',
                    'not ie >= 0',
                    'not op_mini all',
                    'not Opera > 0',
                    'not dead',
                ],
            },
        }],
    ],
});

const babelRollupPlugin = () => ({
    name: 'babel',
    transform(code, id) {
        const moduleName = `tiny_bootstrap/${path.basename(id, '.js')}`;
        const out = babel.transformSync(code, {...babelOptions(moduleName), filename: id});
        return {code: out.code, map: out.map};
    },
});

async function buildOne(srcName) {
    const input = path.resolve('amd/src', srcName);
    const outFile = path.resolve('amd/build', srcName.replace(/\.js$/, '.min.js'));

    const bundle = await rollup.rollup({
        input,
        treeshake: false,
        context: 'window',
        external: () => true,
        plugins: [
            babelRollupPlugin(),
            terser({
                mangle: false,
                output: {comments: false},
            }),
        ],
    });

    const {output} = await bundle.generate({
        format: 'esm',
        sourcemap: true,
        file: outFile,
    });

    for (const chunk of output) {
        if (chunk.type === 'chunk') {
            const mapUrl = `\n//# sourceMappingURL=${path.basename(outFile)}.map`;
            fs.writeFileSync(outFile, chunk.code + mapUrl);
            if (chunk.map) {
                fs.writeFileSync(outFile + '.map', chunk.map.toString());
            }
        }
    }
    console.log('built', outFile);
}

(async () => {
    const srcDir = 'amd/src';
    const files = fs.readdirSync(srcDir).filter((f) => f.endsWith('.js'));
    for (const f of files) {
        await buildOne(f);
    }
})().catch((e) => {
    console.error(e);
    process.exit(1);
});
