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

import {getButtonImage} from 'editor_tiny/utils';
import {get_string as getString} from 'core/str';
import {buttonName, component, icon} from './common';

const escapeHtml = (s) => (s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const buildGrid = (cols, rows = 1) => {
    const colClass = cols === 1 ? 'col-12' : `col-12 col-md-${12 / cols}`;
    const buildRow = () => {
        const colsHtml = Array.from({length: cols}, (_, i) =>
            `<div class="${colClass}">
  <p>Column ${i + 1} content</p>
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

const buildCardGroup = (cards) => {
    const cardsHtml = cards.map((card, i) => {
        const imgSrc = escapeHtml(card.imageUrl) || 'https://placehold.co/600x300?text=Image';
        const imgAlt = escapeHtml(card.imageAlt) || `Card ${i + 1} image`;
        const title = escapeHtml(card.title) || `Card ${i + 1}`;
        const body = escapeHtml(card.body) || 'Add your card content here.';
        return `  <div class="card">
    <img src="${imgSrc}" class="card-img-top" alt="${imgAlt}">
    <div class="card-body">
      <h5 class="card-title">${title}</h5>
      <p class="card-text">${body}</p>
    </div>
  </div>`;
    }).join('\n');
    return `<!-- Bootstrap 5 card group -->
<div class="card-group">
${cardsHtml}
</div>`;
};

const buildImageModal = (imageUrl, imageAlt, caption) => {
    const uid = 'bsModal' + Math.random().toString(36).slice(2, 9);
    const src = escapeHtml(imageUrl) || 'https://placehold.co/800x500?text=Image';
    const alt = escapeHtml(imageAlt) || 'Image';
    const capHtml = caption
        ? `\n      <p class="mt-2 text-muted">${escapeHtml(caption)}</p>`
        : '';
    const figcaption = caption
        ? `\n  <figcaption class="mt-1 text-muted small">${escapeHtml(caption)}</figcaption>`
        : '';
    return `<!-- Bootstrap 5 image with zoom modal -->
<figure class="text-center">
  <a href="#" data-bs-toggle="modal" data-bs-target="#${uid}" title="Click to enlarge">
    <img src="${src}" class="img-fluid img-thumbnail" style="max-height:250px;cursor:zoom-in;" alt="${alt}">
  </a>${figcaption}
</figure>

<!-- Zoom modal for the image above -->
<div class="modal fade" id="${uid}" tabindex="-1" aria-label="${alt}" aria-hidden="true">
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

const openPicker = async(editor) => {
    const [
        dialogTitle,
        gridLabel,
        headingLabel,
        cardsLabel,
        imageLabel,
        cancelLabel,
    ] = await Promise.all([
        getString('dialog_title', component),
        getString('component_grid', component),
        getString('component_heading', component),
        getString('component_cards', component),
        getString('component_image', component),
        getString('cancel', component),
    ]);

    editor.windowManager.open({
        title: dialogTitle,
        body: {
            type: 'panel',
            items: [{
                type: 'selectbox',
                name: 'component',
                label: 'Component',
                items: [
                    {value: 'grid', text: gridLabel},
                    {value: 'heading', text: headingLabel},
                    {value: 'cards', text: cardsLabel},
                    {value: 'image', text: imageLabel},
                ],
            }],
        },
        buttons: [
            {type: 'cancel', text: cancelLabel},
            {type: 'submit', text: 'Next →', buttonType: 'primary'},
        ],
        onSubmit: (api) => {
            const {component: chosen} = api.getData();
            api.close();
            switch (chosen) {
                case 'grid':
                    openGridDialog(editor);
                    break;
                case 'heading':
                    openHeadingDialog(editor);
                    break;
                case 'cards':
                    openCardDialog(editor);
                    break;
                case 'image':
                    openImageDialog(editor);
                    break;
            }
        },
    });
};

const openGridDialog = async(editor) => {
    const [title, colsLabel, insertLabel, cancelLabel] = await Promise.all([
        getString('dialog_grid_title', component),
        getString('grid_columns', component),
        getString('insert', component),
        getString('cancel', component),
    ]);

    editor.windowManager.open({
        title,
        body: {
            type: 'panel',
            items: [{
                type: 'selectbox',
                name: 'cols',
                label: colsLabel,
                items: [
                    {value: '1', text: '1 Column (full width)'},
                    {value: '2', text: '2 Columns (equal)'},
                    {value: '3', text: '3 Columns (equal)'},
                    {value: '4', text: '4 Columns (equal)'},
                ],
            }],
        },
        buttons: [
            {type: 'cancel', text: cancelLabel},
            {type: 'submit', text: insertLabel, buttonType: 'primary'},
        ],
        onSubmit: (api) => {
            const {cols} = api.getData();
            api.close();
            editor.insertContent(buildGrid(parseInt(cols, 10)));
        },
    });
};

const openHeadingDialog = async(editor) => {
    const [title, levelLabel, textLabel, insertLabel, cancelLabel] = await Promise.all([
        getString('dialog_heading_title', component),
        getString('heading_level', component),
        getString('heading_text', component),
        getString('insert', component),
        getString('cancel', component),
    ]);

    editor.windowManager.open({
        title,
        body: {
            type: 'panel',
            items: [
                {
                    type: 'selectbox',
                    name: 'level',
                    label: levelLabel,
                    items: ['1', '2', '3', '4', '5', '6'].map(n => ({
                        value: n,
                        text: `H${n}`,
                    })),
                },
                {
                    type: 'input',
                    name: 'text',
                    label: textLabel,
                    placeholder: 'Enter heading text…',
                },
            ],
        },
        buttons: [
            {type: 'cancel', text: cancelLabel},
            {type: 'submit', text: insertLabel, buttonType: 'primary'},
        ],
        onSubmit: (api) => {
            const {level, text} = api.getData();
            api.close();
            editor.insertContent(buildHeading(parseInt(level, 10), text));
        },
    });
};

const openCardDialog = async(editor) => {
    const [title, countLabel, insertLabel, cancelLabel] = await Promise.all([
        getString('dialog_card_title', component),
        getString('card_count', component),
        getString('insert', component),
        getString('cancel', component),
    ]);

    const cardFields = (n) => {
        const fields = [];
        const headingStyle = 'margin:12px 0 4px;font-size:13px;font-weight:600;color:#666;';
        for (let i = 1; i <= n; i++) {
            fields.push(
                {type: 'htmlpanel', html: `<h4 style="${headingStyle}">CARD ${i}</h4>`},
                {type: 'input', name: `img_url_${i}`, label: 'Image URL', placeholder: 'https://…'},
                {type: 'input', name: `img_alt_${i}`, label: 'Alt text', placeholder: 'Describe the image'},
                {type: 'input', name: `title_${i}`, label: 'Card title', placeholder: `Card ${i}`},
                {type: 'textarea', name: `body_${i}`, label: 'Body text', placeholder: 'Add your card content here.'},
            );
        }
        return fields;
    };

    let cardCount = 3;

    editor.windowManager.open({
        title,
        size: 'medium',
        body: {
            type: 'panel',
            items: [
                {
                    type: 'selectbox',
                    name: 'count',
                    label: countLabel,
                    items: [
                        {value: '2', text: '2 Cards'},
                        {value: '3', text: '3 Cards'},
                        {value: '4', text: '4 Cards'},
                    ],
                },
                ...cardFields(cardCount),
            ],
        },
        buttons: [
            {type: 'cancel', text: cancelLabel},
            {type: 'submit', text: insertLabel, buttonType: 'primary'},
        ],
        onChange: (api, detail) => {
            if (detail.name === 'count') {
                cardCount = parseInt(api.getData().count, 10);
            }
        },
        onSubmit: (api) => {
            const data = api.getData();
            const n = parseInt(data.count, 10);
            const cards = Array.from({length: n}, (_, i) => ({
                imageUrl: data[`img_url_${i + 1}`] || '',
                imageAlt: data[`img_alt_${i + 1}`] || '',
                title: data[`title_${i + 1}`] || '',
                body: data[`body_${i + 1}`] || '',
            }));
            api.close();
            editor.insertContent(buildCardGroup(cards));
        },
    });
};

const openImageDialog = async(editor) => {
    const [title, urlLabel, altLabel, captionLabel, insertLabel, cancelLabel] = await Promise.all([
        getString('dialog_image_title', component),
        getString('image_url', component),
        getString('image_alt', component),
        getString('image_caption', component),
        getString('insert', component),
        getString('cancel', component),
    ]);

    editor.windowManager.open({
        title,
        body: {
            type: 'panel',
            items: [
                {type: 'input', name: 'url', label: urlLabel, placeholder: 'https://…'},
                {type: 'input', name: 'alt', label: altLabel, placeholder: 'Describe the image for screen readers'},
                {type: 'textarea', name: 'caption', label: captionLabel, placeholder: 'Optional caption shown below the image…'},
            ],
        },
        buttons: [
            {type: 'cancel', text: cancelLabel},
            {type: 'submit', text: insertLabel, buttonType: 'primary'},
        ],
        onSubmit: (api) => {
            const {url, alt, caption} = api.getData();
            api.close();
            editor.insertContent(buildImageModal(url, alt, caption));
        },
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
