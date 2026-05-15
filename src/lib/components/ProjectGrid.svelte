<script lang="ts">
	import { flip } from 'svelte/animate';
	import { cubicOut } from 'svelte/easing';
	import { reveal } from '$lib/actions/reveal';
	import { projectOrder } from '$lib/stores/projectOrder.svelte';
	import type { ProjectTrack } from '$lib/types';

	type Filter = ProjectTrack | 'all';

	let draggingIndex = $state<number | null>(null);
	let overIndex = $state<number | null>(null);

	const COLLAPSED_COUNT = 6;
	let expanded = $state(false);
	let activeFilter = $state<Filter>('all');

	const filtered = $derived(
		activeFilter === 'all'
			? projectOrder.items
			: projectOrder.items.filter((p) => p.tracks.includes(activeFilter as ProjectTrack))
	);

	const filters: Array<{ id: Filter; label: string; count: number }> = $derived([
		{ id: 'all', label: 'All', count: projectOrder.items.length },
		{
			id: 'frontend',
			label: 'Frontend',
			count: projectOrder.items.filter((p) => p.tracks.includes('frontend')).length
		},
		{
			id: 'backend',
			label: 'Backend',
			count: projectOrder.items.filter((p) => p.tracks.includes('backend')).length
		},
		{
			id: 'mobile',
			label: 'Mobile',
			count: projectOrder.items.filter((p) => p.tracks.includes('mobile')).length
		}
	]);

	const dragEnabled = $derived(activeFilter === 'all');

	function toRoman(num: number): string {
		const map: Array<[number, string]> = [
			[1000, 'M'],
			[900, 'CM'],
			[500, 'D'],
			[400, 'CD'],
			[100, 'C'],
			[90, 'XC'],
			[50, 'L'],
			[40, 'XL'],
			[10, 'X'],
			[9, 'IX'],
			[5, 'V'],
			[4, 'IV'],
			[1, 'I']
		];
		let result = '';
		let n = num;
		for (const [value, symbol] of map) {
			while (n >= value) {
				result += symbol;
				n -= value;
			}
		}
		return result;
	}

	const visible = $derived(expanded ? filtered : filtered.slice(0, COLLAPSED_COUNT));
	const hiddenCount = $derived(Math.max(0, filtered.length - COLLAPSED_COUNT));

	const transparentDragImg =
		'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/>';

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

<section id="work" class="block">
	<div class="block-inner">
		<div class="section-head">
			<div class="lbl">
				<span class="dot"></span>
				<span>§02 · Projects</span>
			</div>
			<div use:reveal>
				<h2 class="m-0 text-display">
					Selected projects<br />
					<span class="italic">from the last cycle.</span>
				</h2>
			</div>
		</div>

		<div class="filter-bar" role="tablist" aria-label="Filter projects by track">
			{#each filters as f (f.id)}
				<button
					type="button"
					role="tab"
					aria-selected={activeFilter === f.id}
					class="filter-pill mono"
					class:active={activeFilter === f.id}
					disabled={f.count === 0}
					onclick={() => (activeFilter = f.id)}
				>
					<span>{f.label}</span>
					<span class="filter-count">{f.count}</span>
				</button>
			{/each}
		</div>

		{#if dragEnabled}
			<div class="drag-cta">
				<span class="mono">
					<span class="mr-2 inline-block size-1.5 rounded-full bg-accent align-middle"></span>
					Drag rows to reorder · saved locally
				</span>
				{#if projectOrder.customised}
					<button onclick={() => projectOrder.reset()} class="reset-btn mono">
						↺ Reset order
					</button>
				{/if}
			</div>
		{:else}
			<div class="drag-cta">
				<span class="filter-hint mono">
					<span class="mr-2 inline-block size-1.5 rounded-full bg-muted align-middle"></span>
					Showing {filtered.length}
					{filtered.length === 1 ? 'project' : 'projects'} · drag disabled while filtering
				</span>
			</div>
		{/if}

		<div
			class="projects"
			ondragover={(e) => e.preventDefault()}
			ondrop={onDrop}
			role="list"
			aria-label="Project rows — drag to reorder"
		>
			{#each visible as p, i (p.slug)}
				<div
					class="project group r-up"
					class:is-dragging={draggingIndex === i}
					class:is-target={overIndex === i && draggingIndex !== null && draggingIndex !== i}
					class:no-drag={!dragEnabled}
					role="listitem"
					draggable={dragEnabled}
					style="transition-delay: {i * 60}ms;"
					use:reveal
					ondragstart={(e) => dragEnabled && onDragStart(e, i)}
					ondragover={(e) => dragEnabled && onDragOver(e, i)}
					ondragend={onDragEnd}
					animate:flip={{ duration: 320, easing: cubicOut }}
				>
					<a href="/projects/{p.slug}" class="row-link" draggable={false}>
						<div class="num mono">{toRoman(i + 1)}</div>
						<div>
							<div class="ttl">{p.title} <em>{p.ital}</em></div>
							<div class="tags">
								{#each p.tags as t (t)}
									<span class="tag mono">{t}</span>
								{/each}
							</div>
						</div>
						<div class="desc">{p.desc}</div>
						<div class="arrow">↗</div>
						<div class="preview" aria-hidden="true">
							{#if p.coverUrl}
								<img class="preview-img" src={p.coverUrl} alt="" loading="lazy" />
							{:else}
								<div class="ph"></div>
							{/if}
							<div class="corners">
								<i class="a"></i><i class="b"></i><i class="c"></i><i class="d"></i>
							</div>
							<div class="ph-label">{p.title.toUpperCase()} · {p.year} · PREVIEW</div>
						</div>
						<span class="grip" aria-hidden="true" title="Drag to reorder">
							<svg width="11" height="13" viewBox="0 0 24 24" fill="currentColor">
								<circle cx="9" cy="5" r="1.6" />
								<circle cx="9" cy="12" r="1.6" />
								<circle cx="9" cy="19" r="1.6" />
								<circle cx="15" cy="5" r="1.6" />
								<circle cx="15" cy="12" r="1.6" />
								<circle cx="15" cy="19" r="1.6" />
							</svg>
						</span>
					</a>
				</div>
			{/each}
		</div>

		{#if hiddenCount > 0}
			<div class="see-more">
				<button
					class="see-more-btn mono"
					onclick={() => (expanded = !expanded)}
					aria-expanded={expanded}
				>
					<span class="see-more-arrow" class:open={expanded}>↓</span>
					{#if expanded}
						<span>Show fewer projects</span>
					{:else}
						<span>Show {hiddenCount} more {hiddenCount === 1 ? 'project' : 'projects'}</span>
					{/if}
				</button>
			</div>
		{/if}
	</div>
</section>

<style>
	.block {
		position: relative;
		padding: var(--pad-y-section) var(--pad-x);
		border-top: 1px solid var(--line);
	}
	.block-inner {
		max-width: var(--container-max);
		margin: 0 auto;
	}
	.section-head {
		display: grid;
		grid-template-columns: 240px 1fr;
		gap: 48px;
		margin-bottom: 64px;
		align-items: end;
	}
	.section-head .lbl {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--fg-soft);
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.section-head .lbl .dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--accent);
		box-shadow: 0 0 12px var(--accent);
		display: inline-block;
	}
	.section-head h2 :global(.italic) {
		font-family: var(--font-serif);
		font-style: italic;
		font-weight: 400;
		color: var(--fg-soft);
	}
	.filter-bar {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-bottom: 18px;
	}
	.filter-pill {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 8px 16px;
		border: 1px solid var(--line-strong);
		border-radius: 999px;
		background: transparent;
		color: var(--fg-soft);
		font-size: 10px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		cursor: pointer;
		transition:
			color 0.25s,
			background 0.25s,
			border-color 0.25s,
			transform 0.25s var(--ease-out);
	}
	.filter-pill:hover:not(:disabled):not(.active) {
		color: var(--fg);
		border-color: var(--fg-soft);
	}
	.filter-pill.active {
		background: var(--accent);
		color: var(--bg);
		border-color: var(--accent);
	}
	.filter-pill:disabled {
		opacity: 0.35;
		cursor: not-allowed;
	}
	.filter-count {
		font-size: 9px;
		opacity: 0.7;
		padding-left: 4px;
		border-left: 1px solid currentColor;
	}
	.filter-pill.active .filter-count {
		opacity: 0.85;
	}
	.drag-cta {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 24px;
		font-size: 10px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--muted);
	}
	.filter-hint {
		color: var(--fg-soft);
	}
	.project.no-drag {
		cursor: default;
	}
	.project.no-drag .grip {
		display: none;
	}
	.reset-btn {
		font-size: 10px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--fg-soft);
		transition: color 0.2s;
	}
	.reset-btn:hover {
		color: var(--accent);
	}
	.projects {
		display: flex;
		flex-direction: column;
	}
	.see-more {
		display: flex;
		justify-content: center;
		margin-top: 40px;
	}
	.see-more-btn {
		display: inline-flex;
		align-items: center;
		gap: 12px;
		padding: 14px 28px;
		border: 1px solid var(--line-strong);
		border-radius: 999px;
		background: transparent;
		color: var(--fg);
		font-size: 11px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		cursor: pointer;
		transition:
			color 0.25s,
			border-color 0.25s,
			background 0.25s,
			transform 0.25s var(--ease-out);
	}
	.see-more-btn:hover {
		color: var(--bg);
		background: var(--accent);
		border-color: var(--accent);
		transform: translateY(-1px);
	}
	.see-more-arrow {
		display: inline-block;
		transition: transform 0.3s var(--ease-out);
	}
	.see-more-arrow.open {
		transform: rotate(180deg);
	}
	.project {
		position: relative;
		border-top: 1px solid var(--line);
		cursor: grab;
		transition: opacity 0.2s var(--ease-out);
	}
	.project:last-child {
		border-bottom: 1px solid var(--line);
	}
	.project.is-dragging {
		opacity: 0.55;
		outline: 2px dashed var(--accent);
		outline-offset: -2px;
		cursor: grabbing;
	}
	.project.is-target {
		outline: 2px solid var(--accent);
		outline-offset: -2px;
	}
	.row-link {
		display: grid;
		grid-template-columns: 80px 1.4fr 1fr 80px;
		gap: 32px;
		align-items: center;
		padding: 32px 0;
		color: var(--fg);
		cursor: inherit;
	}
	.num {
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.18em;
		color: var(--muted);
	}
	.ttl {
		font-family: var(--font-display);
		font-weight: 500;
		font-size: clamp(28px, 3.6vw, 52px);
		line-height: 1;
		letter-spacing: -0.02em;
		transition:
			color 0.3s var(--ease-out),
			transform 0.4s var(--ease-out);
	}
	.ttl em {
		font-family: var(--font-serif);
		font-style: italic;
		font-weight: 400;
		color: var(--fg-soft);
		transition: color 0.3s;
	}
	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin-top: 10px;
	}
	.tag {
		font-size: 10px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--muted);
		border: 1px solid var(--line);
		padding: 4px 8px;
		border-radius: 999px;
	}
	.desc {
		color: var(--fg-soft);
		font-size: 14px;
		line-height: 1.5;
		max-width: 380px;
	}
	.arrow {
		justify-self: end;
		width: 42px;
		height: 42px;
		border: 1px solid var(--line-strong);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--fg-soft);
		transition: all 0.3s var(--ease-out);
	}
	.project:hover .arrow {
		background: var(--accent);
		color: var(--bg);
		border-color: var(--accent);
		transform: rotate(-45deg) scale(1.05);
	}
	.project:hover .ttl {
		transform: translateX(8px);
	}
	.project:hover .ttl em {
		color: var(--accent);
	}
	.preview {
		position: absolute;
		left: 50%;
		top: 0;
		transform: translate(-50%, -30%) scale(0.96);
		width: 360px;
		height: 240px;
		pointer-events: none;
		background: var(--surface);
		border: 1px solid var(--line-strong);
		border-radius: 10px;
		overflow: hidden;
		opacity: 0;
		transition:
			opacity 0.35s var(--ease-out),
			transform 0.5s var(--ease-out);
		z-index: 5;
	}
	.project:hover .preview {
		opacity: 1;
		transform: translate(-50%, -50%) scale(1);
	}
	.preview .ph {
		position: absolute;
		inset: 0;
		background-image:
			repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.04) 0 8px, transparent 8px 16px),
			linear-gradient(135deg, var(--surface), var(--surface-2));
	}
	.preview .preview-img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: top center;
		display: block;
	}
	.preview .ph-label {
		position: absolute;
		left: 14px;
		bottom: 12px;
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--fg-soft);
	}
	.preview .corners i {
		position: absolute;
		width: 10px;
		height: 10px;
		border: 1px solid var(--accent);
	}
	.preview .corners i.a {
		top: 8px;
		left: 8px;
		border-right: none;
		border-bottom: none;
	}
	.preview .corners i.b {
		top: 8px;
		right: 8px;
		border-left: none;
		border-bottom: none;
	}
	.preview .corners i.c {
		bottom: 8px;
		left: 8px;
		border-right: none;
		border-top: none;
	}
	.preview .corners i.d {
		bottom: 8px;
		right: 8px;
		border-left: none;
		border-top: none;
	}
	.grip {
		position: absolute;
		left: 0;
		top: 50%;
		transform: translate(-28px, -50%);
		color: var(--muted);
		opacity: 0;
		transition:
			opacity 0.3s,
			color 0.3s;
	}
	.project:hover .grip {
		opacity: 0.8;
		color: var(--accent);
	}
	@media (max-width: 980px) {
		.section-head {
			grid-template-columns: 1fr;
			gap: 18px;
			margin-bottom: 42px;
		}
		.row-link {
			grid-template-columns: 48px 1fr 48px;
			gap: 18px;
		}
		.desc {
			display: none;
		}
		.preview {
			display: none;
		}
		.grip {
			display: none;
		}
	}
</style>
