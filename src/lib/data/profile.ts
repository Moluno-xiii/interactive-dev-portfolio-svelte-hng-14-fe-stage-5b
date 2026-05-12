import type { Profile, AboutData } from '$lib/types';

export const profile: Profile = {
	name: 'Moluno',
	handle: '@moluno',
	title: 'Frontend Engineer · Fullstack · Mobile',
	tagline:
		'I build TypeScript products end-to-end — web frontends with React, Next.js and SvelteKit, NestJS / Express APIs behind them, and mobile apps in React Native + Expo or Flutter.',
	bio: 'TypeScript-first engineer. I lean frontend by trade — React, Next.js, Svelte, design systems, motion — and reach into the stack when the work needs it. NestJS and Express on the API side; React Native + Expo and Flutter on mobile.',
	intro:
		'TypeScript-first engineer. I lean frontend by trade — React, Next.js, Svelte, design systems, motion — and reach into the stack when the work needs it. NestJS and Express on the API side; React Native + Expo and Flutter on mobile.',
	location: 'Lagos · GMT+1',
	timezone: 'WAT · UTC+1',
	email: 'hello@moluno.dev',
	resumeUrl: '/resume.pdf',
	available: true,
	now: [
		{ label: 'Building', value: 'Vela', meta: 'SvelteKit + Postgres dashboard' },
		{ label: 'Shipping', value: 'Cresta', meta: 'Expo + React Native rewrite' },
		{ label: 'Reading', value: 'Designing Data-Intensive Applications', meta: 'Martin Kleppmann' },
		{ label: 'Learning', value: 'NestJS internals', meta: 'Modules, DI, decorators' }
	],
	socials: [
		{ platform: 'github', label: 'GitHub', href: 'https://github.com/Moluno' },
		{ platform: 'twitter', label: 'X / Twitter', href: 'https://x.com/Moluno' },
		{ platform: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/Moluno' },
		{ platform: 'readcv', label: 'Read.cv', href: 'https://read.cv/Moluno' },
		{ platform: 'email', label: 'Email', href: 'mailto:hello@moluno.dev' }
	]
};

export const about: AboutData = {
	paragraphs: [
		"I've spent the last four years shipping TypeScript products — React and Next.js frontends, NestJS and Express APIs behind them, and the small native pieces that fill the gaps. Most of my work sits in the web, but I'm just as comfortable in a Dockerfile, a SQL migration, or an Expo build pipeline.",
		"I lean frontend by trade. I care about typography, motion, and the milliseconds between a tap and a frame — and I keep TanStack Query nearby for everything that has to talk to a server. The best frontend work I've shipped has come from designing the system end-to-end and refusing to draw a hard line between client and API.",
		'On mobile I run two stacks: React Native + Expo when the team is already TypeScript-native, and Flutter when the design wants tighter control of the canvas. Same product brain, different runtime.'
	],
	stats: [
		{ k: 'Years shipping', v: '04', s: 'yrs' },
		{ k: 'Projects shipped', v: '23', s: '/ public' },
		{ k: 'Stacks fluent', v: '04', s: 'web · node · rn · flutter' },
		{ k: 'Coffee · daily', v: '02', s: 'sometimes 03' }
	]
};

export const ticker = [
	'STATUS · OPEN TO WORK',
	'STACK · TS · NEXT · NEST · EXPO · FLUTTER',
	'LAT 6.5244° N',
	'LON 3.3792° E',
	'BUILD 04.11.026',
	'SIGNAL · STRONG'
];

export const nav = [
	{ id: 'work', label: 'Projects' },
	{ id: 'about', label: 'About' },
	{ id: 'skills', label: 'Stack' },
	{ id: 'experience', label: 'History' },
	{ id: 'contact', label: 'Contact' }
];
