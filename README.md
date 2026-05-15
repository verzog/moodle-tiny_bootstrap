# moodle-tiny_bootstrap — Bootstrap 5 Scaffolding for TinyMCE

A TinyMCE plugin for Moodle 5.0+ that lets content authors insert
ready-made Bootstrap 5 HTML components without writing any code.

## Components

| Component | What it inserts |
|-----------|----------------|
| **Page Grid Layout** | 1–4 equal-width responsive columns, with a container you can add more rows to |
| **Heading** | H1–H6 with typed text |
| **Card Group** | 2–4 equal-width Bootstrap cards, each with an image, title, and body |
| **Image with Zoom Modal** | A thumbnail that opens a full-size Bootstrap 5 modal with an optional caption |

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
automatically on any Moodle 4.x Boost-based page without any additional
JavaScript.

## Development

```bash
# Install CI tooling
composer create-project moodlehq/moodle-plugin-ci ../moodle-plugin-ci ^4

# Check coding standards
../moodle-plugin-ci/vendor/bin/phpcs ./lib.php

# Auto-fix formatting
../moodle-plugin-ci/vendor/bin/phpcbf ./lib.php

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
