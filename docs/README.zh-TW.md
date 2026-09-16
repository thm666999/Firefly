<div align="center">

# Carlos blog

基於 Astro 7 + Svelte 5 的靜態個人部落格

![Node.js >= 22.23](https://img.shields.io/badge/node.js-%3E%3D22.23-brightgreen)
![pnpm 11](https://img.shields.io/badge/pnpm-11-blue)
![Astro](https://img.shields.io/badge/Astro-7-orange)
![TypeScript](https://img.shields.io/badge/TypeScript-6-blue)
![License](https://img.shields.io/badge/license-MIT-green)

**站點位址：[https://394000.xyz](https://394000.xyz)**

</div>

---

## 📦 環境需求

- **Node.js ≥ 22.23.0**（見 `package.json` 的 `engines`）
- **pnpm ≥ 11**：`preinstall` 勾子透過 `only-allow pnpm` 強制使用 pnpm，npm / yarn 會在安裝階段直接報錯

## 🚀 本地開發

```bash
pnpm install     # 安裝依賴
pnpm dev         # 啟動開發伺服器，預設 http://localhost:4321
```

## 🧞 指令

所有指令都在專案根目錄執行：

| Command | Action |
| :--- | :--- |
| `pnpm dev` / `pnpm start` | 啟動本地開發伺服器（`localhost:4321`） |
| `pnpm build` | 完整生產建置，輸出到 `./dist/` |
| `pnpm preview` | 本地預覽已建置的站點 |
| `pnpm check` | `astro check`，檢查型別與內容集合錯誤 |
| `pnpm type-check` | `tsc --noEmit --isolatedDeclarations`，涵蓋 `src/` 與 `scripts/` |
| `pnpm lint` | Biome 檢查並自動修復 `./src` 與 `./scripts` |
| `pnpm format` | Biome 格式化 `./src` 與 `./scripts` |
| `pnpm new-post <filename>` | 新增文章 |
| `pnpm new-d <content>` | 新增一則動態 |
| `pnpm new-dynamic <content>` | 同上，完整指令名 |
| `pnpm lqips` | 重新產生圖片 LQIP 資料到 `src/constants/lqips.json` |
| `pnpm github-cards` | 重新產生 GitHub 倉庫卡片資料 |
| `pnpm astro ...` | 直接呼叫 Astro CLI（如 `astro add`、`astro check`） |

## 📁 專案結構

```
├── src/
│   ├── assets/          # 交由 Astro 最佳化的圖片（建置時轉成 webp/avif）
│   ├── components/      # 依領域拆分：analytics / comment / common / controls /
│   │                    #   features / layout / misc / pages / widget
│   ├── config/          # 全部站點設定，統一由 index.ts 匯出
│   ├── constants/       # 產生的常數資料（lqips.json、github-card-data.json、圖示）
│   ├── content/         # 內容集合：posts / dynamic / projects / spec
│   ├── i18n/            # 多語系 UI 文案
│   ├── layouts/         # Layout.astro（HTML 外殼）、MainGridLayout.astro（頁面格線）
│   ├── pages/           # Astro 檔案路由
│   ├── plugins/         # 自訂 remark / rehype 外掛
│   ├── styles/          # 全域樣式
│   ├── types/           # 與 src/config 對應的型別定義
│   └── utils/           # 排序、日期、加密、圖片處理、目錄產生等工具
├── public/              # 原樣複製到產物的靜態資源
├── scripts/             # 建置期腳本（LQIP、字型子集化、Pagefind 等）
└── docs/                # 專案文件
```

## ✏️ 寫作

### 文章 Frontmatter

文章位於 `src/content/posts/`，支援 `.md` 與 `.mdx`：

```yaml
---
title: 文章標題
published: 2026-09-16
updated: 2026-09-20        # 選填，用於「上次編輯時間」卡片
description: 文章摘要
image: ./cover.jpg         # 封面，填 "api" 使用隨機封面圖
tags: [標籤A, 標籤B]
category: 分類名稱
draft: false               # 草稿，建置時不輸出
lang: zh-CN                # 僅在文章語言與站點語言不同時填寫
pinned: false              # 置頂
comment: true              # 是否允許留言
password: ""               # 設定後文章加密
passwordHint: ""           # 密碼提示
series: 系列名稱            # 系列文章分組
seriesOrder: 1             # 系列內序號
author: ""                 # 覆蓋站點預設作者
sourceLink: ""             # 原文連結
licenseName: ""            # 覆蓋預設授權名稱
licenseUrl: ""
---
```

### 動態

一則動態對應 `src/content/dynamic/` 下的一個 Markdown 檔案，可用指令快速建立：

```bash
pnpm new-d 今天心情不錯，出去吃了一頓火鍋
```

```yaml
---
published: 2026-09-16 15:29:00
pinned: true      # 置頂
location: China   # 位置
---

動態正文支援 Markdown 語法。
```

也支援對接 [Memos](https://www.usememos.com/) 作為資料來源，在 `src/config/dynamicConfig.ts` 開啟 `memos.enable` 即可即時取得，支援置頂同步與圖片附件。

### 專案

專案條目位於 `src/content/projects/`，欄位包含 `title`、`published`、`description`、`image`、`tags`、`status`、`link[]`（`label` / `icon` / `value`）與 `order`。

### 關於頁與友鏈頁

`src/content/spec/about.md` 與 `src/content/spec/friends.mdx` 分別對應關於頁與友鏈頁的正文內容。`friends.mdx` 是 MDX 檔案，可以依自己的喜好完全重寫。

## 🧩 Markdown 擴充語法

除 Astro 預設支援的 [GitHub Flavored Markdown](https://github.github.com/gfm/) 外，本專案還啟用了：

- **提醒區塊（Admonitions）**：`github` / `obsidian` / `vitepress` / `docusaurus` 四種主題，在 `siteConfig.post.rehypeCallouts` 切換
- **GitHub 倉庫卡片**：`::github{repo="owner/repo"}`
- **增強程式碼區塊**：基於 Expressive Code，支援行號、摺疊、語言徽章
- **圖表**：Mermaid、PlantUML
- **數學公式**：KaTeX
- **圖片網格**、**Wiki 連結**、**閱讀時間** 等自訂外掛

## ⚙️ 設定

所有設定都在 `src/config/` 目錄，透過 `src/config/index.ts` 統一匯出，建議這樣匯入：

```typescript
import { siteConfig, profileConfig } from "@/config";
```

常用入口：

| 設定檔 | 作用 |
| :--- | :--- |
| `siteConfig.ts` | 站點標題、URL、語言、主題色、頁面開關、分頁、文章頁行為 |
| `profileConfig.ts` | 頭像、暱稱、簽名、社群連結 |
| `sidebarConfig.ts` | 側邊欄佈局與元件順序 |
| `navBarConfig.ts` | 導覽列結構，底部 `LinkPresets` 可自訂連結 |
| `backgroundWallpaper.ts` | 桌布模式、橫幅文字、水波紋等 |
| `commentConfig.ts` | 留言系統：none / twikoo / waline / giscus / disqus / artalk |
| `analyticsConfig.ts` | 統計分析：Google Analytics、Clarity、Umami、51la |
| `booknavConfig.ts` | 書籤導覽頁的分類與條目 |

其餘設定檔（`announcementConfig`、`coverImageConfig`、`dynamicConfig`、`effectsConfig`、`expressiveCodeConfig`、`fontConfig`、`friendsConfig`、`galleryConfig`、`licenseConfig`、`mermaidConfig`、`musicConfig`、`pioConfig`、`plantumlConfig`、`sponsorConfig`、`displaySettingsConfig`）見各檔案內註解。

### 切換站點語言

編輯 `src/config/siteConfig.ts` 頂部的 `SITE_LANG`：

```typescript
const SITE_LANG = resolveSiteLang("zh_CN");
```

支援 `zh_CN`、`zh_TW`、`en`、`ja`、`ko`、`ru`。

### 頁面開關

`siteConfig.ts` 頂部的 `pages` 物件控制各頁面的存取權限。設為 `false` 時該頁面回傳 404，並自動隱藏對應的導覽列選單項。

### 環境變數

| 變數 | 作用 |
| :--- | :--- |
| `PUBLIC_DISPLAY_SETTINGS` | 控制檢視設定面板開關，取值 `true/1/on/yes` 或 `false/0/off/no`，優先於 `displaySettingsConfig.ts` |
| `CF_WORKERS` | 啟用 Cloudflare Workers 適配器 |

## 🔨 建置流程

`pnpm build` 依序執行：

1. `scripts/generate-github-card-data.ts` — 抓取文章中用到的 GitHub 倉庫卡片資料
2. `scripts/generate-lqips.ts` — 產生圖片 LQIP 佔位資料
3. `scripts/generate-vndb-covers.ts` — 下載 VNDB 封面（僅在 `siteConfig.vndb.downloadCovers` 開啟時生效）
4. `astro build` — 產出靜態站點到 `dist/`
5. `scripts/prune-pio-assets.ts` — 依看板娘設定裁剪多餘資源
6. `scripts/subset-fonts.ts` — 字型子集化
7. `scripts/minify-inline-scripts.ts` — 內嵌腳本壓縮
8. `scripts/run-pagefind.ts` — 產生 Pagefind 全文搜尋索引

`src/constants/lqips.json`、`src/constants/github-card-data.json`、`src/constants/icons-data.json` 都是產物且已納入版本管理，改完內容後可用 `pnpm lqips` / `pnpm github-cards` 重新產生。

建置過程會寫入以下產物，提交前請留意：`dist/`、`src/constants/lqips.json`、`src/constants/github-card-data.json`、`public/vndb-covers/`。

## ☁️ 部署

站點是純靜態輸出（`dist/`），可部署到任意靜態託管：

- **Vercel**：專案自帶 `vercel.json`，框架預設 `Astro`，建置指令 `pnpm build`，輸出目錄 `dist`
- **Cloudflare Workers**：使用 `wrangler.jsonc`，設定環境變數 `CF_WORKERS` 啟用適配器
- **GitHub Pages**：`.github/workflows/deploy.yml` 會在 `master` 分支推送時自動建置並發佈

本地預覽產物：

```bash
pnpm build && pnpm preview
```

## 📝 授權條款

本專案遵循 [MIT license](./LICENSE)。

最初 Fork 自 [saicaca/fuwari](https://github.com/saicaca/fuwari)，主題模板來自 [CuteLeaf/Firefly](https://github.com/CuteLeaf/Firefly)，感謝原作者的貢獻。

- Copyright (c) 2024 [saicaca](https://github.com/saicaca) - [fuwari](https://github.com/saicaca/fuwari)
- Copyright (c) 2025 [CuteLeaf](https://github.com/CuteLeaf) - [Firefly](https://github.com/CuteLeaf/Firefly)

依 MIT 開源協議，可以自由使用、修改、分發程式碼，但需保留上述版權聲明。

### 技術棧

[Astro](https://astro.build) · [Svelte](https://svelte.dev) · [Tailwind CSS](https://tailwindcss.com) · [Iconify](https://iconify.design) · [Expressive Code](https://expressive-code.com/) · [Pagefind](https://pagefind.app/)

流螢（Firefly）相關圖片素材版權歸遊戲[《崩壞：星穹鐵道》](https://sr.mihoyo.com/)開發商[米哈遊](https://www.mihoyo.com/)所有。
