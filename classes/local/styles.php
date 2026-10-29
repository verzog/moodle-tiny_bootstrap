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
 * Site-wide styling set by the admin: heading colours and default component colours.
 *
 * @package    tiny_bootstrap
 * @copyright  2026 Vernon Spain
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

namespace tiny_bootstrap\local;

/**
 * Builds the heading CSS and the default component colours from the plugin settings.
 */
class styles {
    /** @var string[] Neutral Bootstrap fallbacks for the default component colours, keyed by setting name. */
    public const DEFAULT_COLOURS = [
        'default_adbanner_bg' => '#212529',
        'default_adbanner_accent' => '#0d6efd',
        'default_adbanner_speakerbg' => '#6c757d',
        'default_adbanner_text' => '#ffffff',
        'default_cardrow_bg' => '#f8f9fa',
    ];

    /** @var string[] Padding choices for the Ad Banner and Jumbotron; 'standard' keeps each component's own padding. */
    public const PADDING_CHOICES = ['standard', 'none', 'small', 'medium', 'large'];

    /** @var string Class added to headings inserted with the Heading component. */
    public const HEADING_CLASS = 'tiny-bs-heading';

    /**
     * Turn a hex colour into the lowercase #rrggbb form an HTML colour input needs.
     *
     * @param string $value A colour such as "#1A2B3C", "1a2b3c" or "#abc".
     * @return string|null The #rrggbb colour, or null when the value is not a hex colour.
     */
    public static function normalise_hex(string $value): ?string {
        $value = strtolower(trim($value));
        if (preg_match('/^#?([0-9a-f]{6})$/', $value, $matches)) {
            return '#' . $matches[1];
        }
        if (preg_match('/^#?([0-9a-f])([0-9a-f])([0-9a-f])$/', $value, $matches)) {
            return '#' . $matches[1] . $matches[1] . $matches[2] . $matches[2] . $matches[3] . $matches[3];
        }
        return null;
    }

    /**
     * The colours the Ad Banner and Card Row dialogs start with.
     *
     * A blank or non-hex setting falls back to the neutral Bootstrap colour.
     *
     * @return string[] #rrggbb colours keyed by setting name.
     */
    public static function colour_defaults(): array {
        $colours = [];
        foreach (self::DEFAULT_COLOURS as $name => $fallback) {
            $colours[$name] = self::normalise_hex((string) get_config('tiny_bootstrap', $name)) ?? $fallback;
        }
        return $colours;
    }

    /**
     * The padding the Ad Banner and Jumbotron dialogs start with.
     *
     * @return string One of PADDING_CHOICES; 'standard' when the setting is unset or unknown.
     */
    public static function default_padding(): string {
        $padding = (string) get_config('tiny_bootstrap', 'default_padding');
        return in_array($padding, self::PADDING_CHOICES, true) ? $padding : 'standard';
    }

    /**
     * CSS that colours the headings inserted with the Heading component.
     *
     * Each level with a colour set gets one rule; blank levels keep the theme colour.
     * The admin colour picker already validates the value, but only characters that
     * appear in a CSS colour are allowed through, so a value can never close the rule
     * or the style element.
     *
     * @return string The CSS, or '' when no heading colour is set.
     */
    public static function heading_css(): string {
        $rules = [];
        for ($level = 1; $level <= 6; $level++) {
            $colour = trim((string) get_config('tiny_bootstrap', 'headingcolour' . $level));
            if ($colour === '' || !preg_match('/^[#a-z0-9(),.% ]+$/i', $colour)) {
                continue;
            }
            $rules[] = 'h' . $level . '.' . self::HEADING_CLASS . " {\n    color: " . $colour . ";\n}";
        }
        return implode("\n", $rules);
    }

    /**
     * The admin's custom CSS, made safe to place inside a style element.
     *
     * Any closing style tag is removed so the CSS cannot break out of the element
     * it is placed in. Only "</style" followed by whitespace, "/" or ">" (or the
     * end of input) is a real end tag to the HTML parser, so match exactly those
     * cases. This blocks the breakout variants without corrupting legitimate CSS
     * such as content: "</styles".
     *
     * @return string The CSS, or '' when none is set.
     */
    public static function custom_css(): string {
        $css = trim((string) get_config('tiny_bootstrap', 'customcss'));
        return preg_replace('#</style(?=[\s/>]|$)#i', '', $css);
    }

    /**
     * CSS for the editor content area: the heading colours, then the custom CSS.
     *
     * The editor content sits in an iframe that only loads the theme's editor
     * stylesheet, so the CSS added to the page head does not reach it. The order
     * matches the page so the custom CSS can still override the heading colours.
     *
     * @return string The CSS, or '' when neither is set.
     */
    public static function editor_css(): string {
        return implode("\n", array_filter([self::heading_css(), self::custom_css()], fn($css) => $css !== ''));
    }
}
