import type { SkillCategory } from '$lib/types';

export const skills: SkillCategory[] = [
	{
		name: 'Languages',
		items: [
			{ label: 'TypeScript' },
			{ label: 'JavaScript' },
			{ label: 'Rust' },
			{ label: 'Go' },
			{ label: 'Python' },
			{ label: 'GLSL' }
		]
	},
	{
		name: 'Frameworks',
		items: [
			{ label: 'Svelte / SvelteKit' },
			{ label: 'React / Next.js' },
			{ label: 'Vue / Nuxt' },
			{ label: 'Tauri' },
			{ label: 'Astro' }
		]
	},
	{
		name: 'Craft',
		items: [
			{ label: 'Motion design' },
			{ label: 'WebGL / shaders' },
			{ label: 'Design systems' },
			{ label: 'Accessibility' },
			{ label: 'Performance' },
			{ label: 'DX tooling' }
		]
	},
	{
		name: 'Platform',
		items: [
			{ label: 'Vite' },
			{ label: 'Vercel' },
			{ label: 'Cloudflare' },
			{ label: 'PostgreSQL' },
			{ label: 'Redis' },
			{ label: 'Docker' }
		]
	}
];
