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
 * Helpers for adjusting the editor_tiny toolbar and menubar configs.
 *
 * @package    tiny_bootstrap
 * @copyright  2025 Skin Cancer College of Australasia <admin@skincancercollege.org>
 * @license    https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

namespace tiny_bootstrap\local;

/**
 * Helpers for adjusting the editor_tiny toolbar and menubar configs.
 */
class config {

    /** @var string Button/menu identifier registered by this plugin in JS. */
    public const BUTTON = 'tiny_bootstrap/bootstrap';

    /**
     * Append the tiny_bootstrap button to the editor_tiny toolbar (content group)
     * and menubar (insert section) if it is not already present.
     */
    public static function ensure_default_placement(): void {
        self::append_to_group('toolbar', 'content');
        self::append_to_group('menubar', 'insert');
    }

    /**
     * Append the button to the named group of an editor_tiny config string.
     *
     * Both configs use a YAML-style "group: item item | item" per line. If the
     * setting is unset (using core defaults) or the target group is missing,
     * the value is left alone so we don't override admin customisation.
     *
     * @param string $setting Either 'toolbar' or 'menubar'.
     * @param string $group Target group name (e.g. 'content', 'insert').
     */
    private static function append_to_group(string $setting, string $group): void {
        $current = get_config('editor_tiny', $setting);
        if ($current === false || $current === null || $current === '') {
            return;
        }
        if (strpos($current, self::BUTTON) !== false) {
            return;
        }

        $lines = preg_split('/\r\n|\r|\n/', $current);
        $changed = false;
        foreach ($lines as $i => $line) {
            if (preg_match('/^(\s*' . preg_quote($group, '/') . '\s*:)(.*)$/', $line, $m)) {
                $rest = rtrim($m[2]);
                $lines[$i] = $m[1] . $rest . ' ' . self::BUTTON;
                $changed = true;
                break;
            }
        }

        if ($changed) {
            set_config($setting, implode("\n", $lines), 'editor_tiny');
        }
    }
}
