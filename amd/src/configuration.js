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
 * Toolbar and menu placement for tiny_bootstrap.
 *
 * @module     tiny_bootstrap/configuration
 * @copyright  2025 Skin Cancer College of Australasia <admin@skincancercollege.org>
 * @license    https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import {addMenubarItem, addToolbarButtons} from 'editor_tiny/utils';
import {buttonName} from './common';

export const configure = (instanceConfig) => ({
    toolbar: addToolbarButtons(instanceConfig.toolbar, 'content', [buttonName]),
    menu: addMenubarItem(instanceConfig.menu, 'insert', buttonName),
});
