import type { CoverImageConfig } from "../types/coverImageConfig";

export const coverImageConfig: CoverImageConfig = {
	// 是否在文章详情页显示封面图
	enableInPost: true,

	// 是否使用标题和元数据叠加在封面上的布局
	enableInPostOverlay: false,

	// 是否显示转圈圈加载动画，会替代掉LQIP
	showLoading: false,

	// 随机封面图：在文章 Frontmatter 里写 image: "api" 即可启用
	// 系统会依次尝试下面配置的所有 API，全部失败后保留 LQIP 并显示错误提示
	randomCoverImage: {
		// 随机封面图功能开关
		enable: false,
		// 封面图API列表
		apis: [
			"https://t.alcy.cc/pc",
			"https://www.dmoe.cc/random.php",
			"https://uapis.cn/api/v1/random/image?category=acg&type=pc",
		],
	},
};
