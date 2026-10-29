<?php
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
 * Admin settings for tiny_bootstrap.
 *
 * @package    tiny_bootstrap
 * @copyright  2025 Vernon Spain
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

if ($ADMIN->fulltree) {
    // Heading colours: one colour picker per level, applied only to headings
    // inserted with the Heading component. Blank keeps the theme colour.
    $settings->add(new admin_setting_heading(
        'tiny_bootstrap/headingcolours',
        get_string('headingcolours', 'tiny_bootstrap'),
        get_string('headingcolours_desc', 'tiny_bootstrap')
    ));
    for ($level = 1; $level <= 6; $level++) {
        $settings->add(new admin_setting_configcolourpicker(
            'tiny_bootstrap/headingcolour' . $level,
            get_string('headingcolour', 'tiny_bootstrap', $level),
            get_string('headingcolour_desc', 'tiny_bootstrap', $level),
            ''
        ));
    }

    // Default component colours: the colours the Ad Banner and Card Row dialogs
    // start with. Authors can still change them for each component.
    $settings->add(new admin_setting_heading(
        'tiny_bootstrap/defaultcolours',
        get_string('defaultcolours', 'tiny_bootstrap'),
        get_string('defaultcolours_desc', 'tiny_bootstrap')
    ));
    foreach (\tiny_bootstrap\local\styles::DEFAULT_COLOURS as $name => $default) {
        $settings->add(new admin_setting_configcolourpicker(
            'tiny_bootstrap/' . $name,
            get_string($name, 'tiny_bootstrap'),
            '',
            $default
        ));
    }

    $settings->add(new admin_setting_heading(
        'tiny_bootstrap/customcssheading',
        get_string('customcss', 'tiny_bootstrap'),
        ''
    ));
    $settings->add(new admin_setting_configtextarea(
        'tiny_bootstrap/customcss',
        get_string('customcss', 'tiny_bootstrap'),
        get_string('customcss_desc', 'tiny_bootstrap'),
        '',
        PARAM_RAW,
        '60',
        '12'
    ));
}
