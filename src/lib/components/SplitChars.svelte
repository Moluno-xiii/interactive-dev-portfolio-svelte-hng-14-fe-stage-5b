<script lang="ts">
	interface Props {
		text: string;
		baseDelay?: number;
		perChar?: number;
		className?: string;
	}
	let { text, baseDelay = 0, perChar = 18, className = '' }: Props = $props();
	const chars = $derived(Array.from(text));
</script>

<span class={className} aria-label={text}>
	{#each chars as c, i (i)}
		<span class="ch" style="transition-delay: {baseDelay + i * perChar}ms;"
			>{c === ' ' ? ' ' : c}</span
		>
	{/each}
</span>
