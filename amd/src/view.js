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
 * @copyright  2025-2026 Skin Cancer College of Australasia <admin@skincancercollege.org>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
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

// Expand a Video and Text media element to fill the screen when its Fullscreen
// button is clicked. The button carries data-tiny-bs-fullscreen with the id of
// the media wrapper; we fullscreen the inner iframe/video (or the wrapper).
const onFullscreenClick = (event) => {
    const btn = event.target.closest('[data-tiny-bs-fullscreen]');
    if (!btn) {
        return;
    }
    const wrap = document.getElementById(btn.getAttribute('data-tiny-bs-fullscreen'));
    if (!wrap) {
        return;
    }
    const el = wrap.querySelector('iframe, video') || wrap;
    const request = el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen;
    if (request) {
        Promise.resolve(request.call(el)).catch((e) => {
            window.console.warn('tiny_bootstrap fullscreen request failed', e);
        });
    }
};

// Scroll a card row by roughly one card when its prev/next control is clicked.
// The row is natively swipeable/scrollable; the arrows are a convenience.
const onCardRowNav = (event) => {
    const btn = event.target.closest('[data-cardrow-nav]');
    if (!btn) {
        return;
    }
    // The control is an anchor (Moodle strips user-content buttons), so stop it
    // following its placeholder href and jumping the page to the top.
    event.preventDefault();
    const row = btn.closest('.tiny-bs-cardrow');
    const track = row && row.querySelector('[data-cardrow-track]');
    if (!track) {
        return;
    }
    const forward = btn.getAttribute('data-cardrow-nav') !== 'prev';
    const card = track.querySelector('.card');
    // Step by one card width plus the gap, or most of the viewport as a fallback.
    const step = card ? card.getBoundingClientRect().width + 16 : track.clientWidth * 0.8;
    // In a right-to-left row the scroll axis is reversed, so moving to a later
    // card is a negative scrollLeft delta on the browsers used here.
    const rtl = window.getComputedStyle(track).direction === 'rtl';
    const sign = (forward ? 1 : -1) * (rtl ? -1 : 1);
    track.scrollBy({left: sign * step, behavior: 'smooth'});
};

export const init = () => {
    if (window.tinyBootstrapViewInit) {
        return;
    }
    window.tinyBootstrapViewInit = true;
    document.addEventListener('hidden.bs.modal', onHidden, true);
    document.addEventListener('click', onFullscreenClick, false);
    document.addEventListener('click', onCardRowNav, false);
};
