<div align="center">

# Carlos blog

基于 Astro 7 + Svelte 5 的静态个人博客

![Node.js >= 22.23](https://img.shields.io/badge/node.js-%3E%3D22.23-brightgreen)
![pnpm 11](https://img.shields.io/badge/pnpm-11-blue)
![Astro](https://img.shields.io/badge/Astro-7-orange)
![TypeScript](https://img.shields.io/badge/TypeScript-6-blue)
![License](https://img.shields.io/badge/license-MIT-green)

**站点地址：[https://394000.xyz](https://394000.xyz)**

</div>

---

## 📦 环境要求

- **Node.js ≥ 22.23.0**（见 `package.json` 的 `engines`）
- **pnpm ≥ 11**：`preinstall` 钩子通过 `only-allow pnpm` 强制使用 pnpm，npm / yarn 会在安装阶段直接报错

## 🚀 本地开发

```bash
pnpm install     # 安装依赖
pnpm dev         # 启动开发服务器，默认 http://localhost:4321
```

## 🧞 命令

所有命令均在项目根目录执行：

| Command | Action |
| :--- | :--- |
| `pnpm dev` / `pnpm start` | 启动本地开发服务器（`localhost:4321`） |
| `pnpm build` | 完整生产构建，输出到 `./dist/` |
| `pnpm preview` | 本地预览已构建的站点 |
| `pnpm check` | `astro check`，检查类型与内容集合错误 |
| `pnpm type-check` | `tsc --noEmit --isolatedDeclarations`，覆盖 `src/` 与 `scripts/` |
| `pnpm lint` | Biome 检查并自动修复 `./src` 与 `./scripts` |
| `pnpm format` | Biome 格式化 `./src` 与 `./scripts` |
| `pnpm new-post <filename>` | 新建文章 |
| `pnpm new-d <content>` | 新建一条动态 |
| `pnpm new-dynamic <content>` | 同上，完整命令名 |
| `pnpm lqips` | 重新生成图片 LQIP 数据到 `src/constants/lqips.json` |
| `pnpm github-cards` | 重新生成 GitHub 仓库卡片数据 |
| `pnpm astro ...` | 直接调用 Astro CLI（如 `astro add`、`astro check`） |

## 📁 项目结构

```
├── src/
│   ├── assets/          # 需要 Astro 优化的图片（构建时会转成 webp/avif）
│   ├── components/      # 按域拆分：analytics / comment / common / controls /
│   │                    #   features / layout / misc / pages / widget
│   ├── config/          # 全部站点配置，统一由 index.ts 导出
│   ├── constants/       # 生成的常量数据（lqips.json、github-card-data.json、图标数据）
│   ├── content/         # 内容集合：posts / dynamic / projects / spec
│   ├── i18n/            # 多语言 UI 文案
│   ├── layouts/         # Layout.astro（HTML 外壳）、MainGridLayout.astro（页面栅格）
│   ├── pages/           # Astro 文件路由
│   ├── plugins/         # 自定义 remark / rehype 插件
│   ├── styles/          # 全局样式
│   ├── types/           # 与 config 一一对应的类型定义
│   └── utils/           # 排序、日期、加密、图片处理、目录生成等工具
├── public/              # 原样拷贝到产物的静态资源
├── scripts/             # 构建期脚本（LQIP、字体子集、Pagefind 等）
└── docs/                # 项目文档
```

## ✏️ 写作

### 文章 Frontmatter

文章位于 `src/content/posts/`，支持 `.md` 与 `.mdx`：

```yaml
---
title: 文章标题
published: 2026-09-16
updated: 2026-09-20        # 可选，用于"上次编辑时间"卡片
description: 文章摘要
image: ./cover.jpg         # 封面，填 "api" 使用随机封面图
tags: [标签A, 标签B]
category: 分类名
draft: false               # 草稿，构建时不输出
lang: zh-CN                # 仅在文章语言与站点语言不同时填写
pinned: false              # 置顶
comment: true              # 是否允许评论
password: ""               # 设置后文章加密，需输入密码查看
passwordHint: ""           # 密码提示
series: 系列名              # 系列文章分组
seriesOrder: 1             # 系列内序号
author: ""                 # 覆盖站点默认作者
sourceLink: ""             # 原文链接
licenseName: ""            # 覆盖默认许可证名称
licenseUrl: ""
---
```

### 动态

一条动态对应 `src/content/dynamic/` 下的一个 Markdown 文件，可用命令快速创建：

```bash
pnpm new-d 今天心情不错，出去吃了一顿火锅
```

```yaml
---
published: 2026-09-16 15:29:00
pinned: true      # 置顶
location: China   # 位置
---

动态正文支持 Markdown 语法。
```

也支持对接 [Memos](https://www.usememos.com/) 作为数据源，在 `src/config/dynamicConfig.ts` 中打开 `memos.enable` 即可实时拉取，支持置顶同步与图片附件。

### 项目

项目展示条目位于 `src/content/projects/`，字段包括 `title`、`published`、`description`、`image`、`tags`、`status`、`link[]`（`label` / `icon` / `value`）与 `order`。

### 关于页与友链页

`src/content/spec/about.md` 与 `src/content/spec/friends.mdx` 分别对应关于页与友链页的正文内容。`friends.mdx` 是一个 MDX 文件，可以按自己的喜好完全重写。

## 🧩 Markdown 扩展语法

除 Astro 默认支持的 [GitHub Flavored Markdown](https://github.github.com/gfm/) 外，本项目还启用了：

- **提醒块（Admonitions）**：`github` / `obsidian` / `vitepress` / `docusaurus` 四种主题风格，在 `siteConfig.post.rehypeCallouts` 中切换
- **GitHub 仓库卡片**：`::github{repo="owner/repo"}`
- **增强代码块**：基于 Expressive Code，支持行号、折叠、语言徽章
- **图表**：Mermaid、PlantUML
- **数学公式**：KaTeX
- **图片网格**、**Wiki 链接**、**阅读时间** 等自定义插件

## ⚙️ 配置

所有配置都在 `src/config/` 目录，通过 `src/config/index.ts` 统一导出，推荐这样导入：

```typescript
import { siteConfig, profileConfig } from "@/config";
```

常用入口：

| 配置文件 | 作用 |
| :--- | :--- |
| `siteConfig.ts` | 站点标题、URL、语言、主题色、页面开关、分页、文章页行为 |
| `profileConfig.ts` | 头像、昵称、签名、社交链接 |
| `sidebarConfig.ts` | 侧边栏布局与组件顺序 |
| `navBarConfig.ts` | 导航栏结构，底部 `LinkPresets` 可自定义链接 |
| `backgroundWallpaper.ts` | 壁纸模式、横幅文字、水波纹等 |
| `commentConfig.ts` | 评论系统：none / twikoo / waline / giscus / disqus / artalk |
| `analyticsConfig.ts` | 统计分析：Google Analytics、Clarity、Umami、51la |
| `booknavConfig.ts` | 书签导航页的分类与条目 |

其余配置文件（`announcementConfig`、`coverImageConfig`、`dynamicConfig`、`effectsConfig`、`expressiveCodeConfig`、`fontConfig`、`friendsConfig`、`galleryConfig`、`licenseConfig`、`mermaidConfig`、`musicConfig`、`pioConfig`、`plantumlConfig`、`sponsorConfig`、`displaySettingsConfig`）见各文件内注释。

### 切换站点语言

编辑 `src/config/siteConfig.ts` 顶部的 `SITE_LANG`：

```typescript
const SITE_LANG = resolveSiteLang("zh_CN");
```

支持 `zh_CN`、`zh_TW`、`en`、`ja`、`ko`、`ru`。

### 页面开关

`siteConfig.ts` 顶部的 `pages` 对象控制各页面的访问权限。设为 `false` 时该页面返回 404，并自动隐藏对应的导航栏菜单项。

### 环境变量

| 变量 | 作用 |
| :--- | :--- |
| `PUBLIC_DISPLAY_SETTINGS` | 控制视图设置面板开关，取值 `true/1/on/yes` 或 `false/0/off/no`，优先级高于 `displaySettingsConfig.ts` |
| `CF_WORKERS` | 启用 Cloudflare Workers 适配器 |

## 🔨 构建流水线

`pnpm build` 依次执行：

1. `scripts/generate-github-card-data.ts` — 抓取文章里用到的 GitHub 仓库卡片数据
2. `scripts/generate-lqips.ts` — 生成图片 LQIP 占位数据
3. `scripts/generate-vndb-covers.ts` — 下载 VNDB 封面（仅在 `siteConfig.vndb.downloadCovers` 开启时生效）
4. `astro build` — 产出静态站点到 `dist/`
5. `scripts/prune-pio-assets.ts` — 按看板娘配置裁剪多余资源
6. `scripts/subset-fonts.ts` — 字体子集化
7. `scripts/minify-inline-scripts.ts` — 内联脚本压缩
8. `scripts/run-pagefind.ts` — 生成 Pagefind 全文搜索索引

`src/constants/lqips.json`、`src/constants/github-card-data.json`、`src/constants/icons-data.json` 都是生成产物且已纳入版本管理，改完内容后按需用 `pnpm lqips` / `pnpm github-cards` 重新生成。

构建过程中会写入以下生成物，提交前请留意：`dist/`、`src/constants/lqips.json`、`src/constants/github-card-data.json`、`public/vndb-covers/`。

## ☁️ 部署

站点是纯静态输出（`dist/`），可部署到任意静态托管：

- **Vercel**：仓库自带 `vercel.json`，框架预设 `Astro`，构建命令 `pnpm build`，输出目录 `dist`
- **Cloudflare Workers**：使用 `wrangler.jsonc`，设置环境变量 `CF_WORKERS` 启用适配器
- **GitHub Pages**：`.github/workflows/deploy.yml` 会在 `master` 分支推送时自动构建并发布

本地预览产物：

```bash
pnpm build && pnpm preview
```

## 📝 许可协议

本项目遵循 [MIT license](./LICENSE)。

最初 Fork 自 [saicaca/fuwari](https://github.com/saicaca/fuwari)，主题模板来自 [CuteLeaf/Firefly](https://github.com/CuteLeaf/Firefly)，感谢原作者的贡献。

- Copyright (c) 2024 [saicaca](https://github.com/saicaca) - [fuwari](https://github.com/saicaca/fuwari)
- Copyright (c) 2025 [CuteLeaf](https://github.com/CuteLeaf) - [Firefly](https://github.com/CuteLeaf/Firefly)

根据 MIT 开源协议，可以自由使用、修改、分发代码，但需保留上述版权声明。

### 技术栈

[Astro](https://astro.build) · [Svelte](https://svelte.dev) · [Tailwind CSS](https://tailwindcss.com) · [Iconify](https://iconify.design) · [Expressive Code](https://expressive-code.com/) · [Pagefind](https://pagefind.app/)

流萤（Firefly）相关图片素材版权归游戏[《崩坏：星穹铁道》](https://sr.mihoyo.com/)开发商[米哈游](https://www.mihoyo.com/)所有。
