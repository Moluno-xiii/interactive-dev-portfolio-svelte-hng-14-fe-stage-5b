import type { SkillCategory } from '$lib/types';

export const skills: SkillCategory[] = [
	{
		ix: 'S/01',
		title: 'Frontend',
		items: [
			['TypeScript', 'lead'],
			['React · Next.js', 'lead'],
			['Svelte · SvelteKit', 'ship'],
			['TanStack Query · Router', 'ship'],
			['Tailwind · CSS', 'ship']
		]
	},
	{
		ix: 'S/02',
		title: 'Backend & API',
		items: [
			['Node.js · Express', 'ship'],
			['NestJS', 'ship'],
			['tRPC · GraphQL', 'ship'],
			['PostgreSQL · Prisma', 'ship'],
			['Redis · Queues', 'fluent']
		]
	},
	{
		ix: 'S/03',
		title: 'Mobile',
		items: [
			['React Native · Expo', 'ship'],
			['Flutter · Dart', 'ship'],
			['Riverpod · Bloc', 'ship'],
			['Supabase · Hive', 'fluent'],
			['Platform channels', 'learn']
		]
	},
	{
		ix: 'S/04',
		title: 'Tooling',
		items: [
			['Vite · Turborepo', 'ship'],
			['Docker · GH Actions', 'ship'],
			['Vercel · Fly · Render', 'fluent'],
			['Playwright · Vitest', 'ship']
		]
	}
];
