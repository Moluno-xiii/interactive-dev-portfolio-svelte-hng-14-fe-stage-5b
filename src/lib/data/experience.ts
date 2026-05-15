import type { ExperienceEntry } from '$lib/types';

export const experience: ExperienceEntry[] = [
	{
		yr: '2025 — Now',
		role: 'Lead Frontend / Mobile Engineer',
		co: 'Storytime4Kids · Remote',
		note: 'I lead end-to-end delivery of the Storytime4Kids mobile app — React Native with Expo (EAS Build & OTA), with selected features prototyped in Flutter — covering navigation, audio playback, offline reading, and push notifications. Owned the Google Play release pipeline. The public marketing and content site is Next.js (App Router) + TypeScript + Tailwind, with a typed React Query + Zod data layer shared with the app. CI/CD on GitHub Actions and EAS cut release time enough that "we should ship today" stopped meaning "next week".'
	},
	{
		yr: '2023 — Now',
		role: 'Lead Frontend Developer',
		co: 'The Bull Squad Travels · Lagos',
		note: 'Architected and shipped the responsive Next.js site (TypeScript + Tailwind, App Router, server components) for fast initial loads. Translated Figma into a reusable design-system layer for buttons, forms, and primitives. Improved LCP, CLS, and INP through image optimisation, route-level code splitting, font preloading, and lazy hydration; layered on SEO with semantic HTML, JSON-LD, dynamic OG metadata, and generated sitemaps. Integrated REST APIs and third-party booking/payment services via React Query, and wired CI/CD on GitHub Actions + Vercel so every PR ships a preview.'
	},
	{
		yr: '2023 — 2024',
		role: 'Frontend Developer',
		co: 'Veridux · Lagos',
		note: 'Built the e-commerce storefront in React + TypeScript — catalogue, sorting, faceted filtering, full-text search. Implemented a secure cart + checkout flow with form validation and a third-party payment gateway, and built accessible, responsive UI with Tailwind that hit WCAG AA contrast across mobile and desktop. Managed client state with Redux Toolkit, server state with React Query, and kept the experience snappy on low-end devices through code splitting, memoisation, and image lazy-loading.'
	}
];
