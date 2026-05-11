<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		eyebrow?: string;
		title: string;
		titleId?: string;
		description?: string;
		children?: Snippet;
	}

	let { eyebrow, title, titleId, description, children }: Props = $props();
</script>

<header class="mb-12 flex flex-col gap-4">
	{#if eyebrow}
		<span class="inline-flex items-center gap-2 eyebrow text-accent">
			<span class="inline-block size-1.5 rounded-full bg-accent" aria-hidden="true"></span>
			{eyebrow}
		</span>
	{/if}
	<h2 id={titleId} class="m-0 max-w-[36ch] text-display text-fg">{title}</h2>
	{#if description}
		<p class="m-0 max-w-[58ch] font-body text-[clamp(1rem,1.3vw,1.15rem)] leading-[1.55] text-soft">
			{description}
		</p>
	{/if}
	{#if children}
		<div class="mt-1">{@render children()}</div>
	{/if}
</header>
