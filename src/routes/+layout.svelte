<script lang="ts">
	import './layout.css';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<a href="#main" class="skip-link">Skip to content</a>

<div class="app-shell">
	<Nav />
	<main id="main">{@render children()}</main>
	<Footer />
</div>

<style>
	.app-shell {
		display: flex;
		flex-direction: column;
		min-height: 100dvh;
	}

	main {
		flex: 1;
	}
</style>
