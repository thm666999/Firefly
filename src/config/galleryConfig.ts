import type { GalleryConfig } from "@/types/galleryConfig";

// 相册配置
export const galleryConfig: GalleryConfig = {
	// 相册列表，每添加一个数组项就相当于添加一个相册
	// 需要在 public/gallery/<id>/ 目录下放入图片，支持 jpg/png/webp/avif/gif
	// 字段说明：
	//   id          相册唯一标识，同时决定 URL 路径与目录名
	//   name        相册名称
	//   description 相册描述
	//   location    拍摄地点
	//   date        日期，格式 YYYY-MM-DD，用于排序和显示
	//   tags        标签，用于分类和过滤
	//   cover       手动指定封面（可选，默认取目录下的 cover.*，没有则用第一张图）
	//   password    访问密码（可选）
	//   passwordHint 密码提示（需配合 password 使用）
	albums: [
		// TODO: 换成你自己的相册，或删除本项
		{
			id: "firefly-2026",
			name: "可爱流萤",
			description: "飞萤之火自无梦的长夜亮起，绽放在终竟的明天。",
			location: "崩坏：星穹铁道",
			date: "2026-01-01",
			tags: ["崩坏星穹铁道", "流萤"],
		},
	],

	// 瀑布流最小列宽(px)，浏览器根据容器宽度自动计算列数
	// 值越小列数越多，值越大列数越少
	columnWidth: 240,
};
