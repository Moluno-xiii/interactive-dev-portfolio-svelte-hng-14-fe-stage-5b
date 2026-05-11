<script lang="ts">
	import BrowserPreview from '$lib/components/BrowserPreview.svelte';
	import TechChip from '$lib/components/TechChip.svelte';
	import { getAdjacentProjects } from '$lib/data/projects';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const project = $derived(data.project);
	const cs = $derived(project.caseStudy);
	const adjacent = $derived(getAdjacentProjects(project.slug));

	const statusLabel: Record<string, string> = {
		live: 'Live',
		archived: 'Archived',
		sunset: 'Sunset',
		'in-progress': 'In progress'
	};

	function monogramOf(title: string) {
		return title
			.split(/\s+/)
			.map((w) => w[0])
			.join('')
			.slice(0, 2)
			.toUpperCase();
	}
</script>

<svelte:head>
	<title>{project.title} — Case study</title>
	<meta name="description" content={project.summary} />
</svelte:head>

<article class="relative pb-[clamp(4rem,8vw,6rem)]">
	<!-- Breadcrumb -->
	<nav
		class="container-page flex items-center gap-3 py-5 text-[0.85rem] text-muted"
		aria-label="Breadcrumb"
	>
		<a
			href="/#work"
			class="inline-flex items-center gap-1.5 text-soft transition-colors duration-200 hover:text-fg"
		>
			<svg
				width="14"
				height="14"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				aria-hidden="true"
			>
				<path d="M19 12H5" /><path d="m12 19-7-7 7-7" />
			</svg>
			All work
		</a>
		<span class="text-muted-2">/</span>
		<span class="truncate text-fg">{project.title}</span>
	</nav>

	<div class="container-page pt-[clamp(2rem,5vw,3.5rem)]">
		<!-- Hero -->
		<header class="fx-rise mb-12 flex max-w-[58rem] flex-col gap-5" style="--fx-delay: 0ms;">
			<div class="flex flex-wrap items-center gap-2">
				<span
					class="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-1 mono text-[0.68rem] tracking-wider text-soft uppercase"
				>
					Case study
				</span>
				<span
					class="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-1 mono text-[0.68rem] tracking-wider text-soft uppercase tabular"
				>
					{project.year}
				</span>
				{#if cs}
					<span
						class="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 mono text-[0.68rem] tracking-wider uppercase {cs.status ===
						'live'
							? 'border-accent bg-accent-soft text-accent'
							: 'border-border bg-surface text-muted'}"
					>
						<span class="size-1.5 rounded-full {cs.status === 'live' ? 'bg-accent' : 'bg-muted'}"
						></span>
						{statusLabel[cs.status]}
					</span>
				{/if}
				{#if project.featured}
					<span
						class="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-1 mono text-[0.68rem] tracking-wider text-fg uppercase"
					>
						★ Featured
					</span>
				{/if}
			</div>

			<h1
				class="m-0 font-display leading-[0.92] tracking-[-0.04em] text-fg"
				style="font-size: clamp(2.75rem, 8vw, 5.5rem); font-variation-settings: 'opsz' 96, 'wdth' 92;"
			>
				{project.title}
			</h1>

			<p class="m-0 max-w-[48rem] text-[clamp(1.1rem,1.4vw,1.3rem)] leading-[1.5] text-soft">
				{project.summary}
			</p>

			<div class="mt-2 flex flex-wrap gap-2.5">
				{#if project.liveUrl}
					<a
						href={project.liveUrl}
						class="btn btn-primary"
						target="_blank"
						rel="noopener noreferrer"
					>
						Visit live
						<svg
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							aria-hidden="true"
						>
							<path d="M7 17 17 7" /><path d="M7 7h10v10" />
						</svg>
					</a>
				{/if}
				{#if project.repoUrl}
					<a href={project.repoUrl} class="btn" target="_blank" rel="noopener noreferrer">
						<svg
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="1.7"
							aria-hidden="true"
						>
							<polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
						</svg>
						View source
					</a>
				{/if}
			</div>
		</header>

		<!-- Hero visual -->
		<div class="fx-rise mb-14" style="--fx-delay: 120ms;">
			<BrowserPreview {project} />
		</div>

		<!-- Meta strip -->
		{#if cs}
			<dl
				class="mb-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4"
			>
				<div class="flex flex-col gap-1.5 bg-surface px-5 py-5">
					<dt class="mono text-[0.62rem] tracking-wider text-muted uppercase">Role</dt>
					<dd class="m-0 text-[0.95rem] text-fg">{cs.role}</dd>
				</div>
				<div class="flex flex-col gap-1.5 bg-surface px-5 py-5">
					<dt class="mono text-[0.62rem] tracking-wider text-muted uppercase">Duration</dt>
					<dd class="m-0 text-[0.95rem] text-fg">{cs.duration}</dd>
				</div>
				<div class="flex flex-col gap-1.5 bg-surface px-5 py-5">
					<dt class="mono text-[0.62rem] tracking-wider text-muted uppercase">Team</dt>
					<dd class="m-0 text-[0.95rem] text-fg">{cs.team}</dd>
				</div>
				<div class="flex flex-col gap-1.5 bg-surface px-5 py-5">
					<dt class="mono text-[0.62rem] tracking-wider text-muted uppercase">Year</dt>
					<dd class="m-0 text-[0.95rem] text-fg tabular">{project.year}</dd>
				</div>
			</dl>
		{/if}

		<!-- Content sections -->
		<div class="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
			<div class="flex max-w-[44rem] flex-col gap-14">
				<!-- Overview -->
				<section>
					<div class="mb-5 flex items-center gap-3">
						<span class="mono text-[0.7rem] tracking-wider text-accent uppercase">Overview</span>
						<span class="h-px flex-1 bg-border" aria-hidden="true"></span>
					</div>
					<p class="m-0 text-[clamp(1.1rem,1.3vw,1.3rem)] leading-[1.6] text-soft">
						{cs?.context ?? project.description}
					</p>
				</section>

				<!-- Highlights -->
				{#if cs?.highlights?.length}
					<section>
						<div class="mb-5 flex items-center gap-3">
							<span class="mono text-[0.7rem] tracking-wider text-accent uppercase">Highlights</span
							>
							<span class="h-px flex-1 bg-border" aria-hidden="true"></span>
						</div>
						<div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
							{#each cs.highlights as h, i (i)}
								<div class="flex flex-col gap-1.5 rounded-xl border border-border bg-surface p-4">
									<div
										class="font-display text-[clamp(1.75rem,3.6vw,2.5rem)] leading-none tracking-[-0.04em] text-accent"
										style="font-variation-settings: 'opsz' 72, 'wdth' 88;"
									>
										{h.metric}
									</div>
									<div class="text-[0.85rem] leading-tight text-fg">{h.label}</div>
									{#if h.meta}
										<div class="mono text-[0.65rem] tracking-wider text-muted uppercase">
											{h.meta}
										</div>
									{/if}
								</div>
							{/each}
						</div>
					</section>
				{/if}

				<!-- Process sections -->
				{#if cs?.sections?.length}
					<section>
						<div class="mb-5 flex items-center gap-3">
							<span class="mono text-[0.7rem] tracking-wider text-accent uppercase"
								>How it was built</span
							>
							<span class="h-px flex-1 bg-border" aria-hidden="true"></span>
						</div>
						<ol class="m-0 flex list-none flex-col gap-10 p-0">
							{#each cs.sections as s (s.num)}
								<li>
									<div class="mb-3 flex items-baseline gap-3">
										<span class="mono text-[0.72rem] tracking-wider text-accent tabular"
											>{s.num}</span
										>
										<h2
											class="m-0 font-display text-[clamp(1.35rem,2.2vw,1.75rem)] leading-[1.1] font-medium tracking-[-0.025em] text-fg"
											style="font-variation-settings: 'opsz' 48, 'wdth' 95;"
										>
											{s.heading}
										</h2>
									</div>
									<p class="m-0 text-[1.02rem] leading-[1.65] text-soft">{s.body}</p>
								</li>
							{/each}
						</ol>
					</section>
				{/if}

				<!-- Outcomes -->
				{#if cs?.outcomes?.length}
					<section>
						<div class="mb-5 flex items-center gap-3">
							<span class="mono text-[0.7rem] tracking-wider text-accent uppercase"
								>What shipped</span
							>
							<span class="h-px flex-1 bg-border" aria-hidden="true"></span>
						</div>
						<ul class="m-0 flex list-none flex-col gap-2.5 p-0">
							{#each cs.outcomes as o, i (i)}
								<li class="flex items-start gap-3 text-[1.02rem] leading-[1.6] text-soft">
									<span
										class="mt-1 inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent"
										aria-hidden="true"
									>
										<svg
											width="10"
											height="10"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="3"
											stroke-linecap="round"
											stroke-linejoin="round"
										>
											<polyline points="20 6 9 17 4 12" />
										</svg>
									</span>
									<span>{o}</span>
								</li>
							{/each}
						</ul>
					</section>
				{/if}

				<!-- Reflection -->
				{#if cs?.reflection}
					<section>
						<div class="mb-5 flex items-center gap-3">
							<span class="mono text-[0.7rem] tracking-wider text-accent uppercase">Reflection</span
							>
							<span class="h-px flex-1 bg-border" aria-hidden="true"></span>
						</div>
						<blockquote
							class="m-0 rounded-2xl border-l-2 border-accent bg-surface px-6 py-5 text-[1.05rem] leading-[1.6] text-soft"
						>
							{cs.reflection}
						</blockquote>
					</section>
				{/if}
			</div>

			<!-- Sticky stack rail (desktop only) -->
			<aside class="lg:sticky lg:top-24 lg:self-start">
				<div class="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5">
					<div class="flex items-center justify-between">
						<span class="mono text-[0.65rem] tracking-wider text-muted uppercase">Stack</span>
						<span class="mono text-[0.65rem] tracking-wider text-muted uppercase tabular">
							{String(project.tech.length).padStart(2, '0')}
						</span>
					</div>
					<ul class="m-0 flex list-none flex-wrap gap-1.5 p-0">
						{#each project.tech as t (t)}
							<li><TechChip label={t} /></li>
						{/each}
					</ul>

					{#if cs?.domain}
						<div class="mt-2 flex items-center justify-between gap-3 border-t border-border pt-4">
							<span class="mono text-[0.65rem] tracking-wider text-muted uppercase">Domain</span>
							<span class="truncate mono text-[0.78rem] text-fg">{cs.domain}</span>
						</div>
					{/if}

					{#if project.liveUrl || project.repoUrl}
						<div class="flex flex-col gap-2 border-t border-border pt-4">
							{#if project.liveUrl}
								<a
									href={project.liveUrl}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex items-center justify-between text-[0.88rem] text-soft transition-colors hover:text-accent"
								>
									<span>Live site</span>
									<svg
										width="12"
										height="12"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										aria-hidden="true"
									>
										<path d="M7 17 17 7" /><path d="M7 7h10v10" />
									</svg>
								</a>
							{/if}
							{#if project.repoUrl}
								<a
									href={project.repoUrl}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex items-center justify-between text-[0.88rem] text-soft transition-colors hover:text-accent"
								>
									<span>Source</span>
									<svg
										width="12"
										height="12"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										aria-hidden="true"
									>
										<path d="M7 17 17 7" /><path d="M7 7h10v10" />
									</svg>
								</a>
							{/if}
						</div>
					{/if}
				</div>
			</aside>
		</div>

		<!-- Prev / Next navigation -->
		{#if adjacent.prev || adjacent.next}
			<nav
				class="mt-20 grid grid-cols-1 gap-3 border-t border-border pt-10 md:grid-cols-2"
				aria-label="Project navigation"
			>
				{#if adjacent.prev}
					{@const p = adjacent.prev}
					{@const m = monogramOf(p.title)}
					<a
						href="/projects/{p.slug}"
						class="group flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-border-strong"
					>
						<span
							class="inline-flex size-14 shrink-0 items-center justify-center rounded-xl border border-border bg-bg font-display text-xl text-accent transition-colors group-hover:border-accent"
							style="font-variation-settings: 'opsz' 32, 'wdth' 90;"
						>
							{m}
						</span>
						<div class="flex min-w-0 flex-1 flex-col">
							<span class="mono text-[0.62rem] tracking-wider text-muted uppercase">
								← Previous
							</span>
							<span
								class="truncate font-display text-lg font-medium text-fg transition-colors group-hover:text-accent"
								style="font-variation-settings: 'opsz' 24, 'wdth' 95;"
							>
								{p.title}
							</span>
							<span class="truncate text-[0.82rem] text-muted">{p.summary}</span>
						</div>
					</a>
				{:else}
					<span></span>
				{/if}

				{#if adjacent.next}
					{@const n = adjacent.next}
					{@const m = monogramOf(n.title)}
					<a
						href="/projects/{n.slug}"
						class="group flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-border-strong md:text-right"
					>
						<div class="flex min-w-0 flex-1 flex-col md:order-1 md:items-end">
							<span class="mono text-[0.62rem] tracking-wider text-muted uppercase"> Next → </span>
							<span
								class="truncate font-display text-lg font-medium text-fg transition-colors group-hover:text-accent"
								style="font-variation-settings: 'opsz' 24, 'wdth' 95;"
							>
								{n.title}
							</span>
							<span class="truncate text-[0.82rem] text-muted">{n.summary}</span>
						</div>
						<span
							class="inline-flex size-14 shrink-0 items-center justify-center rounded-xl border border-border bg-bg font-display text-xl text-accent transition-colors group-hover:border-accent md:order-2"
							style="font-variation-settings: 'opsz' 32, 'wdth' 90;"
						>
							{m}
						</span>
					</a>
				{/if}
			</nav>
		{/if}
	</div>
</article>
