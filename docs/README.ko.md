<div align="center">

# Carlos blog

Astro 7 + Svelte 5로 만든 정적 개인 블로그

![Node.js >= 22.23](https://img.shields.io/badge/node.js-%3E%3D22.23-brightgreen)
![pnpm 11](https://img.shields.io/badge/pnpm-11-blue)
![Astro](https://img.shields.io/badge/Astro-7-orange)
![TypeScript](https://img.shields.io/badge/TypeScript-6-blue)
![License](https://img.shields.io/badge/license-MIT-green)

**사이트: [https://394000.xyz](https://394000.xyz)**

</div>

---

## 📦 요구 사항

- **Node.js >= 22.23.0** (`package.json` 의 `engines` 참고)
- **pnpm >= 11**: `preinstall` 훅이 `only-allow pnpm` 으로 강제하므로 npm / yarn 은 설치 단계에서 그대로 실패합니다

## 🚀 로컬 개발

```bash
pnpm install     # 의존성 설치
pnpm dev         # 개발 서버 http://localhost:4321
```

## 🧞 명령어

모든 명령은 프로젝트 루트에서 실행합니다:

| Command | Action |
| :--- | :--- |
| `pnpm dev` / `pnpm start` | 로컬 개발 서버 실행 (`localhost:4321`) |
| `pnpm build` | 프로덕션 빌드 후 `./dist/` 에 출력 |
| `pnpm preview` | 빌드 결과를 로컬에서 미리보기 |
| `pnpm check` | `astro check` 로 타입 및 콘텐츠 컬렉션 검사 |
| `pnpm type-check` | `tsc --noEmit --isolatedDeclarations` (`src/`, `scripts/` 대상) |
| `pnpm lint` | Biome 검사 및 자동 수정 (`./src`, `./scripts`) |
| `pnpm format` | Biome 포맷 (`./src`, `./scripts`) |
| `pnpm new-post <filename>` | 새 글 생성 |
| `pnpm new-d <content>` | 새 다이내믹 글 생성 |
| `pnpm new-dynamic <content>` | 위와 동일 (전체 명령 이름) |
| `pnpm lqips` | LQIP 데이터를 `src/constants/lqips.json` 에 재생성 |
| `pnpm github-cards` | GitHub 저장소 카드 데이터 재생성 |
| `pnpm astro ...` | Astro CLI 직접 호출 (`astro add`, `astro check` 등) |

## 📁 프로젝트 구조

```
├── src/
│   ├── assets/          # Astro가 최적화하는 이미지 (빌드 시 webp/avif로 변환)
│   ├── components/      # 영역별 분리: analytics / comment / common / controls /
│   │                    #   features / layout / misc / pages / widget
│   ├── config/          # 모든 설정. index.ts 에서 일괄 export
│   ├── constants/       # 생성 데이터 (lqips.json, github-card-data.json, 아이콘)
│   ├── content/         # 콘텐츠 컬렉션: posts / dynamic / projects / spec
│   ├── i18n/            # UI 다국어 문구
│   ├── layouts/         # Layout.astro (HTML 셸), MainGridLayout.astro (페이지 그리드)
│   ├── pages/           # Astro 파일 기반 라우팅
│   ├── plugins/         # 커스텀 remark / rehype 플러그인
│   ├── styles/          # 전역 스타일
│   ├── types/           # src/config 에 대응하는 타입 정의
│   └── utils/           # 정렬, 날짜, 암호화, 이미지 처리, 목차 생성 등
├── public/              # 그대로 복사되는 정적 자원
├── scripts/             # 빌드 시 스크립트 (LQIP, 폰트 서브셋, Pagefind 등)
└── docs/                # 프로젝트 문서
```

## ✏️ 글쓰기

### 글 Frontmatter

글은 `src/content/posts/` 에 두며 `.md` 와 `.mdx` 를 지원합니다:

```yaml
---
title: 글 제목
published: 2026-09-16
updated: 2026-09-20        # 선택. "마지막 수정" 카드에 사용
description: 글 요약
image: ./cover.jpg         # 커버. "api" 로 설정하면 랜덤 커버
tags: [태그A, 태그B]
category: 카테고리 이름
draft: false               # 초안. 빌드에 포함되지 않음
lang: zh-CN                # 사이트 언어와 다를 때만 지정
pinned: false              # 상단 고정
comment: true              # 댓글 허용 여부
password: ""               # 설정 시 글 암호화
passwordHint: ""           # 비밀번호 힌트
series: 시리즈 이름         # 시리즈 글 묶음
seriesOrder: 1             # 시리즈 내 순서
author: ""                 # 기본 작성자 덮어쓰기
sourceLink: ""             # 원문 링크
licenseName: ""            # 기본 라이선스 이름 덮어쓰기
licenseUrl: ""
---
```

### 다이내믹 글

`src/content/dynamic/` 의 Markdown 파일 하나가 글 하나에 해당합니다. 명령으로 만들 수 있습니다:

```bash
pnpm new-d 오늘 기분이 좋아서 훠궈를 먹으러 갔다
```

```yaml
---
published: 2026-09-16 15:29:00
pinned: true      # 상단 고정
location: China   # 위치
---

본문은 Markdown 문법을 지원합니다.
```

[Memos](https://www.usememos.com/) 를 데이터 소스로 사용할 수도 있습니다. `src/config/dynamicConfig.ts` 에서 `memos.enable` 을 켜면 실시간으로 가져오며, 고정 글 동기화와 이미지 첨부를 지원합니다.

### 프로젝트

프로젝트 항목은 `src/content/projects/` 에 두며 `title`, `published`, `description`, `image`, `tags`, `status`, `link[]`(`label` / `icon` / `value`), `order` 필드를 가집니다.

### About / 친구 링크 페이지

`src/content/spec/about.md` 와 `src/content/spec/friends.mdx` 가 각각 About 페이지와 친구 링크 페이지의 본문입니다. `friends.mdx` 는 MDX 파일이므로 원하는 대로 완전히 다시 작성할 수 있습니다.

## 🧩 Markdown 확장

Astro 기본 제공 [GitHub Flavored Markdown](https://github.github.com/gfm/) 외에 다음이 활성화되어 있습니다:

- **Admonitions**: `github` / `obsidian` / `vitepress` / `docusaurus` 테마를 `siteConfig.post.rehypeCallouts` 에서 전환
- **GitHub 저장소 카드**: `::github{repo="owner/repo"}`
- **확장 코드 블록**: Expressive Code 기반. 줄 번호, 접기, 언어 배지 지원
- **다이어그램**: Mermaid, PlantUML
- **수식**: KaTeX
- **이미지 그리드**, **Wiki 링크**, **읽기 시간** 등 커스텀 플러그인

## ⚙️ 설정

모든 설정은 `src/config/` 에 있으며 `src/config/index.ts` 에서 일괄 export 합니다:

```typescript
import { siteConfig, profileConfig } from "@/config";
```

주요 설정 파일:

| 파일 | 역할 |
| :--- | :--- |
| `siteConfig.ts` | 사이트 제목, URL, 언어, 테마 색, 페이지 스위치, 페이지네이션, 글 페이지 동작 |
| `profileConfig.ts` | 아바타, 이름, 소개, 소셜 링크 |
| `sidebarConfig.ts` | 사이드바 레이아웃과 위젯 순서 |
| `navBarConfig.ts` | 내비게이션 구조. 하단 `LinkPresets` 로 링크 정의 |
| `backgroundWallpaper.ts` | 배경 모드, 배너 문구, 물결 효과 등 |
| `commentConfig.ts` | 댓글 시스템: none / twikoo / waline / giscus / disqus / artalk |
| `analyticsConfig.ts` | 통계: Google Analytics, Clarity, Umami, 51la |
| `booknavConfig.ts` | 북마크 내비게이션의 분류와 항목 |

나머지 설정(`announcementConfig`, `coverImageConfig`, `dynamicConfig`, `effectsConfig`, `expressiveCodeConfig`, `fontConfig`, `friendsConfig`, `galleryConfig`, `licenseConfig`, `mermaidConfig`, `musicConfig`, `pioConfig`, `plantumlConfig`, `sponsorConfig`, `displaySettingsConfig`)은 각 파일의 주석을 참고하세요.

### 사이트 언어

`src/config/siteConfig.ts` 상단의 `SITE_LANG` 을 수정합니다:

```typescript
const SITE_LANG = resolveSiteLang("zh_CN");
```

지원 값: `zh_CN`, `zh_TW`, `en`, `ja`, `ko`, `ru`.

### 페이지 스위치

`siteConfig.ts` 상단의 `pages` 객체가 각 페이지의 공개 여부를 제어합니다. `false` 로 설정하면 해당 페이지는 404를 반환하고 내비게이션 메뉴 항목도 자동으로 숨겨집니다.

### 환경 변수

| 변수 | 역할 |
| :--- | :--- |
| `PUBLIC_DISPLAY_SETTINGS` | 표시 설정 패널 제어. `true/1/on/yes` 또는 `false/0/off/no` 를 받으며 `displaySettingsConfig.ts` 보다 우선합니다 |
| `CF_WORKERS` | Cloudflare Workers 어댑터 활성화 |

## 🔨 빌드 파이프라인

`pnpm build` 는 다음 순서로 실행됩니다:

1. `scripts/generate-github-card-data.ts` — 글에서 사용된 GitHub 저장소 카드 데이터 수집
2. `scripts/generate-lqips.ts` — LQIP 플레이스홀더 생성
3. `scripts/generate-vndb-covers.ts` — VNDB 커버 다운로드 (`siteConfig.vndb.downloadCovers` 가 켜진 경우에만)
4. `astro build` — 정적 사이트를 `dist/` 에 출력
5. `scripts/prune-pio-assets.ts` — 사용하지 않는 Live2D / Spine 자원 정리
6. `scripts/subset-fonts.ts` — 폰트 서브셋 생성
7. `scripts/minify-inline-scripts.ts` — 인라인 스크립트 압축
8. `scripts/run-pagefind.ts` — Pagefind 전체 검색 인덱스 생성

`src/constants/lqips.json`, `src/constants/github-card-data.json`, `src/constants/icons-data.json` 은 생성물이지만 저장소에 포함되어 있습니다. 내용을 바꾼 뒤에는 `pnpm lqips` / `pnpm github-cards` 로 재생성하세요.

커밋 전에 확인할 생성물: `dist/`, `src/constants/lqips.json`, `src/constants/github-card-data.json`, `public/vndb-covers/`.

## ☁️ 배포

출력은 완전한 정적 파일(`dist/`)이라 어디든 호스팅할 수 있습니다:

- **Vercel**: `vercel.json` 포함. 프레임워크 프리셋 `Astro`, 빌드 명령 `pnpm build`, 출력 디렉터리 `dist`
- **Cloudflare Workers**: `wrangler.jsonc` 사용. 환경 변수 `CF_WORKERS` 를 설정해 어댑터 활성화
- **GitHub Pages**: `.github/workflows/deploy.yml` 이 `master` 브랜치 푸시 시 빌드 후 배포

로컬 미리보기:

```bash
pnpm build && pnpm preview
```

## 📝 라이선스

[MIT license](./LICENSE) 를 따릅니다.

원래 [saicaca/fuwari](https://github.com/saicaca/fuwari) 에서 포크했고, 테마는 [CuteLeaf/Firefly](https://github.com/CuteLeaf/Firefly) 를 기반으로 합니다. 원작자에게 감사드립니다.

- Copyright (c) 2024 [saicaca](https://github.com/saicaca) - [fuwari](https://github.com/saicaca/fuwari)
- Copyright (c) 2025 [CuteLeaf](https://github.com/CuteLeaf) - [Firefly](https://github.com/CuteLeaf/Firefly)

MIT 라이선스에 따라 자유롭게 사용, 수정, 재배포할 수 있지만 위 저작권 표시는 유지해야 합니다.

### 기술 스택

[Astro](https://astro.build) · [Svelte](https://svelte.dev) · [Tailwind CSS](https://tailwindcss.com) · [Iconify](https://iconify.design) · [Expressive Code](https://expressive-code.com/) · [Pagefind](https://pagefind.app/)

Firefly 관련 이미지 소재의 저작권은 게임 [『붕괴: 스타레일』](https://sr.mihoyo.com/) 개발사 [miHoYo](https://www.mihoyo.com/) 에 있습니다.
