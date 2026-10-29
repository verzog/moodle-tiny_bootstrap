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
 * Tests for the admin-set heading colours and default component colours.
 *
 * @package    tiny_bootstrap
 * @copyright  2026 Vernon Spain
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

namespace tiny_bootstrap\local;

/**
 * Tests for {@see styles}.
 */
#[\PHPUnit\Framework\Attributes\CoversClass(styles::class)]
final class styles_test extends \advanced_testcase {
    /**
     * Hex colours in the forms the admin colour picker can save.
     *
     * @return array
     */
    public static function normalise_hex_provider(): array {
        return [
            'six digits' => ['#1a2b3c', '#1a2b3c'],
            'upper case' => ['#1A2B3C', '#1a2b3c'],
            'no hash' => ['1a2b3c', '#1a2b3c'],
            'three digits' => ['#abc', '#aabbcc'],
            'surrounding spaces' => ['  #abc  ', '#aabbcc'],
            'colour name' => ['red', null],
            'rgb' => ['rgb(1, 2, 3)', null],
            'blank' => ['', null],
            'too long' => ['#1a2b3c4', null],
        ];
    }

    /**
     * A hex colour becomes #rrggbb; anything else is rejected.
     *
     * @param string $value
     * @param string|null $expected
     */
    #[\PHPUnit\Framework\Attributes\DataProvider('normalise_hex_provider')]
    public function test_normalise_hex(string $value, ?string $expected): void {
        $this->assertSame($expected, styles::normalise_hex($value));
    }

    /**
     * Unset or invalid default colours fall back to the neutral Bootstrap colours.
     */
    public function test_colour_defaults(): void {
        $this->resetAfterTest();

        $this->assertSame(styles::DEFAULT_COLOURS, styles::colour_defaults());

        set_config('default_adbanner_bg', '#ABC', 'tiny_bootstrap');
        set_config('default_cardrow_bg', 'red', 'tiny_bootstrap');
        $colours = styles::colour_defaults();
        $this->assertSame('#aabbcc', $colours['default_adbanner_bg']);
        $this->assertSame(styles::DEFAULT_COLOURS['default_cardrow_bg'], $colours['default_cardrow_bg']);
    }

    /**
     * The default padding is 'standard' unless a known choice is set.
     */
    public function test_default_padding(): void {
        $this->resetAfterTest();

        $this->assertSame('standard', styles::default_padding());

        set_config('default_padding', 'large', 'tiny_bootstrap');
        $this->assertSame('large', styles::default_padding());

        set_config('default_padding', 'huge', 'tiny_bootstrap');
        $this->assertSame('standard', styles::default_padding());
    }

    /**
     * Only heading levels with a colour get a rule, scoped to the plugin's heading class.
     */
    public function test_heading_css(): void {
        $this->resetAfterTest();

        $this->assertSame('', styles::heading_css());

        set_config('headingcolour1', '#112233', 'tiny_bootstrap');
        set_config('headingcolour3', 'darkblue', 'tiny_bootstrap');
        $css = styles::heading_css();
        $this->assertStringContainsString("h1.tiny-bs-heading {\n    color: #112233;\n}", $css);
        $this->assertStringContainsString("h3.tiny-bs-heading {\n    color: darkblue;\n}", $css);
        $this->assertStringNotContainsString('h2.', $css);
    }

    /**
     * A value that could close the rule or the style element is dropped.
     */
    public function test_heading_css_rejects_unsafe_values(): void {
        $this->resetAfterTest();

        set_config('headingcolour1', 'red;} body {display:none', 'tiny_bootstrap');
        set_config('headingcolour2', '</style><script>', 'tiny_bootstrap');
        $this->assertSame('', styles::heading_css());
    }
}
