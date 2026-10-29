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
 * Hook callbacks for tiny_bootstrap.
 *
 * @package    tiny_bootstrap
 * @copyright  2025 Vernon Spain
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

namespace tiny_bootstrap;

/**
 * Hook callbacks.
 */
class hook_callbacks {
    /**
     * Load the small view-side AMD module that pauses videos and resets
     * iframes when a Bootstrap modal inserted by this plugin is dismissed.
     *
     * @param \core\hook\output\before_footer_html_generation $hook
     */
    public static function before_footer_html_generation(
        \core\hook\output\before_footer_html_generation $hook
    ): void {
        global $PAGE;
        $PAGE->requires->js_call_amd('tiny_bootstrap/view', 'init');
    }

    /**
     * Inject the admin-defined heading colours and branding CSS into the page
     * head so they apply on view pages where the components render. The heading
     * colours come first so the custom CSS can still override them. The editor
     * gets the same CSS through plugininfo, as its content is in an iframe.
     *
     * @param \core\hook\output\before_standard_head_html_generation $hook
     */
    public static function before_standard_head_html_generation(
        \core\hook\output\before_standard_head_html_generation $hook
    ): void {
        $headingcss = local\styles::heading_css();
        if ($headingcss !== '') {
            $hook->add_html('<style id="tiny-bootstrap-heading-css">' . "\n" . $headingcss . "\n" . '</style>');
        }

        $css = local\styles::custom_css();
        if ($css === '') {
            return;
        }
        $hook->add_html('<style id="tiny-bootstrap-custom-css">' . "\n" . $css . "\n" . '</style>');
    }
}
