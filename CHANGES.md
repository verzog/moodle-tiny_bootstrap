# Changelog

All notable changes to the **Bootstrap Scaffolding** TinyMCE plugin
(`tiny_bootstrap`) are recorded here. Versions follow the plugin's
`$plugin->release` value in `version.php`.

Supported Moodle: **5.0 to 5.2** (`$plugin->supported = [500, 502]`,
`requires = 2025041400`). Requires **PHP 8.2+** and a Bootstrap 5 theme.

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
