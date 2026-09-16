# Repository Guidelines

## Project Structure & Module Organization

This is a personal blog built on Astro 7 with Svelte islands and TypeScript configuration. Main source code lives in `src/`: routes in `src/pages`, layouts in `src/layouts`, reusable UI in `src/components`, styles in `src/styles`, content in `src/content`, helpers in `src/utils`, and Markdown/HTML plugins in `src/plugins`. Site configuration is split across `src/config` with matching type definitions in `src/types`; prefer imports from `@/config` when available. Static files served directly belong in `public`, source-managed images in `src/assets`, docs in `docs`, and build-time automation in `scripts`.

## Build, Test, and Development Commands

Use `pnpm`; the `preinstall` script enforces it. Node.js >= 22.23.0 is required.

- `pnpm dev` or `pnpm start`: run the local Astro dev server.
- `pnpm check`: run Astro diagnostics (`astro check`).
- `pnpm type-check`: run TypeScript with `--noEmit --isolatedDeclarations` over `src/` and `scripts/`.
- `pnpm format`: format `./src` and `./scripts` with Biome.
- `pnpm lint`: run Biome checks and safe fixes on `./src` and `./scripts`.
- `pnpm build`: run the full pipeline (GitHub card data, LQIPs, VNDB covers, Astro build, PIO asset pruning, font subsetting, inline-script minification, Pagefind indexing) and output to `dist`.
- `pnpm preview`: preview the production build locally.
- `pnpm new-post <filename>`: scaffold a new content post.
- `pnpm new-d <content>` (alias `pnpm new-dynamic`): scaffold a new dynamic entry.
- `pnpm lqips` / `pnpm github-cards`: regenerate the committed constant data files.

## Coding Style & Naming Conventions

Biome is the formatter and linter. It uses tabs for indentation and double quotes for JavaScript/TypeScript strings. Keep Astro and Svelte components in `PascalCase` (`PostCard.astro`, `Search.svelte`), config modules in `camelCase` ending with `Config.ts`, and utilities in descriptive kebab case such as `date-utils.ts`. Keep `src/types` aligned with `src/config`. Avoid unrelated formatting churn. Note that CI (`.github/workflows/biome.yml`) still runs `biome ci ./src` only, while the local scripts also cover `./scripts`.

## Testing Guidelines

There is no dedicated unit-test framework configured. Before shipping changes, run `pnpm check`, `pnpm type-check`, and `pnpm build` for rendering, content, or generated asset work. For visual or interactive changes, verify with `pnpm dev` or `pnpm preview`.

## Commit Guidelines

Use Conventional Commits, matching the current history: `feat: ...`, `fix: ...`, and `chore: ...`. Keep commits focused on one concern.

## Security & Configuration Tips

Do not commit secrets, tokens, or service keys in config files. Keep deployment-specific settings in the target platform environment, and review generated files such as `dist`, `src/constants/lqips.json`, `src/constants/github-card-data.json`, and `src/constants/icons-data.json` before committing them.
