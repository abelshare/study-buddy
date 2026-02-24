// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeObsidian from 'starlight-theme-obsidian';
import mermaid from 'astro-mermaid';

// https://astro.build/config
export default defineConfig({
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
				{
					label: '项目设计',
					autogenerate: { directory: 'project' },
				},
			],
		}),
		mermaid(),
	],
});
