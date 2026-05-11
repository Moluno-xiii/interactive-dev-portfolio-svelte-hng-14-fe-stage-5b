<script lang="ts">
	import { theme } from '$lib/stores/theme.svelte';
</script>

<button
	type="button"
	class="icon-btn text-fg"
	aria-label="Toggle color theme"
	aria-pressed={theme.current === 'dark'}
	title={theme.current === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
	onclick={() => theme.toggle()}
>
	{#if theme.current === 'dark'}
		<svg
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="1.7"
			stroke-linecap="round"
			stroke-linejoin="round"
			aria-hidden="true"
		>
			<circle cx="12" cy="12" r="4" />
			<path d="M12 2v2" /><path d="M12 20v2" />
			<path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" />
			<path d="M2 12h2" /><path d="M20 12h2" />
			<path d="m4.93 19.07 1.41-1.41" /><path d="m17.66 6.34 1.41-1.41" />
		</svg>
	{:else}
		<svg
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="1.7"
			stroke-linecap="round"
			stroke-linejoin="round"
			aria-hidden="true"
		>
			<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
		</svg>
	{/if}
</button>
