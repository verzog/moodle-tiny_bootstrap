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
 * Buttons, menu items and dialog flow for tiny_bootstrap.
 *
 * @module     tiny_bootstrap/commands
 * @copyright  2025-2026 Skin Cancer College of Australasia <admin@skincancercollege.org>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import {getButtonImage, displayFilepicker} from 'editor_tiny/utils';
import {get_string as getString, get_strings as getStrings} from 'core/str';
import ModalSaveCancel from 'core/modal_save_cancel';
import ModalCancel from 'core/modal_cancel';
import ModalEvents from 'core/modal_events';
import {buttonName, component, icon} from './common';

// Inline SVGs for the component picker tiles. 24px, currentColor stroke so
// they inherit text colour and look at home next to the label.
const SVG = {
    grid: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" '
        + 'fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" '
        + 'stroke-linejoin="round" aria-hidden="true">'
        + '<rect x="3" y="3" width="7" height="7" rx="1"/>'
        + '<rect x="14" y="3" width="7" height="7" rx="1"/>'
        + '<rect x="3" y="14" width="7" height="7" rx="1"/>'
        + '<rect x="14" y="14" width="7" height="7" rx="1"/>'
        + '</svg>',
    heading: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" '
        + 'fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" '
        + 'stroke-linejoin="round" aria-hidden="true">'
        + '<path d="M6 4v16"/><path d="M18 4v16"/><path d="M6 12h12"/>'
        + '</svg>',
    cards: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" '
        + 'fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" '
        + 'stroke-linejoin="round" aria-hidden="true">'
        + '<rect x="3" y="5" width="5.5" height="14" rx="1"/>'
        + '<rect x="9.25" y="5" width="5.5" height="14" rx="1"/>'
        + '<rect x="15.5" y="5" width="5.5" height="14" rx="1"/>'
        + '</svg>',
    cardrow: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" '
        + 'fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" '
        + 'stroke-linejoin="round" aria-hidden="true">'
        + '<rect x="2.5" y="7" width="7" height="10" rx="1"/>'
        + '<rect x="11" y="7" width="7" height="10" rx="1"/>'
        + '<path d="M20 9.5l2 2.5-2 2.5"/>'
        + '</svg>',
    image: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" '
        + 'fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" '
        + 'stroke-linejoin="round" aria-hidden="true">'
        + '<rect x="3" y="4" width="18" height="16" rx="2"/>'
        + '<circle cx="9" cy="10" r="1.6"/>'
        + '<path d="M21 17l-5-5-9 9"/>'
        + '</svg>',
    jumbotron: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" '
        + 'fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" '
        + 'stroke-linejoin="round" aria-hidden="true">'
        + '<rect x="2.5" y="5" width="19" height="14" rx="2"/>'
        + '<path d="M6 10h12"/><path d="M6 13h8"/>'
        + '<rect x="6" y="15.5" width="5" height="2" rx="0.5"/>'
        + '</svg>',
    carousel: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" '
        + 'fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" '
        + 'stroke-linejoin="round" aria-hidden="true">'
        + '<rect x="5" y="6" width="14" height="12" rx="1.5"/>'
        + '<path d="M3 8v8"/><path d="M21 8v8"/>'
        + '<path d="M10 14l2.5-3 2 2.4L17 11"/>'
        + '</svg>',
    accordion: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" '
        + 'fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" '
        + 'stroke-linejoin="round" aria-hidden="true">'
        + '<rect x="3" y="4" width="18" height="4" rx="1"/>'
        + '<rect x="3" y="10" width="18" height="4" rx="1"/>'
        + '<rect x="3" y="16" width="18" height="4" rx="1"/>'
        + '<path d="M17 6l1.5 1.5M17 12l1.5-1.5M17 18l1.5 1.5"/>'
        + '</svg>',
    table: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" '
        + 'fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" '
        + 'stroke-linejoin="round" aria-hidden="true">'
        + '<rect x="3" y="4" width="18" height="16" rx="1.5"/>'
        + '<path d="M3 9h18"/><path d="M3 14h18"/>'
        + '<path d="M9 4v16"/><path d="M15 4v16"/>'
        + '</svg>',
    imagetext: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" '
        + 'fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" '
        + 'stroke-linejoin="round" aria-hidden="true">'
        + '<rect x="3" y="5" width="9" height="14" rx="1"/>'
        + '<circle cx="6.5" cy="9" r="1"/>'
        + '<path d="M3 16l3-3 3 2.5"/>'
        + '<path d="M15 8h6"/><path d="M15 12h6"/><path d="M15 16h4"/>'
        + '</svg>',
    videotext: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" '
        + 'fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" '
        + 'stroke-linejoin="round" aria-hidden="true">'
        + '<rect x="3" y="5" width="9" height="14" rx="1"/>'
        + '<path d="M6 9l4 2.5L6 14z"/>'
        + '<path d="M15 8h6"/><path d="M15 12h6"/><path d="M15 16h4"/>'
        + '</svg>',
    dropdown: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" '
        + 'fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" '
        + 'stroke-linejoin="round" aria-hidden="true">'
        + '<rect x="4" y="4" width="16" height="5" rx="1.2"/>'
        + '<path d="M14 6l1.5 1.5L17 6"/>'
        + '<rect x="6" y="12" width="12" height="2.4" rx="0.6"/>'
        + '<rect x="6" y="16.5" width="12" height="2.4" rx="0.6"/>'
        + '</svg>',
    cheatsheet: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" '
        + 'fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" '
        + 'stroke-linejoin="round" aria-hidden="true">'
        + '<rect x="4" y="3" width="16" height="18" rx="2"/>'
        + '<path d="M8 7h8"/><path d="M8 11h8"/><path d="M8 15h5"/>'
        + '<path d="M15.5 16.5l1.3 1.3 2.2-2.4"/>'
        + '</svg>',
};

const escapeHtml = (s) => (s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

// User-facing text used by the synchronous builder and dialog helpers is
// prefetched once via loadStrings (called from getSetup) and read from `str`,
// so none of it is hard-coded in the generated markup. fmt substitutes the
// single {$a} placeholder used by the numbered default strings.
let str = {};
const fmt = (template, a) => (template || '').replace('{$a}', a);

const STRING_KEYS = [
    'image_url', 'card_title', 'card_placeholder_body', 'next',
    'grid_1col', 'grid_2col', 'grid_3col', 'grid_4col',
    'click_to_enlarge', 'click_to_play', 'close', 'video_title',
    'background_video', 'previous', 'toggle_dropdown', 'no_video_url',
    'grid_cell', 'heading_default', 'card_default', 'card_default_alt',
    'default_alt', 'default_heading', 'default_body', 'play_video_alt',
    'jumbotron_default_title', 'jumbotron_default_lead', 'slide_default',
    'section_default', 'section_body_default', 'table_heading_cell',
    'table_body_cell', 'dropdown_default_label', 'dropdown_default_action',
    'alt_text', 'describe_image', 'body_text', 'heading_option',
    'heading_text_placeholder', 'cards_n', 'describe_image_sr',
    'image_caption_placeholder', 'imagetext_caption_placeholder',
    'videotext_url_placeholder', 'describe_video_sr',
    'jumbotron_button_placeholder', 'jumbotron_button_url_placeholder',
    'describe_bg_sr', 'caption_title', 'caption_text', 'caption_text_placeholder',
    'section_title', 'section_body', 'sections_n', 'rows_n', 'columns_n',
    'table_caption_placeholder', 'item_text', 'item_default', 'item_link',
    'item_link_placeholder', 'items_n', 'item_heading',
    'colour_primary', 'colour_secondary', 'colour_success', 'colour_danger',
    'colour_warning', 'colour_info', 'colour_light', 'colour_dark',
    'cheatsheet_buttons', 'cheatsheet_buttongroup', 'cheatsheet_left',
    'cheatsheet_middle', 'cheatsheet_right', 'cheatsheet_alerts',
    'cheatsheet_alert_text', 'cheatsheet_badges', 'cheatsheet_listgroup',
    'cheatsheet_list_active', 'cheatsheet_list_second', 'cheatsheet_list_third',
    'cheatsheet_progress', 'cheatsheet_example', 'cheatsheet_spinner',
    'cheatsheet_loading', 'cheatsheet_breadcrumb', 'cheatsheet_home',
    'cheatsheet_library', 'cheatsheet_data', 'cheatsheet_pagination',
    'cheatsheet_pagination_nav',
    'cheatsheet_typography', 'cheatsheet_lead', 'cheatsheet_quote',
    'cheatsheet_button_sizes', 'cheatsheet_large', 'cheatsheet_default',
    'cheatsheet_small', 'cheatsheet_disabled', 'cheatsheet_active',
    'cheatsheet_cards', 'cheatsheet_card_text', 'cheatsheet_card_action',
    'cheatsheet_tables', 'cheatsheet_nav', 'cheatsheet_link',
    'cheatsheet_accordion', 'placeholder_button',
    'rich_bold', 'rich_italic', 'rich_link', 'rich_unlink', 'rich_link_prompt',
    'rich_source', 'videotext_open_modal', 'videotext_fullscreen', 'cancel',
    'slide_button', 'slide_button_url', 'slide_button_colour',
    'cardrow_styling', 'cardrow_size', 'cardrow_size_small', 'cardrow_size_medium',
    'cardrow_size_large', 'cardrow_bg', 'cardrow_bg_colour', 'cardrow_text',
    'cardrow_text_colour', 'cardrow_border', 'cardrow_border_colour',
    'cardrow_radius', 'cardrow_radius_none', 'cardrow_shadow',
];

// Structural and formatting tags allowed in the rich-text fields, with any
// tag-specific attributes. This is broad on purpose so authors can paste
// preformatted HTML (headings, tables, styled blocks, links, images); it is a
// client-side safety pass only — Moodle re-filters the saved HTML through its
// own text sanitiser (HTMLPurifier) when the content is displayed.
const RICH_ALLOWED = {
    A: ['href', 'target', 'rel'], ABBR: [], ADDRESS: [], B: [], BLOCKQUOTE: [],
    BR: [], CAPTION: [], CODE: [], COL: ['span'], COLGROUP: ['span'], DD: [],
    DIV: [], DL: [], DT: [], EM: [], FIGCAPTION: [], FIGURE: [], H1: [], H2: [],
    H3: [], H4: [], H5: [], H6: [], HR: [], I: [], IMG: ['src', 'alt', 'width', 'height'],
    LI: ['value'], MARK: [], OL: ['start', 'type'], P: [], PRE: [], S: [], SMALL: [],
    SPAN: [], STRONG: [], SUB: [], SUP: [], TABLE: [], TBODY: [],
    TD: ['colspan', 'rowspan'], TFOOT: [], TH: ['colspan', 'rowspan', 'scope'],
    THEAD: [], TR: [], U: [], UL: [],
};

// Attributes allowed on any permitted element (plus aria-*/data-* by prefix).
// Note: 'id' is deliberately excluded — some content is rendered twice (a
// caption in both the figure and its zoom modal, a card body in both the card
// and its modal), so preserving pasted ids would create duplicate document ids.
const RICH_GLOBAL_ATTRS = ['class', 'style', 'title', 'role', 'lang', 'dir'];

// Elements removed entirely, along with their contents (never just unwrapped).
const RICH_DROP = ['SCRIPT', 'STYLE', 'IFRAME', 'OBJECT', 'EMBED', 'FORM', 'INPUT',
    'BUTTON', 'SELECT', 'TEXTAREA', 'OPTION', 'LINK', 'META', 'BASE', 'NOSCRIPT',
    'TITLE', 'SVG', 'MATH'];

// Remove C0 control characters and DEL from a string (browsers strip these
// from URLs when navigating, so they must not survive scheme classification).
const stripControlChars = (value) => {
    let out = '';
    for (let i = 0; i < value.length; i++) {
        const code = value.charCodeAt(i);
        if (code > 31 && code !== 127) {
            out += value.charAt(i);
        }
    }
    return out;
};

// Whether a URL value carries an explicit scheme, and if so which one.
const richUrlScheme = (value) => {
    const m = /^([a-z][a-z0-9+.-]*):/i.exec(value);
    return m ? m[1].toLowerCase() : null;
};

// Sanitise rich-text field HTML. Dangerous elements are dropped with their
// contents; unknown-but-harmless elements are unwrapped (their text/children
// survive); event-handler attributes, the editor's reserved data-rich* hooks,
// and unsafe URL schemes are stripped. Parsing happens inside a <template> so
// that untrusted markup does not load resources or run handlers while it is
// being cleaned.
const sanitizeRich = (html) => {
    const tpl = document.createElement('template');
    tpl.innerHTML = html || '';
    const walk = (node) => {
        Array.prototype.slice.call(node.childNodes).forEach((child) => {
            if (child.nodeType === 8) {
                node.removeChild(child);
                return;
            }
            if (child.nodeType !== 1) {
                return;
            }
            const tag = child.tagName;
            if (RICH_DROP.indexOf(tag) !== -1) {
                node.removeChild(child);
                return;
            }
            if (!RICH_ALLOWED[tag]) {
                // Keep the content of unknown but non-dangerous wrappers.
                walk(child);
                while (child.firstChild) {
                    node.insertBefore(child.firstChild, child);
                }
                node.removeChild(child);
                return;
            }
            Array.prototype.slice.call(child.attributes).forEach((attr) => {
                const name = attr.name.toLowerCase();
                // Reserve the editor's own hooks so pasted markup cannot collide
                // with the dialog's field selectors.
                if (name.indexOf('data-rich') === 0) {
                    child.removeAttribute(attr.name);
                    return;
                }
                const permitted = name.indexOf('aria-') === 0 || name.indexOf('data-') === 0
                    || RICH_GLOBAL_ATTRS.indexOf(name) !== -1
                    || RICH_ALLOWED[tag].indexOf(name) !== -1;
                if (!permitted || name.indexOf('on') === 0) {
                    child.removeAttribute(attr.name);
                    return;
                }
                // Strip C0 control characters and DEL before classifying URLs:
                // browsers remove embedded tabs/newlines when navigating, so
                // "java\tscript:" would otherwise slip past the scheme check as a
                // relative link and then execute. The cleaned value is written
                // back so the stored attribute matches what was validated.
                const value = stripControlChars(attr.value || '').trim();
                const scheme = richUrlScheme(value);
                if (name === 'href') {
                    // Relative/anchor links (no scheme) are kept; only unsafe
                    // explicit schemes are rejected.
                    if (scheme && ['https', 'http', 'mailto', 'tel'].indexOf(scheme) === -1) {
                        child.removeAttribute(attr.name);
                    } else if (value) {
                        child.setAttribute(attr.name, value);
                        child.setAttribute('rel', 'noopener noreferrer');
                    } else {
                        child.removeAttribute(attr.name);
                    }
                } else if (name === 'src') {
                    // Keep relative image paths; reject unsafe schemes but allow
                    // http(s) and inline data:image payloads.
                    if (scheme && scheme !== 'https' && scheme !== 'http' && !/^data:image\//i.test(value)) {
                        child.removeAttribute(attr.name);
                    } else if (value) {
                        child.setAttribute(attr.name, value);
                    }
                } else if (name === 'style' && /(javascript:|expression\s*\(|url\s*\(\s*['"]?\s*javascript:)/i.test(value)) {
                    child.removeAttribute(attr.name);
                }
            });
            walk(child);
        });
    };
    walk(tpl.content);
    return tpl.innerHTML.trim();
};

// Read the current HTML from a rich-text field element, honouring whichever
// view (WYSIWYG or raw HTML source) is active.
const readRichEl = (el) => {
    const wrap = el.closest('[data-rich-wrap]');
    const source = wrap && wrap.querySelector('[data-rich-source]');
    if (wrap && wrap.dataset.richMode === 'source' && source) {
        return source.value;
    }
    return el.innerHTML;
};

// Read the raw HTML from a named rich-text field within a container.
const getRich = (root, name) => {
    const el = root.querySelector(`[data-rich="${name}"]`);
    return el ? readRichEl(el) : '';
};

const loadStrings = async() => {
    const values = await getStrings(STRING_KEYS.map((key) => ({key, component})));
    const map = {};
    STRING_KEYS.forEach((key, i) => {
        map[key] = values[i];
    });
    str = map;
};

const buildGrid = (cols, rows = 1) => {
    const widthClass = cols === 1 ? 'col-12' : `col-12 col-md-${12 / cols}`;
    // Bootstrap 5 utility classes give us a 1px light border with rounded
    // corners and a little internal padding so the grid sections are visible
    // while editing without looking heavy.
    const cellInner = 'tiny-bs-grid-cell border rounded p-3';
    const buildRow = () => {
        const colsHtml = Array.from({length: cols}, (_, i) =>
            `<div class="${widthClass}">
  <div class="${cellInner}">
    <p>${escapeHtml(fmt(str.grid_cell, i + 1))}</p>
  </div>
</div>`
        ).join('\n');
        return `<div class="row g-3">\n${colsHtml}\n</div>`;
    };
    const allRows = Array.from({length: rows}, buildRow).join('\n');
    return `<!-- Bootstrap 5 ${cols}-column grid -->
<div class="container-fluid tiny-bs-grid" data-cols="${cols}">
${allRows}
</div>`;
};

const buildHeading = (level, text) => {
    const safe = (text || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;') || escapeHtml(fmt(str.heading_default, level));
    return `<h${level}>${safe}</h${level}>`;
};

// Title is pre-escaped (caller's responsibility); caption is raw and escaped here.
const buildZoomModal = (uid, src, alt, caption = '', title = null) => {
    const capContent = sanitizeRich(caption);
    const capHtml = capContent
        ? `\n        <div class="mt-2 mb-0 text-muted">${capContent}</div>`
        : '';
    const displayTitle = title || alt;
    // Use modal-xl + inline styles so the zoom works on regular view pages where
    // the TinyMCE plugin CSS (styles.css) is not loaded.
    // Setting width:100% + height:65vh + object-fit:contain makes the image fill
    // the modal body and scale up small images while preserving aspect ratio.
    return `<div class="modal fade tiny-bootstrap-modal" id="${uid}" tabindex="-1" aria-label="${alt}" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header py-2">
        <h4 class="modal-title">${displayTitle}</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="${escapeHtml(str.close)}"></button>
      </div>
      <div class="modal-body p-2 text-center"
           style="display:flex;flex-direction:column;align-items:center;justify-content:center;">
        <img src="${src}" alt="${alt}"
             style="width:100%;height:65vh;object-fit:contain;">${capHtml}
      </div>
    </div>
  </div>
</div>`;
};

// Opts: {gap, withImages}. gap is a Bootstrap gutter class ('g-0'…'g-5') that
// sets the spacing between cards; withImages=false renders text-only cards
// (no image, no zoom modal). The cards sit in a responsive .row so they wrap
// and keep equal heights (.h-100) with real spacing between them — unlike
// .card-group, which butts the cards together with no gaps.
const buildCardGroup = (cards, opts = {}) => {
    const {gap = 'g-4', withImages = true} = opts;
    let rowCols = 'row-cols-1 row-cols-md-2';
    if (cards.length >= 4) {
        rowCols = 'row-cols-1 row-cols-sm-2 row-cols-lg-4';
    } else if (cards.length === 3) {
        rowCols = 'row-cols-1 row-cols-md-3';
    }
    const rendered = cards.map((card, i) => {
        const title = escapeHtml(card.title) || escapeHtml(fmt(str.card_default, i + 1));
        const body = sanitizeRich(card.body) || escapeHtml(str.card_placeholder_body);
        if (!withImages) {
            return {
                cardHtml: `  <div class="col">
    <div class="card h-100">
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <div class="card-text">${body}</div>
      </div>
    </div>
  </div>`,
                modalHtml: '',
            };
        }
        const uid = 'bsCardImg' + Math.random().toString(36).slice(2, 9);
        const imgSrc = escapeHtml(card.imageUrl) || 'https://placehold.co/600x300?text=Image';
        const imgAlt = escapeHtml(card.imageAlt) || escapeHtml(fmt(str.card_default_alt, i + 1));
        return {
            cardHtml: `  <div class="col">
    <div class="card h-100">
      <a href="#" class="tiny-bs-card-img-link" data-bs-toggle="modal"
         data-bs-target="#${uid}" title="${escapeHtml(str.click_to_enlarge)}">
        <img src="${imgSrc}" class="card-img-top tiny-bs-card-img"
             style="cursor:zoom-in;" alt="${imgAlt}">
      </a>
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <div class="card-text">${body}</div>
      </div>
    </div>
  </div>`,
            modalHtml: buildZoomModal(uid, imgSrc, imgAlt, card.body, title),
        };
    });
    const cardsHtml = rendered.map(r => r.cardHtml).join('\n');
    const modalsHtml = rendered.map(r => r.modalHtml).filter(Boolean).join('\n\n');
    const modalsBlock = modalsHtml ? `\n\n${modalsHtml}` : '';
    return `<!-- Bootstrap 5 card group -->
<div class="row ${rowCols} ${gap}">
${cardsHtml}
</div>${modalsBlock}`;
};

// The align argument controls placement: 'center' (default) renders a centred
// block figure; 'left'/'right' float the figure so following text wraps
// alongside it. Floated figures get an inline max-width so a wide image can't
// overflow a narrow content area (e.g. a quiz answer box), and img-fluid on the
// image scales it down to fit. Only Bootstrap utility classes + inline styles
// are used so the chosen alignment also renders on view pages where the plugin
// CSS is not loaded.
const buildImageModal = (imageUrl, imageAlt, caption, align = 'center') => {
    const uid = 'bsModal' + Math.random().toString(36).slice(2, 9);
    const src = escapeHtml(imageUrl) || 'https://placehold.co/800x500?text=Image';
    const alt = escapeHtml(imageAlt) || escapeHtml(str.default_alt);
    const capContent = sanitizeRich(caption);
    const figcaption = capContent
        ? `\n  <figcaption class="mt-1 text-muted small">${capContent}</figcaption>`
        : '';
    let figClass = 'text-center';
    let figStyle = '';
    if (align === 'left') {
        figClass = 'float-start me-3 mb-2';
        figStyle = ' style="max-width:50%;"';
    } else if (align === 'right') {
        figClass = 'float-end ms-3 mb-2';
        figStyle = ' style="max-width:50%;"';
    }
    return `<!-- Bootstrap 5 image with zoom modal -->
<figure class="${figClass}"${figStyle}>
  <a href="#" data-bs-toggle="modal" data-bs-target="#${uid}" title="${escapeHtml(str.click_to_enlarge)}">
    <img src="${src}" class="img-fluid img-thumbnail" style="max-height:250px;cursor:zoom-in;" alt="${alt}">
  </a>${figcaption}
</figure>

${buildZoomModal(uid, src, alt, caption)}`;
};

// Layout 'image-right' puts the image on the right; anything else
// (default) puts the image on the left. The image is zoomable via the
// shared modal builder.
const buildImageText = (layout, imageUrl, imageAlt, caption, heading, bodyText) => {
    const uid = 'bsImgTxt' + Math.random().toString(36).slice(2, 9);
    const src = escapeHtml(imageUrl) || 'https://placehold.co/600x400?text=Image';
    const alt = escapeHtml(imageAlt) || escapeHtml(str.default_alt);
    const headingSafe = escapeHtml(heading) || escapeHtml(str.default_heading);
    const bodySafe = sanitizeRich(bodyText) || escapeHtml(str.default_body);
    const imageRight = layout === 'image-right';
    const imageCol = `  <div class="col-12 col-md-6">
    <a href="#" data-bs-toggle="modal" data-bs-target="#${uid}" title="${escapeHtml(str.click_to_enlarge)}">
      <img src="${src}" class="img-fluid rounded" style="cursor:zoom-in;" alt="${alt}">
    </a>
  </div>`;
    const textCol = `  <div class="col-12 col-md-6">
    <h3>${headingSafe}</h3>
    <div>${bodySafe}</div>
  </div>`;
    const cols = imageRight ? `${textCol}\n${imageCol}` : `${imageCol}\n${textCol}`;
    return `<!-- Bootstrap 5 image + text, image ${imageRight ? 'right' : 'left'} -->
<div class="row align-items-center g-4 my-3">
${cols}
</div>

${buildZoomModal(uid, src, alt, caption, headingSafe)}`;
};

// Build the embed markup for a video. YouTube and Vimeo URLs become a
// responsive iframe; anything else is treated as a direct video file URL.
const videoEmbed = (videoUrl) => {
    const url = (videoUrl || '').trim();
    if (!url) {
        return '<div class="ratio ratio-16x9 bg-body-secondary d-flex '
            + 'align-items-center justify-content-center text-muted">'
            + `${escapeHtml(str.no_video_url)}</div>`;
    }
    const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{6,})/);
    const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (yt) {
        return `<div class="ratio ratio-16x9">
          <iframe src="https://www.youtube.com/embed/${escapeHtml(yt[1])}"
                  title="${escapeHtml(str.video_title)}" allowfullscreen></iframe>
        </div>`;
    }
    if (vimeo) {
        return `<div class="ratio ratio-16x9">
          <iframe src="https://player.vimeo.com/video/${escapeHtml(vimeo[1])}"
                  title="${escapeHtml(str.video_title)}" allowfullscreen></iframe>
        </div>`;
    }
    return `<video controls class="w-100" src="${escapeHtml(url)}"></video>`;
};

// Title is pre-escaped (caller's responsibility). Inline styles only, so the
// modal works on view pages where the plugin CSS is not loaded.
const buildVideoModal = (uid, embedHtml, title) => {
    return `<div class="modal fade tiny-bootstrap-modal" id="${uid}" tabindex="-1" aria-label="${title}" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header py-2">
        <h4 class="modal-title">${title}</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="${escapeHtml(str.close)}"></button>
      </div>
      <div class="modal-body p-2">
        ${embedHtml}
      </div>
    </div>
  </div>
</div>`;
};

// Layout 'video-right' puts the video on the right; anything else
// (default) puts the video on the left. The video plays in place; a
// "Fullscreen" button expands it to fill the screen, and an "Open in a larger
// view" button opens the same video in a Bootstrap modal.
const buildVideoText = (layout, videoUrl, heading, bodyText) => {
    const uid = 'bsVidTxt' + Math.random().toString(36).slice(2, 9);
    const mediaId = `${uid}-media`;
    const headingSafe = escapeHtml(heading) || escapeHtml(str.default_heading);
    const bodySafe = sanitizeRich(bodyText) || escapeHtml(str.default_body);
    const videoRight = layout === 'video-right';
    const hasUrl = (videoUrl || '').trim() !== '';

    // Only offer the controls (and build the modal) when there is a real video.
    // The fullscreen button is handled by the view-side module (view.js), which
    // expands the media element referenced by data-tiny-bs-fullscreen.
    const controls = hasUrl
        ? `\n    <div class="mt-2 d-flex flex-wrap gap-2">
      <button type="button" class="btn btn-outline-secondary btn-sm"
              data-tiny-bs-fullscreen="${mediaId}">${escapeHtml(str.videotext_fullscreen)}</button>
      <button type="button" class="btn btn-outline-secondary btn-sm"
              data-bs-toggle="modal" data-bs-target="#${uid}">${escapeHtml(str.videotext_open_modal)}</button>
    </div>`
        : '';
    const modalHtml = hasUrl
        ? `\n${buildVideoModal(uid, videoEmbed(videoUrl), headingSafe)}`
        : '';

    const videoCol = `  <div class="col-12 col-md-6">
    <div id="${mediaId}">${videoEmbed(videoUrl)}</div>${controls}
  </div>`;
    const textCol = `  <div class="col-12 col-md-6">
    <h3>${headingSafe}</h3>
    <div>${bodySafe}</div>
  </div>`;
    const cols = videoRight ? `${textCol}\n${videoCol}` : `${videoCol}\n${textCol}`;
    return `<!-- Bootstrap 5 video + text, video ${videoRight ? 'right' : 'left'} -->
<div class="row align-items-center g-4 my-3">
${cols}
</div>${modalHtml}`;
};

// Build the absolutely-positioned background layer for a jumbotron. Returns
// an empty string when bgType is 'none' or bgUrl is blank. Inline styles only
// so it renders correctly on view pages without the plugin CSS.
const buildJumbotronBackground = (bgType, bgUrl, bgAlt) => {
    const u = (bgUrl || '').trim();
    if (!u || bgType === 'none') {
        return '';
    }
    const cover = 'position:absolute;inset:0;width:100%;height:100%;'
        + 'object-fit:cover;border:0;pointer-events:none;z-index:0;';
    if (bgType === 'image') {
        const alt = escapeHtml(bgAlt);
        return `\n  <img src="${escapeHtml(u)}" alt="${alt}" style="${cover}">`;
    }
    // The remaining case is bgType === 'video'.
    const yt = u.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{6,})/);
    const vimeo = u.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (yt) {
        const id = escapeHtml(yt[1]);
        const src = `https://www.youtube.com/embed/${id}`
            + `?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0`
            + `&playsinline=1&modestbranding=1&rel=0&disablekb=1`;
        return `\n  <iframe src="${src}" title="${escapeHtml(str.background_video)}"`
            + ` aria-hidden="true" tabindex="-1"`
            + ` allow="autoplay; encrypted-media" style="${cover}"></iframe>`;
    }
    if (vimeo) {
        const id = escapeHtml(vimeo[1]);
        const src = `https://player.vimeo.com/video/${id}`
            + `?background=1&autoplay=1&muted=1&loop=1`;
        return `\n  <iframe src="${src}" title="${escapeHtml(str.background_video)}"`
            + ` aria-hidden="true" tabindex="-1"`
            + ` allow="autoplay" style="${cover}"></iframe>`;
    }
    return `\n  <video autoplay muted loop playsinline aria-hidden="true"`
        + ` src="${escapeHtml(u)}" style="${cover}"></video>`;
};

const buildJumbotron = (title, lead, buttonText, buttonUrl, bgType, bgUrl, bgAlt, overlay) => {
    const titleSafe = escapeHtml(title) || escapeHtml(str.jumbotron_default_title);
    const leadSafe = sanitizeRich(lead) || escapeHtml(str.jumbotron_default_lead);
    const href = escapeHtml((buttonUrl || '').trim()) || '#';
    const btn = buttonText
        ? `\n    <hr class="my-4">\n    <a class="btn btn-primary btn-lg" href="${href}" role="button">`
            + `${escapeHtml(buttonText)}</a>`
        : '';
    const bg = buildJumbotronBackground(bgType, bgUrl, bgAlt);
    const hasBg = bg !== '';
    const overlayHtml = (hasBg && overlay)
        ? `\n  <div aria-hidden="true" style="position:absolute;inset:0;`
            + `background:rgba(0,0,0,0.45);z-index:1;pointer-events:none;"></div>`
        : '';
    // When there's a background, drop the muted bg-body-tertiary so the media
    // shows through, add overflow:hidden so the cover layer is clipped to
    // rounded corners, and force readable light text over the media.
    const wrapperClass = hasBg
        ? 'position-relative overflow-hidden p-5 mb-4 rounded-3 border'
        : 'p-5 mb-4 bg-body-tertiary rounded-3 border';
    const contentStyle = hasBg
        ? ' style="position:relative;z-index:2;color:#fff;text-shadow:0 1px 3px rgba(0,0,0,0.5);"'
        : '';
    return `<!-- Bootstrap 5 jumbotron -->
<div class="${wrapperClass}">${bg}${overlayHtml}
  <div class="container-fluid py-3"${contentStyle}>
    <h1 class="display-5 fw-bold">${titleSafe}</h1>
    <div class="col-md-9 fs-5">${leadSafe}</div>${btn}
  </div>
</div>`;
};

// Named aspect ratios for carousel slides, mapped to a CSS aspect-ratio value.
const CAROUSEL_RATIOS = {
    '16x9': '16 / 9', '4x3': '4 / 3', '1x1': '1 / 1', '21x9': '21 / 9',
};

// Convert a #rrggbb colour and a 0-1 alpha to an rgba() string.
const hexToRgba = (hex, alpha) => {
    const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec((hex || '').trim());
    if (!m) {
        return `rgba(0, 0, 0, ${alpha})`;
    }
    return `rgba(${parseInt(m[1], 16)}, ${parseInt(m[2], 16)}, ${parseInt(m[3], 16)}, ${alpha})`;
};

// A prev/next chevron drawn with CSS borders rather than an SVG. Moodle's
// output sanitiser strips SVG stroke/fill attributes, which would leave an SVG
// chevron invisible; a rotated bordered box survives (the transform is kept, as
// the control disc's own translate is). Returns just the arrow glyph span.
const chevronIcon = (dir) => {
    const edges = dir === 'prev'
        ? 'border-left:0.16rem solid #fff;border-bottom:0.16rem solid #fff;margin-left:0.2rem;'
        : 'border-right:0.16rem solid #fff;border-top:0.16rem solid #fff;margin-right:0.2rem;';
    return `<span aria-hidden="true" style="display:inline-block;width:0.6rem;height:0.6rem;`
        + `${edges}transform:rotate(45deg);"></span>`;
};

// Modern circular prev/next control: a CSS chevron on a translucent disc, styled
// inline so it renders on view pages without the plugin CSS (Bootstrap's default
// control-icon background images do not always resolve).
const carouselControl = (uid, dir, label) => {
    const disc = 'display:inline-flex;align-items:center;justify-content:center;'
        + 'width:2.75rem;height:2.75rem;border-radius:50%;background:rgba(0,0,0,0.5);'
        + 'box-shadow:0 1px 4px rgba(0,0,0,0.35);';
    // An anchor, not a button: Moodle's output sanitiser drops a user-content
    // button that carries no data-bs-* toggle (data-bs-slide is not one), so a
    // button control is stripped from the page. Bootstrap's carousel data API
    // drives an anchor control natively and suppresses its href navigation.
    return `  <a class="carousel-control-${dir}" href="#" role="button" data-bs-target="#${uid}" data-bs-slide="${dir}">
    <span aria-hidden="true" style="${disc}">${chevronIcon(dir)}</span>
    <span class="visually-hidden">${escapeHtml(label)}</span>
  </a>`;
};

// The ratio argument is '' (natural image height) or a CAROUSEL_RATIOS key
// ('16x9'…) that fixes every slide to the same shape with object-fit:cover so
// mismatched images line up.
// autoslide is '' (off), 'slow' (~7s), or 'fast' (~2.5s).
// captionBg is null, or {colour: '#rrggbb', opacity: 0-1} for a translucent
// panel behind the caption so overlaid text stays readable.
const buildCarousel = (slides, ratio = '', autoslide = '', captionBg = null) => {
    const uid = 'bsCar' + Math.random().toString(36).slice(2, 9);
    const ratioCss = CAROUSEL_RATIOS[ratio]
        ? ` style="aspect-ratio:${CAROUSEL_RATIOS[ratio]};object-fit:cover;"` : '';
    const capStyle = (captionBg && Number(captionBg.opacity) > 0)
        ? ` style="background:${hexToRgba(captionBg.colour, captionBg.opacity)};`
            + `padding:0.75rem 1rem;border-radius:0.5rem;"`
        : '';
    const intervals = {slow: 7000, fast: 2500};
    const rideAttrs = intervals[autoslide]
        ? ` data-bs-ride="carousel" data-bs-interval="${intervals[autoslide]}"`
        : ' data-bs-interval="false"';
    // A slide with no image — and every slide in natural (non-fixed-ratio) mode —
    // renders its content in normal flow rather than overlaid on a full-width
    // image. When any such slide is present the white indicators can sit over a
    // light page or card, so give them a dark hairline so they stay visible.
    const fixedRatio = !!ratioCss;
    const inflowPresent = !fixedRatio || slides.some((s) => !s.imageUrl);
    const indStyle = inflowPresent ? ' style="box-shadow:0 0 0 1px rgba(0, 0, 0, 0.55);"' : '';
    // Anchors, not buttons, for the same sanitiser reason as the controls
    // above; the flex indicators container blockifies them so their bar size
    // still applies, and the carousel data API drives them natively.
    const indicators = slides.map((_, i) =>
        `    <a href="#" role="button" data-bs-target="#${uid}" data-bs-slide-to="${i}"`
        + `${i === 0 ? ' class="active" aria-current="true"' : ''}${indStyle}`
        + ` aria-label="${escapeHtml(fmt(str.slide_default, i + 1))}"></a>`
    ).join('\n');
    const inner = slides.map((s, i) => {
        const active = i === 0 ? ' active' : '';
        const caption = escapeHtml(s.captionTitle);
        const text = sanitizeRich(s.captionText);
        const btnText = escapeHtml(s.btnText);
        const btnHref = escapeHtml((s.btnUrl || '').trim()) || '#';
        const btnVariant = escapeHtml(s.btnVariant) || 'primary';
        const btnHtml = btnText
            ? `\n        <a class="btn btn-${btnVariant}" href="${btnHref}" role="button">${btnText}</a>`
            : '';
        const alt = escapeHtml(s.imageAlt) || escapeHtml(fmt(str.slide_default, i + 1));
        // Fixed-ratio image slide: the image fills a known-height box, so the
        // caption can overlay it (hidden below md, with a mobile CTA bar). The
        // Bootstrap caption keeps its own contrasting white text.
        if (s.imageUrl && fixedRatio) {
            const captionHtml = (caption || text || btnText)
                ? `\n      <div class="carousel-caption d-none d-md-block"${capStyle}>
        ${caption ? `<h5>${caption}</h5>` : ''}
        ${text ? `<div>${text}</div>` : ''}${btnHtml}
      </div>`
                : '';
            const mobileBtn = btnText
                ? `\n      <div class="d-md-none text-center"
           style="position:absolute;left:0;right:0;bottom:2rem;z-index:5;">
        <a class="btn btn-${btnVariant}" href="${btnHref}" role="button">${btnText}</a>
      </div>`
                : '';
            return `    <div class="carousel-item${active}">
      <img src="${escapeHtml(s.imageUrl)}" class="d-block w-100"${ratioCss} alt="${alt}">${captionHtml}${mobileBtn}
    </div>`;
        }
        // Natural-mode image slide, or a content-only slide: the image (at its
        // own size, capped at 100%) and the caption both sit in normal flow, so
        // the slide height follows the content and nothing is clipped, and the
        // content shows on every breakpoint. Side padding keeps content out of
        // the 15% side gutters where the nav controls sit, and no caption
        // background is forced — a pasted card brings its own, and plain caption
        // text keeps the theme's readable colour on the page.
        const img = s.imageUrl
            ? `\n        <img src="${escapeHtml(s.imageUrl)}" class="d-block img-fluid mx-auto mb-3" alt="${alt}">`
            : '';
        const body = `${img}${caption ? `\n        <h5>${caption}</h5>` : ''}`
            + `${text ? `\n        <div>${text}</div>` : ''}${btnHtml}`;
        return `    <div class="carousel-item${active}">
      <div class="text-center" style="padding:1.5rem 15%;">${body}
      </div>
    </div>`;
    }).join('\n');
    return `<!-- Bootstrap 5 carousel -->
<div id="${uid}" class="carousel slide"${rideAttrs}>
  <div class="carousel-indicators">
${indicators}
  </div>
  <div class="carousel-inner">
${inner}
  </div>
${carouselControl(uid, 'prev', str.previous)}
${carouselControl(uid, 'next', str.next)}
</div>`;
};

// A horizontally scrolling row of Bootstrap cards. Several cards are visible at
// once (about three on a wide screen, fewer on a phone), and the prev/next
// controls scroll the row by one card. Everything is styled inline so it renders
// on view pages without the plugin stylesheet; the arrows use the view AMD
// module. cards is a list of {title, body, imageUrl, imageAlt, btnText, btnUrl,
// btnVariant}.
const buildCardRow = (cards, opts = {}) => {
    const width = Number(opts.width) || 0;
    const height = Number(opts.height) || 0;
    const imageBand = Number(opts.imageHeight) || 0;
    const bg = escapeHtml((opts.bg || '').trim());
    const textColour = escapeHtml((opts.textColour || '').trim());
    const border = escapeHtml((opts.border || '').trim());
    const radius = escapeHtml((opts.radius || '').trim());
    const shadow = !!opts.shadow;
    // The shared look styles applied to every card so the whole row is uniform:
    // background, text colour, border, corner rounding and drop shadow.
    const lookParts = [];
    if (bg) {
        lookParts.push(`background:${bg}`);
    }
    if (textColour) {
        lookParts.push(`color:${textColour}`);
    }
    if (border) {
        lookParts.push(`border:1px solid ${border}`);
    }
    if (radius) {
        lookParts.push(`border-radius:${radius}`);
    }
    if (shadow) {
        lookParts.push('box-shadow:0 0.5rem 1rem rgba(0, 0, 0, 0.15)');
    }
    const look = lookParts.join(';');
    const cardImage = (imageUrl, imageAlt) => {
        if (!imageUrl) {
            return '';
        }
        // With a fixed card size the image sits in a fixed-height band and is
        // cropped by a clipping wrapper rather than object-fit (whose support in
        // the output sanitiser is not guaranteed), so a small or oddly shaped
        // picture still fills the band without being distorted.
        if (imageBand) {
            return `\n      <div style="height:${imageBand}px;overflow:hidden;display:flex;`
                + `align-items:center;justify-content:center;">`
                + `<img src="${imageUrl}" alt="${imageAlt}" style="width:100%;height:auto;display:block;"></div>`;
        }
        return `\n      <img src="${imageUrl}" class="card-img-top" alt="${imageAlt}">`;
    };
    const renderCard = (c, i, scrollable) => {
        const title = escapeHtml(c.title);
        const body = sanitizeRich(c.body);
        const btnText = escapeHtml(c.btnText);
        const btnHref = escapeHtml((c.btnUrl || '').trim()) || '#';
        const btnVariant = escapeHtml(c.btnVariant) || 'primary';
        const imageUrl = escapeHtml((c.imageUrl || '').trim());
        const imageAlt = escapeHtml(c.imageAlt) || escapeHtml(fmt(str.card_default, i + 1));
        const img = cardImage(imageUrl, imageAlt);
        const btn = btnText
            ? `\n        <a class="btn btn-${btnVariant} mt-3 align-self-start" href="${btnHref}" role="button">${btnText}</a>`
            : '';
        // Size styles fix every card to the same width and height so the row is
        // uniform; taller content is clipped by overflow:hidden. With no size
        // set, fall back to the responsive flex-basis (a phone-width column on
        // small screens, about a third of a wide container on desktop).
        const sizeParts = [];
        if (scrollable) {
            sizeParts.push(width ? `flex:0 0 ${width}px` : 'flex:0 0 min(85vw, 320px)');
            sizeParts.push('scroll-snap-align:start');
        } else if (width) {
            sizeParts.push(`width:${width}px`);
        }
        if (height) {
            sizeParts.push(`height:${height}px`, 'overflow:hidden');
        }
        const style = [sizeParts.join(';'), look].filter(Boolean).join(';');
        const bodyOverflow = height ? ' style="overflow:hidden;"' : '';
        return `    <div class="card h-100"${style ? ` style="${style}"` : ''}>${img}
      <div class="card-body d-flex flex-column"${bodyOverflow}>
        ${title ? `<h5 class="card-title">${title}</h5>` : ''}
        ${body ? `<div class="card-text">${body}</div>` : ''}${btn}
      </div>
    </div>`;
    };
    // Nothing to insert if no card was filled in. A single card cannot scroll,
    // so render it as a plain centred card with no track or arrows; the
    // scrolling row and its controls are only used for two or more cards.
    if (!cards.length) {
        return '';
    }
    if (cards.length === 1) {
        return `<!-- Bootstrap 5 card -->
<div class="d-flex justify-content-center">
${renderCard(cards[0], 0, false)}
</div>`;
    }
    const uid = 'bsRow' + Math.random().toString(36).slice(2, 9);
    const items = cards.map((c, i) => renderCard(c, i, true)).join('\n');
    const navBtn = (dir, label) => {
        const side = dir === 'prev' ? 'left:0.25rem;' : 'right:0.25rem;';
        const disc = `position:absolute;top:50%;transform:translateY(-50%);${side}z-index:2;`
            + 'display:inline-flex;align-items:center;justify-content:center;width:2.75rem;'
            + 'height:2.75rem;border:0;border-radius:50%;background:rgba(0,0,0,0.5);'
            + 'box-shadow:0 1px 4px rgba(0,0,0,0.35);cursor:pointer;text-decoration:none;';
        // Rendered as an anchor rather than a button. Moodle's output sanitiser
        // (HTMLPurifier) drops a user-content button that carries no recognised
        // data-bs-* toggle, unwrapping its icon, so a button-based control never
        // reaches the page. An anchor with role="button" survives; the view AMD
        // module handles its click and suppresses the href navigation.
        return `  <a href="#" role="button" class="tiny-bs-cardrow-nav" data-cardrow-nav="${dir}"`
            + ` aria-label="${escapeHtml(label)}" style="${disc}">${chevronIcon(dir)}</a>`;
    };
    // The scroll-padding-inline keeps a snapped card inset from the overlaid
    // arrows (the flex padding scrolls with the content, so it cannot reserve
    // that gutter on its own once the row has been scrolled).
    return `<!-- Bootstrap 5 scrolling card row -->
<div class="tiny-bs-cardrow" id="${uid}" style="position:relative;">
${navBtn('prev', str.previous)}
  <div class="tiny-bs-cardrow-track" data-cardrow-track style="display:flex;gap:1rem;`
        + `overflow-x:auto;scroll-snap-type:x mandatory;scroll-padding-inline:3.25rem;`
        + `scroll-behavior:smooth;padding:0.5rem 3.25rem;">
${items}
  </div>
${navBtn('next', str.next)}
</div>`;
};

const buildAccordion = (sections) => {
    const uid = 'bsAcc' + Math.random().toString(36).slice(2, 9);
    const items = sections.map((s, i) => {
        const headingId = `${uid}-h${i}`;
        const collapseId = `${uid}-c${i}`;
        const title = escapeHtml(s.title) || escapeHtml(fmt(str.section_default, i + 1));
        const body = sanitizeRich(s.body) || escapeHtml(str.section_body_default);
        const expanded = i === 0;
        return `  <div class="accordion-item">
    <h2 class="accordion-header" id="${headingId}">
      <button class="accordion-button${expanded ? '' : ' collapsed'}" type="button"
              data-bs-toggle="collapse" data-bs-target="#${collapseId}"
              aria-expanded="${expanded}" aria-controls="${collapseId}">
        ${title}
      </button>
    </h2>
    <div id="${collapseId}" class="accordion-collapse collapse${expanded ? ' show' : ''}"
         aria-labelledby="${headingId}" data-bs-parent="#${uid}">
      <div class="accordion-body">${body}</div>
    </div>
  </div>`;
    }).join('\n');
    return `<!-- Bootstrap 5 accordion -->
<div class="accordion" id="${uid}">
${items}
</div>`;
};

// Opts: {variant, headerVariant, striped, bordered, hover, small} where
// variant/headerVariant are Bootstrap contextual names ('dark', 'primary', …)
// or '' for none, and the rest are booleans toggling the matching .table-*
// utility class.
const buildTable = (rows, cols, headerRow, caption, opts = {}) => {
    const {
        variant = '', headerVariant = '', striped = true,
        bordered = false, hover = true, small = false,
    } = opts;
    const classes = ['table'];
    if (variant) {
        classes.push(`table-${variant}`);
    }
    if (striped) {
        classes.push('table-striped');
    }
    if (bordered) {
        classes.push('table-bordered');
    }
    if (hover) {
        classes.push('table-hover');
    }
    if (small) {
        classes.push('table-sm');
    }
    classes.push('align-middle');
    const theadClass = headerVariant ? ` class="table-${headerVariant}"` : '';
    const captionContent = sanitizeRich(caption);
    const captionHtml = captionContent ? `\n  <caption>${captionContent}</caption>` : '';
    const headerHtml = headerRow
        ? `\n  <thead${theadClass}>\n    <tr>\n${Array.from({length: cols}, (_, c) =>
            `      <th scope="col">${escapeHtml(fmt(str.table_heading_cell, c + 1))}</th>`)
            .join('\n')}\n    </tr>\n  </thead>`
        : '';
    const cellText = (r, c) => escapeHtml(
        (str.table_body_cell || '').replace('{$a->row}', r + 1).replace('{$a->col}', c + 1));
    const bodyRows = Array.from({length: rows}, (_, r) =>
        `    <tr>\n${Array.from({length: cols}, (_, c) =>
            `      <td>${cellText(r, c)}</td>`).join('\n')}\n    </tr>`).join('\n');
    return `<!-- Bootstrap 5 responsive table -->
<div class="table-responsive">
  <table class="${classes.join(' ')}">${captionHtml}${headerHtml}
  <tbody>
${bodyRows}
  </tbody>
  </table>
</div>`;
};

// Items: [{text, url}]. variant is a Bootstrap button colour ('primary', …),
// alignEnd right-aligns the menu, and split renders a separate caret button
// (Bootstrap's split-button dropdown pattern).
const buildDropdown = (label, variant, alignEnd, split, items) => {
    const uid = 'bsDrop' + Math.random().toString(36).slice(2, 9);
    const labelSafe = escapeHtml(label) || escapeHtml(str.dropdown_default_label);
    const btnVariant = `btn btn-${escapeHtml(variant) || 'primary'}`;
    const menuClass = alignEnd ? 'dropdown-menu dropdown-menu-end' : 'dropdown-menu';
    const itemsHtml = items.map((it) => {
        const text = escapeHtml(it.text);
        if (!text) {
            return '';
        }
        const href = escapeHtml((it.url || '').trim()) || '#';
        return `    <li><a class="dropdown-item" href="${href}">${text}</a></li>`;
    }).filter(Boolean).join('\n')
        || `    <li><a class="dropdown-item" href="#">${escapeHtml(str.dropdown_default_action)}</a></li>`;
    const toggle = split
        ? `  <button type="button" class="${btnVariant}">${labelSafe}</button>
  <button type="button" class="${btnVariant} dropdown-toggle dropdown-toggle-split"
          id="${uid}" data-bs-toggle="dropdown" aria-expanded="false">
    <span class="visually-hidden">${escapeHtml(str.toggle_dropdown)}</span>
  </button>`
        : `  <button type="button" class="${btnVariant} dropdown-toggle"
          id="${uid}" data-bs-toggle="dropdown" aria-expanded="false">${labelSafe}</button>`;
    return `<!-- Bootstrap 5 dropdown -->
<div class="${split ? 'btn-group' : 'dropdown'}">
${toggle}
  <ul class="${menuClass}" aria-labelledby="${uid}">
${itemsHtml}
  </ul>
</div>`;
};

// A self-contained reference block of common Bootstrap 5 snippets that authors
// can insert and then trim down to the pieces they want. Mirrors the spirit of
// the official Bootstrap "Cheatsheet" example page.
const buildCheatsheet = () => {
    const buttons = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']
        .map(v => `  <button type="button" class="btn btn-${v}">${v}</button>`).join('\n');
    const outlines = ['primary', 'secondary', 'success', 'danger']
        .map(v => `  <button type="button" class="btn btn-outline-${v}">${v}</button>`).join('\n');
    const alerts = ['primary', 'success', 'warning', 'danger']
        .map(v => `  <div class="alert alert-${v}" role="alert">`
            + `${escapeHtml(fmt(str.cheatsheet_alert_text, v))}</div>`).join('\n');
    const badges = ['primary', 'secondary', 'success', 'danger', 'warning', 'info']
        .map(v => `  <span class="badge text-bg-${v}">${v}</span>`).join('\n');
    const headings = [1, 2, 3, 4, 5, 6]
        .map(n => `  <h${n}>${escapeHtml(fmt(str.heading_default, n))}</h${n}>`).join('\n');
    const navItems = `    <li class="nav-item">`
        + `<a class="nav-link active" aria-current="page" href="#">${escapeHtml(str.cheatsheet_active)}</a></li>
    <li class="nav-item"><a class="nav-link" href="#">${escapeHtml(str.cheatsheet_link)}</a></li>
    <li class="nav-item">`
        + `<a class="nav-link disabled" aria-disabled="true">${escapeHtml(str.cheatsheet_disabled)}</a></li>`;
    return `<!-- Bootstrap 5 cheatsheet — delete the sections you don't need -->
<div class="tiny-bs-cheatsheet">

  <h2>${escapeHtml(str.cheatsheet_typography)}</h2>
${headings}
  <p class="lead">${escapeHtml(str.cheatsheet_lead)}</p>
  <blockquote class="blockquote">
    <p>${escapeHtml(str.cheatsheet_quote)}</p>
  </blockquote>

  <h2>${escapeHtml(str.cheatsheet_buttons)}</h2>
  <div class="d-flex flex-wrap gap-2 mb-3">
${buttons}
  </div>
  <div class="d-flex flex-wrap gap-2 mb-3">
${outlines}
  </div>

  <h2>${escapeHtml(str.cheatsheet_button_sizes)}</h2>
  <div class="d-flex flex-wrap gap-2 mb-3 align-items-center">
    <button type="button" class="btn btn-primary btn-lg">${escapeHtml(str.cheatsheet_large)}</button>
    <button type="button" class="btn btn-primary">${escapeHtml(str.cheatsheet_default)}</button>
    <button type="button" class="btn btn-primary btn-sm">${escapeHtml(str.cheatsheet_small)}</button>
    <button type="button" class="btn btn-primary active">${escapeHtml(str.cheatsheet_active)}</button>
    <button type="button" class="btn btn-primary" disabled>${escapeHtml(str.cheatsheet_disabled)}</button>
  </div>
  <div class="btn-group mb-3" role="group" aria-label="${escapeHtml(str.cheatsheet_buttongroup)}">
    <button type="button" class="btn btn-primary">${escapeHtml(str.cheatsheet_left)}</button>
    <button type="button" class="btn btn-primary">${escapeHtml(str.cheatsheet_middle)}</button>
    <button type="button" class="btn btn-primary">${escapeHtml(str.cheatsheet_right)}</button>
  </div>

  <h2>${escapeHtml(str.cheatsheet_alerts)}</h2>
${alerts}

  <h2>${escapeHtml(str.cheatsheet_badges)}</h2>
  <div class="d-flex flex-wrap gap-2 mb-3 align-items-center">
${badges}
  </div>

  <h2>${escapeHtml(str.cheatsheet_cards)}</h2>
  <div class="card mb-3" style="max-width:20rem;">
    <div class="card-body">
      <h5 class="card-title">${escapeHtml(str.card_title)}</h5>
      <p class="card-text">${escapeHtml(str.cheatsheet_card_text)}</p>
      <a href="#" class="btn btn-primary">${escapeHtml(str.cheatsheet_card_action)}</a>
    </div>
  </div>

  <h2>${escapeHtml(str.cheatsheet_tables)}</h2>
  ${buildTable(3, 3, true, '')}

  <h2>${escapeHtml(str.cheatsheet_listgroup)}</h2>
  <ul class="list-group mb-3">
    <li class="list-group-item active" aria-current="true">${escapeHtml(str.cheatsheet_list_active)}</li>
    <li class="list-group-item">${escapeHtml(str.cheatsheet_list_second)}</li>
    <li class="list-group-item">${escapeHtml(str.cheatsheet_list_third)}</li>
  </ul>

  <h2>${escapeHtml(str.cheatsheet_nav)}</h2>
  <ul class="nav nav-tabs mb-3">
${navItems}
  </ul>
  <ul class="nav nav-pills mb-3">
${navItems}
  </ul>

  <h2>${escapeHtml(str.cheatsheet_accordion)}</h2>
  ${buildAccordion([{title: '', body: ''}, {title: '', body: ''}])}

  <h2>${escapeHtml(str.cheatsheet_progress)}</h2>
  <div class="progress mb-3" role="progressbar" aria-label="${escapeHtml(str.cheatsheet_example)}"
       aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar" style="width:50%">50%</div>
  </div>

  <h2>${escapeHtml(str.cheatsheet_spinner)}</h2>
  <div class="spinner-border text-primary mb-3" role="status">
    <span class="visually-hidden">${escapeHtml(str.cheatsheet_loading)}</span>
  </div>

  <h2>${escapeHtml(str.cheatsheet_breadcrumb)}</h2>
  <nav aria-label="${escapeHtml(str.cheatsheet_breadcrumb)}">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="#">${escapeHtml(str.cheatsheet_home)}</a></li>
      <li class="breadcrumb-item"><a href="#">${escapeHtml(str.cheatsheet_library)}</a></li>
      <li class="breadcrumb-item active" aria-current="page">${escapeHtml(str.cheatsheet_data)}</li>
    </ol>
  </nav>

  <h2>${escapeHtml(str.cheatsheet_pagination)}</h2>
  <nav aria-label="${escapeHtml(str.cheatsheet_pagination_nav)}">
    <ul class="pagination">
      <li class="page-item"><a class="page-link" href="#">${escapeHtml(str.previous)}</a></li>
      <li class="page-item"><a class="page-link" href="#">1</a></li>
      <li class="page-item active" aria-current="page"><a class="page-link" href="#">2</a></li>
      <li class="page-item"><a class="page-link" href="#">3</a></li>
      <li class="page-item"><a class="page-link" href="#">${escapeHtml(str.next)}</a></li>
    </ul>
  </nav>

</div>`;
};

// Render a URL input + Browse button (and optional Placeholder button).
// placeholderUrl, when provided, adds a third button that pre-fills the field
// so authors can build layout now and swap in real images later.
const urlField = (name, label, browseLabel, placeholderUrl = null) => {
    const placeholderBtn = placeholderUrl
        ? `<button type="button" class="btn btn-outline-secondary"
                   data-action="placeholder" data-target="${name}"
                   data-placeholder-url="${escapeHtml(placeholderUrl)}">
                ${escapeHtml(str.placeholder_button)}
            </button>`
        : '';
    return `<div class="form-group mb-3">
        <label for="${name}" class="form-label">${escapeHtml(label)}</label>
        <div class="input-group">
            <input type="text" id="${name}" name="${name}" class="form-control" autocomplete="off">
            <button type="button" class="btn btn-secondary" data-action="browse" data-target="${name}">
                ${escapeHtml(browseLabel)}
            </button>
            ${placeholderBtn}
        </div>
    </div>`;
};

const textField = (name, label, placeholder = '') =>
    `<div class="form-group mb-3">
        <label for="${name}" class="form-label">${escapeHtml(label)}</label>
        <input type="text" id="${name}" name="${name}" class="form-control"
               placeholder="${escapeHtml(placeholder)}" autocomplete="off">
    </div>`;

// A lightweight rich-text field: a contenteditable box with a small toolbar
// (bold, italic, insert/remove link, and an HTML source toggle for pasting
// preformatted HTML). The value is read with getRich() and sanitised on insert.
const richField = (name, label, placeholder = '') =>
    `<div class="form-group mb-3">
        <label for="${name}" class="form-label">${escapeHtml(label)}</label>
        <div class="tiny-bs-rich" data-rich-wrap>
            <div class="btn-toolbar mb-1" role="toolbar">
                <div class="btn-group btn-group-sm" role="group">
                    <button type="button" class="btn btn-outline-secondary" data-rich-cmd="bold"
                            title="${escapeHtml(str.rich_bold)}"><b>B</b></button>
                    <button type="button" class="btn btn-outline-secondary" data-rich-cmd="italic"
                            title="${escapeHtml(str.rich_italic)}"><i>I</i></button>
                    <button type="button" class="btn btn-outline-secondary" data-rich-cmd="createLink"
                            title="${escapeHtml(str.rich_link)}">&#128279;</button>
                    <button type="button" class="btn btn-outline-secondary" data-rich-cmd="unlink"
                            title="${escapeHtml(str.rich_unlink)}">&#9741;</button>
                    <button type="button" class="btn btn-outline-secondary" data-rich-cmd="source"
                            title="${escapeHtml(str.rich_source)}">&lt;/&gt;</button>
                </div>
            </div>
            <div class="input-group input-group-sm mb-1 d-none" data-rich-linkrow>
                <input type="text" class="form-control" data-rich-linkurl autocomplete="off"
                       placeholder="${escapeHtml(str.rich_link_prompt)}">
                <button type="button" class="btn btn-primary" data-rich-linkadd>${escapeHtml(str.rich_link)}</button>
                <button type="button" class="btn btn-outline-secondary" data-rich-linkcancel>${escapeHtml(str.cancel)}</button>
            </div>
            <div id="${name}" data-rich="${name}" class="form-control tiny-bs-rich-input"
                 contenteditable="true" role="textbox" aria-multiline="true"
                 aria-label="${escapeHtml(label)}" data-placeholder="${escapeHtml(placeholder)}"></div>
            <textarea class="form-control tiny-bs-rich-source d-none" data-rich-source rows="6"
                      spellcheck="false" aria-label="${escapeHtml(label)}"></textarea>
        </div>
    </div>`;

const colourField = (name, label, defaultValue = '#000000') =>
    `<div class="form-group mb-3">
        <label for="${name}" class="form-label">${escapeHtml(label)}</label>
        <input type="color" id="${name}" name="${name}" class="form-control form-control-color"
               value="${escapeHtml(defaultValue)}">
    </div>`;

const selectField = (name, label, options, defaultValue = null) => {
    const opts = options.map((o) => {
        const selected = defaultValue !== null && String(o.value) === String(defaultValue)
            ? ' selected' : '';
        return `<option value="${escapeHtml(o.value)}"${selected}>${escapeHtml(o.text)}</option>`;
    }).join('');
    return `<div class="form-group mb-3">
        <label for="${name}" class="form-label">${escapeHtml(label)}</label>
        <select id="${name}" name="${name}" class="form-control">${opts}</select>
    </div>`;
};

const checkboxField = (name, label, checked = false) =>
    `<div class="form-check mb-3">
        <input type="checkbox" id="${name}" name="${name}" class="form-check-input"${checked ? ' checked' : ''}>
        <label for="${name}" class="form-check-label">${escapeHtml(label)}</label>
    </div>`;

const wireBrowseButtons = (editor, root) => {
    root.querySelectorAll('button[data-action="browse"]').forEach((btn) => {
        btn.addEventListener('click', async() => {
            let params;
            try {
                params = await displayFilepicker(editor, 'image');
            } catch (e) {
                window.console.warn('tiny_bootstrap filepicker cancelled or failed', e);
                return;
            }
            const target = root.querySelector(`[name="${btn.dataset.target}"]`);
            if (target && params && params.url) {
                target.value = params.url;
                // Mirror alt text into the matching alt field if present. The
                // single-image dialog uses url/alt; the card group uses
                // img_url_N/img_alt_N; the carousel uses slide_url_N/slide_alt_N;
                // the card row uses cr_img_N/cr_alt_N.
                const altName = btn.dataset.target
                    .replace(/^img_url_/, 'img_alt_')
                    .replace(/^slide_url_/, 'slide_alt_')
                    .replace(/^cr_img_/, 'cr_alt_')
                    .replace(/^url$/, 'alt');
                if (altName === btn.dataset.target) {
                    return;
                }
                const altField = root.querySelector(`[name="${altName}"]`);
                if (!altField) {
                    return;
                }
                // Prefer the filepicker's file name; fall back to the URL's
                // basename so we always populate something useful.
                const fallback = params.url.split(/[?#]/)[0].split('/').pop() || '';
                altField.value = params.file || fallback;
            }
        });
    });

    // Wire placeholder buttons — clicking one pre-fills the URL field with the
    // placehold.co URL encoded in its data attribute.
    root.querySelectorAll('button[data-action="placeholder"]').forEach((btn) => {
        btn.addEventListener('click', () => {
            const target = root.querySelector(`[name="${btn.dataset.target}"]`);
            if (target) {
                target.value = btn.dataset.placeholderUrl;
            }
        });
    });
};

// Wire the rich-text toolbars: bold/italic/link/unlink acting on the
// contenteditable box each toolbar belongs to. Uses execCommand (widely
// supported) with styleWithCSS off so formatting is emitted as <b>/<i> tags
// that survive sanitisation. Delegated per wrapper so it keeps working after
// AJAX re-renders swap the fields in.
const wireRichEditors = (root) => {
    root.querySelectorAll('[data-rich-wrap]').forEach((wrap) => {
        if (wrap.dataset.richWired) {
            return;
        }
        wrap.dataset.richWired = '1';
        const editable = wrap.querySelector('[data-rich]');
        const source = wrap.querySelector('[data-rich-source]');
        const linkRow = wrap.querySelector('[data-rich-linkrow]');
        const linkUrl = wrap.querySelector('[data-rich-linkurl]');
        let savedRange = null;

        // Toggle between the WYSIWYG box and the raw HTML source textarea,
        // syncing content across in both directions so either view is current.
        const toggleSource = () => {
            if (wrap.dataset.richMode === 'source') {
                // Sanitise before it becomes live DOM — assigning untrusted
                // source HTML to innerHTML would otherwise parse and run it
                // (e.g. <img onerror>) in the author's session. Sync the
                // cleaned value back so both views agree.
                const clean = sanitizeRich(source.value);
                editable.innerHTML = clean;
                source.value = clean;
                source.classList.add('d-none');
                editable.classList.remove('d-none');
                wrap.dataset.richMode = 'wysiwyg';
            } else {
                source.value = editable.innerHTML;
                editable.classList.add('d-none');
                source.classList.remove('d-none');
                linkRow.classList.add('d-none');
                wrap.dataset.richMode = 'source';
            }
        };

        const exec = (cmd, value = null) => {
            editable.focus();
            try {
                document.execCommand('styleWithCSS', false, false);
            } catch (e) {
                window.console.warn('tiny_bootstrap styleWithCSS unsupported', e);
            }
            document.execCommand(cmd, false, value);
        };

        // Insert the link the author typed, restoring the text selection that
        // was active when they opened the link row (focus moved to the input).
        const applyLink = () => {
            const url = linkUrl.value.trim();
            linkRow.classList.add('d-none');
            if (!url) {
                return;
            }
            editable.focus();
            if (savedRange) {
                const sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(savedRange);
            }
            exec('createLink', url);
        };

        wrap.querySelectorAll('button[data-rich-cmd]').forEach((btn) => {
            // Keep the selection in the editable when the toolbar is clicked.
            btn.addEventListener('mousedown', (e) => e.preventDefault());
            btn.addEventListener('click', () => {
                const cmd = btn.dataset.richCmd;
                if (cmd === 'source') {
                    toggleSource();
                    btn.classList.toggle('active', wrap.dataset.richMode === 'source');
                    return;
                }
                // Formatting commands only apply to the WYSIWYG view.
                if (wrap.dataset.richMode === 'source') {
                    return;
                }
                if (cmd === 'createLink') {
                    const sel = window.getSelection();
                    savedRange = (sel && sel.rangeCount) ? sel.getRangeAt(0).cloneRange() : null;
                    linkUrl.value = '';
                    linkRow.classList.remove('d-none');
                    linkUrl.focus();
                    return;
                }
                exec(cmd);
            });
        });

        wrap.querySelector('[data-rich-linkadd]').addEventListener('mousedown', (e) => e.preventDefault());
        wrap.querySelector('[data-rich-linkadd]').addEventListener('click', applyLink);
        wrap.querySelector('[data-rich-linkcancel]').addEventListener('click', () => {
            linkRow.classList.add('d-none');
        });
        linkUrl.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                applyLink();
            }
        });
    });
};

// Tag the modal so styles.css can make it resizable, and make sure clicking
// the backdrop always closes it (core/modal's hideIfNotForm short-circuits
// when a <form> is present — none of ours have one today, but adding the
// explicit listener keeps it predictable if we ever do).
const enhanceModal = (modal) => {
    const dialog = modal.getRoot()[0].querySelector('[data-region="modal"]');
    if (dialog) {
        dialog.classList.add('tiny-bs-resizable');
    }
    modal.getRoot().on(ModalEvents.outsideClick, () => modal.hide());
    return modal;
};

const openModal = async(title, bodyHtml, saveLabel) => {
    const modal = await ModalSaveCancel.create({
        title,
        body: bodyHtml,
        buttons: {save: saveLabel},
        removeOnClose: true,
        show: true,
    });
    return enhanceModal(modal);
};

const componentTile = (value, label, svg) =>
    `<div class="col-6 col-md-3">
        <button type="button" class="btn btn-outline-secondary w-100 h-100 p-3 d-flex flex-column
                align-items-center justify-content-center gap-2"
                data-component="${value}">
            <span class="text-primary">${svg}</span>
            <span class="small">${escapeHtml(label)}</span>
        </button>
    </div>`;

const openPicker = async(editor) => {
    const [
        dialogTitle, gridLabel, headingLabel, cardsLabel, imageLabel,
        jumbotronLabel, carouselLabel, cardrowLabel, accordionLabel, tableLabel,
        imagetextLabel, videotextLabel, dropdownLabel, cheatsheetLabel,
    ] = await Promise.all([
        getString('dialog_title', component),
        getString('component_grid', component),
        getString('component_heading', component),
        getString('component_cards', component),
        getString('component_image', component),
        getString('component_jumbotron', component),
        getString('component_carousel', component),
        getString('component_cardrow', component),
        getString('component_accordion', component),
        getString('component_table', component),
        getString('component_imagetext', component),
        getString('component_videotext', component),
        getString('component_dropdown', component),
        getString('component_cheatsheet', component),
    ]);

    const body = `<div class="row g-3">
        ${componentTile('grid', gridLabel, SVG.grid)}
        ${componentTile('heading', headingLabel, SVG.heading)}
        ${componentTile('cards', cardsLabel, SVG.cards)}
        ${componentTile('image', imageLabel, SVG.image)}
        ${componentTile('jumbotron', jumbotronLabel, SVG.jumbotron)}
        ${componentTile('carousel', carouselLabel, SVG.carousel)}
        ${componentTile('cardrow', cardrowLabel, SVG.cardrow)}
        ${componentTile('accordion', accordionLabel, SVG.accordion)}
        ${componentTile('table', tableLabel, SVG.table)}
        ${componentTile('imagetext', imagetextLabel, SVG.imagetext)}
        ${componentTile('videotext', videotextLabel, SVG.videotext)}
        ${componentTile('dropdown', dropdownLabel, SVG.dropdown)}
        ${componentTile('cheatsheet', cheatsheetLabel, SVG.cheatsheet)}
    </div>`;

    const modal = enhanceModal(await ModalCancel.create({
        title: dialogTitle,
        body,
        large: true,
        removeOnClose: true,
        show: true,
    }));

    modal.getRoot()[0].querySelectorAll('button[data-component]').forEach((btn) => {
        btn.addEventListener('click', () => {
            const chosen = btn.dataset.component;
            modal.hide();
            switch (chosen) {
                case 'grid': openGridDialog(editor); break;
                case 'heading': openHeadingDialog(editor); break;
                case 'cards': openCardDialog(editor); break;
                case 'image': openImageDialog(editor); break;
                case 'jumbotron': openJumbotronDialog(editor); break;
                case 'carousel': openCarouselDialog(editor); break;
                case 'cardrow': openCardRowDialog(editor); break;
                case 'accordion': openAccordionDialog(editor); break;
                case 'table': openTableDialog(editor); break;
                case 'imagetext': openImageTextDialog(editor); break;
                case 'videotext': openVideoTextDialog(editor); break;
                case 'dropdown': openDropdownDialog(editor); break;
                case 'cheatsheet': openCheatsheetDialog(editor); break;
            }
        });
    });
};

const openGridDialog = async(editor) => {
    const [title, colsLabel, insertLabel] = await Promise.all([
        getString('dialog_grid_title', component),
        getString('grid_columns', component),
        getString('insert', component),
    ]);

    const body = selectField('cols', colsLabel, [
        {value: '1', text: str.grid_1col},
        {value: '2', text: str.grid_2col},
        {value: '3', text: str.grid_3col},
        {value: '4', text: str.grid_4col},
    ]);

    const modal = await openModal(title, body, insertLabel);
    modal.getRoot().on(ModalEvents.save, () => {
        const cols = modal.getRoot()[0].querySelector('[name="cols"]').value;
        editor.insertContent(buildGrid(parseInt(cols, 10)));
    });
};

const openHeadingDialog = async(editor) => {
    const [title, levelLabel, textLabel, insertLabel] = await Promise.all([
        getString('dialog_heading_title', component),
        getString('heading_level', component),
        getString('heading_text', component),
        getString('insert', component),
    ]);

    const body = selectField('level', levelLabel,
        ['1', '2', '3', '4', '5', '6'].map(n => ({value: n, text: fmt(str.heading_option, n)}))
    ) + textField('text', textLabel, str.heading_text_placeholder);

    const modal = await openModal(title, body, insertLabel);
    modal.getRoot().on(ModalEvents.save, () => {
        const root = modal.getRoot()[0];
        const level = parseInt(root.querySelector('[name="level"]').value, 10);
        const text = root.querySelector('[name="text"]').value;
        editor.insertContent(buildHeading(level, text));
    });
};

// When withImages is false, drop the image URL/alt fields so authors can build
// text-only cards.
const cardSection = (i, browseLabel, withImages = true) => {
    const imageFields = withImages
        ? urlField(`img_url_${i}`, str.image_url, browseLabel, 'https://placehold.co/600x300?text=Card+Image') +
            textField(`img_alt_${i}`, str.alt_text, str.describe_image)
        : '';
    return `<h6 class="mt-3 mb-2 text-muted text-uppercase small">${escapeHtml(fmt(str.card_default, i))}</h6>` +
        imageFields +
        textField(`title_${i}`, str.card_title, fmt(str.card_default, i)) +
        richField(`body_${i}`, str.body_text, str.card_placeholder_body);
};

const openCardDialog = async(editor) => {
    const [
        title, countLabel, insertLabel, browseLabel,
        imagesLabel, spacingLabel, spacingNone, spacingSmall, spacingMedium, spacingLarge,
    ] = await Promise.all([
        getString('dialog_card_title', component),
        getString('card_count', component),
        getString('insert', component),
        getString('browse', component),
        getString('card_images', component),
        getString('card_spacing', component),
        getString('card_spacing_none', component),
        getString('card_spacing_small', component),
        getString('card_spacing_medium', component),
        getString('card_spacing_large', component),
    ]);

    // Default to 3 cards; select default must match so the dialog is consistent.
    let cardCount = 3;
    let withImages = true;
    const renderCards = (n) => Array.from({length: n}, (_, i) => cardSection(i + 1, browseLabel, withImages)).join('');

    const body =
        selectField('count', countLabel, [
            {value: '2', text: fmt(str.cards_n, 2)},
            {value: '3', text: fmt(str.cards_n, 3)},
            {value: '4', text: fmt(str.cards_n, 4)},
        ], '3') +
        selectField('card_spacing', spacingLabel, [
            {value: 'g-0', text: spacingNone},
            {value: 'g-2', text: spacingSmall},
            {value: 'g-4', text: spacingMedium},
            {value: 'g-5', text: spacingLarge},
        ], 'g-4') +
        checkboxField('card_images', imagesLabel, true) +
        `<div data-region="cards">${renderCards(cardCount)}</div>`;

    const modal = await openModal(title, body, insertLabel);
    const root = modal.getRoot()[0];
    const cardsRegion = root.querySelector('[data-region="cards"]');

    // Capture values when the fields change so we can repopulate after a
    // re-render, covering both plain inputs and the rich-text boxes.
    const captureValues = () => {
        const snapshot = {inputs: {}, rich: {}};
        cardsRegion.querySelectorAll('input, textarea').forEach((el) => {
            snapshot.inputs[el.name] = el.value;
        });
        cardsRegion.querySelectorAll('[data-rich-wrap] > [data-rich]').forEach((el) => {
            snapshot.rich[el.dataset.rich] = readRichEl(el);
        });
        return snapshot;
    };
    const restoreValues = (snapshot) => {
        Object.entries(snapshot.inputs).forEach(([name, value]) => {
            const el = cardsRegion.querySelector(`[name="${name}"]`);
            if (el) {
                el.value = value;
            }
        });
        Object.entries(snapshot.rich).forEach(([name, html]) => {
            const el = cardsRegion.querySelector(`[data-rich="${name}"]`);
            if (el) {
                el.innerHTML = html;
            }
        });
    };
    const rerender = () => {
        const snapshot = captureValues();
        cardsRegion.innerHTML = renderCards(cardCount);
        restoreValues(snapshot);
        wireBrowseButtons(editor, cardsRegion);
        wireRichEditors(cardsRegion);
    };

    wireBrowseButtons(editor, cardsRegion);
    wireRichEditors(cardsRegion);

    root.querySelector('[name="count"]').addEventListener('change', (e) => {
        cardCount = parseInt(e.target.value, 10);
        rerender();
    });
    root.querySelector('[name="card_images"]').addEventListener('change', (e) => {
        withImages = e.target.checked;
        rerender();
    });

    modal.getRoot().on(ModalEvents.save, () => {
        const val = (name) => {
            const el = cardsRegion.querySelector(`[name="${name}"]`);
            return el ? el.value : '';
        };
        const cards = Array.from({length: cardCount}, (_, i) => ({
            imageUrl: val(`img_url_${i + 1}`),
            imageAlt: val(`img_alt_${i + 1}`),
            title: val(`title_${i + 1}`),
            body: getRich(cardsRegion, `body_${i + 1}`),
        }));
        editor.insertContent(buildCardGroup(cards, {
            gap: root.querySelector('[name="card_spacing"]').value,
            withImages,
        }));
    });
};

const openImageDialog = async(editor) => {
    const [
        title, urlLabel, altLabel, captionLabel, insertLabel, browseLabel,
        alignLabel, alignCenter, alignLeft, alignRight,
    ] = await Promise.all([
        getString('dialog_image_title', component),
        getString('image_url', component),
        getString('image_alt', component),
        getString('image_caption', component),
        getString('insert', component),
        getString('browse', component),
        getString('image_align', component),
        getString('image_align_center', component),
        getString('image_align_left', component),
        getString('image_align_right', component),
    ]);

    const body =
        urlField('url', urlLabel, browseLabel, 'https://placehold.co/800x500?text=Image') +
        textField('alt', altLabel, str.describe_image_sr) +
        richField('caption', captionLabel, str.image_caption_placeholder) +
        selectField('align', alignLabel, [
            {value: 'center', text: alignCenter},
            {value: 'left', text: alignLeft},
            {value: 'right', text: alignRight},
        ], 'center');

    const modal = await openModal(title, body, insertLabel);
    const root = modal.getRoot()[0];
    wireBrowseButtons(editor, root);
    wireRichEditors(root);
    modal.getRoot().on(ModalEvents.save, () => {
        const url = root.querySelector('[name="url"]').value;
        const alt = root.querySelector('[name="alt"]').value;
        const caption = getRich(root, 'caption');
        const align = root.querySelector('[name="align"]').value;
        editor.insertContent(buildImageModal(url, alt, caption, align));
    });
};

const openImageTextDialog = async(editor) => {
    const [
        title, urlLabel, altLabel, captionLabel, headingLabel, bodyLabel,
        layoutLabel, leftLabel, rightLabel, insertLabel, browseLabel,
    ] = await Promise.all([
        getString('dialog_imagetext_title', component),
        getString('image_url', component),
        getString('image_alt', component),
        getString('image_caption', component),
        getString('imagetext_heading', component),
        getString('imagetext_body', component),
        getString('imagetext_layout', component),
        getString('imagetext_layout_imageleft', component),
        getString('imagetext_layout_imageright', component),
        getString('insert', component),
        getString('browse', component),
    ]);

    const body =
        selectField('layout', layoutLabel, [
            {value: 'image-left', text: leftLabel},
            {value: 'image-right', text: rightLabel},
        ]) +
        urlField('url', urlLabel, browseLabel, 'https://placehold.co/600x400?text=Image') +
        textField('alt', altLabel, str.describe_image_sr) +
        textField('it_heading', headingLabel, str.default_heading) +
        richField('it_body', bodyLabel, str.default_body) +
        richField('caption', captionLabel, str.imagetext_caption_placeholder);

    const modal = await openModal(title, body, insertLabel);
    const root = modal.getRoot()[0];
    wireBrowseButtons(editor, root);
    wireRichEditors(root);
    modal.getRoot().on(ModalEvents.save, () => {
        editor.insertContent(buildImageText(
            root.querySelector('[name="layout"]').value,
            root.querySelector('[name="url"]').value,
            root.querySelector('[name="alt"]').value,
            getRich(root, 'caption'),
            root.querySelector('[name="it_heading"]').value,
            getRich(root, 'it_body'),
        ));
    });
};

const openVideoTextDialog = async(editor) => {
    const [
        title, urlLabel, headingLabel, bodyLabel,
        layoutLabel, leftLabel, rightLabel, insertLabel,
    ] = await Promise.all([
        getString('dialog_videotext_title', component),
        getString('videotext_url', component),
        getString('videotext_heading', component),
        getString('videotext_body', component),
        getString('videotext_layout', component),
        getString('videotext_layout_videoleft', component),
        getString('videotext_layout_videoright', component),
        getString('insert', component),
    ]);

    const body =
        selectField('layout', layoutLabel, [
            {value: 'video-left', text: leftLabel},
            {value: 'video-right', text: rightLabel},
        ]) +
        textField('video_url', urlLabel, str.videotext_url_placeholder) +
        textField('vt_heading', headingLabel, str.default_heading) +
        richField('vt_body', bodyLabel, str.default_body);

    const modal = await openModal(title, body, insertLabel);
    const root = modal.getRoot()[0];
    wireRichEditors(root);
    modal.getRoot().on(ModalEvents.save, () => {
        editor.insertContent(buildVideoText(
            root.querySelector('[name="layout"]').value,
            root.querySelector('[name="video_url"]').value,
            root.querySelector('[name="vt_heading"]').value,
            getRich(root, 'vt_body'),
        ));
    });
};

const openJumbotronDialog = async(editor) => {
    const [
        title, titleLabel, leadLabel, buttonLabel, buttonUrlLabel, insertLabel, browseLabel,
        bgTypeLabel, bgNoneLabel, bgImageLabel, bgVideoLabel,
        bgUrlLabel, bgAltLabel, overlayLabel,
    ] = await Promise.all([
        getString('dialog_jumbotron_title', component),
        getString('jumbotron_title', component),
        getString('jumbotron_lead', component),
        getString('jumbotron_button', component),
        getString('jumbotron_button_url', component),
        getString('insert', component),
        getString('browse', component),
        getString('jumbotron_bg_type', component),
        getString('jumbotron_bg_none', component),
        getString('jumbotron_bg_image', component),
        getString('jumbotron_bg_video', component),
        getString('jumbotron_bg_url', component),
        getString('jumbotron_bg_alt', component),
        getString('jumbotron_overlay', component),
    ]);

    const body =
        textField('jt_title', titleLabel, str.jumbotron_default_title) +
        richField('jt_lead', leadLabel, str.jumbotron_default_lead) +
        textField('jt_button', buttonLabel, str.jumbotron_button_placeholder) +
        textField('jt_button_url', buttonUrlLabel, str.jumbotron_button_url_placeholder) +
        selectField('jt_bg_type', bgTypeLabel, [
            {value: 'none', text: bgNoneLabel},
            {value: 'image', text: bgImageLabel},
            {value: 'video', text: bgVideoLabel},
        ], 'none') +
        urlField('jt_bg_url', bgUrlLabel, browseLabel, 'https://placehold.co/1600x600?text=Background') +
        textField('jt_bg_alt', bgAltLabel, str.describe_bg_sr) +
        checkboxField('jt_overlay', overlayLabel, true);

    const modal = await openModal(title, body, insertLabel);
    const root = modal.getRoot()[0];
    wireBrowseButtons(editor, root);
    wireRichEditors(root);
    modal.getRoot().on(ModalEvents.save, () => {
        editor.insertContent(buildJumbotron(
            root.querySelector('[name="jt_title"]').value,
            getRich(root, 'jt_lead'),
            root.querySelector('[name="jt_button"]').value,
            root.querySelector('[name="jt_button_url"]').value,
            root.querySelector('[name="jt_bg_type"]').value,
            root.querySelector('[name="jt_bg_url"]').value,
            root.querySelector('[name="jt_bg_alt"]').value,
            root.querySelector('[name="jt_overlay"]').checked,
        ));
    });
};

const carouselSlideSection = (i, browseLabel) =>
    `<h6 class="mt-3 mb-2 text-muted text-uppercase small">${escapeHtml(fmt(str.slide_default, i))}</h6>` +
    urlField(`slide_url_${i}`, str.image_url, browseLabel, 'https://placehold.co/1200x500?text=Slide+Image') +
    textField(`slide_alt_${i}`, str.alt_text, str.describe_image) +
    textField(`slide_title_${i}`, str.caption_title, fmt(str.slide_default, i)) +
    richField(`slide_text_${i}`, str.caption_text, str.caption_text_placeholder) +
    textField(`slide_btn_text_${i}`, str.slide_button, str.jumbotron_button_placeholder) +
    textField(`slide_btn_url_${i}`, str.slide_button_url, str.item_link_placeholder) +
    selectField(`slide_btn_variant_${i}`, str.slide_button_colour,
        ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']
            .map((v) => ({value: v, text: str[`colour_${v}`]})), 'primary');

const openCarouselDialog = async(editor) => {
    const [
        title, insertLabel, browseLabel, ratioLabel,
        ratioNatural, ratio16x9, ratio4x3, ratio1x1, ratio21x9,
        autoslideLabel, autoslideOff, autoslideSlow, autoslideFast,
        captionBgLabel, captionOpacityLabel,
        opacityNone, opacityLight, opacityMedium, opacityStrong,
    ] = await Promise.all([
        getString('dialog_carousel_title', component),
        getString('insert', component),
        getString('browse', component),
        getString('carousel_ratio', component),
        getString('carousel_ratio_natural', component),
        getString('carousel_ratio_16x9', component),
        getString('carousel_ratio_4x3', component),
        getString('carousel_ratio_1x1', component),
        getString('carousel_ratio_21x9', component),
        getString('carousel_autoslide', component),
        getString('carousel_autoslide_off', component),
        getString('carousel_autoslide_slow', component),
        getString('carousel_autoslide_fast', component),
        getString('caption_bg_colour', component),
        getString('caption_bg_opacity', component),
        getString('caption_bg_opacity_none', component),
        getString('caption_bg_opacity_light', component),
        getString('caption_bg_opacity_medium', component),
        getString('caption_bg_opacity_strong', component),
    ]);

    const slideCount = 3;
    const body =
        selectField('carousel_ratio', ratioLabel, [
            {value: '16x9', text: ratio16x9},
            {value: '4x3', text: ratio4x3},
            {value: '1x1', text: ratio1x1},
            {value: '21x9', text: ratio21x9},
            {value: '', text: ratioNatural},
        ], '16x9') +
        selectField('carousel_autoslide', autoslideLabel, [
            {value: '', text: autoslideOff},
            {value: 'slow', text: autoslideSlow},
            {value: 'fast', text: autoslideFast},
        ], '') +
        colourField('caption_bg_colour', captionBgLabel, '#000000') +
        selectField('caption_bg_opacity', captionOpacityLabel, [
            {value: '0.5', text: opacityMedium},
            {value: '0.25', text: opacityLight},
            {value: '0.75', text: opacityStrong},
            {value: '0', text: opacityNone},
        ], '0.5') +
        Array.from({length: slideCount}, (_, i) => carouselSlideSection(i + 1, browseLabel)).join('');

    const modal = await openModal(title, body, insertLabel);
    const root = modal.getRoot()[0];
    wireBrowseButtons(editor, root);
    wireRichEditors(root);
    modal.getRoot().on(ModalEvents.save, () => {
        const slides = Array.from({length: slideCount}, (_, i) => ({
            imageUrl: root.querySelector(`[name="slide_url_${i + 1}"]`).value,
            imageAlt: root.querySelector(`[name="slide_alt_${i + 1}"]`).value,
            captionTitle: root.querySelector(`[name="slide_title_${i + 1}"]`).value,
            captionText: getRich(root, `slide_text_${i + 1}`),
            btnText: root.querySelector(`[name="slide_btn_text_${i + 1}"]`).value,
            btnUrl: root.querySelector(`[name="slide_btn_url_${i + 1}"]`).value,
            btnVariant: root.querySelector(`[name="slide_btn_variant_${i + 1}"]`).value,
        }));
        const ratio = root.querySelector('[name="carousel_ratio"]').value;
        const autoslide = root.querySelector('[name="carousel_autoslide"]').value;
        const captionBg = {
            colour: root.querySelector('[name="caption_bg_colour"]').value,
            opacity: root.querySelector('[name="caption_bg_opacity"]').value,
        };
        editor.insertContent(buildCarousel(slides, ratio, autoslide, captionBg));
    });
};

const cardRowCardSection = (i, browseLabel) =>
    `<h6 class="mt-3 mb-2 text-muted text-uppercase small">${escapeHtml(fmt(str.card_default, i))}</h6>` +
    textField(`cr_title_${i}`, str.card_title, fmt(str.card_default, i)) +
    richField(`cr_body_${i}`, str.body_text, str.card_placeholder_body) +
    urlField(`cr_img_${i}`, str.image_url, browseLabel, '') +
    textField(`cr_alt_${i}`, str.alt_text, str.describe_image) +
    textField(`cr_btn_text_${i}`, str.slide_button, str.jumbotron_button_placeholder) +
    textField(`cr_btn_url_${i}`, str.slide_button_url, str.item_link_placeholder) +
    selectField(`cr_btn_variant_${i}`, str.slide_button_colour,
        ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']
            .map((v) => ({value: v, text: str[`colour_${v}`]})), 'primary');

// Card Row size presets: card width, card height and the image band height, in
// pixels. Keyed by the select value; used to build the dialog and to resolve
// the chosen option on save.
const CARDROW_SIZES = {
    small: {width: 240, height: 300, imageHeight: 130},
    medium: {width: 300, height: 380, imageHeight: 170},
    large: {width: 340, height: 440, imageHeight: 200},
};

// Corner-rounding presets mapped to a CSS border-radius value.
const CARDROW_RADII = {
    none: '0',
    small: '0.25rem',
    medium: '0.5rem',
    large: '1rem',
};

// Row-level styling controls shown once above the card slots: uniform card size,
// per-card background/text/border colours (each with an enable toggle so an
// unticked colour falls back to the theme default), corner rounding and a
// drop-shadow toggle.
const cardRowStyleSection = () =>
    `<h6 class="mt-1 mb-2 text-muted text-uppercase small">${escapeHtml(str.cardrow_styling)}</h6>` +
    selectField('cr_size', str.cardrow_size, [
        {value: 'small', text: str.cardrow_size_small},
        {value: 'medium', text: str.cardrow_size_medium},
        {value: 'large', text: str.cardrow_size_large},
    ], 'medium') +
    selectField('cr_radius', str.cardrow_radius, [
        {value: 'none', text: str.cardrow_radius_none},
        {value: 'small', text: str.cardrow_size_small},
        {value: 'medium', text: str.cardrow_size_medium},
        {value: 'large', text: str.cardrow_size_large},
    ], 'medium') +
    checkboxField('cr_bg_on', str.cardrow_bg, true) +
    colourField('cr_bg', str.cardrow_bg_colour, '#f3f0fa') +
    checkboxField('cr_text_on', str.cardrow_text, false) +
    colourField('cr_text', str.cardrow_text_colour, '#212529') +
    checkboxField('cr_border_on', str.cardrow_border, false) +
    colourField('cr_border', str.cardrow_border_colour, '#dee2e6') +
    checkboxField('cr_shadow', str.cardrow_shadow, true);

const openCardRowDialog = async(editor) => {
    const [title, insertLabel, browseLabel] = await Promise.all([
        getString('dialog_cardrow_title', component),
        getString('insert', component),
        getString('browse', component),
    ]);

    // Render the shared styling controls, then a fixed set of card slots; blank
    // ones are dropped on insert, so the author fills as many (two to six) as
    // they need without a re-rendering count.
    const cardMax = 6;
    const body = cardRowStyleSection()
        + Array.from({length: cardMax}, (_, i) => cardRowCardSection(i + 1, browseLabel)).join('');

    const modal = await openModal(title, body, insertLabel);
    const root = modal.getRoot()[0];
    wireBrowseButtons(editor, root);
    wireRichEditors(root);
    modal.getRoot().on(ModalEvents.save, () => {
        const cards = Array.from({length: cardMax}, (_, i) => ({
            title: root.querySelector(`[name="cr_title_${i + 1}"]`).value,
            body: getRich(root, `cr_body_${i + 1}`),
            imageUrl: root.querySelector(`[name="cr_img_${i + 1}"]`).value,
            imageAlt: root.querySelector(`[name="cr_alt_${i + 1}"]`).value,
            btnText: root.querySelector(`[name="cr_btn_text_${i + 1}"]`).value,
            btnUrl: root.querySelector(`[name="cr_btn_url_${i + 1}"]`).value,
            btnVariant: root.querySelector(`[name="cr_btn_variant_${i + 1}"]`).value,
        // Keep only cards the author actually filled in. Trim each field on its
        // own so whitespace in one (e.g. a stray space in the title) does not
        // mask real content in another.
        })).filter((c) => [c.title, c.body, c.imageUrl, c.btnText].some((v) => (v || '').trim()));
        const size = CARDROW_SIZES[root.querySelector('[name="cr_size"]').value] || CARDROW_SIZES.medium;
        const opts = {
            width: size.width,
            height: size.height,
            imageHeight: size.imageHeight,
            radius: CARDROW_RADII[root.querySelector('[name="cr_radius"]').value] || '',
            bg: root.querySelector('[name="cr_bg_on"]').checked
                ? root.querySelector('[name="cr_bg"]').value : '',
            textColour: root.querySelector('[name="cr_text_on"]').checked
                ? root.querySelector('[name="cr_text"]').value : '',
            border: root.querySelector('[name="cr_border_on"]').checked
                ? root.querySelector('[name="cr_border"]').value : '',
            shadow: root.querySelector('[name="cr_shadow"]').checked,
        };
        editor.insertContent(buildCardRow(cards, opts));
    });
};

const accordionSection = (i) =>
    `<h6 class="mt-3 mb-2 text-muted text-uppercase small">${escapeHtml(fmt(str.section_default, i))}</h6>` +
    textField(`acc_title_${i}`, str.section_title, fmt(str.section_default, i)) +
    richField(`acc_body_${i}`, str.section_body, str.section_body_default);

const openAccordionDialog = async(editor) => {
    const [title, countLabel, insertLabel] = await Promise.all([
        getString('dialog_accordion_title', component),
        getString('accordion_count', component),
        getString('insert', component),
    ]);

    let sectionCount = 3;
    const renderSections = (n) => Array.from({length: n}, (_, i) => accordionSection(i + 1)).join('');
    const body =
        selectField('acc_count', countLabel, [
            {value: '2', text: fmt(str.sections_n, 2)},
            {value: '3', text: fmt(str.sections_n, 3)},
            {value: '4', text: fmt(str.sections_n, 4)},
            {value: '5', text: fmt(str.sections_n, 5)},
        ], sectionCount) +
        `<div data-region="sections">${renderSections(sectionCount)}</div>`;

    const modal = await openModal(title, body, insertLabel);
    const root = modal.getRoot()[0];
    const region = root.querySelector('[data-region="sections"]');

    const snapshot = () => {
        const out = {inputs: {}, rich: {}};
        region.querySelectorAll('input, textarea').forEach((el) => {
            out.inputs[el.name] = el.value;
        });
        region.querySelectorAll('[data-rich-wrap] > [data-rich]').forEach((el) => {
            out.rich[el.dataset.rich] = readRichEl(el);
        });
        return out;
    };
    const restore = (data) => {
        Object.entries(data.inputs).forEach(([name, value]) => {
            const el = region.querySelector(`[name="${name}"]`);
            if (el) {
                el.value = value;
            }
        });
        Object.entries(data.rich).forEach(([name, html]) => {
            const el = region.querySelector(`[data-rich="${name}"]`);
            if (el) {
                el.innerHTML = html;
            }
        });
    };

    wireRichEditors(region);

    root.querySelector('[name="acc_count"]').addEventListener('change', (e) => {
        const data = snapshot();
        sectionCount = parseInt(e.target.value, 10);
        region.innerHTML = renderSections(sectionCount);
        restore(data);
        wireRichEditors(region);
    });

    modal.getRoot().on(ModalEvents.save, () => {
        const sections = Array.from({length: sectionCount}, (_, i) => ({
            title: region.querySelector(`[name="acc_title_${i + 1}"]`).value,
            body: getRich(region, `acc_body_${i + 1}`),
        }));
        editor.insertContent(buildAccordion(sections));
    });
};

// Bootstrap contextual colour names shared by the table colour and header
// selectors. The empty value means "no contextual class" (default theme look).
const tableColourOptions = (noneLabel) => [
    {value: '', text: noneLabel},
    {value: 'primary', text: str.colour_primary},
    {value: 'secondary', text: str.colour_secondary},
    {value: 'success', text: str.colour_success},
    {value: 'danger', text: str.colour_danger},
    {value: 'warning', text: str.colour_warning},
    {value: 'info', text: str.colour_info},
    {value: 'light', text: str.colour_light},
    {value: 'dark', text: str.colour_dark},
];

const openTableDialog = async(editor) => {
    const [
        title, rowsLabel, colsLabel, headerLabel, captionLabel, insertLabel,
        colourLabel, headerColourLabel, noneLabel,
        stripedLabel, borderedLabel, hoverLabel, smallLabel,
    ] = await Promise.all([
        getString('dialog_table_title', component),
        getString('table_rows', component),
        getString('table_columns', component),
        getString('table_header', component),
        getString('table_caption', component),
        getString('insert', component),
        getString('table_colour', component),
        getString('table_header_colour', component),
        getString('table_colour_none', component),
        getString('table_striped', component),
        getString('table_bordered', component),
        getString('table_hover', component),
        getString('table_small', component),
    ]);

    const rowOpts = [2, 3, 4, 5, 6, 8, 10].map(n => ({value: String(n), text: fmt(str.rows_n, n)}));
    const colOpts = [2, 3, 4, 5, 6].map(n => ({value: String(n), text: fmt(str.columns_n, n)}));

    const body =
        selectField('tbl_rows', rowsLabel, rowOpts, '3') +
        selectField('tbl_cols', colsLabel, colOpts, '3') +
        checkboxField('tbl_header', headerLabel, true) +
        selectField('tbl_variant', colourLabel, tableColourOptions(noneLabel), '') +
        selectField('tbl_header_variant', headerColourLabel, tableColourOptions(noneLabel), 'light') +
        checkboxField('tbl_striped', stripedLabel, true) +
        checkboxField('tbl_hover', hoverLabel, true) +
        checkboxField('tbl_bordered', borderedLabel, false) +
        checkboxField('tbl_small', smallLabel, false) +
        richField('tbl_caption', captionLabel, str.table_caption_placeholder);

    const modal = await openModal(title, body, insertLabel);
    const root = modal.getRoot()[0];
    wireRichEditors(root);
    modal.getRoot().on(ModalEvents.save, () => {
        editor.insertContent(buildTable(
            parseInt(root.querySelector('[name="tbl_rows"]').value, 10),
            parseInt(root.querySelector('[name="tbl_cols"]').value, 10),
            root.querySelector('[name="tbl_header"]').checked,
            getRich(root, 'tbl_caption'),
            {
                variant: root.querySelector('[name="tbl_variant"]').value,
                headerVariant: root.querySelector('[name="tbl_header_variant"]').value,
                striped: root.querySelector('[name="tbl_striped"]').checked,
                bordered: root.querySelector('[name="tbl_bordered"]').checked,
                hover: root.querySelector('[name="tbl_hover"]').checked,
                small: root.querySelector('[name="tbl_small"]').checked,
            },
        ));
    });
};

const dropdownItemSection = (i) =>
    `<h6 class="mt-3 mb-2 text-muted text-uppercase small">${escapeHtml(fmt(str.item_heading, i))}</h6>` +
    textField(`dd_text_${i}`, str.item_text, fmt(str.item_default, i)) +
    textField(`dd_url_${i}`, str.item_link, str.item_link_placeholder);

const openDropdownDialog = async(editor) => {
    const [
        title, insertLabel, labelLabel, variantLabel, alignLabel,
        alignStart, alignEnd, splitLabel, countLabel,
    ] = await Promise.all([
        getString('dialog_dropdown_title', component),
        getString('insert', component),
        getString('dropdown_label', component),
        getString('dropdown_variant', component),
        getString('dropdown_align', component),
        getString('dropdown_align_start', component),
        getString('dropdown_align_end', component),
        getString('dropdown_split', component),
        getString('dropdown_count', component),
    ]);

    let itemCount = 3;
    const renderItems = (n) => Array.from({length: n}, (_, i) => dropdownItemSection(i + 1)).join('');
    const variantOpts = [
        'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark',
    ].map(v => ({value: v, text: str[`colour_${v}`]}));

    const body =
        textField('dd_label', labelLabel, str.dropdown_default_label) +
        selectField('dd_variant', variantLabel, variantOpts, 'primary') +
        selectField('dd_align', alignLabel, [
            {value: 'start', text: alignStart},
            {value: 'end', text: alignEnd},
        ], 'start') +
        checkboxField('dd_split', splitLabel, false) +
        selectField('dd_count', countLabel, [
            {value: '2', text: fmt(str.items_n, 2)},
            {value: '3', text: fmt(str.items_n, 3)},
            {value: '4', text: fmt(str.items_n, 4)},
            {value: '5', text: fmt(str.items_n, 5)},
        ], '3') +
        `<div data-region="items">${renderItems(itemCount)}</div>`;

    const modal = await openModal(title, body, insertLabel);
    const root = modal.getRoot()[0];
    const region = root.querySelector('[data-region="items"]');

    const snapshot = () => {
        const out = {};
        region.querySelectorAll('input').forEach((el) => {
            out[el.name] = el.value;
        });
        return out;
    };
    const restore = (data) => {
        Object.entries(data).forEach(([name, value]) => {
            const el = region.querySelector(`[name="${name}"]`);
            if (el) {
                el.value = value;
            }
        });
    };

    root.querySelector('[name="dd_count"]').addEventListener('change', (e) => {
        const data = snapshot();
        itemCount = parseInt(e.target.value, 10);
        region.innerHTML = renderItems(itemCount);
        restore(data);
    });

    modal.getRoot().on(ModalEvents.save, () => {
        const items = Array.from({length: itemCount}, (_, i) => ({
            text: region.querySelector(`[name="dd_text_${i + 1}"]`).value,
            url: region.querySelector(`[name="dd_url_${i + 1}"]`).value,
        }));
        editor.insertContent(buildDropdown(
            root.querySelector('[name="dd_label"]').value,
            root.querySelector('[name="dd_variant"]').value,
            root.querySelector('[name="dd_align"]').value === 'end',
            root.querySelector('[name="dd_split"]').checked,
            items,
        ));
    });
};

const openCheatsheetDialog = async(editor) => {
    const [title, insertLabel, intro] = await Promise.all([
        getString('dialog_cheatsheet_title', component),
        getString('insert', component),
        getString('cheatsheet_intro', component),
    ]);

    const body = `<p>${escapeHtml(intro)}</p>`;
    const modal = await openModal(title, body, insertLabel);
    modal.getRoot().on(ModalEvents.save, () => {
        editor.insertContent(buildCheatsheet());
    });
};

export const getSetup = async() => {
    const [buttonImage, buttonTitle] = await Promise.all([
        getButtonImage('bootstrap', component),
        getString('button_bootstrap', component),
        loadStrings(),
    ]);

    return (editor) => {
        editor.ui.registry.addIcon(icon, buttonImage.html);

        editor.ui.registry.addButton(buttonName, {
            icon,
            tooltip: buttonTitle,
            onAction: () => openPicker(editor),
        });

        editor.ui.registry.addMenuItem(buttonName, {
            icon,
            text: buttonTitle,
            onAction: () => openPicker(editor),
        });
    };
};
