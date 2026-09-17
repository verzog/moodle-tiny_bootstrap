# Changelog

All notable changes to the **Bootstrap Scaffolding** TinyMCE plugin
(`tiny_bootstrap`) are recorded here. Versions follow the plugin's
`$plugin->release` value in `version.php`.

Supported Moodle: **5.0 to 5.2** (`$plugin->supported = [500, 502]`,
`requires = 2025041400`). Requires **PHP 8.2+** and a Bootstrap 5 theme.

## 1.4.7

### Fixes
- **Card Row arrows now work on view pages** — the prev/next controls were
  rendered as `<button>` elements, which Moodle's output sanitiser strips from
  saved content (leaving a bare chevron), so the arrows did nothing on a live
  page. They are now anchors (`<a role="button">`), which survive the
  sanitiser; native touch/trackpad scrolling was unaffected.
- **Carousel prev/next and indicators** — rebuilt on the same anchor pattern so
  the manual controls and slide dots survive the sanitiser and keep working on
  view pages, not only inside the editor.

## 1.4.6

### Features
- **Card Row** — a new component that inserts a **horizontally scrolling row of
  cards**, several visible at once (about three on a wide screen, fewer on a
  phone), with prev/next arrows that scroll one card at a time and native
  touch/trackpad swiping. Each card takes a heading, rich body text, an optional
  image, and an optional button (text, link, colour). Fill in as many cards as
  you need (blank cards are dropped). Ideal for "upcoming intakes"-style
  card strips where you want more than one card in view at once.

## 1.4.5

### Fixes
- **Carousel content cards** — a slide left without an image now renders as a
  content card whose height fits its caption/card content (and shows on every
  screen size), instead of forcing a full-height stretched background. Paste a
  styled card into a slide with no image to get a compact card carousel.
- **Natural-height slides no longer upscale small images** — in "natural" (size
  based on picture) mode the image and caption sit in normal flow, so a small
  picture keeps its own size (centred, capped at 100% width) and the caption
  is never clipped by a too-short slide.
- Content and natural-mode slides keep the caption text readable (no forced
  dark background behind theme text), reserve the side gutters so buttons and
  links do not fall under the prev/next controls, and give the slide indicators
  a hairline so they stay visible over a light page or card.

## 1.4.4

### Fixes
- **Security:** sanitise HTML when switching the source view back to WYSIWYG,
  parsing untrusted markup inertly (in a `<template>`) so pasted content such
  as `<img onerror>` can never run in the author's session.
- **Security:** strip control characters from URLs before validating them, so
  obfuscated schemes such as `java&#x09;script:` cannot slip through the
  link/image scheme allowlist.
- Preserve valid **relative image and link URLs** in pasted HTML (previously
  scheme-less paths like `images/photo.jpg` had their `src` stripped).
- Drop pasted **`id` attributes** so components rendered twice (caption in a
  figure and its zoom modal; card body in a card and its modal) cannot create
  duplicate document ids.
- Keep the **carousel call-to-action available on small screens** (the caption
  is hidden below the `md` breakpoint, so the button is repeated in an
  always-visible bar).
- Strip the editor's reserved **`data-rich*`** hooks from pasted markup and
  scope the dialog's field snapshots to the generated fields, so pasted HTML
  cannot collide with the editor's own selectors.

## 1.4.3

### Features
- **Per-slide carousel button** — each carousel slide can now show an optional
  call-to-action button (button text, link and a Bootstrap colour) in its
  caption.
- **HTML source view** on the rich-text content fields — a `</>` toggle lets you
  view and edit the raw HTML and paste in preformatted markup. Pasted HTML is
  kept (headings, tables, styled blocks, links, images) and cleaned by Moodle's
  output sanitiser when the page renders.

## 1.4.2

### Compatibility
- Declared support for **Moodle 5.2** after a full API compatibility check,
  and added `MOODLE_502_STABLE` to the CI matrix (`main`/5.3-dev already
  tested). `supported` is now `[500, 502]`.

## 1.4.1

### Features
- **Video and Text:** added a **Fullscreen** button. The video plays in place
  and can now be expanded to fill the screen, alongside the existing
  "Open in a larger view" option.

## 1.4.0

### Features
- **Rich text with links** in body, caption and lead fields (bold, italic,
  insert link) across cards, accordions, image/video captions, the jumbotron
  lead, carousel captions, and image/video-and-text. Input is sanitised to a
  safe tag/attribute whitelist on insert and again by Moodle on output.
- **Carousel aspect-ratio chooser** — 16:9, 4:3, 1:1, 21:9 or natural height.
- **Carousel caption background** — a colour picker with an opacity level so
  overlaid caption text stays readable.
- **Video and Text plays in place** with an "Open in a larger view" modal,
  replacing the previous poster-image-only flow.

### Improvements
- **Modernised carousel prev/next controls** — inline-SVG chevrons on
  translucent circular backgrounds, styled inline so they render correctly on
  view pages (fixes broken control icons on some themes).

### Security & fixes
- Hardened the admin branding-CSS guard so a closing `</style>` tag (including
  spaced, newline and uppercase variants) cannot break out of the injected
  `<style>` element, without corrupting legitimate CSS values.

### Maintenance
- Canonical GPL `@license` and unified `@copyright` across all files;
  README corrections.

## 1.3.2
- Added a left/centre/right **alignment** control for the Image with Zoom
  Modal component, and fixed overflow of left-aligned images in narrow
  content areas.

## 1.3.1
- Inlined multi-line language strings so AMOS can parse them.

## 1.3.0
- Expanded the Bootstrap cheatsheet, added the view-side boilerplate, and
  externalised the remaining UI strings for translation.

## 1.2.0
- Added further components and per-component options, fixed the jumbotron
  background "Browse repositories…" button, and added the admin branding CSS
  setting.

## 1.1.0
- Added the Image and Text, and Video and Text side-by-side components.

## 1.0.1
- Fixed dialog modal resizing, card-group alt-text auto-fill, and the caption
  shown in the image zoom popup.

## 1.0.0
- Initial release: a Bootstrap 5 component picker for the Moodle TinyMCE
  editor (page grid, heading, card group, image zoom modal, and more).
