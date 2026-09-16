<div align="center">

# Carlos blog

A static personal blog built with Astro 7 + Svelte 5

![Node.js >= 22.23](https://img.shields.io/badge/node.js-%3E%3D22.23-brightgreen)
![pnpm 11](https://img.shields.io/badge/pnpm-11-blue)
![Astro](https://img.shields.io/badge/Astro-7-orange)
![TypeScript](https://img.shields.io/badge/TypeScript-6-blue)
![License](https://img.shields.io/badge/license-MIT-green)

**Site: [https://394000.xyz](https://394000.xyz)**

</div>

---

## 📦 Requirements

- **Node.js >= 22.23.0** (see `engines` in `package.json`)
- **pnpm >= 11**: the `preinstall` hook uses `only-allow pnpm`, so npm / yarn fail at install time

## 🚀 Local Development

```bash
pnpm install     # install dependencies
pnpm dev         # dev server at http://localhost:4321
```

## 🧞 Commands

Run all commands from the project root:

| Command | Action |
| :--- | :--- |
| `pnpm dev` / `pnpm start` | Start the local dev server (`localhost:4321`) |
| `pnpm build` | Full production build into `./dist/` |
| `pnpm preview` | Preview the built site locally |
| `pnpm check` | `astro check` for type and content-collection errors |
| `pnpm type-check` | `tsc --noEmit --isolatedDeclarations` over `src/` and `scripts/` |
| `pnpm lint` | Biome check with safe fixes on `./src` and `./scripts` |
| `pnpm format` | Biome format on `./src` and `./scripts` |
| `pnpm new-post <filename>` | Scaffold a new post |
| `pnpm new-d <content>` | Scaffold a new dynamic entry |
| `pnpm new-dynamic <content>` | Same as above, full command name |
| `pnpm lqips` | Regenerate LQIP data into `src/constants/lqips.json` |
| `pnpm github-cards` | Regenerate GitHub repo card data |
| `pnpm astro ...` | Call the Astro CLI directly (e.g. `astro add`, `astro check`) |

## 📁 Project Structure

```
├── src/
│   ├── assets/          # Images processed by Astro (built to webp/avif)
│   ├── components/      # Grouped by domain: analytics / comment / common / controls /
│   │                    #   features / layout / misc / pages / widget
│   ├── config/          # All site configuration, re-exported from index.ts
│   ├── constants/       # Generated data (lqips.json, github-card-data.json, icons)
│   ├── content/         # Content collections: posts / dynamic / projects / spec
│   ├── i18n/            # UI translations
│   ├── layouts/         # Layout.astro (HTML shell), MainGridLayout.astro (page grid)
│   ├── pages/           # Astro file-based routing
│   ├── plugins/         # Custom remark / rehype plugins
│   ├── styles/          # Global styles
│   ├── types/           # Type definitions matching src/config
│   └── utils/           # Sorting, dates, crypto, images, TOC helpers
├── public/              # Static assets copied as-is into the build
├── scripts/             # Build-time scripts (LQIP, font subsetting, Pagefind, ...)
└── docs/                # Project documentation
```

## ✏️ Writing

### Post frontmatter

Posts live in `src/content/posts/` and support `.md` and `.mdx`:

```yaml
---
title: Post title
published: 2026-09-16
updated: 2026-09-20        # optional, drives the "last edited" card
description: Post summary
image: ./cover.jpg         # cover; use "api" for a random cover
tags: [TagA, TagB]
category: Category name
draft: false               # drafts are excluded from the build
lang: zh-CN                # only needed when it differs from the site language
pinned: false              # pin to top
comment: true              # allow comments
password: ""               # when set, the post is encrypted
passwordHint: ""           # password hint
series: Series name        # group posts into a series
seriesOrder: 1             # order within the series
author: ""                 # overrides the default author
sourceLink: ""             # original source
licenseName: ""            # overrides the default license name
licenseUrl: ""
---
```

### Dynamic entries

One Markdown file per entry in `src/content/dynamic/`. Create one with:

```bash
pnpm new-d Today was a good day, went out for hot pot
```

```yaml
---
published: 2026-09-16 15:29:00
pinned: true      # pin to top
location: China   # location
---

The body supports Markdown.
```

You can also use [Memos](https://www.usememos.com/) as a data source by enabling `memos.enable` in `src/config/dynamicConfig.ts`, which fetches entries live and supports pinned sync and image attachments.

### Projects

Project entries live in `src/content/projects/` with the fields `title`, `published`, `description`, `image`, `tags`, `status`, `link[]` (`label` / `icon` / `value`) and `order`.

### About and friends pages

`src/content/spec/about.md` and `src/content/spec/friends.mdx` hold the body content of the about and friends pages. `friends.mdx` is an MDX file, so you can rewrite it entirely to your liking.

## 🧩 Extended Markdown

On top of the [GitHub Flavored Markdown](https://github.github.com/gfm/) that Astro provides by default, this project enables:

- **Admonitions**: `github` / `obsidian` / `vitepress` / `docusaurus` themes, switched via `siteConfig.post.rehypeCallouts`
- **GitHub repo cards**: `::github{repo="owner/repo"}`
- **Enhanced code blocks** via Expressive Code, with line numbers, collapsing and language badges
- **Diagrams**: Mermaid, PlantUML
- **Math**: KaTeX
- **Image grids**, **wiki links**, **reading time** and other custom plugins

## ⚙️ Configuration

All configuration lives in `src/config/` and is re-exported from `src/config/index.ts`. Import it like this:

```typescript
import { siteConfig, profileConfig } from "@/config";
```

Common entry points:

| File | Purpose |
| :--- | :--- |
| `siteConfig.ts` | Site title, URL, language, theme color, page toggles, pagination, post page behaviour |
| `profileConfig.ts` | Avatar, name, bio, social links |
| `sidebarConfig.ts` | Sidebar layout and widget order |
| `navBarConfig.ts` | Navbar structure; `LinkPresets` at the bottom defines links |
| `backgroundWallpaper.ts` | Wallpaper modes, banner text, waves |
| `commentConfig.ts` | Comment systems: none / twikoo / waline / giscus / disqus / artalk |
| `analyticsConfig.ts` | Analytics: Google Analytics, Clarity, Umami, 51la |
| `booknavConfig.ts` | Bookmark navigation groups and entries |

See the comments in each file for the remaining configs (`announcementConfig`, `coverImageConfig`, `dynamicConfig`, `effectsConfig`, `expressiveCodeConfig`, `fontConfig`, `friendsConfig`, `galleryConfig`, `licenseConfig`, `mermaidConfig`, `musicConfig`, `pioConfig`, `plantumlConfig`, `sponsorConfig`, `displaySettingsConfig`).

### Site language

Edit `SITE_LANG` at the top of `src/config/siteConfig.ts`:

```typescript
const SITE_LANG = resolveSiteLang("zh_CN");
```

Supported values: `zh_CN`, `zh_TW`, `en`, `ja`, `ko`, `ru`.

### Page toggles

The `pages` object at the top of `siteConfig.ts` controls page access. Setting a key to `false` makes that page return 404 and hides the matching navbar item.

### Environment variables

| Variable | Purpose |
| :--- | :--- |
| `PUBLIC_DISPLAY_SETTINGS` | Controls the display settings panel. Accepts `true/1/on/yes` or `false/0/off/no` and takes precedence over `displaySettingsConfig.ts` |
| `CF_WORKERS` | Enables the Cloudflare Workers adapter |

## 🔨 Build Pipeline

`pnpm build` runs, in order:

1. `scripts/generate-github-card-data.ts` — collects GitHub repo cards used in posts
2. `scripts/generate-lqips.ts` — generates LQIP placeholders
3. `scripts/generate-vndb-covers.ts` — downloads VNDB covers (only when `siteConfig.vndb.downloadCovers` is on)
4. `astro build` — outputs the static site into `dist/`
5. `scripts/prune-pio-assets.ts` — prunes unused Live2D/Spine assets
6. `scripts/subset-fonts.ts` — font subsetting
7. `scripts/minify-inline-scripts.ts` — inline script minification
8. `scripts/run-pagefind.ts` — builds the Pagefind search index

`src/constants/lqips.json`, `src/constants/github-card-data.json` and `src/constants/icons-data.json` are generated and committed; regenerate the first two with `pnpm lqips` / `pnpm github-cards` after changing content.

Generated files to review before committing: `dist/`, `src/constants/lqips.json`, `src/constants/github-card-data.json`, `public/vndb-covers/`.

## ☁️ Deployment

The output is fully static (`dist/`) and can be hosted anywhere:

- **Vercel**: `vercel.json` is included; framework preset `Astro`, build command `pnpm build`, output directory `dist`
- **Cloudflare Workers**: uses `wrangler.jsonc`; set the `CF_WORKERS` environment variable to enable the adapter
- **GitHub Pages**: `.github/workflows/deploy.yml` builds and publishes `dist/` on pushes to `master`

Preview the build locally:

```bash
pnpm build && pnpm preview
```

## 📝 License

Released under the [MIT license](./LICENSE).

Originally forked from [saicaca/fuwari](https://github.com/saicaca/fuwari); the theme comes from [CuteLeaf/Firefly](https://github.com/CuteLeaf/Firefly). Thanks to the original authors.

- Copyright (c) 2024 [saicaca](https://github.com/saicaca) - [fuwari](https://github.com/saicaca/fuwari)
- Copyright (c) 2025 [CuteLeaf](https://github.com/CuteLeaf) - [Firefly](https://github.com/CuteLeaf/Firefly)

Under the MIT license you may freely use, modify and redistribute the code, but the copyright notices above must be retained.

### Tech stack

[Astro](https://astro.build) · [Svelte](https://svelte.dev) · [Tailwind CSS](https://tailwindcss.com) · [Iconify](https://iconify.design) · [Expressive Code](https://expressive-code.com/) · [Pagefind](https://pagefind.app/)

Firefly artwork is copyright of miHoYo, developer of the game [Honkai: Star Rail](https://sr.mihoyo.com/).
