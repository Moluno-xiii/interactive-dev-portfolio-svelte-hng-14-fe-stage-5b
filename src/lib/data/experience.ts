import type { ExperienceEntry } from '$lib/types';

export const experience: ExperienceEntry[] = [
	{
		yr: '2024 — Now',
		role: 'Senior Frontend Engineer',
		co: 'Stealth · SaaS',
		note: 'I own the TypeScript frontend — Next.js, TanStack Query, the design system, the deploys. I dip into the NestJS API whenever the feature spans both sides, which is most of the time. Ships every Tuesday. Sometimes breaks on Wednesday. Tuesday is the rewarding part.'
	},
	{
		yr: '2023 — 2024',
		role: 'Fullstack Engineer',
		co: 'Crest · Product agency',
		note: 'Shipped six client products in twelve months — Next.js + NestJS on the web, Expo and Flutter on mobile. Three were great, two shipped late, one is still being argued about in a Slack thread. I slept poorly. I shipped well.'
	},
	{
		yr: '2022 — 2023',
		role: 'Frontend Engineer',
		co: 'Nova Labs',
		note: 'Third engineer in. I rewrote the dashboard in SvelteKit because Next.js was being moody, introduced TanStack Query for the data layer, and brought the bundle from 1.2MB down to 180KB. Bundle analyzers became my love language.'
	},
	{
		yr: '2021 — 2022',
		role: 'Junior Developer',
		co: 'Field — agency',
		note: 'I cut my teeth on production React and Express APIs and shipped my first cross-platform Expo + React Native app. I also inherited a WordPress theme older than my career and replaced it with sane code. The CHANGELOG entry I wrote that day was mostly an apology.'
	},
	{
		yr: '2020 — 2021',
		role: 'Self-taught + freelance',
		co: 'Independent',
		note: 'Spent the year alternating between the TypeScript docs and freelance gigs for friends running small businesses. The gigs paid rent. The docs paid forward. Picked up Dart on the side because YouTube convinced me Flutter was the future. YouTube was, this once, right.'
	}
];
