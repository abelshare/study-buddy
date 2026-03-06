// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeObsidian from 'starlight-theme-obsidian';
import mermaid from 'astro-mermaid';

// Rehype 插件：为内部链接添加 base 前缀
function rehypeAddBasePrefix(base) {
	return (tree) => {
		function visit(node) {
			if (node.type === 'element' && node.tagName === 'a' && node.properties?.href) {
				const href = node.properties.href;
				// 只处理以 / 开头的内部链接（排除外部链接和锚点链接）
				if (href.startsWith('/') && !href.startsWith('//') && !href.startsWith(base)) {
					node.properties.href = base + href;
				}
			}
			if (node.children) {
				node.children.forEach(visit);
			}
		}
		visit(tree);
	};
}

// https://astro.build/config
export default defineConfig({
	site: 'https://abelshare.github.io',
	base: '/study-buddy',
	markdown: {
		rehypePlugins: [[rehypeAddBasePrefix, '/study-buddy']],
	},
	integrations: [
		starlight({
			plugins: [starlightThemeObsidian()],
			title: 'StudyBuddy',
			description: 'AI 驱动的个人知识成长伙伴,将碎片化学习转化为结构化知识体系',
			defaultLocale: 'root',
			locales: {
				root: {
					label: '简体中文',
					lang: 'zh-CN',
				},
			},
			sidebar: [
				{
					label: '快速开始',
					items: [
						{ label: '使用指南', link: '/project/usage/' },
						{ label: '项目简介', link: '/project/brief/' },
						{ label: '技术架构', link: '/project/architecture/' },
						{ label: 'AI Skill', link: '/project/ai-skills/' },
					],
				},
				{
					label: '工具类',
					autogenerate: { directory: 'tools' },
				},
				{
					label: '领域类',
					autogenerate: { directory: 'domains' },
				},
				{
					label: '方法论',
					autogenerate: { directory: 'methods' },
				},
			],
		}),
		mermaid(),
	],
});
