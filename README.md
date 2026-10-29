# moodle-tiny_bootstrap — Bootstrap 5 Scaffolding for TinyMCE

A TinyMCE plugin for **Moodle 5.1, 5.2 and 5.3** that lets content authors
insert ready-made, responsive Bootstrap 5 components without writing any code.
Pick a component, fill in a short form, and it's added to your page.

## Components

| Component | What it inserts |
|-----------|-----------------|
| **Page Grid Layout** | 1–4 equal-width responsive columns, 1–4 rows deep |
| **Heading** | H1–H6 with your text, in your site's heading colours (see [Branding](#branding-admin)) |
| **Card Group** | 2–4 equal-width cards, each with an image, title and body |
| **Card Row** | A horizontally scrolling row of cards with prev/next arrows and swipe; each card has a heading, body, optional image and optional button |
| **Image with Zoom Modal** | A thumbnail that opens a full-size view with an optional caption, aligned left, centre or right |
| **Image and Text** | A zoomable image beside a heading and body text, image on either side |
| **Video and Text** | A YouTube, Vimeo or uploaded video that plays in place, with an **Open in a larger view** button, beside a heading and body text |
| **Jumbotron** | A hero section with title, lead text, call-to-action button and optional background image or video |
| **Ad Banner** | An event-style banner: title and speaker (photo and name) on one side; logo, date and time on the other; and a call-to-action button |
| **Carousel** | A slideshow of 2–6 slides, with image or content-card slides and optional buttons |
| **Accordion** | Collapsible sections, as many as you need |
| **Responsive Table** | A table with optional header row, caption, colours and striped, bordered, hover or compact styles |
| **Dropdown** | A dropdown button with colour, alignment, optional split caret and 2–5 menu links |
| **Cheatsheet** | Common Bootstrap 5 snippets (buttons, alerts, badges, list groups, progress, breadcrumb, pagination) to insert and trim down |

### Per-component options

- **Image with Zoom Modal** — type an optional **Modal title** to show above the enlarged image (left blank, the title is the alt text, or "Image" when **Hide image name** is ticked). Choose an **alignment**: centred (default), left or right. Left/right float the image so surrounding text wraps alongside it, with a max-width that keeps a large image from overflowing a narrow content area (such as a quiz answer box). Choose an **image size** — Small (200px), Medium (300px, default), Large (450px) or Full width; the image keeps its proportions and shrinks to fit narrow areas. In a quiz, the question box grows to contain a left/right-aligned image. Tick **Hide image name** in quiz questions so the file name is not shown as the alt text or enlarged-view title.
- **Card Group** — choose the **spacing between cards**, toggle **Include images** off for text-only cards, and tick **Hide image name** in quiz questions so file names aren't used as the images' alt text.
- **Card Row** — a **Card styling** section sets a uniform **Card size** (Small/Medium/Large — every card the same width and height, with images cropped to a fixed band), a per-card **background colour**, optional **text colour** and **border colour**, **corner rounding** and a **drop shadow**.
- **Jumbotron** — the call-to-action button takes a **link (URL)**, the background image/video field has a working **Browse repositories…** button, and a **Padding** choice (Standard, None, Small, Medium or Large) sets the space inside the box.
- **Ad Banner** — choose a **Layout**: title and speaker left with the details right (default), or details left with the title and speaker right; on a phone both sides stack, title first. Set the **background**, **accent** (bottom strip and button text), **speaker box** and **text** colours (they start with the site's default colours — see [Branding](#branding-admin)), and the **Padding** (Standard, None, Small, Medium or Large). The speaker photo, speaker name, logo, date, time and button are all optional and left out when blank.
- **Carousel** — choose the **number of slides** (2–6; anything already typed is kept when you change it), an **aspect ratio** (16:9, 4:3, 1:1, 21:9 or natural) so mismatched images line up, set a **caption background colour** with an opacity so overlaid text stays readable, add an optional **call-to-action button** (text, link and colour) per slide, and use the modernised prev/next controls. Leave a slide's image blank to get a **content card** slide whose height fits its content (e.g. a pasted "course intake" card) — useful for a compact card carousel with no background image. In **natural** ratio a small image keeps its own size instead of being stretched to full width.
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

Set your organisation's look once under
**Site administration → Plugins → Text editors → TinyMCE editor → Bootstrap Scaffolding**:

- **Heading colours** — a colour for each heading level (H1–H6). They apply to
  headings inserted with the Heading component, both in the editor and on the
  page, and override the theme's heading colour on those headings only. Other
  headings on your site are not changed. Leave a level blank to keep the theme
  colour. Headings inserted before version 1.7.0 keep the theme colour until
  they are inserted again.
- **Component defaults** — the colours the Ad Banner (background, accent,
  speaker box, text) and Card Row (card background) start with, and the padding
  the Ad Banner and Jumbotron start with (Standard keeps each component's
  built-in padding). Out of the box they use neutral Bootstrap colours. Authors
  can still change them on each component, and changing them does not alter
  components already inserted.
- **Custom CSS** — your own CSS, applied on every page and inside the editor, so
  authors see your branding while they edit. Use it to override button, card or
  jumbotron colours, for example. Leave it blank to use the theme defaults.

## Requirements

- Moodle 5.1, 5.2 or 5.3 (5.3 LTS supported), with the TinyMCE editor
- A Bootstrap 5 theme, such as Boost or a child theme
- PHP 8.2 or later (Moodle 5.2 and 5.3 need PHP 8.3 or later)

Moodle 5.0 is no longer supported from version 1.6.0. Sites still on Moodle 5.0
should stay on version 1.4.x until they upgrade.

## Installation

### Via Moodle admin (recommended)

1. Download the plugin zip.
2. Go to **Site administration → Plugins → Install plugins**.
3. Upload the zip and follow the prompts.

### Via filesystem

1. Copy the plugin into `<moodleroot>/public/lib/editor/tiny/plugins/bootstrap`
   (the folder must be named `bootstrap`).
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
Choose up to 4 rows in the dialog. To add more later, copy the `<div class="row g-3">…</div>` block in the
HTML source view and paste it inside the same `.container-fluid`.

### Image modal tip

The inserted modal uses Bootstrap 5's `data-bs-toggle` attributes, so it works
automatically on any Moodle 5.1+ Boost-based page without any additional
JavaScript.

## Development

```bash
# Install CI tooling
composer create-project moodlehq/moodle-plugin-ci ../moodle-plugin-ci ^4

# Check coding standards (whole plugin)
../moodle-plugin-ci/vendor/bin/phpcs .

# Auto-fix formatting
../moodle-plugin-ci/vendor/bin/phpcbf .

# Compile AMD modules (run from the root of a MOODLE_501_STABLE checkout)
npx grunt amd --root=public/lib/editor/tiny/plugins/bootstrap
```

CI runs automatically on push via GitHub Actions (see `.github/workflows/moodle-ci.yml`).

## Licence

Free and open source under the **GNU General Public License v3 or later** —
see [LICENSE](LICENSE) for the full text.

### Bootstrap 5 (third-party)

This plugin generates HTML markup that targets the **Bootstrap 5** CSS
framework (provided by the active Moodle theme — Bootstrap is **not** bundled
in this plugin). Bootstrap 5 is copyright © 2011–2024 The Bootstrap Authors
and is distributed under the **MIT License** — see the Bootstrap notice in
[NOTICE.md](NOTICE.md).

## Copyright

2025 Vernon Spain
