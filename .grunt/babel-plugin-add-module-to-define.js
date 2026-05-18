"use strict";
/* eslint-env node */

// Simplified version of Moodle's babel-plugin-add-module-to-define.js
// Derives module name from file path (amd/src/<name>.js → tiny_bootstrap/<name>)
// and injects it as the first argument to define().

module.exports = ({template, types}) => {
    const path = require('path');

    function getModuleNameFromFileName(filename) {
        const rel = filename.replace(/\\/g, '/');
        const match = rel.match(/amd\/src\/(.+)\.js$/);
        if (!match) {
            throw new Error(`Cannot derive module name from ${filename}`);
        }
        return `tiny_bootstrap/${match[1]}`;
    }

    function addModuleExportsDefaults(nodePath, exportObjectName) {
        const rootPath = nodePath.findParent(p => p.key === 'body' || !p.parentPath);
        rootPath.node.body.push(template(`return ${exportObjectName}.default`)());
    }

    return {
        pre() {
            this.seenDefine = false;
            this.addedReturnForDefaultExport = false;
        },
        visitor: {
            Program: {
                exit(nodePath) {
                    nodePath.traverse({
                        CallExpression(nodePath) {
                            if (!this.seenDefine && nodePath.get('callee').isIdentifier({name: 'define'})) {
                                this.seenDefine = true;
                                const moduleName = getModuleNameFromFileName(this.file.opts.filename);
                                if (nodePath.node.arguments.length > 0 &&
                                    nodePath.node.arguments[0].type === 'StringLiteral') {
                                    nodePath.node.arguments.shift();
                                }
                                nodePath.node.arguments.unshift(types.stringLiteral(moduleName));
                                nodePath.node.callee.name = 'define ';
                            }

                            if (!this.addedReturnForDefaultExport &&
                                nodePath.get('callee').matchesPattern('Object.defineProperty')) {
                                const [identifier, prop] = nodePath.get('arguments');
                                const objectName = identifier.get('name').node;
                                const propertyName = prop.get('value').node;
                                if ((objectName === 'exports' || objectName === '_exports') &&
                                    propertyName === 'default') {
                                    addModuleExportsDefaults(nodePath, objectName);
                                    this.addedReturnForDefaultExport = true;
                                }
                            }
                        },
                        AssignmentExpression(nodePath) {
                            if (!this.addedReturnForDefaultExport &&
                                (nodePath.get('left').matchesPattern('exports.default') ||
                                 nodePath.get('left').matchesPattern('_exports.default'))) {
                                const objectName = nodePath.get('left.object.name').node;
                                addModuleExportsDefaults(nodePath, objectName);
                                this.addedReturnForDefaultExport = true;
                            }
                        }
                    }, this);
                }
            }
        }
    };
};
