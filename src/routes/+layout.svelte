<script lang="ts">
	import './layout.css';
	import HUD from '$lib/components/HUD.svelte';
	import Cursor from '$lib/components/Cursor.svelte';
	import TweaksPanel from '$lib/components/TweaksPanel.svelte';

	let { children } = $props();
</script>

<a href="#main" class="skip-link mono">Skip to content</a>

<div class="shell">
	<HUD />
	<Cursor />

	<main id="main" class="content">{@render children()}</main>

	<TweaksPanel />
</div>

<style>
	.skip-link {
		position: absolute;
		top: 0;
		left: 0;
		padding: 0.7rem 1rem;
		background: var(--accent);
		color: var(--bg);
		font-size: 0.75rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		font-weight: 600;
		transform: translateY(-110%);
		transition: transform 200ms ease;
		z-index: 200;
	}
	.skip-link:focus {
		transform: translateY(0);
	}
</style>
