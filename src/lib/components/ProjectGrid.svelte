<script lang="ts">
	import { flip } from 'svelte/animate';
	import { cubicOut } from 'svelte/easing';
	import { reveal } from '$lib/actions/reveal';
	import { projectOrder } from '$lib/stores/projectOrder.svelte';
	import SectionHeading from './SectionHeading.svelte';

	let draggingIndex = $state<number | null>(null);
	let overIndex = $state<number | null>(null);

	const transparentDragImg =
		'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/>';

	function monogramOf(title: string) {
		return title
			.split(/\s+/)
			.map((w) => w[0])
			.join('')
			.slice(0, 2)
			.toUpperCase();
	}

	function onDragStart(e: DragEvent, i: number) {
		if (!e.dataTransfer) return;
		draggingIndex = i;
		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData('text/plain', String(i));
		const img = new Image();
		img.src = transparentDragImg;
		try {
			e.dataTransfer.setDragImage(img, 0, 0);
		} catch (err) {
			void err;
		}
	}

	function onDragOver(e: DragEvent, i: number) {
		if (draggingIndex === null) return;
		e.preventDefault();
		overIndex = i;
		if (i === draggingIndex) return;
		projectOrder.move(draggingIndex, i);
		draggingIndex = i;
	}

	function onDragEnd() {
		if (draggingIndex !== null) projectOrder.persist();
		draggingIndex = null;
		overIndex = null;
	}

	function onDrop(e: DragEvent) {
		e.preventDefault();
		onDragEnd();
	}
</script>

<section id="work" class="section relative border-t border-border" aria-labelledby="work-title">
	<div class="container-page" use:reveal>
		<SectionHeading
			eyebrow="Selected work"
			title="Recent things I've built."
			titleId="work-title"
			description="A handful of projects across the stack. Drag tiles to curate your own order — it'll be remembered the next time you visit."
		/>

		<div class="mb-5 flex items-center justify-between gap-3">
			<p class="mono text-[0.7rem] tracking-wider text-muted uppercase">
				<span class="inline-flex items-center gap-1.5">
					<svg
						width="13"
						height="13"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.7"
						aria-hidden="true"
					>
						<circle cx="9" cy="5" r="1" /><circle cx="9" cy="12" r="1" /><circle
							cx="9"
							cy="19"
							r="1"
						/>
						<circle cx="15" cy="5" r="1" /><circle cx="15" cy="12" r="1" /><circle
							cx="15"
							cy="19"
							r="1"
						/>
					</svg>
					Drag to reorder
				</span>
			</p>
			{#if projectOrder.customised}
				<button
					type="button"
					onclick={() => projectOrder.reset()}
					class="inline-flex items-center gap-1.5 mono text-[0.7rem] tracking-wider text-soft uppercase transition-colors hover:text-accent"
				>
					<svg
						width="13"
						height="13"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						aria-hidden="true"
					>
						<path d="M3 12a9 9 0 1 0 3-6.7" /><path d="M3 4v5h5" />
					</svg>
					Reset order
				</button>
			{/if}
		</div>

		<div
			class="grid auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
			ondragover={(e) => e.preventDefault()}
			ondrop={onDrop}
			role="list"
			aria-label="Project tiles — drag to reorder"
		>
			{#each projectOrder.items as project, i (project.slug)}
				{@const monogram = monogramOf(project.title)}
				<div
					class="card draggable group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-border-strong"
					class:is-dragging={draggingIndex === i}
					class:is-target={overIndex === i && draggingIndex !== null && draggingIndex !== i}
					role="listitem"
					draggable="true"
					ondragstart={(e) => onDragStart(e, i)}
					ondragover={(e) => onDragOver(e, i)}
					ondragend={onDragEnd}
					animate:flip={{ duration: 320, easing: cubicOut }}
				>
					<a
						href="/projects/{project.slug}"
						class="flex flex-1 cursor-[inherit] flex-col"
						aria-label="Read the case study for {project.title}"
						draggable={false}
					>
						<div
							class="card-visual relative aspect-[16/10] overflow-hidden border-b border-border bg-surface-2"
						>
							<div class="card-grid pointer-events-none absolute inset-0" aria-hidden="true"></div>

							<div
								class="absolute inset-x-4 top-4 flex items-center justify-between text-[0.65rem] tracking-wider text-muted uppercase"
							>
								<span class="mono tabular">{String(i + 1).padStart(2, '0')}</span>

								<span
									class="drag-handle inline-flex items-center gap-1.5 rounded-full border border-border bg-bg/85 px-2 py-1 text-[0.58rem] font-medium tracking-wider text-soft uppercase transition-all duration-200 group-hover:border-accent group-hover:text-accent"
									title="Drag to reorder"
								>
									<svg
										width="9"
										height="11"
										viewBox="0 0 24 24"
										fill="currentColor"
										aria-hidden="true"
									>
										<circle cx="9" cy="5" r="1.6" />
										<circle cx="9" cy="12" r="1.6" />
										<circle cx="9" cy="19" r="1.6" />
										<circle cx="15" cy="5" r="1.6" />
										<circle cx="15" cy="12" r="1.6" />
										<circle cx="15" cy="19" r="1.6" />
									</svg>
									<span class="hidden sm:inline">Drag</span>
								</span>

								<span class="inline-flex items-center gap-1.5 mono">
									{#if project.featured}
										<span class="inline-block size-1.5 rounded-full bg-accent"></span>
										Featured
									{:else}
										{project.year}
									{/if}
								</span>
							</div>

							<div
								class="absolute inset-0 flex items-center justify-center font-display text-[clamp(4rem,10vw,7.5rem)] font-medium tracking-[-0.05em] text-accent transition-transform duration-500 group-hover:scale-105"
								style="font-variation-settings: 'opsz' 96, 'wdth' 90;"
								aria-hidden="true"
							>
								{monogram}
							</div>

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
				</div>
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
