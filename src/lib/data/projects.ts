import type { Project } from '$lib/types';

export const projects: Project[] = [
	{
		slug: 'orbit-analytics',
		title: 'Orbit Analytics',
		summary: 'Real-time product analytics with a focus on motion-driven dashboards.',
		description:
			'A privacy-first analytics platform with live dashboards, anomaly detection, and a query language designed for product teams. Built around a streaming ingest layer and a custom motion system for animating multi-thousand-point time series without dropping frames.',
		tech: ['SvelteKit', 'TypeScript', 'ClickHouse', 'WebSockets', 'D3'],
		screenshot: '/projects/orbit.svg',
		liveUrl: 'https://example.com/orbit',
		repoUrl: 'https://github.com/Moluno/orbit',
		featured: true,
		year: 2025,
		caseStudy: {
			role: 'Engineering & motion design',
			duration: '8 weeks · Q3 2025',
			team: 'Solo lead, 2 design consults',
			status: 'live',
			domain: 'orbit.studio',
			context:
				"Most analytics dashboards trade smoothness for data fidelity. Orbit's bet is that you don't have to pick. Built for product teams who need to ship dashboards their PMs will actually read, the core challenge was rendering ten-thousand-point live time-series at a sustained 60fps — and keeping every interaction respectful of reduced-motion preferences.",
			highlights: [
				{ metric: '3×', label: 'faster repaint', meta: 'vs incumbent tool' },
				{ metric: '60', label: 'fps · 10k points' },
				{ metric: '47k', label: 'events / sec', meta: 'single node' },
				{ metric: '0.00', label: 'CLS score', meta: 'zero shift on load' }
			],
			sections: [
				{
					num: '01',
					heading: 'Streaming ingest',
					body: "WebSockets were overkill for one-way data, but SSE choked under bursty traffic. We landed on a custom framing over WebSockets that prioritises the visible viewport — points outside the chart window get coalesced server-side before they hit the wire. The result: bandwidth scales with what you're looking at, not what's being recorded."
				},
				{
					num: '02',
					heading: 'Render budget',
					body: 'Charts are surprisingly diverse. A bar chart is happy in SVG, but a 10k-point timeline needs Canvas. We built a tiny dispatcher that picks the renderer per chart type, and refused to mix renderers inside the same viewport — the cost of compositing two render trees beat any per-chart savings.'
				},
				{
					num: '03',
					heading: 'Motion system',
					body: "Every transition runs through a single spring interpolator that reads the user's reduced-motion preference at runtime. Springs with mass and stiffness derived from chart velocity make zooms feel physical without being slow. The whole module is ~4kb gzipped and ended up shipping as a standalone package."
				},
				{
					num: '04',
					heading: 'Query language',
					body: 'PMs needed to write filters without learning SQL. The result is a 200-line parser that compiles to SQL under the hood and reports errors with line and column. It supports four operators, two literals, and exactly the joins we found people actually wrote — nothing more.'
				}
			],
			outcomes: [
				'Shipped to 12 beta teams across two industries',
				'Sustained 60fps on a four-year-old MacBook Air baseline',
				'Open-sourced the spring interpolator as a 4kb package',
				'Featured in three issues of Frontend Focus'
			],
			reflection:
				"If I started today I'd reach for WebGPU earlier — Canvas held up but the next 10× will need shaders. The bet on a tiny query language was the right call: more time on developer ergonomics than on render speed."
		}
	},
	{
		slug: 'kindle-cli',
		title: 'Kindle CLI',
		summary: 'A terminal-first reader for Kindle highlights with fuzzy search.',
		description:
			'Sync, search, and export your Kindle highlights from the command line. Features fuzzy search, Markdown export, and an interactive TUI mode for browsing books and notes without leaving the terminal.',
		tech: ['Rust', 'Tokio', 'Ratatui', 'SQLite'],
		screenshot: '/projects/kindle.svg',
		repoUrl: 'https://github.com/Moluno/kindle-cli',
		featured: true,
		year: 2025,
		caseStudy: {
			role: 'Solo · design + engineering',
			duration: '5 weekends · Q1 2025',
			team: 'Solo + 12 OSS contributors',
			status: 'live',
			domain: 'kindle-cli.dev',
			context:
				'Reading happens on Kindle. Reflection happens at a terminal. The gap was a sync problem dressed up as a UX problem. Kindle CLI turns your highlights into a local SQLite store you can grep, pipe, or export — without sending a byte to a cloud.',
			highlights: [
				{ metric: '200', label: 'ms cold sync' },
				{ metric: '8', label: 'ms fuzzy search', meta: '10k highlights' },
				{ metric: '1.4k', label: 'GitHub stars' },
				{ metric: '0', label: 'cloud calls' }
			],
			sections: [
				{
					num: '01',
					heading: 'Reverse engineering',
					body: "Kindle's My Clippings.txt is fine for casual use, but the actual highlight database is buried in the device's filesystem and undocumented. A weekend of strings dumps and SQLite plumbing later, we had a stable extractor that survived three firmware updates."
				},
				{
					num: '02',
					heading: 'TUI design',
					body: 'Ratatui made interactive mode trivial, but the UX took longer than the code. The principle: every screen should be one keystroke from one of three places — book list, highlight list, or search. Anything more and the tool starts to feel like an app instead of a thought.'
				},
				{
					num: '03',
					heading: 'Fuzzy ranking',
					body: "Fzf-style ranking with a small twist: recent highlights get a soft prior. It's a one-line bias that made the tool feel almost psychic by the second week of use."
				}
			],
			outcomes: [
				'1,400+ GitHub stars in six months',
				"Adopted by Hashnode's bookmark export tool",
				'Featured on Hacker News (top 10)',
				'Used internally by four publishing teams'
			],
			reflection:
				"The fastest tool I've shipped, and the one I use most. The lesson: building tools you'd kill for makes design decisions write themselves."
		}
	},
	{
		slug: 'lumen-ui',
		title: 'Lumen UI',
		summary: 'A Svelte component library exploring motion as a first-class primitive.',
		description:
			'Open-source component library with motion baked into every primitive: springs for hover, choreographed transitions for state changes, and reduced-motion as a default-respected contract. Tree-shakeable, typed, and zero runtime CSS.',
		tech: ['Svelte 5', 'TypeScript', 'Vite', 'Motion One'],
		screenshot: '/projects/lumen.svg',
		liveUrl: 'https://example.com/lumen',
		repoUrl: 'https://github.com/Moluno/lumen',
		featured: true,
		year: 2024,
		caseStudy: {
			role: 'Library author',
			duration: 'Ongoing — started Q4 2024',
			team: 'Solo + 4 maintainers',
			status: 'live',
			domain: 'lumen.dev',
			context:
				'Component libraries usually treat motion as decoration — sprinkled in at the end. Lumen flips that: every primitive ships with a default spring, a hover behaviour, and a reduced-motion fallback. Motion is a first-class API alongside variant and size.',
			highlights: [
				{ metric: '28', label: 'primitives shipped' },
				{ metric: '~12kb', label: 'core gzipped' },
				{ metric: '100%', label: 'reduced-motion respect' },
				{ metric: '0', label: 'runtime CSS' }
			],
			sections: [
				{
					num: '01',
					heading: 'The motion contract',
					body: "Every component accepts a `motion` prop that takes a token — gentle, snappy, or off. It compiles to springs at build time, so there's no runtime cost beyond the transition itself. Tokens compose: a button inside a tooltip inherits the tooltip's tempo unless you override."
				},
				{
					num: '02',
					heading: 'Tree-shaking',
					body: 'Each primitive is its own entry point. A button plus a tooltip is 4kb gzipped on the wire, not the whole library. The build pipeline enforces this with a per-export size budget that fails CI if a primitive grows past its ceiling.'
				},
				{
					num: '03',
					heading: 'Headless first',
					body: 'Styles live in a separate package. The primitives expose data attributes and ARIA — you bring the CSS. Bring-your-own-styling without a CSS-in-JS runtime, which is the whole point.'
				}
			],
			outcomes: [
				'Used in five production apps to date',
				'1,100 weekly npm downloads',
				'Featured in Bytes #350',
				'Co-maintained by four contributors'
			],
			reflection:
				"The motion contract was the controversial decision — every consultancy I showed it to said 'just add a className.' Two years in, I haven't met a component author who regrets having motion as a first-class API."
		}
	},
	{
		slug: 'tessera',
		title: 'Tessera',
		summary: 'Generative mosaic art from photos — runs entirely in the browser.',
		description:
			'Drop a photo, get a tessellated mosaic poster. Computes a Voronoi diagram weighted by image saliency, then composes the result in WebGL with custom shaders. Exports SVG and high-res PNG.',
		tech: ['WebGL', 'GLSL', 'Web Workers', 'Svelte'],
		screenshot: '/projects/tessera.svg',
		liveUrl: 'https://example.com/tessera',
		repoUrl: 'https://github.com/Moluno/tessera',
		year: 2024,
		caseStudy: {
			role: 'Solo',
			duration: '3 weeks · Q4 2024',
			team: 'Solo',
			status: 'live',
			domain: 'tessera.art',
			context:
				'Generative art that runs in your browser. Upload a photo, get a tessellated mosaic poster — printable, vector-exportable, computed entirely on the GPU. The trick is balancing image saliency against tile economy so the output reads as art, not as noise.',
			highlights: [
				{ metric: '800', label: 'ms render', meta: '2k × 2k input' },
				{ metric: '60', label: 'fps controls' },
				{ metric: '0', label: 'bytes uploaded', meta: 'browser only' },
				{ metric: 'SVG', label: '+ 8k PNG export' }
			],
			sections: [
				{
					num: '01',
					heading: 'Saliency map',
					body: 'Used a tiny TensorFlow.js model to score image regions for visual weight. Tiles snap to high-weight regions; flat areas get fewer, larger tiles. The bias is what makes the output legible — without it, every photo flattens into noise.'
				},
				{
					num: '02',
					heading: 'Voronoi on the GPU',
					body: 'Computing Voronoi in JS hit four seconds for high-res inputs. Moved the whole pipeline into a fragment shader and dropped to under a second on integrated graphics. The CPU now only handles the input image and the export.'
				},
				{
					num: '03',
					heading: 'Export pipeline',
					body: "SVG export uses the same fragment program in software mode at the user's chosen resolution. PNG output renders at 4× device-pixel-ratio for print-ready output. Both go through a tiny WASM module to handle the file write off the main thread."
				}
			],
			outcomes: [
				"Featured on Codrops as 'CSS-Tricks of the Week'",
				'Made-with-Tessera Twitter thread reached 220k impressions',
				'600 GitHub stars · open-source'
			],
			reflection:
				'I started this thinking the hard part was the shader. The hard part was choosing defaults that made every photo look good without a settings panel.'
		}
	},
	{
		slug: 'commit-craft',
		title: 'CommitCraft',
		summary: "AI-assisted commit messages that match your repo's style.",
		description:
			'A git hook that drafts commit messages by reading your diff and your last 200 commits, matching tone, scope conventions, and length. Local-first; uses a small on-device model with an optional Anthropic fallback.',
		tech: ['Go', 'Ollama', 'Anthropic API'],
		screenshot: '/projects/commit.svg',
		repoUrl: 'https://github.com/Moluno/commit-craft',
		year: 2024,
		caseStudy: {
			role: 'Engineering',
			duration: '4 weeks · Q3 2024',
			team: 'Solo',
			status: 'live',
			domain: 'commitcraft.sh',
			context:
				"Local-first commit message drafting. Reads your diff, your last 200 commits, and your repo's CONVENTIONS.md if it exists. Drafts in your repo's voice — using a small on-device model by default, with an optional Anthropic fallback for messages over a token threshold.",
			highlights: [
				{ metric: '87%', label: 'accept rate' },
				{ metric: '<500', label: 'ms median' },
				{ metric: '0', label: 'cloud calls', meta: 'default mode' },
				{ metric: '6', label: 'languages tested' }
			],
			sections: [
				{
					num: '01',
					heading: 'Style matching',
					body: 'We tokenise your last 200 commits and score new drafts against the cosine similarity of token distributions. Match too high → boring. Too low → wrong voice. 0.7 turned out to be the sweet spot.'
				},
				{
					num: '02',
					heading: 'Local-first',
					body: "Phi-3 mini runs locally on Apple Silicon in 200ms for short diffs. Long diffs route to Anthropic's API with an opt-in flag — never silently."
				},
				{
					num: '03',
					heading: 'The git hook',
					body: 'Installable as a `prepare-commit-msg` hook. The trick was failing gracefully — if the model times out, the commit goes through with a stub the user can edit. The hook never blocks a commit, only suggests.'
				}
			],
			outcomes: [
				'Used by eight teams in production',
				"Replaced 'Update' commits with structured messages in four repos",
				'Ported to Linux and Windows in v0.4'
			],
			reflection:
				'The acceptance rate metric mattered more than any model benchmark. Watching real users tab through three drafts before accepting one taught me more about model selection than any eval set.'
		}
	},
	{
		slug: 'fieldnotes',
		title: 'Fieldnotes',
		summary: 'A minimal markdown journal with daily prompts and weekly reviews.',
		description:
			'Distraction-free journaling app with daily templated prompts, weekly review summaries, and full-text search across years of notes. Syncs over plain markdown files — your data is always portable.',
		tech: ['Tauri', 'Svelte', 'SQLite', 'Rust'],
		screenshot: '/projects/fieldnotes.svg',
		liveUrl: 'https://example.com/fieldnotes',
		year: 2023,
		caseStudy: {
			role: 'Design + Engineering',
			duration: '6 weeks · Q4 2023',
			team: 'Solo',
			status: 'sunset',
			domain: 'fieldnotes.app',
			context:
				'A distraction-free markdown journal with daily prompts and weekly review automation. Built in Tauri for the offline-first guarantee. The constraint — no cloud sync, no telemetry, no accounts — drove every UX decision.',
			highlights: [
				{ metric: '100%', label: 'offline' },
				{ metric: '30k', label: 'notes indexed', meta: '12ms search' },
				{ metric: '<40', label: 'MB install' },
				{ metric: '0', label: 'telemetry' }
			],
			sections: [
				{
					num: '01',
					heading: 'Daily prompts',
					body: 'Each morning the app suggests a prompt from a pool of 200 — picked by date and recent themes. Easy to dismiss, hard to ignore. The prompts were authored over a weekend; tuning their delivery cadence took six months of dogfooding.'
				},
				{
					num: '02',
					heading: 'Weekly review',
					body: "Sunday mornings the app generates a one-page summary of the week's notes — automatic clustering by topic, ranked by note length. The cluster algorithm is comically simple but the output reads like a thoughtful editor at work."
				},
				{
					num: '03',
					heading: 'Markdown all the way',
					body: 'Notes are plain .md on disk. Sync is your file-sync tool. The app is a viewer with a UX, not a database with an export — which made the eventual sunset painless.'
				}
			],
			outcomes: [
				'Used by ~400 weekly active users',
				"Featured in The Sweet Setup's journaling roundup",
				'Sunset 2024 — replaced by browser-based successor'
			],
			reflection:
				"I sunset this in favour of a web version because the install friction killed adoption. Hard call — Tauri's offline-first guarantee was the entire point of the product."
		}
	}
];

export function getProject(slug: string): Project | undefined {
	return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string): {
	prev: Project | null;
	next: Project | null;
} {
	const idx = projects.findIndex((p) => p.slug === slug);
	if (idx < 0) return { prev: null, next: null };
	return {
		prev: idx > 0 ? projects[idx - 1] : projects[projects.length - 1],
		next: idx < projects.length - 1 ? projects[idx + 1] : projects[0]
	};
}
