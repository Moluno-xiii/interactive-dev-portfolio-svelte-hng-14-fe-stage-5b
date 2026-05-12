import type { Project } from '$lib/types';

export const projects: Project[] = [
	{
		n: '01',
		year: '2026',
		slug: 'halcyon',
		title: 'Halcyon',
		ital: 'OS',
		tags: ['Spatial · Vision OS', 'Motion system', 'Lead designer'],
		desc: 'A spatial workspace shell for designers — ambient panels, gaze-anchored toolbars, and a motion grammar inspired by film editorial.',
		client: 'Stealth lab',
		role: 'Founding designer · motion system',
		duration: '08 / 2024 — present',
		stack: ['SwiftUI', 'RealityKit', 'Figma', 'Rive'],
		summary:
			"Halcyon is a spatial workspace shell for designers — a soft-edged operating layer that re-thinks toolbars, panels and file flow for the post-window era. The brief was to design an OS that disappears: surfaces that bloom into view when you look, recede when you don't, and never demand chrome you weren't asking for.",
		featured: true,
		liveUrl: 'https://example.com/halcyon',
		repoUrl: 'https://github.com/Moluno/halcyon',
		bodySections: [
			{
				kind: 'stat-row',
				items: [
					['96', 'ms gaze→action'],
					['12', 'core gestures'],
					['3', 'ambient depths']
				]
			},
			{ kind: 'image', label: 'Halcyon · ambient panel choreography', aspect: 16 / 9 },
			{
				kind: 'prose',
				h: 'The choreography problem',
				body: 'Spatial UIs are a sequencing problem first and a visual problem second. We wrote a small notation for panel behaviour — appear, bloom, settle, retire — and used it to compose every surface in the system. The notation became a Figma plugin and a Rive runtime; the same score plays back in design and in production.'
			},
			{ kind: 'image', label: 'System notation · panel score in the inspector', aspect: 16 / 10 },
			{
				kind: 'prose',
				h: 'What shipped',
				body: 'A first-party design tool, an ambient writing surface, and a developer kit. The motion grammar — twelve verbs, three depths, one rhythm — is now the seed for everything the lab builds.'
			}
		]
	},
	{
		n: '02',
		year: '2025',
		slug: 'nocturne',
		title: 'Nocturne',
		ital: 'Studio',
		tags: ['Generative', 'WebGPU', 'Creative tech'],
		desc: 'Real-time generative composition tool: nodes that improvise, render, and self-document. Used by 4,200+ studios worldwide.',
		client: 'Nocturne Studio',
		role: 'Design lead · 0→1',
		duration: '01 / 2023 — 11 / 2024',
		stack: ['TypeScript', 'WebGPU', 'GLSL', 'Figma'],
		summary:
			'Nocturne is a real-time generative composition tool — a node-based canvas where each node improvises, renders, and writes its own documentation as you work. We built it for studios that needed to make a thousand variants, not one.',
		featured: true,
		liveUrl: 'https://example.com/nocturne',
		repoUrl: 'https://github.com/Moluno/nocturne',
		bodySections: [
			{
				kind: 'stat-row',
				items: [
					['4,200+', 'studios'],
					['1.4M', 'renders / month'],
					['60', 'fps · WebGPU']
				]
			},
			{ kind: 'image', label: 'Nocturne · generative node canvas', aspect: 16 / 9 },
			{
				kind: 'prose',
				h: 'Improvising nodes',
				body: 'Every node has a temperature. Cold nodes are deterministic; warm nodes drift. The composition is the score, the seed is the conductor, and the render is the take. We spent four months designing the temperature dial alone.'
			},
			{ kind: 'image', label: 'Temperature dial · UX detail', aspect: 4 / 3 },
			{
				kind: 'prose',
				h: 'Result',
				body: 'Shipped on a Tuesday, on the homepage of Awwwards by Thursday. The tool is now in production at studios across four continents.'
			}
		]
	},
	{
		n: '03',
		year: '2025',
		slug: 'meridian',
		title: 'Meridian',
		ital: 'Bank',
		tags: ['Fintech', 'Product design', '0→1'],
		desc: 'A neobank for cross-border creatives — multi-currency choreography, dispute timelines, and a card stack that handles fifteen jurisdictions.',
		client: 'Meridian Bank',
		role: 'Senior product designer',
		duration: '06 / 2020 — 08 / 2022',
		stack: ['React Native', 'Figma', 'Lottie'],
		summary:
			'Meridian is a neobank for freelancers and studios who get paid in too many currencies. We rebuilt the multi-currency engine, the dispute timeline, and the card stack from scratch — and shipped a product that crossed €1B in volume in eighteen months.',
		featured: true,
		liveUrl: 'https://example.com/meridian',
		bodySections: [
			{
				kind: 'stat-row',
				items: [
					['€1.4B', 'volume · 18mo'],
					['15', 'jurisdictions'],
					['4.9★', 'App Store']
				]
			},
			{ kind: 'image', label: 'Meridian · multi-currency dashboard', aspect: 16 / 9 },
			{
				kind: 'prose',
				h: 'The dispute timeline',
				body: 'Disputes are emotional. We designed a timeline that reads like a conversation — every action stamped, every party visible, every status one tap away. Resolution time dropped by 38% in the first quarter.'
			},
			{ kind: 'image', label: 'Dispute timeline · production screen', aspect: 4 / 3 }
		]
	},
	{
		n: '04',
		year: '2024',
		slug: 'pulse',
		title: 'Pulse',
		ital: 'Wear',
		tags: ['Hardware', 'Industrial', 'Watch OS'],
		desc: 'Biometric wearable focused on sleep architecture. Co-designed the haptic language and the on-wrist visualization grammar with the engineering team.',
		client: 'Pulse Labs',
		role: 'Interaction designer · haptics',
		duration: '03 / 2023 — 05 / 2024',
		stack: ['SwiftUI', 'C++', 'Rive', 'Figma'],
		summary:
			'Pulse is a biometric wearable that maps sleep architecture — REM, deep, light — and translates it into a vocabulary of haptic textures. I designed the on-wrist UI and authored the haptic language with the firmware team.',
		liveUrl: 'https://example.com/pulse',
		bodySections: [
			{
				kind: 'stat-row',
				items: [
					['18', 'haptic textures'],
					['72h', 'battery'],
					['0.4°', 'thermal accuracy']
				]
			},
			{ kind: 'image', label: 'Pulse · industrial design study', aspect: 4 / 3 },
			{
				kind: 'prose',
				h: 'Designing for the wrist',
				body: 'On a 1.5" face you have three jobs at most. We pared the UI down to a glance, a gesture, and a haptic — and let the phone hold the data.'
			}
		]
	},
	{
		n: '05',
		year: '2024',
		slug: 'atlas',
		title: 'Atlas',
		ital: 'Maps',
		tags: ['Data viz', 'Cartography', 'WebGL'],
		desc: 'Procedural mapping system: cities rendered live from open data, with a stylized typography pipeline and authored color seasons.',
		client: 'Atlas Cooperative',
		role: 'Design + creative engineering',
		duration: '09 / 2023 — 02 / 2024',
		stack: ['WebGL', 'Mapbox GL', 'GLSL', 'TypeScript'],
		summary:
			'Atlas is a procedural mapping system: every city, drawn live from OpenStreetMap, styled through a typography pipeline I authored. Twelve color seasons, one engine, zero hand-edited tiles.',
		liveUrl: 'https://example.com/atlas',
		repoUrl: 'https://github.com/Moluno/atlas',
		bodySections: [
			{
				kind: 'stat-row',
				items: [
					['12', 'color seasons'],
					['∞', 'cities'],
					['1', 'engine']
				]
			},
			{ kind: 'image', label: "Atlas · Lisbon in season ‘Cobalt'", aspect: 16 / 9 },
			{
				kind: 'prose',
				h: 'Type at every zoom',
				body: 'Most maps lose typography at zoom. Atlas keeps it — labels reflow, hierarchies hold, and the system gracefully retires detail rather than dropping it.'
			}
		]
	},
	{
		n: '06',
		year: '2023',
		slug: 'quiet',
		title: 'Quiet',
		ital: 'Player',
		tags: ['Audio', 'Identity', 'Motion'],
		desc: 'A minimalist music player and a small label. Designed the whole stack — wordmark, sleeve system, app, and a generative live visualizer.',
		client: 'Quiet · self-initiated',
		role: 'Everything',
		duration: '2022 — 2023',
		stack: ['Swift', 'TouchDesigner', 'Figma'],
		summary:
			'Quiet is a music player and a tiny label. I designed the wordmark, the sleeve system, the player app, and a generative live visualizer that plays at every release party.',
		repoUrl: 'https://github.com/Moluno/quiet',
		bodySections: [
			{
				kind: 'stat-row',
				items: [
					['09', 'releases'],
					['3', 'live shows'],
					['1', 'wordmark']
				]
			},
			{ kind: 'image', label: 'Quiet · sleeve system', aspect: 1 },
			{
				kind: 'prose',
				h: 'Designing a label from zero',
				body: 'An identity that fits on a 7" sleeve, a streaming thumbnail, and a projected wall — all without becoming three different brands.'
			}
		]
	}
];

export function getProject(slug: string): Project | undefined {
	return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string): { prev: Project | null; next: Project | null } {
	const idx = projects.findIndex((p) => p.slug === slug);
	if (idx < 0) return { prev: null, next: null };
	return {
		prev: idx > 0 ? projects[idx - 1] : projects[projects.length - 1],
		next: idx < projects.length - 1 ? projects[idx + 1] : projects[0]
	};
}
