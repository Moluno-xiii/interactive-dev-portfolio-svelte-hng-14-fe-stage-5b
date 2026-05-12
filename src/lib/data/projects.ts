import type { Project } from '$lib/types';

export const projects: Project[] = [
	{
		n: '01',
		year: '2026',
		slug: 'vela',
		title: 'Vela',
		ital: 'Dashboard',
		tags: ['SvelteKit · TS', 'Postgres', 'Lead engineer'],
		desc: 'A project-management dashboard for small product teams. SvelteKit on top, Drizzle + Postgres underneath, all TypeScript across the seam.',
		client: 'Stealth SaaS',
		role: 'Lead frontend · API design',
		duration: '06 / 2025 — present',
		stack: ['SvelteKit', 'TypeScript', 'Drizzle', 'Postgres', 'Tailwind'],
		summary:
			'Vela is a project-management dashboard built for small product teams who outgrew the spreadsheet but bounced off the heavyweight tools. The brief was a sharp one: fast, typed end-to-end, and never make a user wait for a page they have already seen.',
		featured: true,
		liveUrl: 'https://example.com/vela',
		repoUrl: 'https://github.com/Moluno/vela',
		bodySections: [
			{
				kind: 'stat-row',
				items: [
					['180KB', 'gzipped bundle'],
					['38', 'ms p95 query'],
					['100%', 'typed boundary']
				]
			},
			{ kind: 'image', label: 'Vela · timeline view', aspect: 16 / 9 },
			{
				kind: 'prose',
				h: 'TypeScript at the seam',
				body: 'The whole stack speaks TypeScript: schema in Drizzle, RPC in a tiny custom typed router, components in Svelte 5 with strict bindings. A change to the schema fails the build before it fails the runtime — the kind of safety that pays for itself in week two.'
			},
			{ kind: 'image', label: 'Schema → API → UI · one type graph', aspect: 16 / 10 },
			{
				kind: 'prose',
				h: 'What shipped',
				body: 'Beta with seven teams. Average page load under 800ms on a four-year-old laptop. The design system landed as its own package and now seeds two other internal tools.'
			}
		]
	},
	{
		n: '02',
		year: '2025',
		slug: 'konvo',
		title: 'Konvo',
		ital: 'Chat',
		tags: ['Next.js · NestJS', 'TanStack Query', 'Realtime'],
		desc: 'A team chat app with threads, presence, and search across years of messages. Next.js + TanStack Query on top, NestJS WebSocket gateway underneath.',
		client: 'Crest · client product',
		role: 'Fullstack engineer · 0→1',
		duration: '02 / 2024 — 10 / 2024',
		stack: ['Next.js', 'TanStack Query', 'NestJS', 'Socket.IO', 'Postgres', 'Redis'],
		summary:
			'Konvo is a Slack-shaped team chat with threads, presence, and ten-thousand-message search. Built for a client who wanted Slack ergonomics without the seat tax. Shipped as a Next.js + TanStack Query frontend talking to a NestJS WebSocket gateway with a Redis-backed pubsub.',
		featured: true,
		liveUrl: 'https://example.com/konvo',
		repoUrl: 'https://github.com/Moluno/konvo',
		bodySections: [
			{
				kind: 'stat-row',
				items: [
					['12k', 'concurrent sockets'],
					['80', 'ms search p95'],
					['99.9%', 'uptime · 6mo']
				]
			},
			{ kind: 'image', label: 'Konvo · thread view', aspect: 16 / 9 },
			{
				kind: 'prose',
				h: 'Live without the lag',
				body: 'The hardest bit was making "live" feel native on a typed stack. NestJS gateways carry presence and typing, multiplexed over Redis pubsub. Messages themselves flow through tRPC and land in TanStack Query caches on the client — the type contract from server to component never breaks.'
			},
			{ kind: 'image', label: 'Architecture · Next + Node gateway + Redis', aspect: 4 / 3 },
			{
				kind: 'prose',
				h: 'Search',
				body: 'Full-text search across years of messages runs in Postgres with a tsvector and a thin trigram fallback. Eighty-millisecond p95 on the production dataset. No Elasticsearch, no extra infra.'
			}
		]
	},
	{
		n: '03',
		year: '2025',
		slug: 'tendo',
		title: 'Tendo',
		ital: 'Wallet',
		tags: ['Flutter · Dart', 'Riverpod', 'Mobile'],
		desc: 'A personal-finance tracker for cross-border earners. Multi-currency, offline-first, syncs over Supabase when there is signal.',
		client: 'Self-initiated',
		role: 'Solo · design + engineering',
		duration: '08 / 2024 — 04 / 2025',
		stack: ['Flutter', 'Dart', 'Riverpod', 'Hive', 'Supabase'],
		summary:
			'Tendo is a personal-finance tracker for people who get paid in three currencies and live in one. Built in Flutter because the brief said "feel native on both stores" — and because I wanted an excuse to push deeper on Dart.',
		featured: true,
		liveUrl: 'https://example.com/tendo',
		bodySections: [
			{
				kind: 'stat-row',
				items: [
					['7', 'currencies'],
					['100%', 'offline first'],
					['<24MB', 'install · iOS']
				]
			},
			{ kind: 'image', label: 'Tendo · home & insights', aspect: 4 / 3 },
			{
				kind: 'prose',
				h: 'Offline-first, conflict-aware',
				body: 'Every write lands in Hive locally before it hits Supabase. The sync layer is small but careful — last-writer-wins per field, with a per-transaction conflict view for the cases where two devices change the same row in the same minute.'
			},
			{
				kind: 'prose',
				h: 'Riverpod patterns',
				body: 'I wrote the whole app around AsyncNotifierProvider and family. The result is a state graph that mirrors the data graph — you read a feature by reading its providers, and the dependency arrows match the screen hierarchy.'
			}
		]
	},
	{
		n: '04',
		year: '2024',
		slug: 'lighthouse',
		title: 'Lighthouse',
		ital: 'Analytics',
		tags: ['Next.js · NestJS', 'TanStack Query', 'SaaS'],
		desc: 'Privacy-first analytics for indie devs. Next.js + TanStack Query dashboard, a tiny tracking script, a NestJS ingest worker, and queries that actually load fast.',
		client: 'Self-initiated SaaS',
		role: 'Solo · fullstack',
		duration: '03 / 2024 — 09 / 2024',
		stack: ['Next.js', 'TanStack Query', 'NestJS', 'Prisma', 'Postgres'],
		summary:
			'Lighthouse is a privacy-first analytics tool for indie devs and small teams. No cookies, no fingerprinting, no third-party scripts — just a 2KB tracker and a fast dashboard that respects your visitors.',
		repoUrl: 'https://github.com/Moluno/lighthouse',
		bodySections: [
			{
				kind: 'stat-row',
				items: [
					['2KB', 'tracker · gzip'],
					['320', 'ms p95 dashboard'],
					['0', 'cookies']
				]
			},
			{ kind: 'image', label: 'Lighthouse · realtime view', aspect: 16 / 9 },
			{
				kind: 'prose',
				h: 'The ingest path',
				body: 'A tracker hit lands in a NestJS worker that batches into Postgres on a 200ms drumbeat. Aggregates roll up nightly into materialised views — the dashboard, hydrated with TanStack Query, never queries raw events. It queries answers.'
			}
		]
	},
	{
		n: '05',
		year: '2024',
		slug: 'cresta',
		title: 'Cresta',
		ital: 'Notes',
		tags: ['React Native · Expo', 'TanStack Query', 'Cross-platform'],
		desc: 'A markdown notes app for phone, tablet, and web. One Expo codebase, three layouts, and a sync layer over Supabase that survived three flights and a tunnel.',
		client: 'Self-initiated',
		role: 'Solo',
		duration: '11 / 2023 — 02 / 2024',
		stack: ['React Native', 'Expo', 'TanStack Query', 'Supabase', 'MMKV'],
		summary:
			'Cresta is a markdown notes app that lives on three surfaces — phone, tablet, and the web. One Expo Router codebase, three adaptive layouts, and a TanStack Query cache sitting on top of a Supabase sync that survived three flights and a tunnel.',
		liveUrl: 'https://example.com/cresta',
		bodySections: [
			{
				kind: 'stat-row',
				items: [
					['3', 'surfaces · one codebase'],
					['92%', 'shared components'],
					['1.6s', 'cold start · iOS']
				]
			},
			{ kind: 'image', label: 'Cresta · note editor', aspect: 4 / 3 },
			{
				kind: 'prose',
				h: 'One codebase, three layouts',
				body: 'Expo Router carries the navigation. Adaptive layouts ride the same component tree — only the chrome and the breakpoints change. The web target ships from the same source via Expo for Web, and the bundle on mobile sits at under 18MB.'
			},
			{
				kind: 'prose',
				h: 'TanStack Query on mobile',
				body: 'TanStack Query handles every server-touching call — paginated lists, optimistic edits, offline replays. MMKV holds the persisted cache. Round-trip latency stopped being a UI problem in week two.'
			}
		]
	},
	{
		n: '06',
		year: '2023',
		slug: 'inkwell',
		title: 'Inkwell',
		ital: 'UI Kit',
		tags: ['TypeScript', 'Design system', 'Open source'],
		desc: 'A typed React component library for editorial products — accessible primitives, motion baked in, zero runtime CSS.',
		client: 'Open source',
		role: 'Library author',
		duration: '06 / 2023 — 12 / 2023',
		stack: ['TypeScript', 'React', 'Stitches', 'Storybook'],
		summary:
			'Inkwell is a typed React component library for editorial products. Every primitive ships with a default motion, a reduced-motion fallback, and a documented variant API — and the whole thing is tree-shakeable.',
		repoUrl: 'https://github.com/Moluno/inkwell',
		bodySections: [
			{
				kind: 'stat-row',
				items: [
					['28', 'primitives'],
					['~10KB', 'core gzipped'],
					['800', 'npm dl / week']
				]
			},
			{ kind: 'image', label: 'Inkwell · variants gallery', aspect: 16 / 9 },
			{
				kind: 'prose',
				h: 'A11y by default',
				body: 'Every primitive is keyboard-navigable and announces correctly without you having to think about it. The popover, menu, and combobox primitives ride on @floating-ui — the rest are hand-rolled and lint-checked against axe in CI.'
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
