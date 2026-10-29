// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Editor options for tiny_bootstrap: the admin-set default component colours,
 * default padding and editor CSS passed from plugininfo::get_plugin_configuration_for_context().
 *
 * @module     tiny_bootstrap/options
 * @copyright  2026 Vernon Spain
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import {getPluginOptionName} from 'editor_tiny/options';
import {pluginName} from './common';

const colourDefaultsName = getPluginOptionName(pluginName, 'colourdefaults');
const defaultPaddingName = getPluginOptionName(pluginName, 'defaultpadding');
const editorCssName = getPluginOptionName(pluginName, 'editorcss');

/**
 * Register the plugin's options with the editor.
 *
 * @param {TinyMCE} editor
 */
export const register = (editor) => {
    const registerOption = editor.options.register;
    registerOption(colourDefaultsName, {
        processor: 'object',
        "default": {},
    });
    registerOption(defaultPaddingName, {
        processor: 'string',
        "default": 'standard',
    });
    registerOption(editorCssName, {
        processor: 'string',
        "default": '',
    });
};

/**
 * Get the admin-set default colours for the Ad Banner and Card Row dialogs.
 *
 * @param {TinyMCE} editor
 * @returns {Object} #rrggbb colours keyed by setting name.
 */
export const getColourDefaults = (editor) => editor.options.get(colourDefaultsName) || {};

/**
 * Get the admin-set padding the Ad Banner and Jumbotron dialogs start with.
 *
 * @param {TinyMCE} editor
 * @returns {string} 'standard', 'none', 'small', 'medium' or 'large'.
 */
export const getDefaultPadding = (editor) => editor.options.get(defaultPaddingName) || 'standard';

/**
 * Get the CSS for the editor content area: the heading colours and the admin's custom CSS.
 *
 * @param {TinyMCE} editor
 * @returns {string}
 */
export const getEditorCss = (editor) => editor.options.get(editorCssName) || '';
