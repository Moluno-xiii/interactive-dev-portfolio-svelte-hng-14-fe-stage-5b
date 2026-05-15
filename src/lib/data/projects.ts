import type { Project } from '$lib/types';

export const projects: Project[] = [
	{
		n: '01',
		year: '2026',
		slug: 'tape',
		title: 'Tape',
		ital: 'Terminal',
		tags: ['Vue 3 · ECharts', 'Realtime', '60 fps'],
		tracks: ['frontend'],
		desc: 'A streaming markets terminal for retail traders — pro-grade signal without the seven-monitor setup. Vue 3 on top, ECharts on the canvas, no third-party state libs.',
		client: 'HNG Internship 14 · Stage 5a',
		role: 'Solo · frontend',
		duration: '04 / 2026 — 05 / 2026',
		stack: ['Vue 3', 'Vite', 'TypeScript', 'ECharts', 'Tailwind'],
		summary:
			'Tape is a live markets terminal for retail traders who want pro-grade signal without the seven-monitor setup. Vue 3 on top, ECharts on the canvas, a synthetic feed pushing tens of messages a second, and a render budget that never blinks past 60 fps.',
		featured: true,
		coverUrl: '/projects/tape/02.png',
		liveUrl: 'https://tape-realtime.vercel.app/',
		repoUrl: 'https://github.com/Moluno-xiii/realtime-data-visualizer-vuejs-hng-14-fe-stage-5a',
		bodySections: [
			{
				kind: 'stat-row',
				items: [
					['60', 'fps target'],
					['0', 'third-party state libs'],
					['66', 'msg/s · synthetic feed']
				]
			},
			{
				kind: 'image',
				label: 'Tape · marketing surface',
				aspect: 16 / 9,
				src: '/projects/tape/01.png'
			},
			{
				kind: 'prose',
				h: 'Built for the trader who actually looks at the chart',
				body: 'Tape is a dashboard with a watchlist, a live price chart, a one-minute volume series, and a streaming activity log. It is designed to be sat on one monitor for a long time — every animation, every repaint, every scroll has to land inside a 16ms budget or it is too expensive to ship.'
			},
			{
				kind: 'image',
				label: 'Tape · dashboard',
				aspect: 16 / 9,
				src: '/projects/tape/02.png'
			},
			{
				kind: 'prose',
				h: 'Why no state library',
				body: 'Vue 3 reactivity is the state library. Every panel reads from a small set of refs and computeds wired straight to the feed; ECharts gets fed deltas, not full datasets. The result is a fast, debuggable graph where you can trace any number on screen back to one composable in roughly two clicks.'
			}
		]
	},
	{
		n: '02',
		year: '2026',
		slug: 'whisperbox',
		title: 'WhisperBox',
		ital: 'Messenger',
		tags: ['React 19 · WebSocket', 'Web Crypto', 'E2E'],
		tracks: ['frontend'],
		desc: 'An end-to-end encrypted messenger that does the cipher in the browser. Hybrid RSA-OAEP + AES-GCM, IndexedDB for keys, WebSocket for delivery.',
		client: 'HNG Internship 14 · Stage 4b',
		role: 'Solo · frontend',
		duration: '04 / 2026',
		stack: [
			'React 19',
			'Vite',
			'TanStack Router',
			'TanStack Query',
			'WebSocket',
			'Web Crypto',
			'Tailwind'
		],
		summary:
			'WhisperBox is an end-to-end encrypted messenger that runs the entire cipher in the browser. RSA-OAEP wraps each conversation’s symmetric AES-GCM key, the user’s private key is itself wrapped behind PBKDF2 with 100,000 iterations, and the server only ever sees opaque envelopes it routes over WebSocket.',
		featured: true,
		coverUrl: '/projects/whisperbox/01.png',
		liveUrl: 'https://whisperbox-hng.vercel.app/',
		repoUrl: 'https://github.com/Moluno-xiii/e2e-encrypted-app-hng-14-stage-4b-fe',
		bodySections: [
			{
				kind: 'stat-row',
				items: [
					['RSA-OAEP', '2048-bit keypair'],
					['AES-GCM', 'fresh key per message'],
					['100k', 'PBKDF2 iterations']
				]
			},
			{
				kind: 'image',
				label: 'Account setup · keys generated client-side',
				aspect: 16 / 9,
				src: '/projects/whisperbox/02.png'
			},
			{
				kind: 'prose',
				h: 'Crypto stays on the client',
				body: 'Registration generates a 2048-bit RSA-OAEP keypair and derives a wrapping key from the user’s password via PBKDF2-SHA256. The private key is encrypted with AES-GCM under that wrapping key, then handed to the server as an opaque blob. Sending a message generates a fresh AES-GCM key, encrypts the body, and wraps the symmetric key once for the recipient and once for the sender so history stays readable on either side.'
			},
			{
				kind: 'image',
				label: 'Sign in · the server never sees a plaintext byte',
				aspect: 16 / 9,
				src: '/projects/whisperbox/03.png'
			},
			{
				kind: 'prose',
				h: 'The trade-offs I made on purpose',
				body: 'The README ships the limitations on the front page: JWTs live in localStorage, the unwrapped private key sits in IndexedDB during a session, PBKDF2 was the right call for a stage submission but Argon2 would be the right call for a product, and identity verification is trust-on-first-use. WhisperBox is a working proof — not a Signal replacement, and I wrote it that way.'
			}
		]
	},
	{
		n: '03',
		year: '2026',
		slug: 'weather',
		title: 'Weather',
		ital: 'Cross-platform',
		tags: ['Expo · RN · Electron', 'TanStack Query', 'Reanimated'],
		tracks: ['mobile', 'frontend'],
		desc: 'One Expo codebase shipped to iOS, Android, web, and desktop (Linux + Windows). Offline-aware, animated on the UI thread, with an IP-based geolocation fallback on Electron.',
		client: 'HNG Internship 14 · Stage 4 Mobile',
		role: 'Solo',
		duration: '03 / 2026 — 04 / 2026',
		stack: [
			'Expo SDK 54',
			'React Native 0.81',
			'React 19',
			'Electron 41',
			'TanStack Query',
			'Reanimated 4',
			'NativeWind'
		],
		summary:
			'One Expo codebase, five targets — iOS, Android, web (via react-native-web), Linux (AppImage), and Windows (NSIS). The desktop variant ships through Electron with its own application menu and keyboard shortcuts; everything else rides the same hooks and API layer the mobile app uses.',
		featured: true,
		coverUrl: '/projects/weather/01.png',
		liveUrl: 'https://weather-app-hng-14-mobile-stage-3.vercel.app/',
		repoUrl: 'https://github.com/Moluno-xiii/weather-app-hng-14-mobile-stage-3',
		bodySections: [
			{
				kind: 'stat-row',
				items: [
					['5', 'platforms · one codebase'],
					['1', 'forecast call · two views'],
					['300', 'ms search debounce']
				]
			},
			{
				kind: 'image',
				label: 'Search · debounced geocoding autocomplete',
				aspect: 16 / 9,
				src: '/projects/weather/02.png'
			},
			{
				kind: 'prose',
				h: 'One codebase, five targets',
				body: 'Screens, hooks, types, and the API layer are shared across mobile, web, and Electron. Platform-specific branches are deliberately confined to two places: a small fork in useCurrentLocation that swaps in an IP-based lookup for Electron (Chromium needs a Google Maps key for navigator.geolocation), and the electron folder itself for the application menu, keyboard shortcuts, and preload bridge.'
			},
			{
				kind: 'image',
				label: 'Result · animated forecast',
				aspect: 16 / 9,
				src: '/projects/weather/03.png'
			},
			{
				kind: 'prose',
				h: 'Offline-aware everywhere',
				body: 'React Query is wired into NetInfo through onlineManager.setEventListener so queries pause and resume with connectivity. AsyncStorage transparently falls back to localStorage on web and Electron. Reanimated 4 with worklets drives the entrance cascade, the forecast row expand, and the offline banner — all on the UI thread on native, all on Reanimated’s web build elsewhere.'
			}
		]
	},
	{
		n: '04',
		year: '2026',
		slug: 'ai-summarizer',
		title: 'AI Summarizer',
		ital: 'Extension',
		tags: ['Chrome MV3', 'Gemini 2.5', 'NestJS proxy'],
		tracks: ['frontend', 'backend'],
		desc: 'A Chrome extension that extracts the main article off any page, summarises it with Gemini, and highlights the key sentences inline. The API key lives on a small NestJS proxy.',
		client: 'HNG Internship 14 · Stage 4a',
		role: 'Solo · extension + proxy',
		duration: '03 / 2026',
		stack: ['Chrome MV3', 'Service Worker', 'NestJS', 'Gemini 2.5 Flash'],
		repoUrl: 'https://github.com/Moluno-xiii/ai-page-summarizer-hng14-stage-4-fe',
		summary:
			'A Chrome MV3 extension that extracts the main article off any webpage, sends it to a small NestJS proxy holding a Gemini key, and renders the summary in the popup while marking the key sentences inline on the page itself. Per-URL + per-brevity caching means a second click is free.',
		bodySections: [
			{
				kind: 'stat-row',
				items: [
					['~30', 'lines · extractor heuristic'],
					['4–6', 'bullets · standard'],
					['2', 'cache tiers per URL']
				]
			},
			{
				kind: 'prose',
				h: 'Heuristic extraction over Mozilla Readability',
				body: 'The content script tries semantic selectors first — article, main, [role="main"], common content classes — and falls back to a stripped body with nav, header, footer, aside, scripts, and iframes removed. Readability would be more accurate on messier layouts; the heuristic is thirty lines and Gemini handles messy input well, so the cost/benefit did not justify the dependency.'
			},
			{
				kind: 'prose',
				h: 'Hosted proxy over user-supplied keys',
				body: 'The Gemini API key lives on a small NestJS proxy, not in the extension. The user gets zero setup; I accept cold boots and bear the API bill. The proxy calls gemini-2.5-flash with a structured-output schema and returns parsed JSON the extension can render without re-validating.'
			},
			{
				kind: 'prose',
				h: 'XSS-safe in-page annotation',
				body: 'Highlighting writes nothing to innerHTML. The content script walks the article DOM, locates each key sentence as a Range, and calls Range.surroundContents on a mark element. Pages on chrome://, chrome-extension:// and the Chrome Web Store cannot be scripted — the popup detects those and shows a friendly error instead of failing silently.'
			}
		]
	},
	{
		n: '05',
		year: '2025',
		slug: 'habit-tracker',
		title: 'Habit Tracker',
		ital: 'Almanac',
		tags: ['Next 16 · React 19', 'PWA · Service Worker', 'Offline-first'],
		tracks: ['frontend'],
		desc: 'An offline-capable PWA habit tracker dressed as a hand-kept almanac. Hand-written service worker, three-tier test suite, every byte of state in localStorage.',
		client: 'HNG Internship 14 · Stage 3',
		role: 'Solo',
		duration: '12 / 2025 — 01 / 2026',
		stack: ['Next.js 16', 'React 19', 'React Compiler', 'Tailwind', 'Vitest', 'Playwright'],
		summary:
			'An offline-capable PWA habit tracker styled as a hand-kept almanac. Built on Next 16 with the React Compiler, with a hand-written service worker (network-first for navigations, stale-while-revalidate for everything else) and a three-tier test suite that pins down auth, persistence, and offline rendering.',
		coverUrl: '/projects/habit-tracker/01.png',
		liveUrl: 'https://habit-tracker-pwa-hng-14-stage-2-fe.vercel.app/',
		repoUrl: 'https://github.com/Moluno-xiii/habit-tracker-pwa-hng-14-stage-2-fe',
		bodySections: [
			{
				kind: 'stat-row',
				items: [
					['3', 'test tiers · unit · integration · e2e'],
					['2', 'SW strategies · net-first + SWR'],
					['100%', 'offline after first load']
				]
			},
			{
				kind: 'image',
				label: 'Inscribe a habit',
				aspect: 16 / 9,
				src: '/projects/habit-tracker/02.png'
			},
			{
				kind: 'prose',
				h: 'Service worker, hand-written',
				body: 'Three handlers and two strategies, all in one file. Install pre-caches the app shell. Activate purges the old cache version and claims clients. Fetch is the interesting part: navigations are network-first with a fall-back chain to the cached page, then the cached / shell, then a 503; everything else is stale-while-revalidate so the second visit is instant while the cache refreshes in the background.'
			},
			{
				kind: 'image',
				label: 'Day 01 · the streak begins',
				aspect: 16 / 9,
				src: '/projects/habit-tracker/03.png'
			},
			{
				kind: 'prose',
				h: 'Streak walk',
				body: 'Habit completions are a sorted-on-read set of YYYY-MM-DD strings. The streak calculator walks backwards from today, counting consecutive days that appear in the set; duplicates are deduped via new Set before the walk. Vitest pins the edge cases — no completions, today missing, breaks on the first gap, duplicates ignored — and Playwright validates the full toggle-and-render loop in a real browser.'
			}
		]
	},
	{
		n: '06',
		year: '2025',
		slug: 'insighta-labs',
		title: 'Insighta Labs',
		ital: 'API',
		tags: ['NestJS · Supabase', 'Rule-based NLU', 'Backend'],
		tracks: ['backend'],
		desc: 'A demographic query API with filtering, sorting, pagination, and a rule-based natural-language search endpoint. No LLM — every classification is regex passes.',
		client: 'HNG Internship 14 · Stage 2 Backend',
		role: 'Solo · backend',
		duration: '11 / 2025',
		stack: ['NestJS 11', 'TypeScript', 'Supabase', 'PostgreSQL', 'class-validator'],
		summary:
			'A demographic query layer over a 2,026-row profiles table. Combinable filters, indexed sort, clamped pagination — and a rule-based natural-language endpoint that converts "young males from nigeria above 30" into the same filter object the typed query uses. No LLM, no embeddings, no external calls.',
		repoUrl: 'https://github.com/Moluno-xiii/insighta-labs-hng-14-be-stage-2',
		bodySections: [
			{
				kind: 'stat-row',
				items: [
					['100%', 'rule-based NLU'],
					['4-layer', 'idempotent seeder'],
					['2026', 'rows · pre-seeded']
				]
			},
			{
				kind: 'prose',
				h: 'Natural language without an LLM',
				body: 'The /search endpoint runs a sequence of regex passes — gender, age-group keywords, the "young" bracket (16–24), comparators (above/below/older-than/under), age ranges (between N and M), and a longest-name-first country match against Intl.DisplayNames plus a curated alias table. "Male and female teenagers above 17" suppresses the gender filter on purpose; "banana" returns 400 with "Unable to interpret query." Every supported phrase has a worked example in the README.'
			},
			{
				kind: 'prose',
				h: 'Idempotent by design',
				body: 'The seeder enforces "no duplicate records" at four layers: input normalisation (lowercase names, uppercase ISO codes, fill missing country names from Intl.DisplayNames), an intra-file dedup pass through a Map, a DB pre-check that filters out existing names per batch, and a final upsert with onConflict ignoreDuplicates. The second run inserts zero rows and prints "Seed is up to date" — every time.'
			},
			{
				kind: 'prose',
				h: 'Query layer',
				body: 'Every filter column and every sort column carries a dedicated index. count: "exact" piggybacks the total onto the same SELECT so listing is one round-trip. Page and limit clamp instead of erroring on out-of-range values, because a paginated UI should never crash on a stale query string.'
			}
		]
	},
	{
		n: '07',
		year: '2025',
		slug: 'invoicr',
		title: 'Invoicr',
		ital: 'Billing',
		tags: ['React 19 · IndexedDB', 'TanStack', 'Zod'],
		tracks: ['frontend'],
		desc: 'Invoice management for freelancers and studios — create, edit, mark paid, filter. IndexedDB persistence, theme that doesn’t flash, polished landing page on the front.',
		client: 'HNG Internship 14 · Stage 2 Frontend',
		role: 'Solo',
		duration: '10 / 2025 — 11 / 2025',
		stack: [
			'React 19',
			'TypeScript',
			'Vite',
			'TanStack Router',
			'TanStack Query',
			'IndexedDB · idb',
			'Zod',
			'Tailwind v4'
		],
		summary:
			'A polished invoice manager for freelancers and studios — CRUD, multi-select status filter, Zod validation, theme toggle with no flash on first paint. Everything persists to IndexedDB through idb, so a hard refresh never loses an edit and the app keeps working with the network cut.',
		coverUrl: '/projects/invoicr/01.png',
		liveUrl: 'https://invoicr-cyan.vercel.app/',
		repoUrl: 'https://github.com/Moluno-xiii/invoice-management-app-hng-14-stage-2-FE-task',
		bodySections: [
			{
				kind: 'stat-row',
				items: [
					['100%', 'client-side data'],
					['3', 'status tracks · paid · pending · draft'],
					['320 px', 'minimum width tested']
				]
			},
			{
				kind: 'image',
				label: 'Invoices · filter + statuses',
				aspect: 16 / 9,
				src: '/projects/invoicr/02.png'
			},
			{
				kind: 'prose',
				h: 'IndexedDB through idb',
				body: 'Every invoice lives in IndexedDB, accessed through the idb wrapper. A hard refresh, a closed tab, an offline session — none of it loses a draft. Theme preference rides in localStorage and is applied pre-paint so the first frame is always the right colour scheme.'
			},
			{
				kind: 'prose',
				h: 'Validation with Zod',
				body: 'The invoice schema is a single Zod object: required fields, valid email, at least one line item, non-negative quantity and price. Field-level errors surface inline; the same schema runs on create and on edit so the two flows can never drift.'
			},
			{
				kind: 'prose',
				h: 'A landing page that earns the dashboard',
				body: 'The marketing surface is its own route — typography-first, with three pieces of supporting copy and a single CTA into the dashboard. Loading and error states are explicit (skeleton invoice rows, centred error with retry), and the whole thing was tested down to 320 px in real browsers, not just devtools.'
			}
		]
	},
	{
		n: '08',
		year: '2025',
		slug: 'tasksphere',
		title: 'TaskSphere',
		ital: 'Kanban',
		tags: ['React · Supabase', 'TanStack Query', 'Cloudinary'],
		tracks: ['frontend'],
		desc: 'A personal and organisation-aware kanban board. Supabase carries auth and data, Cloudinary handles attachments, TanStack Query keeps the cache honest with optimistic edits.',
		client: 'Self-initiated',
		role: 'Solo · fullstack',
		duration: '03 / 2025 — 11 / 2025',
		stack: [
			'React',
			'TypeScript',
			'Vite',
			'TanStack Router',
			'TanStack Query',
			'Supabase',
			'Cloudinary',
			'Tailwind'
		],
		summary:
			'A kanban board that doubles as a personal project tracker and an organisation workspace. Supabase carries auth, projects, and todos; Cloudinary handles avatars and attachments; TanStack Query keeps the cache honest with optimistic mutations across boards.',
		coverUrl: '/projects/tasksphere/01.png',
		liveUrl: 'https://tasksphere-amber.vercel.app/',
		repoUrl: 'https://github.com/Moluno-xiii/kanban',
		bodySections: [
			{
				kind: 'stat-row',
				items: [
					['2', 'modes · personal + org'],
					['1', 'cache · TanStack Query'],
					['Live', 'in production · 2025']
				]
			},
			{
				kind: 'image',
				label: 'Personal projects board',
				aspect: 16 / 9,
				src: '/projects/tasksphere/01.png'
			},
			{
				kind: 'prose',
				h: 'Two surfaces, one cache',
				body: 'Users can run TaskSphere in personal mode — projects and todos that belong to them alone — or jump into an organisation where projects, members, and notifications are shared. The same React tree powers both; route boundaries decide which Supabase query keys come along for the ride.'
			},
			{
				kind: 'prose',
				h: 'Optimistic by default',
				body: 'Every mutation — add, rename, complete, delete — uses TanStack Query’s onMutate to update the cache before the server has even acknowledged the write. Rollback on failure is automatic; the user never sees a list freeze while waiting on a network round-trip.'
			},
			{
				kind: 'prose',
				h: 'Cloudinary for the heavy stuff',
				body: 'Avatars and todo attachments go through Cloudinary instead of straight into Supabase storage. The transform URL handles thumbnails, format negotiation, and CDN edge caching; the React side just renders an img and trusts the URL.'
			}
		]
	},
	{
		n: '09',
		year: '2025',
		slug: 'audiophile',
		title: 'Audiophile',
		ital: 'Commerce',
		tags: ['Next.js · Convex', 'Tailwind', 'Nodemailer'],
		tracks: ['frontend'],
		desc: 'A headphones storefront that started from a Frontend Mentor brief and grew a real backend. Convex for products and orders, cart in context + localStorage, email receipts on checkout.',
		client: 'HNG Internship 13 · Stage 3a',
		role: 'Solo · fullstack',
		duration: '06 / 2025',
		stack: ['Next.js', 'Convex', 'TypeScript', 'Tailwind', 'Nodemailer', 'react-hot-toast'],
		summary:
			'A headphones e-commerce build that started from a Frontend Mentor brief and grew a real backend. Convex stores products and orders, the cart rides in React context + localStorage between sessions, checkout dispatches a Nodemailer receipt — fully responsive across the catalog, product, and cart screens.',
		coverUrl: '/projects/audiophile/01.png',
		liveUrl: 'https://audiophile-ts-react.vercel.app/',
		repoUrl: 'https://github.com/Moluno-xiii/audiophile_ts_react',
		bodySections: [
			{
				kind: 'stat-row',
				items: [
					['3', 'categories · 6 products'],
					['1', 'Convex backend'],
					['1 email', 'per completed checkout']
				]
			},
			{
				kind: 'image',
				label: 'Storefront · new product hero',
				aspect: 16 / 9,
				src: '/projects/audiophile/01.png'
			},
			{
				kind: 'prose',
				h: 'Cart, in three places at once',
				body: 'The cart lives in React context for live updates, mirrors itself into localStorage so a hard refresh never loses an item, and only writes into Convex at checkout. Three storage surfaces, one source of truth — the context is canonical and the other two are mirrors.'
			},
			{
				kind: 'prose',
				h: 'Receipt on success',
				body: 'A completed checkout fires a Nodemailer email summary with line items and totals. The transactional copy is plain text by design — easier to land in inboxes, harder to break across mail clients.'
			}
		]
	},
	{
		n: '10',
		year: '2024',
		slug: 'onboard',
		title: 'Onboard',
		ital: 'Widget',
		tags: ['TypeScript', 'Embeddable', 'Team'],
		tracks: ['frontend'],
		desc: 'A team build of an embeddable onboarding-tour widget. A single script tag drops a guided tour onto any site, with progress tracking and an analytics dashboard.',
		client: 'Team project',
		role: 'Frontend · embeddable + landing',
		duration: '09 / 2024 — 10 / 2024',
		stack: ['TypeScript', 'Embeddable widget', 'Analytics dashboard'],
		summary:
			'An embeddable onboarding-tour widget that drops into any site with a single script tag. Step-by-step guidance with navigation controls, progress tracking, and session resumption — plus an analytics dashboard that monitors initiation, completion, abandonment, and drop-out across the tour.',
		coverUrl: '/projects/onboard/01.png',
		liveUrl: 'https://onboarding-app-ts.vercel.app/',
		repoUrl: 'https://github.com/Moluno-xiii/onboarding-app-ts',
		bodySections: [
			{
				kind: 'stat-row',
				items: [
					['1 line', 'to install'],
					['4', 'analytic events'],
					['3', 'surfaces · landing · widget · dashboard']
				]
			},
			{
				kind: 'image',
				label: 'Onboard · landing',
				aspect: 16 / 9,
				src: '/projects/onboard/01.png'
			},
			{
				kind: 'prose',
				h: 'Embed contract',
				body: 'A single script tag loads the widget on any modern website — no build step on the host side. Once the page is live, the widget reads its tour configuration from the dashboard, renders tooltips against the highlighted elements, and posts engagement events back to the analytics surface.'
			},
			{
				kind: 'prose',
				h: 'Three surfaces, one product',
				body: 'The project ships as three connected surfaces: a marketing landing page that explains the product, the embeddable widget itself (with its own auth context so it can identify the host site), and an analytics dashboard that visualises step initiation, completion, abandonment, and drop-out points. I owned the embeddable and the landing; the dashboard was split across the team.'
			}
		]
	},
	{
		n: '11',
		year: '2024',
		slug: 'gh-profile-finder',
		title: 'GH Profile Finder',
		ital: 'Lookup',
		tags: ['React · Vite', 'GitHub API', 'TypeScript'],
		tracks: ['frontend'],
		desc: 'A typed GitHub profile lookup — type a handle, get bio, blog, location, follower count, and every repository the user owns. The first React + TS project that taught me how API plumbing wants to be structured.',
		client: 'Self-initiated · learning',
		role: 'Solo · frontend',
		duration: '2024',
		stack: ['React', 'Vite', 'TypeScript', 'Tailwind', 'GitHub REST API'],
		summary:
			'A typed GitHub profile lookup — submit a handle and you get the user’s bio, blog, name, follower and following counts, location, every owned repository, and a theme toggle to switch between palettes. The first React + TypeScript project I shipped, and the one that taught me what good API plumbing actually looks like.',
		coverUrl: '/projects/gh-profile-finder/01.png',
		liveUrl: 'https://gh-profile-finder-kappa.vercel.app/',
		repoUrl: 'https://github.com/Moluno-xiii/gh_profile_finder',
		bodySections: [
			{
				kind: 'stat-row',
				items: [
					['1', 'endpoint · /users/{handle}'],
					['n', 'repos · scoped to owner'],
					['Multi', 'theme palettes']
				]
			},
			{
				kind: 'image',
				label: 'Profile lookup result',
				aspect: 16 / 9,
				src: '/projects/gh-profile-finder/01.png'
			},
			{
				kind: 'prose',
				h: 'Where I started',
				body: 'This is the first React + TypeScript project I put into production. It taught me three things that every other project on this page is built on: that loading and error states are first-class UI, that a typed response is worth the extra ten minutes it takes to model, and that "ship the smallest thing that works" beats "wait until it is perfect" every time.'
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
