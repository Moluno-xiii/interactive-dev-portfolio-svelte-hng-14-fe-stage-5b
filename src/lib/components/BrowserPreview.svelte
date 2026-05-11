<script lang="ts">
	import type { Project } from '$lib/types';

	interface Props {
		project: Project;
	}
	let { project }: Props = $props();

	const monogram = $derived(
		project.title
			.split(/\s+/)
			.map((w) => w[0])
			.join('')
			.slice(0, 2)
			.toUpperCase()
	);

	const domain = $derived(project.caseStudy?.domain ?? `${project.slug}.dev`);

	const statusLabel: Record<string, string> = {
		live: 'Live',
		archived: 'Archived',
		sunset: 'Sunset',
		'in-progress': 'In progress'
	};
</script>

<figure class="m-0 overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl">
	<div class="flex items-center gap-3 border-b border-border bg-surface-2 px-4 py-3">
		<div class="flex items-center gap-1.5" aria-hidden="true">
			<span class="size-3 rounded-full bg-[#ff5f57]"></span>
			<span class="size-3 rounded-full bg-[#febc2e]"></span>
			<span class="size-3 rounded-full bg-[#28c840]"></span>
		</div>

		<div class="ml-2 hidden items-center gap-1 text-muted sm:flex" aria-hidden="true">
			<button class="icon-button" disabled aria-hidden="true" tabindex="-1">
				<svg
					width="13"
					height="13"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path d="m15 18-6-6 6-6" />
				</svg>
			</button>
			<button class="icon-button" disabled aria-hidden="true" tabindex="-1">
				<svg
					width="13"
					height="13"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path d="m9 18 6-6-6-6" />
				</svg>
			</button>
		</div>

		<div
			class="mx-auto flex w-full max-w-md items-center gap-2 rounded-md border border-border bg-bg px-3 py-1.5 font-mono text-[0.75rem] text-soft"
		>
			<svg
				width="12"
				height="12"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				aria-hidden="true"
			>
				<rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
			</svg>
			<span class="truncate">{domain}/{project.slug}</span>
		</div>

		{#if project.caseStudy?.status}
			<span
				class="hidden items-center gap-1.5 mono text-[0.62rem] tracking-wider uppercase sm:inline-flex"
			>
				{#if project.caseStudy.status === 'live'}
					<span class="inline-block size-1.5 rounded-full bg-accent"></span>
					<span class="text-accent">{statusLabel[project.caseStudy.status]}</span>
				{:else}
					<span class="inline-block size-1.5 rounded-full bg-muted-2"></span>
					<span class="text-muted">{statusLabel[project.caseStudy.status]}</span>
				{/if}
			</span>
		{/if}
	</div>

	<div class="viewport relative aspect-[16/9] overflow-hidden bg-bg">
		<div class="dot-grid pointer-events-none absolute inset-0" aria-hidden="true"></div>

		<div class="horizon-lines pointer-events-none absolute inset-0" aria-hidden="true"></div>

		<div
			class="absolute inset-x-0 top-0 flex items-center justify-between border-b border-border/60 px-5 py-3 text-[0.65rem]"
		>
			<div class="flex items-center gap-2">
				<span
					class="inline-flex size-4 items-center justify-center rounded bg-accent text-[0.55rem] font-semibold text-accent-contrast"
					>{monogram[0]}</span
				>
				<span class="mono text-soft">{project.title}</span>
			</div>
			<div class="flex items-center gap-3 text-muted">
				<span class="hidden sm:inline">Docs</span>
				<span class="hidden sm:inline">Changelog</span>
				<span class="mono text-accent">v{project.year}.0</span>
			</div>
		</div>

		<div class="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
			<span
				class="font-display leading-[0.85] font-medium tracking-[-0.05em] text-accent"
				style="font-size: clamp(4rem, 14vw, 11rem); font-variation-settings: 'opsz' 144, 'wdth' 88;"
				aria-hidden="true"
			>
				{monogram}
			</span>
			<div class="flex flex-col items-center gap-1.5">
				<h3
					class="m-0 font-display text-[clamp(1.3rem,2.2vw,2rem)] font-medium tracking-[-0.025em] text-fg"
					style="font-variation-settings: 'opsz' 48, 'wdth' 92;"
				>
					{project.title}
				</h3>
				<p class="m-0 max-w-md mono text-[0.78rem] text-muted">
					{project.summary}
				</p>
			</div>
		</div>

		<div class="absolute right-5 bottom-4 flex items-center gap-2 text-[0.62rem]">
			<span class="mono text-muted">{project.year}</span>
			<span class="mono text-muted-2">/</span>
			<span class="mono text-accent">{project.caseStudy?.role.split(' ')[0] ?? 'Solo'}</span>
		</div>

		<div class="absolute bottom-4 left-5 flex items-center gap-2 text-[0.62rem]">
			<span class="inline-block size-1.5 rounded-full bg-accent"></span>
			<span class="mono text-soft">Preview</span>
		</div>
	</div>
</figure>

<style>
	.icon-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
		border-radius: 6px;
		background: transparent;
		border: 0;
		color: inherit;
		opacity: 0.6;
	}

	.dot-grid {
		background-image: radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0);
		background-size: 22px 22px;
		opacity: 0.55;
		mask-image: radial-gradient(ellipse at center, black 35%, transparent 80%);
		-webkit-mask-image: radial-gradient(ellipse at center, black 35%, transparent 80%);
	}

	.horizon-lines {
		background-image:
			linear-gradient(
				to bottom,
				transparent 33%,
				var(--border) 33%,
				var(--border) 33.2%,
				transparent 33.2%
			),
			linear-gradient(
				to bottom,
				transparent 66%,
				var(--border) 66%,
				var(--border) 66.2%,
				transparent 66.2%
			);
		opacity: 0.4;
	}
</style>
