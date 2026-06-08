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
 * View-side behaviour for tiny_bootstrap: stop videos when a Bootstrap modal
 * that was inserted by this plugin is dismissed. Without this, YouTube/Vimeo
 * iframes and HTML5 <video> elements keep playing audio in the hidden modal.
 *
 * @module     tiny_bootstrap/view
 * @copyright  2026 Skin Cancer College of Australasia <admin@skincancercollege.org>
 * @license    https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

const stopVideosIn = (root) => {
    root.querySelectorAll('video').forEach((v) => {
        try {
            v.pause();
            v.currentTime = 0;
        } catch (e) {
            // Ignore — element may be in a partial state.
        }
    });
    root.querySelectorAll('iframe').forEach((iframe) => {
        const src = iframe.getAttribute('src');
        if (!src) {
            return;
        }
        // Reassigning the same src reloads the iframe, which stops playback
        // for YouTube, Vimeo and other embeds without needing their JS APIs.
        iframe.setAttribute('src', src);
    });
};

const onHidden = (event) => {
    const modal = event.target;
    // Only act on modals this plugin inserted — other plugins' modals may
    // legitimately rely on their iframes' in-memory state surviving a hide.
    if (!modal || !modal.classList || !modal.classList.contains('tiny-bootstrap-modal')) {
        return;
    }
    stopVideosIn(modal);
};

export const init = () => {
    if (window.tinyBootstrapViewInit) {
        return;
    }
    window.tinyBootstrapViewInit = true;
    document.addEventListener('hidden.bs.modal', onHidden, true);
};
