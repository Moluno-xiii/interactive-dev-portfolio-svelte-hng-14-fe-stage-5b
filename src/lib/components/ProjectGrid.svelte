<script lang="ts">
	import { projects } from '$lib/data/projects';
	import SectionHeading from './SectionHeading.svelte';

	function monogramOf(title: string) {
		return title
			.split(/\s+/)
			.map((w) => w[0])
			.join('')
			.slice(0, 2)
			.toUpperCase();
	}
</script>

<section id="work" class="section relative border-t border-border" aria-labelledby="work-title">
	<div class="container-page">
		<SectionHeading
			eyebrow="Selected work"
			title="Recent things I've built."
			titleId="work-title"
			description="A handful of projects across the stack. In Phase 2 these tiles become draggable — rearrange them however you like."
		/>

		<div class="grid auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
			{#each projects as project, i (project.slug)}
				{@const monogram = monogramOf(project.title)}
				<a
					href="/projects/{project.slug}"
					class="card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-border-strong"
					aria-label="Read the case study for {project.title}"
				>
					<!-- Visual tile -->
					<div
						class="card-visual relative aspect-[16/10] overflow-hidden border-b border-border bg-surface-2"
					>
						<!-- Dot grid backdrop -->
						<div class="card-grid pointer-events-none absolute inset-0" aria-hidden="true"></div>

						<!-- Top-left and top-right metadata -->
						<div
							class="absolute inset-x-4 top-4 flex items-center justify-between text-[0.65rem] tracking-wider text-muted uppercase"
						>
							<span class="mono tabular">{String(i + 1).padStart(2, '0')}</span>
							<span class="inline-flex items-center gap-1.5 mono">
								{#if project.featured}
									<span class="inline-block size-1.5 rounded-full bg-accent"></span>
									Featured
								{:else}
									{project.year}
								{/if}
							</span>
						</div>

						<!-- Big monogram in accent -->
						<div
							class="absolute inset-0 flex items-center justify-center font-display text-[clamp(4rem,10vw,7.5rem)] font-medium tracking-[-0.05em] text-accent transition-transform duration-500 group-hover:scale-105"
							style="font-variation-settings: 'opsz' 96, 'wdth' 90;"
							aria-hidden="true"
						>
							{monogram}
						</div>

						<!-- Bottom-right arrow -->
						<div
							class="absolute right-4 bottom-4 flex size-9 items-center justify-center rounded-full bg-surface text-fg shadow-sm transition-all duration-300 group-hover:bg-accent group-hover:text-accent-contrast"
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
								<path d="M7 17 17 7" /><path d="M7 7h10v10" />
							</svg>
						</div>
					</div>

					<!-- Body -->
					<div class="flex flex-1 flex-col gap-3 p-5">
						<div class="flex flex-wrap items-baseline justify-between gap-2">
							<h3
								class="m-0 text-headline font-display text-fg transition-colors group-hover:text-accent"
							>
								{project.title}
							</h3>
							<span class="mono text-[0.72rem] text-muted tabular">{project.year}</span>
						</div>
						<p class="m-0 text-[0.92rem] leading-[1.5] text-soft">{project.summary}</p>
						<ul class="m-0 mt-1 flex list-none flex-wrap gap-1.5 p-0">
							{#each project.tech.slice(0, 4) as t (t)}
								<li class="chip">{t}</li>
							{/each}
							{#if project.tech.length > 4}
								<li class="chip">+{project.tech.length - 4}</li>
							{/if}
						</ul>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>

<style>
	.card-grid {
		background-image: radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0);
		background-size: 16px 16px;
		opacity: 0.6;
		mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
		-webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
	}
</style>
