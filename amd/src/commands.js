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

const buildZoomModal = (uid, src, alt, caption = '') => {
    const capHtml = caption
        ? `\n        <p class="mt-2 mb-0 text-muted">${escapeHtml(caption)}</p>`
        : '';
    return `<div class="modal fade" id="${uid}" tabindex="-1" aria-label="${alt}" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">${alt}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body text-center">
        <img src="${src}" class="img-fluid" alt="${alt}">${capHtml}
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
            modalHtml: buildZoomModal(uid, imgSrc, imgAlt),
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

const buildJumbotron = (title, lead, buttonText) => {
    const titleSafe = escapeHtml(title) || 'Welcome';
    const leadSafe = escapeHtml(lead) || 'A short, friendly description of what this section is about.';
    const btn = buttonText
        ? `\n  <hr class="my-4">\n  <a class="btn btn-primary btn-lg" href="#" role="button">${escapeHtml(buttonText)}</a>`
        : '';
    return `<!-- Bootstrap 5 jumbotron -->
<div class="p-5 mb-4 bg-body-tertiary rounded-3 border">
  <div class="container-fluid py-3">
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

// Render a URL input + a Browse button that opens the Moodle filepicker
// directly. We don't use TinyMCE urlinput / file_picker_callback at all so
// the picker and our modal share Moodle's z-index world.
const urlField = (name, label, browseLabel) =>
    `<div class="form-group mb-3">
        <label for="${name}" class="form-label">${escapeHtml(label)}</label>
        <div class="input-group">
            <input type="text" id="${name}" name="${name}" class="form-control" autocomplete="off">
            <button type="button" class="btn btn-secondary" data-action="browse" data-target="${name}">
                ${escapeHtml(browseLabel)}
            </button>
        </div>
    </div>`;

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
    urlField(`img_url_${i}`, 'Image URL', browseLabel) +
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

    let cardCount = 3;
    const body =
        selectField('count', countLabel, [
            {value: '2', text: '2 Cards'},
            {value: '3', text: '3 Cards'},
            {value: '4', text: '4 Cards'},
        ]) +
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
        urlField('url', urlLabel, browseLabel) +
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

const openJumbotronDialog = async(editor) => {
    const [title, titleLabel, leadLabel, buttonLabel, insertLabel] = await Promise.all([
        getString('dialog_jumbotron_title', component),
        getString('jumbotron_title', component),
        getString('jumbotron_lead', component),
        getString('jumbotron_button', component),
        getString('insert', component),
    ]);

    const body =
        textField('jt_title', titleLabel, 'Welcome') +
        textareaField('jt_lead', leadLabel, 'A short, friendly description of what this section is about.') +
        textField('jt_button', buttonLabel, 'Learn more (leave blank for no button)');

    const modal = await openModal(title, body, insertLabel);
    modal.getRoot().on(ModalEvents.save, () => {
        const root = modal.getRoot()[0];
        editor.insertContent(buildJumbotron(
            root.querySelector('[name="jt_title"]').value,
            root.querySelector('[name="jt_lead"]').value,
            root.querySelector('[name="jt_button"]').value,
        ));
    });
};

const carouselSlideSection = (i, browseLabel) =>
    `<h6 class="mt-3 mb-2 text-muted text-uppercase small">Slide ${i}</h6>` +
    urlField(`slide_url_${i}`, 'Image URL', browseLabel) +
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
