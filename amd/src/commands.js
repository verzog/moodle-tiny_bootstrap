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
 * @copyright  2025 Skin Cancer College of Australasia <admin@skincancercollege.org>
 * @license    https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
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
];

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
    const capHtml = caption
        ? `\n        <p class="mt-2 mb-0 text-muted">${escapeHtml(caption)}</p>`
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
        const body = escapeHtml(card.body) || escapeHtml(str.card_placeholder_body);
        if (!withImages) {
            return {
                cardHtml: `  <div class="col">
    <div class="card h-100">
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${body}</p>
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
        <p class="card-text">${body}</p>
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

// align: 'center' (default) renders a centred block figure; 'left'/'right'
// float the figure so following text wraps alongside it. Floated figures get
// an inline max-width so a wide image can't overflow a narrow content area
// (e.g. a quiz answer box), and img-fluid on the image scales it down to fit.
// Only Bootstrap utility classes + inline styles are used so the chosen
// alignment also renders on view pages where the plugin CSS is not loaded.
const buildImageModal = (imageUrl, imageAlt, caption, align = 'center') => {
    const uid = 'bsModal' + Math.random().toString(36).slice(2, 9);
    const src = escapeHtml(imageUrl) || 'https://placehold.co/800x500?text=Image';
    const alt = escapeHtml(imageAlt) || escapeHtml(str.default_alt);
    const figcaption = caption
        ? `\n  <figcaption class="mt-1 text-muted small">${escapeHtml(caption)}</figcaption>`
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
    const bodySafe = escapeHtml(bodyText) || escapeHtml(str.default_body);
    const imageRight = layout === 'image-right';
    const imageCol = `  <div class="col-12 col-md-6">
    <a href="#" data-bs-toggle="modal" data-bs-target="#${uid}" title="${escapeHtml(str.click_to_enlarge)}">
      <img src="${src}" class="img-fluid rounded" style="cursor:zoom-in;" alt="${alt}">
    </a>
  </div>`;
    const textCol = `  <div class="col-12 col-md-6">
    <h3>${headingSafe}</h3>
    <p>${bodySafe}</p>
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
// (default) puts the video on the left.
// displayMode 'inline' embeds the video directly so the browser's native
// fullscreen button can be used; 'modal' (default) shows a poster image
// that opens the video in a Bootstrap modal.
const buildVideoText = (layout, videoUrl, posterUrl, posterAlt, heading, bodyText, displayMode = 'modal') => {
    const uid = 'bsVidTxt' + Math.random().toString(36).slice(2, 9);
    const poster = escapeHtml(posterUrl) || 'https://placehold.co/600x400?text=Play+Video';
    const alt = escapeHtml(posterAlt) || escapeHtml(str.play_video_alt);
    const headingSafe = escapeHtml(heading) || escapeHtml(str.default_heading);
    const bodySafe = escapeHtml(bodyText) || escapeHtml(str.default_body);
    const videoRight = layout === 'video-right';

    let videoCol;
    let modalHtml = '';

    if (displayMode === 'inline') {
        videoCol = `  <div class="col-12 col-md-6">
    ${videoEmbed(videoUrl)}
  </div>`;
    } else {
        videoCol = `  <div class="col-12 col-md-6">
    <a href="#" data-bs-toggle="modal" data-bs-target="#${uid}" title="${escapeHtml(str.click_to_play)}">
      <img src="${poster}" class="img-fluid rounded" style="cursor:pointer;" alt="${alt}">
    </a>
  </div>`;
        modalHtml = `\n${buildVideoModal(uid, videoEmbed(videoUrl), headingSafe)}`;
    }

    const textCol = `  <div class="col-12 col-md-6">
    <h3>${headingSafe}</h3>
    <p>${bodySafe}</p>
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
    const leadSafe = escapeHtml(lead) || escapeHtml(str.jumbotron_default_lead);
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
    <p class="col-md-9 fs-5">${leadSafe}</p>${btn}
  </div>
</div>`;
};

// Height is a pixel value (e.g. '400') that fixes every slide to the same
// height with object-fit:cover so mismatched source images line up; an empty
// string keeps each image at its natural height.
// autoslide: '' (off), 'slow' (~7s), or 'fast' (~2.5s). When off, the carousel
// only advances via the prev/next controls or indicators.
const buildCarousel = (slides, height = '', autoslide = '') => {
    const uid = 'bsCar' + Math.random().toString(36).slice(2, 9);
    const px = String(height).trim();
    const imgStyle = px ? ` style="height:${escapeHtml(px)}px;object-fit:cover;"` : '';
    const intervals = {slow: 7000, fast: 2500};
    const rideAttrs = intervals[autoslide]
        ? ` data-bs-ride="carousel" data-bs-interval="${intervals[autoslide]}"`
        : ' data-bs-interval="false"';
    const indicators = slides.map((_, i) =>
        `    <button type="button" data-bs-target="#${uid}" data-bs-slide-to="${i}"`
        + `${i === 0 ? ' class="active" aria-current="true"' : ''}`
        + ` aria-label="${escapeHtml(fmt(str.slide_default, i + 1))}"></button>`
    ).join('\n');
    const inner = slides.map((s, i) => {
        const src = escapeHtml(s.imageUrl) || `https://placehold.co/1200x500?text=Slide+${i + 1}`;
        const alt = escapeHtml(s.imageAlt) || escapeHtml(fmt(str.slide_default, i + 1));
        const caption = escapeHtml(s.captionTitle);
        const text = escapeHtml(s.captionText);
        const captionHtml = (caption || text)
            ? `\n      <div class="carousel-caption d-none d-md-block">
        ${caption ? `<h5>${caption}</h5>` : ''}
        ${text ? `<p>${text}</p>` : ''}
      </div>`
            : '';
        return `    <div class="carousel-item${i === 0 ? ' active' : ''}">
      <img src="${src}" class="d-block w-100"${imgStyle} alt="${alt}">${captionHtml}
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
  <button class="carousel-control-prev" type="button" data-bs-target="#${uid}" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">${escapeHtml(str.previous)}</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#${uid}" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">${escapeHtml(str.next)}</span>
  </button>
</div>`;
};

const buildAccordion = (sections) => {
    const uid = 'bsAcc' + Math.random().toString(36).slice(2, 9);
    const items = sections.map((s, i) => {
        const headingId = `${uid}-h${i}`;
        const collapseId = `${uid}-c${i}`;
        const title = escapeHtml(s.title) || escapeHtml(fmt(str.section_default, i + 1));
        const body = escapeHtml(s.body) || escapeHtml(str.section_body_default);
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
    const captionHtml = caption ? `\n  <caption>${escapeHtml(caption)}</caption>` : '';
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

const textareaField = (name, label, placeholder = '') =>
    `<div class="form-group mb-3">
        <label for="${name}" class="form-label">${escapeHtml(label)}</label>
        <textarea id="${name}" name="${name}" class="form-control" rows="2"
                  placeholder="${escapeHtml(placeholder)}"></textarea>
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
                // img_url_N/img_alt_N; the carousel uses slide_url_N/slide_alt_N.
                const altName = btn.dataset.target
                    .replace(/^img_url_/, 'img_alt_')
                    .replace(/^slide_url_/, 'slide_alt_')
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
        jumbotronLabel, carouselLabel, accordionLabel, tableLabel,
        imagetextLabel, videotextLabel, dropdownLabel, cheatsheetLabel,
    ] = await Promise.all([
        getString('dialog_title', component),
        getString('component_grid', component),
        getString('component_heading', component),
        getString('component_cards', component),
        getString('component_image', component),
        getString('component_jumbotron', component),
        getString('component_carousel', component),
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
        textareaField(`body_${i}`, str.body_text, str.card_placeholder_body);
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

    // Capture values when the fields change so we can repopulate after a re-render.
    const captureValues = () => {
        const snapshot = {};
        cardsRegion.querySelectorAll('input, textarea').forEach((el) => {
            snapshot[el.name] = el.value;
        });
        return snapshot;
    };
    const restoreValues = (snapshot) => {
        Object.entries(snapshot).forEach(([name, value]) => {
            const el = cardsRegion.querySelector(`[name="${name}"]`);
            if (el) {
                el.value = value;
            }
        });
    };
    const rerender = () => {
        const snapshot = captureValues();
        cardsRegion.innerHTML = renderCards(cardCount);
        restoreValues(snapshot);
        wireBrowseButtons(editor, cardsRegion);
    };

    wireBrowseButtons(editor, cardsRegion);

    root.querySelector('[name="count"]').addEventListener('change', (e) => {
        cardCount = parseInt(e.target.value, 10);
        rerender();
    });
    root.querySelector('[name="card_images"]').addEventListener('change', (e) => {
        withImages = e.target.checked;
        rerender();
    });

    modal.getRoot().on(ModalEvents.save, () => {
        const data = {};
        cardsRegion.querySelectorAll('input, textarea').forEach((el) => {
            data[el.name] = el.value;
        });
        const cards = Array.from({length: cardCount}, (_, i) => ({
            imageUrl: data[`img_url_${i + 1}`] || '',
            imageAlt: data[`img_alt_${i + 1}`] || '',
            title: data[`title_${i + 1}`] || '',
            body: data[`body_${i + 1}`] || '',
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
        textareaField('caption', captionLabel, str.image_caption_placeholder) +
        selectField('align', alignLabel, [
            {value: 'center', text: alignCenter},
            {value: 'left', text: alignLeft},
            {value: 'right', text: alignRight},
        ], 'center');

    const modal = await openModal(title, body, insertLabel);
    const root = modal.getRoot()[0];
    wireBrowseButtons(editor, root);
    modal.getRoot().on(ModalEvents.save, () => {
        const url = root.querySelector('[name="url"]').value;
        const alt = root.querySelector('[name="alt"]').value;
        const caption = root.querySelector('[name="caption"]').value;
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
        textareaField('it_body', bodyLabel, str.default_body) +
        textareaField('caption', captionLabel, str.imagetext_caption_placeholder);

    const modal = await openModal(title, body, insertLabel);
    const root = modal.getRoot()[0];
    wireBrowseButtons(editor, root);
    modal.getRoot().on(ModalEvents.save, () => {
        editor.insertContent(buildImageText(
            root.querySelector('[name="layout"]').value,
            root.querySelector('[name="url"]').value,
            root.querySelector('[name="alt"]').value,
            root.querySelector('[name="caption"]').value,
            root.querySelector('[name="it_heading"]').value,
            root.querySelector('[name="it_body"]').value,
        ));
    });
};

const openVideoTextDialog = async(editor) => {
    const [
        title, urlLabel, posterLabel, posterAltLabel, headingLabel, bodyLabel,
        layoutLabel, leftLabel, rightLabel,
        displayLabel, modalLabel, inlineLabel,
        insertLabel, browseLabel,
    ] = await Promise.all([
        getString('dialog_videotext_title', component),
        getString('videotext_url', component),
        getString('videotext_poster', component),
        getString('videotext_poster_alt', component),
        getString('videotext_heading', component),
        getString('videotext_body', component),
        getString('videotext_layout', component),
        getString('videotext_layout_videoleft', component),
        getString('videotext_layout_videoright', component),
        getString('videotext_display', component),
        getString('videotext_display_modal', component),
        getString('videotext_display_inline', component),
        getString('insert', component),
        getString('browse', component),
    ]);

    const body =
        selectField('layout', layoutLabel, [
            {value: 'video-left', text: leftLabel},
            {value: 'video-right', text: rightLabel},
        ]) +
        selectField('display_mode', displayLabel, [
            {value: 'modal', text: modalLabel},
            {value: 'inline', text: inlineLabel},
        ]) +
        textField('video_url', urlLabel, str.videotext_url_placeholder) +
        urlField('poster_url', posterLabel, browseLabel, 'https://placehold.co/600x400?text=Play+Video') +
        textField('poster_alt', posterAltLabel, str.describe_video_sr) +
        textField('vt_heading', headingLabel, str.default_heading) +
        textareaField('vt_body', bodyLabel, str.default_body);

    const modal = await openModal(title, body, insertLabel);
    const root = modal.getRoot()[0];
    wireBrowseButtons(editor, root);
    modal.getRoot().on(ModalEvents.save, () => {
        editor.insertContent(buildVideoText(
            root.querySelector('[name="layout"]').value,
            root.querySelector('[name="video_url"]').value,
            root.querySelector('[name="poster_url"]').value,
            root.querySelector('[name="poster_alt"]').value,
            root.querySelector('[name="vt_heading"]').value,
            root.querySelector('[name="vt_body"]').value,
            root.querySelector('[name="display_mode"]').value,
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
        textareaField('jt_lead', leadLabel, str.jumbotron_default_lead) +
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
    modal.getRoot().on(ModalEvents.save, () => {
        editor.insertContent(buildJumbotron(
            root.querySelector('[name="jt_title"]').value,
            root.querySelector('[name="jt_lead"]').value,
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
    textareaField(`slide_text_${i}`, str.caption_text, str.caption_text_placeholder);

const openCarouselDialog = async(editor) => {
    const [
        title, insertLabel, browseLabel, heightLabel,
        heightAuto, heightSmall, heightMedium, heightLarge, heightXl,
        autoslideLabel, autoslideOff, autoslideSlow, autoslideFast,
    ] = await Promise.all([
        getString('dialog_carousel_title', component),
        getString('insert', component),
        getString('browse', component),
        getString('carousel_height', component),
        getString('carousel_height_auto', component),
        getString('carousel_height_small', component),
        getString('carousel_height_medium', component),
        getString('carousel_height_large', component),
        getString('carousel_height_xl', component),
        getString('carousel_autoslide', component),
        getString('carousel_autoslide_off', component),
        getString('carousel_autoslide_slow', component),
        getString('carousel_autoslide_fast', component),
    ]);

    const slideCount = 3;
    const body =
        selectField('carousel_height', heightLabel, [
            {value: '', text: heightAuto},
            {value: '300', text: heightSmall},
            {value: '400', text: heightMedium},
            {value: '500', text: heightLarge},
            {value: '650', text: heightXl},
        ], '400') +
        selectField('carousel_autoslide', autoslideLabel, [
            {value: '', text: autoslideOff},
            {value: 'slow', text: autoslideSlow},
            {value: 'fast', text: autoslideFast},
        ], '') +
        Array.from({length: slideCount}, (_, i) => carouselSlideSection(i + 1, browseLabel)).join('');

    const modal = await openModal(title, body, insertLabel);
    const root = modal.getRoot()[0];
    wireBrowseButtons(editor, root);
    modal.getRoot().on(ModalEvents.save, () => {
        const slides = Array.from({length: slideCount}, (_, i) => ({
            imageUrl: root.querySelector(`[name="slide_url_${i + 1}"]`).value,
            imageAlt: root.querySelector(`[name="slide_alt_${i + 1}"]`).value,
            captionTitle: root.querySelector(`[name="slide_title_${i + 1}"]`).value,
            captionText: root.querySelector(`[name="slide_text_${i + 1}"]`).value,
        }));
        const height = root.querySelector('[name="carousel_height"]').value;
        const autoslide = root.querySelector('[name="carousel_autoslide"]').value;
        editor.insertContent(buildCarousel(slides, height, autoslide));
    });
};

const accordionSection = (i) =>
    `<h6 class="mt-3 mb-2 text-muted text-uppercase small">${escapeHtml(fmt(str.section_default, i))}</h6>` +
    textField(`acc_title_${i}`, str.section_title, fmt(str.section_default, i)) +
    textareaField(`acc_body_${i}`, str.section_body, str.section_body_default);

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
        const out = {};
        region.querySelectorAll('input, textarea').forEach((el) => {
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

    root.querySelector('[name="acc_count"]').addEventListener('change', (e) => {
        const data = snapshot();
        sectionCount = parseInt(e.target.value, 10);
        region.innerHTML = renderSections(sectionCount);
        restore(data);
    });

    modal.getRoot().on(ModalEvents.save, () => {
        const sections = Array.from({length: sectionCount}, (_, i) => ({
            title: region.querySelector(`[name="acc_title_${i + 1}"]`).value,
            body: region.querySelector(`[name="acc_body_${i + 1}"]`).value,
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
        textField('tbl_caption', captionLabel, str.table_caption_placeholder);

    const modal = await openModal(title, body, insertLabel);
    modal.getRoot().on(ModalEvents.save, () => {
        const root = modal.getRoot()[0];
        editor.insertContent(buildTable(
            parseInt(root.querySelector('[name="tbl_rows"]').value, 10),
            parseInt(root.querySelector('[name="tbl_cols"]').value, 10),
            root.querySelector('[name="tbl_header"]').checked,
            root.querySelector('[name="tbl_caption"]').value,
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
