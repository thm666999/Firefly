import type { ProfileConfig } from "../types/profileConfig";

export const profileConfig: ProfileConfig = {
	// 头像，支持三种写法：
	// 1. public 目录（以 "/" 开头，不做优化）："/assets/images/avatar.webp"
	// 2. src 目录（不以 "/" 开头，构建时自动优化）："assets/images/avatar.avif"
	// 3. 远程 URL："https://example.com/avatar.jpg"
	avatar: "assets/images/avatar.avif",

	// 名字
	name: "",

	// 个人签名
	bio: "",

	// 社交链接
	// 图标可用已安装的图标集：fa7-brands、fa7-regular、fa7-solid、material-symbols、simple-icons
	// 图标名到 https://icones.js.org/ 查询
	// showName: true 时同时显示图标和名称，false 时只显示图标
	links: [
		// TODO: 填写你的主页链接后取消注释
		// {
		// 	name: "GitHub",
		// 	icon: "fa7-brands:github",
		// 	url: "",
		// 	showName: false,
		// },
		// {
		// 	name: "Email",
		// 	icon: "fa7-solid:envelope",
		// 	url: "",
		// 	showName: false,
		// },
		{
			name: "RSS",
			icon: "fa7-solid:rss",
			url: "/rss/",
			showName: false,
		},
		{
			name: "Atom",
			icon: "fa7-solid:atom",
			url: "/atom/",
			showName: false,
		},
	],
};
