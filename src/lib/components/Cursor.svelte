<script lang="ts">
	import { onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { theme } from '$lib/stores/theme.svelte';

	let dotEl = $state<HTMLDivElement | undefined>();
	let ringEl = $state<HTMLDivElement | undefined>();
	let coarse = $state(false);
	let raf = 0;

	const enabled = $derived(theme.cursor && !coarse);

	$effect(() => {
		if (!browser) return;
		const mq = window.matchMedia('(pointer: coarse)');
		coarse = mq.matches;
		const handler = (e: MediaQueryListEvent) => {
			coarse = e.matches;
		};
		mq.addEventListener('change', handler);
		return () => mq.removeEventListener('change', handler);
	});

	$effect(() => {
		if (!browser) return;
		if (!enabled) {
			document.body.classList.remove('custom-cursor');
			return;
		}
		document.body.classList.add('custom-cursor');
		let x = window.innerWidth / 2;
		let y = window.innerHeight / 2;
		let rx = x;
		let ry = y;

		const onMove = (e: MouseEvent) => {
			x = e.clientX;
			y = e.clientY;
		};
		const onOver = (e: MouseEvent) => {
			const interactive = (e.target as Element).closest(
				'a, button, .project, .skill, .social, .btn, input, textarea, .twk'
			);
			if (ringEl) ringEl.classList.toggle('hover', !!interactive);
		};
		const loop = () => {
			rx += (x - rx) * 0.18;
			ry += (y - ry) * 0.18;
			if (dotEl) dotEl.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%)`;
			if (ringEl) ringEl.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
			raf = requestAnimationFrame(loop);
		};

		window.addEventListener('mousemove', onMove);
		window.addEventListener('mouseover', onOver);
		loop();

		return () => {
			if (raf) cancelAnimationFrame(raf);
			window.removeEventListener('mousemove', onMove);
			window.removeEventListener('mouseover', onOver);
			document.body.classList.remove('custom-cursor');
		};
	});

	onDestroy(() => {
		if (raf) cancelAnimationFrame(raf);
		if (browser) document.body.classList.remove('custom-cursor');
	});
</script>

{#if enabled}
	<div bind:this={ringEl} class="cursor-ring"></div>
	<div bind:this={dotEl} class="cursor-dot"></div>
{/if}
