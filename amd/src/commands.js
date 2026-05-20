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
import {get_string as getString} from 'core/str';
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
};

const escapeHtml = (s) => (s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

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
    <p>Column ${i + 1} content</p>
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
        .replace(/>/g, '&gt;') || `Heading ${level}`;
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
    return `<div class="modal fade" id="${uid}" tabindex="-1" aria-label="${alt}" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header py-2">
        <h4 class="modal-title">${displayTitle}</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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

const buildCardGroup = (cards) => {
    const rendered = cards.map((card, i) => {
        const uid = 'bsCardImg' + Math.random().toString(36).slice(2, 9);
        const imgSrc = escapeHtml(card.imageUrl) || 'https://placehold.co/600x300?text=Image';
        const imgAlt = escapeHtml(card.imageAlt) || `Card ${i + 1} image`;
        const title = escapeHtml(card.title) || `Card ${i + 1}`;
        const body = escapeHtml(card.body) || 'Add your card content here.';
        return {
            cardHtml: `  <div class="card">
    <a href="#" data-bs-toggle="modal" data-bs-target="#${uid}" title="Click to enlarge">
      <img src="${imgSrc}" class="card-img-top" style="cursor:zoom-in;" alt="${imgAlt}">
    </a>
    <div class="card-body">
      <h5 class="card-title">${title}</h5>
      <p class="card-text">${body}</p>
    </div>
  </div>`,
            modalHtml: buildZoomModal(uid, imgSrc, imgAlt, card.body, title),
        };
    });
    const cardsHtml = rendered.map(r => r.cardHtml).join('\n');
    const modalsHtml = rendered.map(r => r.modalHtml).join('\n\n');
    return `<!-- Bootstrap 5 card group with zoomable images -->
<div class="card-group">
${cardsHtml}
</div>

${modalsHtml}`;
};

const buildImageModal = (imageUrl, imageAlt, caption) => {
    const uid = 'bsModal' + Math.random().toString(36).slice(2, 9);
    const src = escapeHtml(imageUrl) || 'https://placehold.co/800x500?text=Image';
    const alt = escapeHtml(imageAlt) || 'Image';
    const figcaption = caption
        ? `\n  <figcaption class="mt-1 text-muted small">${escapeHtml(caption)}</figcaption>`
        : '';
    return `<!-- Bootstrap 5 image with zoom modal -->
<figure class="text-center">
  <a href="#" data-bs-toggle="modal" data-bs-target="#${uid}" title="Click to enlarge">
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
    const alt = escapeHtml(imageAlt) || 'Image';
    const headingSafe = escapeHtml(heading) || 'Heading';
    const bodySafe = escapeHtml(bodyText) || 'Add your descriptive text here.';
    const imageRight = layout === 'image-right';
    const imageCol = `  <div class="col-12 col-md-6">
    <a href="#" data-bs-toggle="modal" data-bs-target="#${uid}" title="Click to enlarge">
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
            + 'No video URL provided</div>';
    }
    const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{6,})/);
    const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (yt) {
        return `<div class="ratio ratio-16x9">
          <iframe src="https://www.youtube.com/embed/${escapeHtml(yt[1])}"
                  title="Video" allowfullscreen></iframe>
        </div>`;
    }
    if (vimeo) {
        return `<div class="ratio ratio-16x9">
          <iframe src="https://player.vimeo.com/video/${escapeHtml(vimeo[1])}"
                  title="Video" allowfullscreen></iframe>
        </div>`;
    }
    return `<video controls class="w-100" src="${escapeHtml(url)}"></video>`;
};

// Title is pre-escaped (caller's responsibility). Inline styles only, so the
// modal works on view pages where the plugin CSS is not loaded.
const buildVideoModal = (uid, embedHtml, title) => {
    return `<div class="modal fade" id="${uid}" tabindex="-1" aria-label="${title}" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header py-2">
        <h4 class="modal-title">${title}</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
    const alt = escapeHtml(posterAlt) || 'Play video';
    const headingSafe = escapeHtml(heading) || 'Heading';
    const bodySafe = escapeHtml(bodyText) || 'Add your descriptive text here.';
    const videoRight = layout === 'video-right';

    let videoCol;
    let modalHtml = '';

    if (displayMode === 'inline') {
        videoCol = `  <div class="col-12 col-md-6">
    ${videoEmbed(videoUrl)}
  </div>`;
    } else {
        videoCol = `  <div class="col-12 col-md-6">
    <a href="#" data-bs-toggle="modal" data-bs-target="#${uid}" title="Click to play">
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
    // bgType === 'video'.
    const yt = u.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{6,})/);
    const vimeo = u.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (yt) {
        const id = escapeHtml(yt[1]);
        const src = `https://www.youtube.com/embed/${id}`
            + `?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0`
            + `&playsinline=1&modestbranding=1&rel=0&disablekb=1`;
        return `\n  <iframe src="${src}" title="Background video"`
            + ` aria-hidden="true" tabindex="-1"`
            + ` allow="autoplay; encrypted-media" style="${cover}"></iframe>`;
    }
    if (vimeo) {
        const id = escapeHtml(vimeo[1]);
        const src = `https://player.vimeo.com/video/${id}`
            + `?background=1&autoplay=1&muted=1&loop=1`;
        return `\n  <iframe src="${src}" title="Background video"`
            + ` aria-hidden="true" tabindex="-1"`
            + ` allow="autoplay" style="${cover}"></iframe>`;
    }
    return `\n  <video autoplay muted loop playsinline aria-hidden="true"`
        + ` src="${escapeHtml(u)}" style="${cover}"></video>`;
};

const buildJumbotron = (title, lead, buttonText, bgType, bgUrl, bgAlt, overlay) => {
    const titleSafe = escapeHtml(title) || 'Welcome';
    const leadSafe = escapeHtml(lead) || 'A short, friendly description of what this section is about.';
    const btn = buttonText
        ? `\n    <hr class="my-4">\n    <a class="btn btn-primary btn-lg" href="#" role="button">${escapeHtml(buttonText)}</a>`
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

const buildCarousel = (slides) => {
    const uid = 'bsCar' + Math.random().toString(36).slice(2, 9);
    const indicators = slides.map((_, i) =>
        `    <button type="button" data-bs-target="#${uid}" data-bs-slide-to="${i}"`
        + `${i === 0 ? ' class="active" aria-current="true"' : ''}`
        + ` aria-label="Slide ${i + 1}"></button>`
    ).join('\n');
    const inner = slides.map((s, i) => {
        const src = escapeHtml(s.imageUrl) || `https://placehold.co/1200x500?text=Slide+${i + 1}`;
        const alt = escapeHtml(s.imageAlt) || `Slide ${i + 1}`;
        const caption = escapeHtml(s.captionTitle);
        const text = escapeHtml(s.captionText);
        const captionHtml = (caption || text)
            ? `\n      <div class="carousel-caption d-none d-md-block">
        ${caption ? `<h5>${caption}</h5>` : ''}
        ${text ? `<p>${text}</p>` : ''}
      </div>`
            : '';
        return `    <div class="carousel-item${i === 0 ? ' active' : ''}">
      <img src="${src}" class="d-block w-100" alt="${alt}">${captionHtml}
    </div>`;
    }).join('\n');
    return `<!-- Bootstrap 5 carousel -->
<div id="${uid}" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
${indicators}
  </div>
  <div class="carousel-inner">
${inner}
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#${uid}" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#${uid}" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`;
};

const buildAccordion = (sections) => {
    const uid = 'bsAcc' + Math.random().toString(36).slice(2, 9);
    const items = sections.map((s, i) => {
        const headingId = `${uid}-h${i}`;
        const collapseId = `${uid}-c${i}`;
        const title = escapeHtml(s.title) || `Section ${i + 1}`;
        const body = escapeHtml(s.body) || 'Section content goes here.';
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

const buildTable = (rows, cols, headerRow, caption) => {
    const captionHtml = caption ? `\n  <caption>${escapeHtml(caption)}</caption>` : '';
    const headerHtml = headerRow
        ? `\n  <thead>\n    <tr>\n${Array.from({length: cols}, (_, c) =>
            `      <th scope="col">Heading ${c + 1}</th>`).join('\n')}\n    </tr>\n  </thead>`
        : '';
    const bodyRows = Array.from({length: rows}, (_, r) =>
        `    <tr>\n${Array.from({length: cols}, (_, c) =>
            `      <td>Row ${r + 1}, Cell ${c + 1}</td>`).join('\n')}\n    </tr>`).join('\n');
    return `<!-- Bootstrap 5 responsive table -->
<div class="table-responsive">
  <table class="table table-striped table-hover align-middle">${captionHtml}${headerHtml}
  <tbody>
${bodyRows}
  </tbody>
  </table>
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
                Placeholder
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
        imagetextLabel, videotextLabel,
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
        {value: '1', text: '1 Column (full width)'},
        {value: '2', text: '2 Columns (equal)'},
        {value: '3', text: '3 Columns (equal)'},
        {value: '4', text: '4 Columns (equal)'},
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
        ['1', '2', '3', '4', '5', '6'].map(n => ({value: n, text: `H${n}`}))
    ) + textField('text', textLabel, 'Enter heading text…');

    const modal = await openModal(title, body, insertLabel);
    modal.getRoot().on(ModalEvents.save, () => {
        const root = modal.getRoot()[0];
        const level = parseInt(root.querySelector('[name="level"]').value, 10);
        const text = root.querySelector('[name="text"]').value;
        editor.insertContent(buildHeading(level, text));
    });
};

const cardSection = (i, browseLabel) =>
    `<h6 class="mt-3 mb-2 text-muted text-uppercase small">Card ${i}</h6>` +
    urlField(`img_url_${i}`, 'Image URL', browseLabel, 'https://placehold.co/600x300?text=Card+Image') +
    textField(`img_alt_${i}`, 'Alt text', 'Describe the image') +
    textField(`title_${i}`, 'Card title', `Card ${i}`) +
    textareaField(`body_${i}`, 'Body text', 'Add your card content here.');

const openCardDialog = async(editor) => {
    const [title, countLabel, insertLabel, browseLabel] = await Promise.all([
        getString('dialog_card_title', component),
        getString('card_count', component),
        getString('insert', component),
        getString('browse', component),
    ]);

    const renderCards = (n) => Array.from({length: n}, (_, i) => cardSection(i + 1, browseLabel)).join('');

    // Default to 3 cards; select default must match so the dialog is consistent.
    let cardCount = 3;
    const body =
        selectField('count', countLabel, [
            {value: '2', text: '2 Cards'},
            {value: '3', text: '3 Cards'},
            {value: '4', text: '4 Cards'},
        ], '3') +
        `<div data-region="cards">${renderCards(cardCount)}</div>`;

    const modal = await openModal(title, body, insertLabel);
    const root = modal.getRoot()[0];
    const cardsRegion = root.querySelector('[data-region="cards"]');

    // Capture values when count changes so we can repopulate.
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

    wireBrowseButtons(editor, cardsRegion);

    root.querySelector('[name="count"]').addEventListener('change', (e) => {
        const snapshot = captureValues();
        cardCount = parseInt(e.target.value, 10);
        cardsRegion.innerHTML = renderCards(cardCount);
        restoreValues(snapshot);
        wireBrowseButtons(editor, cardsRegion);
    });

    modal.getRoot().on(ModalEvents.save, () => {
        const data = {};
        root.querySelectorAll('[data-region="cards"] input, [data-region="cards"] textarea')
            .forEach((el) => {
                data[el.name] = el.value;
            });
        const cards = Array.from({length: cardCount}, (_, i) => ({
            imageUrl: data[`img_url_${i + 1}`] || '',
            imageAlt: data[`img_alt_${i + 1}`] || '',
            title: data[`title_${i + 1}`] || '',
            body: data[`body_${i + 1}`] || '',
        }));
        editor.insertContent(buildCardGroup(cards));
    });
};

const openImageDialog = async(editor) => {
    const [title, urlLabel, altLabel, captionLabel, insertLabel, browseLabel] = await Promise.all([
        getString('dialog_image_title', component),
        getString('image_url', component),
        getString('image_alt', component),
        getString('image_caption', component),
        getString('insert', component),
        getString('browse', component),
    ]);

    const body =
        urlField('url', urlLabel, browseLabel, 'https://placehold.co/800x500?text=Image') +
        textField('alt', altLabel, 'Describe the image for screen readers') +
        textareaField('caption', captionLabel, 'Optional caption shown below the image…');

    const modal = await openModal(title, body, insertLabel);
    const root = modal.getRoot()[0];
    wireBrowseButtons(editor, root);
    modal.getRoot().on(ModalEvents.save, () => {
        const url = root.querySelector('[name="url"]').value;
        const alt = root.querySelector('[name="alt"]').value;
        const caption = root.querySelector('[name="caption"]').value;
        editor.insertContent(buildImageModal(url, alt, caption));
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
        textField('alt', altLabel, 'Describe the image for screen readers') +
        textField('it_heading', headingLabel, 'Heading') +
        textareaField('it_body', bodyLabel, 'Add your descriptive text here.') +
        textareaField('caption', captionLabel, 'Optional caption shown in the zoom modal…');

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
        textField('video_url', urlLabel, 'YouTube, Vimeo or direct video file URL') +
        urlField('poster_url', posterLabel, browseLabel, 'https://placehold.co/600x400?text=Play+Video') +
        textField('poster_alt', posterAltLabel, 'Describe the video for screen readers') +
        textField('vt_heading', headingLabel, 'Heading') +
        textareaField('vt_body', bodyLabel, 'Add your descriptive text here.');

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
        title, titleLabel, leadLabel, buttonLabel, insertLabel, browseLabel,
        bgTypeLabel, bgNoneLabel, bgImageLabel, bgVideoLabel,
        bgUrlLabel, bgAltLabel, overlayLabel,
    ] = await Promise.all([
        getString('dialog_jumbotron_title', component),
        getString('jumbotron_title', component),
        getString('jumbotron_lead', component),
        getString('jumbotron_button', component),
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
        textField('jt_title', titleLabel, 'Welcome') +
        textareaField('jt_lead', leadLabel, 'A short, friendly description of what this section is about.') +
        textField('jt_button', buttonLabel, 'Learn more (leave blank for no button)') +
        selectField('jt_bg_type', bgTypeLabel, [
            {value: 'none', text: bgNoneLabel},
            {value: 'image', text: bgImageLabel},
            {value: 'video', text: bgVideoLabel},
        ], 'none') +
        urlField('jt_bg_url', bgUrlLabel, browseLabel, 'https://placehold.co/1600x600?text=Background') +
        textField('jt_bg_alt', bgAltLabel, 'Describe the background image for screen readers') +
        checkboxField('jt_overlay', overlayLabel, true);

    const modal = await openModal(title, body, insertLabel);
    modal.getRoot().on(ModalEvents.save, () => {
        const root = modal.getRoot()[0];
        editor.insertContent(buildJumbotron(
            root.querySelector('[name="jt_title"]').value,
            root.querySelector('[name="jt_lead"]').value,
            root.querySelector('[name="jt_button"]').value,
            root.querySelector('[name="jt_bg_type"]').value,
            root.querySelector('[name="jt_bg_url"]').value,
            root.querySelector('[name="jt_bg_alt"]').value,
            root.querySelector('[name="jt_overlay"]').checked,
        ));
    });
};

const carouselSlideSection = (i, browseLabel) =>
    `<h6 class="mt-3 mb-2 text-muted text-uppercase small">Slide ${i}</h6>` +
    urlField(`slide_url_${i}`, 'Image URL', browseLabel, 'https://placehold.co/1200x500?text=Slide+Image') +
    textField(`slide_alt_${i}`, 'Alt text', 'Describe the image') +
    textField(`slide_title_${i}`, 'Caption title', `Slide ${i}`) +
    textareaField(`slide_text_${i}`, 'Caption text', 'Optional caption text shown on the slide.');

const openCarouselDialog = async(editor) => {
    const [title, insertLabel, browseLabel] = await Promise.all([
        getString('dialog_carousel_title', component),
        getString('insert', component),
        getString('browse', component),
    ]);

    const slideCount = 3;
    const body = Array.from({length: slideCount}, (_, i) => carouselSlideSection(i + 1, browseLabel)).join('');

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
        editor.insertContent(buildCarousel(slides));
    });
};

const accordionSection = (i) =>
    `<h6 class="mt-3 mb-2 text-muted text-uppercase small">Section ${i}</h6>` +
    textField(`acc_title_${i}`, 'Section title', `Section ${i}`) +
    textareaField(`acc_body_${i}`, 'Section body', 'Section content goes here.');

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
            {value: '2', text: '2 Sections'},
            {value: '3', text: '3 Sections'},
            {value: '4', text: '4 Sections'},
            {value: '5', text: '5 Sections'},
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

const openTableDialog = async(editor) => {
    const [title, rowsLabel, colsLabel, headerLabel, captionLabel, insertLabel] = await Promise.all([
        getString('dialog_table_title', component),
        getString('table_rows', component),
        getString('table_columns', component),
        getString('table_header', component),
        getString('table_caption', component),
        getString('insert', component),
    ]);

    const rowOpts = [2, 3, 4, 5, 6, 8, 10].map(n => ({value: String(n), text: `${n} rows`}));
    const colOpts = [2, 3, 4, 5, 6].map(n => ({value: String(n), text: `${n} columns`}));

    const body =
        selectField('tbl_rows', rowsLabel, rowOpts, '3') +
        selectField('tbl_cols', colsLabel, colOpts, '3') +
        checkboxField('tbl_header', headerLabel, true) +
        textField('tbl_caption', captionLabel, 'Optional caption shown above the table');

    const modal = await openModal(title, body, insertLabel);
    modal.getRoot().on(ModalEvents.save, () => {
        const root = modal.getRoot()[0];
        editor.insertContent(buildTable(
            parseInt(root.querySelector('[name="tbl_rows"]').value, 10),
            parseInt(root.querySelector('[name="tbl_cols"]').value, 10),
            root.querySelector('[name="tbl_header"]').checked,
            root.querySelector('[name="tbl_caption"]').value,
        ));
    });
};

export const getSetup = async() => {
    const [buttonImage, buttonTitle] = await Promise.all([
        getButtonImage('bootstrap', component),
        getString('button_bootstrap', component),
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
