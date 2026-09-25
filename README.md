# moodle-tiny_bootstrap — Bootstrap 5 Scaffolding for TinyMCE

A TinyMCE plugin for Moodle 5.0+ that lets content authors insert
ready-made Bootstrap 5 HTML components without writing any code.

## Components

| Component | What it inserts |
|-----------|-----------------|
| **Page Grid Layout** | 1–4 equal-width responsive columns in a responsive container |
| **Heading** | H1–H6 with typed text |
| **Card Group** | 2–4 equal-width Bootstrap cards, each with an image, title, and body |
| **Image with Zoom Modal** | A thumbnail that opens a full-size Bootstrap 5 modal with an optional caption and a left/centre/right alignment choice |
| **Jumbotron** | A hero/banner section with title, lead text, and a call-to-action button |
| **Carousel** | A Bootstrap 5 image slideshow/carousel (one slide at a time) |
| **Card Row** | A horizontally scrolling row of cards — several visible at once (≈3 on desktop, fewer on mobile) with prev/next arrows and swipe; each card has a heading, body, optional image and optional button |
| **Accordion** | A collapsible accordion with a configurable number of sections |
| **Responsive Table** | A Bootstrap-wrapped table with optional header row and caption |
| **Image and Text** | A zoomable image beside a heading and body text — image left/text right or image right/text left, with an optional **Hide image name** for quizzes |
| **Video and Text** | A video (YouTube, Vimeo or file) that plays in place, with an **Open in a larger view** button, beside a heading and body text — video left/text right or video right/text left |
| **Dropdown** | A Bootstrap 5 dropdown button with a configurable colour, alignment, optional split caret, and 2–5 linked menu items |
| **Cheatsheet** | A reference block of common Bootstrap 5 snippets (buttons, alerts, badges, list groups, progress, breadcrumb, pagination) to insert and trim down |

### Per-component options

- **Image with Zoom Modal** — choose an **alignment**: centred (default), left or right. Left/right float the image so surrounding text wraps alongside it, with a max-width that keeps a large image from overflowing a narrow content area (such as a quiz answer box). Choose an **image size** — Small (200px), Medium (300px, default), Large (450px) or Full width; the image keeps its proportions and shrinks to fit narrow areas. In a quiz, the question box grows to contain a left/right-aligned image. Tick **Hide image name** in quiz questions so the file name is not shown as the alt text or enlarged-view title.
- **Card Group** — choose the **spacing between cards**, toggle **Include images** off for text-only cards, and tick **Hide image name** in quiz questions so file names aren't used as the images' alt text.
- **Card Row** — a **Card styling** section sets a uniform **Card size** (Small/Medium/Large — every card the same width and height, with images cropped to a fixed band), a per-card **background colour**, optional **text colour** and **border colour**, **corner rounding** and a **drop shadow**.
- **Jumbotron** — the call-to-action button now takes a **link (URL)**, and the background image/video field has a working **Browse repositories…** button.
- **Carousel** — choose an **aspect ratio** (16:9, 4:3, 1:1, 21:9 or natural) so mismatched images line up, set a **caption background colour** with an opacity so overlaid text stays readable, add an optional **call-to-action button** (text, link and colour) per slide, and use the modernised prev/next controls. Leave a slide's image blank to get a **content card** slide whose height fits its content (e.g. a pasted "course intake" card) — useful for a compact card carousel with no background image. In **natural** ratio a small image keeps its own size instead of being stretched to full width.
- **Responsive Table** — pick a **table colour** and **header colour** (Bootstrap contextual variants) and toggle **striped**, **bordered**, **hover** and **compact** styles.

### Hide image name (for quizzes)

Picking an image with **Browse repositories…** fills its alt text with the file
name, which can give away the answer in a quiz question (e.g.
`seborrheic-keratosis.jpg`). **Image with Zoom Modal**, **Image and Text**,
**Card Group**, **Carousel** and **Card Row** each have a **Hide image name**
tick-box that replaces it with a neutral description ("Image", "Card 1 image",
"Slide 1", "Card 1"). The file name is still part of the image's web address, so
rename files for assessed questions before uploading.

### Rich text in content fields

Body, description, caption and lead fields (card body, accordion body, image/video captions, jumbotron lead, carousel captions and more) include a small toolbar for **bold**, **italic** and **inserting links**, so you can embed hyperlinks directly in the text. A **`</>` HTML source view** lets you view the raw markup and paste in preformatted HTML (headings, tables, styled blocks); pasted markup is cleaned by Moodle's output sanitiser when the page renders. Short fields such as titles, labels and alt text stay plain.

## Branding (admin)

Site administrators can add custom CSS that applies to every page — both inside
the editor and on pages where the components render — under
**Site administration → Plugins → Text editors → TinyMCE editor → Bootstrap Scaffolding**.
Use it to override button, card or jumbotron colours so the inserted components
match your organisation's branding. Leave it blank to use the theme defaults.

## Requirements

- Moodle 5.0 or higher (TinyMCE editor)
- A Bootstrap 5 theme (e.g. Boost or any child theme)
- PHP 8.2+

## Installation

### Via Moodle admin (recommended)

1. Download the plugin zip.
2. Go to **Site administration → Plugins → Install plugins**.
3. Upload the zip and follow the prompts.

### Via filesystem

1. Copy the `tiny_bootstrap` folder into `<moodleroot>/lib/editor/tiny/plugins/`.
2. Go to **Site administration → Notifications** and run the upgrade.

## Enabling the button

After installation:

1. Go to **Site administration → Plugins → Text editors → TinyMCE editor**.
2. In the **Toolbar** section, drag the Bootstrap icon into your desired toolbar row.
3. Save changes.

## Usage

Open any TinyMCE editor. Click the **Bootstrap Scaffolding** button (purple B icon)
in the toolbar. A picker dialog opens — choose a component, fill in the fields,
and click **Insert**.

### Grid layout tip

The inserted grid uses standard Bootstrap 5 `.row` / `.col-*` classes.  
To add extra rows, copy the `<div class="row g-3">…</div>` block in the
HTML source view and paste it inside the same `.container-fluid`.

### Image modal tip

The inserted modal uses Bootstrap 5's `data-bs-toggle` attributes, so it works
automatically on any Moodle 5.0+ Boost-based page without any additional
JavaScript.

## Development

```bash
# Install CI tooling
composer create-project moodlehq/moodle-plugin-ci ../moodle-plugin-ci ^4

# Check coding standards (whole plugin)
../moodle-plugin-ci/vendor/bin/phpcs .

# Auto-fix formatting
../moodle-plugin-ci/vendor/bin/phpcbf .

# Compile AMD modules (run from Moodle root)
grunt amd --root=lib/editor/tiny/plugins/bootstrap
```

CI runs automatically on push via GitHub Actions (see `.github/workflows/moodle-ci.yml`).

## Licence

This plugin is released under the **GNU General Public License v3 or later** —
see [LICENCE.md](LICENCE.md) for the full text.

### Bootstrap 5 (third-party)

This plugin generates HTML markup that targets the **Bootstrap 5** CSS
framework (provided by the active Moodle theme — Bootstrap is **not** bundled
in this plugin). Bootstrap 5 is copyright © 2011–2024 The Bootstrap Authors
and is distributed under the **MIT License** — see the Bootstrap notice in
[LICENCE.md](LICENCE.md).

## Copyright

2025 Skin Cancer College of Australasia — <https://skincancercollege.org>
