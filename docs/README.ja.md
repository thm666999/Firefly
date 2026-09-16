<div align="center">

# Carlos blog

Astro 7 + Svelte 5 で構築した静的個人ブログ

![Node.js >= 22.23](https://img.shields.io/badge/node.js-%3E%3D22.23-brightgreen)
![pnpm 11](https://img.shields.io/badge/pnpm-11-blue)
![Astro](https://img.shields.io/badge/Astro-7-orange)
![TypeScript](https://img.shields.io/badge/TypeScript-6-blue)
![License](https://img.shields.io/badge/license-MIT-green)

**サイト：[https://394000.xyz](https://394000.xyz)**

</div>

---

## 📦 動作環境

- **Node.js >= 22.23.0**（`package.json` の `engines` を参照）
- **pnpm >= 11**：`preinstall` フックが `only-allow pnpm` で強制するため、npm / yarn ではインストール時にエラーになります

## 🚀 ローカル開発

```bash
pnpm install     # 依存関係をインストール
pnpm dev         # 開発サーバー http://localhost:4321
```

## 🧞 コマンド

すべてプロジェクトのルートで実行します：

| Command | Action |
| :--- | :--- |
| `pnpm dev` / `pnpm start` | ローカル開発サーバーを起動（`localhost:4321`） |
| `pnpm build` | 本番ビルドを実行し `./dist/` に出力 |
| `pnpm preview` | ビルド済みサイトをローカルでプレビュー |
| `pnpm check` | `astro check` による型・コンテンツコレクションの検査 |
| `pnpm type-check` | `tsc --noEmit --isolatedDeclarations`（`src/` と `scripts/` が対象） |
| `pnpm lint` | Biome で `./src` と `./scripts` を検査し自動修正 |
| `pnpm format` | Biome で `./src` と `./scripts` を整形 |
| `pnpm new-post <filename>` | 記事を新規作成 |
| `pnpm new-d <content>` | 動的投稿を 1 件作成 |
| `pnpm new-dynamic <content>` | 上記と同じ（完全なコマンド名） |
| `pnpm lqips` | LQIP データを `src/constants/lqips.json` に再生成 |
| `pnpm github-cards` | GitHub リポジトリカードのデータを再生成 |
| `pnpm astro ...` | Astro CLI を直接呼び出す（`astro add`、`astro check` など） |

## 📁 ディレクトリ構成

```
├── src/
│   ├── assets/          # Astro が最適化する画像（ビルド時に webp/avif へ変換）
│   ├── components/      # 領域ごとに分割：analytics / comment / common / controls /
│   │                    #   features / layout / misc / pages / widget
│   ├── config/          # すべての設定。index.ts から一括エクスポート
│   ├── constants/       # 生成データ（lqips.json、github-card-data.json、アイコン）
│   ├── content/         # コンテンツコレクション：posts / dynamic / projects / spec
│   ├── i18n/            # UI の翻訳
│   ├── layouts/         # Layout.astro（HTML シェル）、MainGridLayout.astro（ページグリッド）
│   ├── pages/           # Astro のファイルベースルーティング
│   ├── plugins/         # 独自の remark / rehype プラグイン
│   ├── styles/          # グローバルスタイル
│   ├── types/           # src/config に対応する型定義
│   └── utils/           # 並べ替え、日付、暗号化、画像処理、目次生成など
├── public/              # そのまま出力される静的ファイル
├── scripts/             # ビルド時スクリプト（LQIP、フォントサブセット、Pagefind など）
└── docs/                # プロジェクトドキュメント
```

## ✏️ 記事の書き方

### Frontmatter

記事は `src/content/posts/` に置き、`.md` と `.mdx` に対応しています：

```yaml
---
title: 記事タイトル
published: 2026-09-16
updated: 2026-09-20        # 任意。「最終更新」カードに使用
description: 記事の概要
image: ./cover.jpg         # カバー画像。"api" でランダムカバー
tags: [タグA, タグB]
category: カテゴリ名
draft: false               # 下書き。ビルド時に出力されない
lang: zh-CN                # サイトの言語と異なる場合のみ指定
pinned: false              # トップに固定
comment: true              # コメントの可否
password: ""               # 設定すると記事が暗号化される
passwordHint: ""           # パスワードのヒント
series: シリーズ名           # シリーズ記事のグループ
seriesOrder: 1             # シリーズ内の順序
author: ""                 # 既定の著者を上書き
sourceLink: ""             # 原典リンク
licenseName: ""            # 既定のライセンス名を上書き
licenseUrl: ""
---
```

### 動的投稿

`src/content/dynamic/` の Markdown ファイル 1 つが投稿 1 件に対応します。コマンドで作成できます：

```bash
pnpm new-d 今日は気分がいいので、火鍋を食べに行った
```

```yaml
---
published: 2026-09-16 15:29:00
pinned: true      # トップに固定
location: China   # 場所
---

本文は Markdown に対応しています。
```

[Memos](https://www.usememos.com/) をデータソースとして使うこともできます。`src/config/dynamicConfig.ts` で `memos.enable` を有効にするとリアルタイム取得になり、固定投稿の同期と画像添付に対応します。

### プロジェクト

プロジェクトは `src/content/projects/` に置きます。フィールドは `title`、`published`、`description`、`image`、`tags`、`status`、`link[]`（`label` / `icon` / `value`）、`order` です。

### About / フレンドリンクページ

`src/content/spec/about.md` と `src/content/spec/friends.mdx` が、それぞれ About ページとフレンドリンクページの本文です。`friends.mdx` は MDX ファイルなので自由に書き換えられます。

## 🧩 Markdown 拡張

Astro 既定の [GitHub Flavored Markdown](https://github.github.com/gfm/) に加えて、以下が有効です：

- **Admonitions**：`github` / `obsidian` / `vitepress` / `docusaurus` のテーマを `siteConfig.post.rehypeCallouts` で切り替え
- **GitHub リポジトリカード**：`::github{repo="owner/repo"}`
- **拡張コードブロック**：Expressive Code ベース。行番号、折りたたみ、言語バッジに対応
- **ダイアグラム**：Mermaid、PlantUML
- **数式**：KaTeX
- **画像グリッド**、**Wiki リンク**、**読了時間** などの独自プラグイン

## ⚙️ 設定

設定はすべて `src/config/` にあり、`src/config/index.ts` から一括エクスポートされます：

```typescript
import { siteConfig, profileConfig } from "@/config";
```

主な設定ファイル：

| ファイル | 役割 |
| :--- | :--- |
| `siteConfig.ts` | サイト名、URL、言語、テーマカラー、ページスイッチ、ページネーション、記事ページの挙動 |
| `profileConfig.ts` | アバター、名前、自己紹介、ソーシャルリンク |
| `sidebarConfig.ts` | サイドバーのレイアウトとウィジェットの順序 |
| `navBarConfig.ts` | ナビゲーションバーの構成。末尾の `LinkPresets` でリンクを定義 |
| `backgroundWallpaper.ts` | 壁紙モード、バナーテキスト、波紋など |
| `commentConfig.ts` | コメントシステム：none / twikoo / waline / giscus / disqus / artalk |
| `analyticsConfig.ts` | アクセス解析：Google Analytics、Clarity、Umami、51la |
| `booknavConfig.ts` | ブックマークナビのカテゴリと項目 |

その他の設定（`announcementConfig`、`coverImageConfig`、`dynamicConfig`、`effectsConfig`、`expressiveCodeConfig`、`fontConfig`、`friendsConfig`、`galleryConfig`、`licenseConfig`、`mermaidConfig`、`musicConfig`、`pioConfig`、`plantumlConfig`、`sponsorConfig`、`displaySettingsConfig`）は各ファイルのコメントを参照してください。

### サイトの言語

`src/config/siteConfig.ts` の先頭にある `SITE_LANG` を編集します：

```typescript
const SITE_LANG = resolveSiteLang("zh_CN");
```

対応値：`zh_CN`、`zh_TW`、`en`、`ja`、`ko`、`ru`。

### ページスイッチ

`siteConfig.ts` 先頭の `pages` オブジェクトで各ページの公開可否を制御します。`false` にするとそのページは 404 を返し、対応するナビゲーションメニューも自動的に非表示になります。

### 環境変数

| 変数 | 役割 |
| :--- | :--- |
| `PUBLIC_DISPLAY_SETTINGS` | 表示設定パネルの開閉。`true/1/on/yes` または `false/0/off/no` を指定でき、`displaySettingsConfig.ts` より優先されます |
| `CF_WORKERS` | Cloudflare Workers アダプターを有効化 |

## 🔨 ビルドパイプライン

`pnpm build` は次の順に実行されます：

1. `scripts/generate-github-card-data.ts` — 記事で使われている GitHub リポジトリカードのデータを取得
2. `scripts/generate-lqips.ts` — LQIP プレースホルダーを生成
3. `scripts/generate-vndb-covers.ts` — VNDB のカバー画像をダウンロード（`siteConfig.vndb.downloadCovers` が有効な場合のみ）
4. `astro build` — 静的サイトを `dist/` に出力
5. `scripts/prune-pio-assets.ts` — 未使用の Live2D / Spine アセットを削除
6. `scripts/subset-fonts.ts` — フォントのサブセット化
7. `scripts/minify-inline-scripts.ts` — インラインスクリプトの圧縮
8. `scripts/run-pagefind.ts` — Pagefind の全文検索インデックスを生成

`src/constants/lqips.json`、`src/constants/github-card-data.json`、`src/constants/icons-data.json` は生成物ですがリポジトリに含まれています。内容を変更したら `pnpm lqips` / `pnpm github-cards` で再生成してください。

コミット前に確認したい生成物：`dist/`、`src/constants/lqips.json`、`src/constants/github-card-data.json`、`public/vndb-covers/`。

## ☁️ デプロイ

出力は完全に静的（`dist/`）なので、任意の静的ホスティングに置けます：

- **Vercel**：`vercel.json` 同梱。フレームワークプリセット `Astro`、ビルドコマンド `pnpm build`、出力ディレクトリ `dist`
- **Cloudflare Workers**：`wrangler.jsonc` を使用。環境変数 `CF_WORKERS` を設定してアダプターを有効化
- **GitHub Pages**：`.github/workflows/deploy.yml` が `master` へのプッシュ時にビルドと公開を実行

ローカルでプレビュー：

```bash
pnpm build && pnpm preview
```

## 📝 ライセンス

[MIT license](./LICENSE) の下で公開しています。

もともと [saicaca/fuwari](https://github.com/saicaca/fuwari) からフォークし、テーマは [CuteLeaf/Firefly](https://github.com/CuteLeaf/Firefly) を基にしています。原作者に感謝します。

- Copyright (c) 2024 [saicaca](https://github.com/saicaca) - [fuwari](https://github.com/saicaca/fuwari)
- Copyright (c) 2025 [CuteLeaf](https://github.com/CuteLeaf) - [Firefly](https://github.com/CuteLeaf/Firefly)

MIT ライセンスに基づき自由に使用・改変・再配布できますが、上記の著作権表示は保持してください。

### 技術スタック

[Astro](https://astro.build) · [Svelte](https://svelte.dev) · [Tailwind CSS](https://tailwindcss.com) · [Iconify](https://iconify.design) · [Expressive Code](https://expressive-code.com/) · [Pagefind](https://pagefind.app/)

Firefly 関連の画像素材の著作権は、ゲーム[『崩壊：スターレイル』](https://sr.mihoyo.com/)の開発元 [miHoYo](https://www.mihoyo.com/) に帰属します。
