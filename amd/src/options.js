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
 * Editor options for tiny_bootstrap: the admin-set default component colours
 * and heading CSS passed from plugininfo::get_plugin_configuration_for_context().
 *
 * @module     tiny_bootstrap/options
 * @copyright  2026 Vernon Spain
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import {getPluginOptionName} from 'editor_tiny/options';
import {pluginName} from './common';

const colourDefaultsName = getPluginOptionName(pluginName, 'colourdefaults');
const headingCssName = getPluginOptionName(pluginName, 'headingcss');

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
    registerOption(headingCssName, {
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
 * Get the CSS that colours headings inserted with the Heading component.
 *
 * @param {TinyMCE} editor
 * @returns {string}
 */
export const getHeadingCss = (editor) => editor.options.get(headingCssName) || '';
