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
 * @copyright  2026 Skin Cancer College of Australasia <admin@skincancercollege.org>
 * @license    https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
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
     * Inject the admin-defined branding CSS into the page head so it applies
     * both inside the editor and on view pages where the components render.
     *
     * @param \core\hook\output\before_standard_head_html_generation $hook
     */
    public static function before_standard_head_html_generation(
        \core\hook\output\before_standard_head_html_generation $hook
    ): void {
        $css = trim((string) get_config('tiny_bootstrap', 'customcss'));
        if ($css === '') {
            return;
        }
        // Strip any closing style tag so the admin CSS cannot break out of the
        // element it is placed in.
        $css = str_ireplace('</style>', '', $css);
        $hook->add_html('<style id="tiny-bootstrap-custom-css">' . "\n" . $css . "\n" . '</style>');
    }
}
