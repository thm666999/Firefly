# 配置文件说明

本目录包含博客的全部配置，按功能模块拆分，统一由 `index.ts` 导出。

## 使用方式

```typescript
import { siteConfig, profileConfig } from "@/config";
```

## 配置文件列表

| 文件 | 说明 |
|------|------|
| `siteConfig.ts` | 站点基础配置（标题、URL、语言、主题色、页面宽度、页面开关、分页、文章页行为） |
| `profileConfig.ts` | 用户资料配置（头像、名字、签名、社交链接） |
| `sidebarConfig.ts` | 侧边栏布局配置（左/右/移动端组件列表与顺序） |
| `navBarConfig.ts` | 导航栏配置（动态链接、LinkPresets 链接预设、搜索配置） |
| `backgroundWallpaper.ts` | 背景壁纸配置（壁纸模式、图片、横幅文字、轮播、水波纹） |
| `announcementConfig.ts` | 公告配置（标题、内容、类型、链接） |
| `analyticsConfig.ts` | 统计分析配置（Google Analytics、Microsoft Clarity、Umami、51la） |
| `commentConfig.ts` | 评论系统配置（Twikoo、Waline、Artalk、Giscus、Disqus） |
| `coverImageConfig.ts` | 封面图配置（文章封面图、随机封面图 API） |
| `displaySettingsConfig.ts` | 视图设置面板配置（面板总开关、各设置项开关） |
| `dynamicConfig.ts` | 动态页面配置（标题、描述、评论开关、每页数量、Memos 数据源） |
| `effectsConfig.ts` | 动画特效配置（樱花数量、速度、尺寸等） |
| `expressiveCodeConfig.ts` | 代码高亮配置（亮色/暗色主题、折叠、语言徽章） |
| `fontConfig.ts` | 字体配置（字体列表、区域覆盖、本地子集化） |
| `friendsConfig.ts` | 友链配置（友链列表、页面设置） |
| `galleryConfig.ts` | 相册配置（相册列表、瀑布流列宽） |
| `licenseConfig.ts` | 许可证配置（CC 协议等） |
| `musicConfig.ts` | 音乐播放器配置（Meting API / 本地音乐、导航栏与侧边栏开关） |
| `pioConfig.ts` | 看板娘配置（Spine 模型、Live2D 模型） |
| `mermaidConfig.ts` | Mermaid 图表配置 |
| `plantumlConfig.ts` | PlantUML 图表渲染配置 |
| `booknavConfig.ts` | 书签导航配置（分类分组与条目、favicon 自动获取） |
| `sponsorConfig.ts` | 打赏配置（打赏方式、打赏者列表） |
| `index.ts` | 配置索引文件，统一导出以上所有配置与类型 |
| `FooterConfig.html` | 页脚 HTML 内容 |

## 说明

- 每个配置文件对应 `src/types/` 下的独立类型定义文件，改动配置时同步维护类型
- `siteConfig.ts` 只保留站点核心信息，不聚合其他模块配置
- `navBarConfig.ts` 底部的 `LinkPresets` 可自由自定义导航栏链接的名称、图标和 URL
- `displaySettingsConfig.ts` 的视图设置面板默认关闭。除了改配置里的 `enable`，也可以在部署平台（Vercel / Cloudflare 等）设置环境变量 `PUBLIC_DISPLAY_SETTINGS=true` 开启，无需改动配置文件；环境变量优先级更高，取值 `true/1/on/yes` 开启、`false/0/off/no` 关闭
