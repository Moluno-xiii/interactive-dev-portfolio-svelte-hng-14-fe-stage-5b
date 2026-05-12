<script lang="ts">
	import { onMount } from 'svelte';
	import { profile, nav } from '$lib/data/profile';
	import { activeSection } from '$lib/stores/activeSection.svelte';

	let time = $state('');

	onMount(() => {
		const tick = () => {
			const d = new Date();
			const pad = (n: number) => String(n).padStart(2, '0');
			time = `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())} UTC`;
		};
		tick();
		const id = setInterval(tick, 1000);
		return () => clearInterval(id);
	});

	const initials = (() => {
		const parts = profile.name.trim().split(/\s+/).filter(Boolean);
		if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
		return profile.name.slice(0, 2).toUpperCase();
	})();
</script>

<div class="hud">
	<a href="/" class="brand inline-flex items-center gap-2.5">
		<span
			class="mark inline-flex items-center justify-center"
			style="width:22px;height:22px;border:1px solid var(--fg);border-radius:4px;font-weight:600;font-size:11px;color:var(--fg);"
			>{initials[0]}</span
		>
		<span style="color:var(--fg);">{profile.handle} / Portfolio</span>
	</a>
	<nav class="nav-anchors hidden gap-[22px] md:flex">
		{#each nav as item (item.id)}
			<a
				href="/#{item.id}"
				class="hud-link relative"
				class:active={activeSection.current === item.id}
			>
				{item.label}
			</a>
		{/each}
	</nav>
	<div class="right inline-flex items-center gap-[18px]">
		<span class="live inline-flex items-center gap-2" style="color:var(--fg);">
			<span class="live-dot"></span>
			Live · {time}
		</span>
	</div>
</div>

<div class="hud-bottom">
	<div class="ticker hidden gap-6 md:flex">
		<span>SECTION · {activeSection.current.toUpperCase()}</span>
		<span>LAT 6.5244 N</span>
		<span>LON 3.3792 E</span>
	</div>
	<div class="scroll-cue inline-flex items-center gap-2.5" style="color:var(--fg-soft);">
		<span>Scroll</span>
		<span class="cue-line" aria-hidden="true"></span>
	</div>
</div>

<i class="bracket tl"></i>
<i class="bracket tr"></i>
<i class="bracket bl"></i>
<i class="bracket br"></i>

<div class="scanlines"></div>
<div class="vignette"></div>

<style>
	.hud-link {
		color: var(--fg-soft);
		transition: color 0.3s var(--ease-out);
	}
	.hud-link:hover {
		color: var(--fg);
	}
	.hud-link::before {
		content: '';
		position: absolute;
		left: -12px;
		top: 50%;
		width: 4px;
		height: 4px;
		background: var(--accent);
		border-radius: 50%;
		opacity: 0;
		transform: translateY(-50%) scale(0.4);
		transition:
			opacity 0.25s,
			transform 0.25s;
	}
	.hud-link:hover::before,
	.hud-link.active::before {
		opacity: 1;
		transform: translateY(-50%) scale(1);
	}
	.cue-line {
		width: 1px;
		height: 28px;
		background: linear-gradient(to bottom, transparent, var(--fg-soft));
		animation: scroll-cue 2.2s var(--ease-in-out) infinite;
	}
</style>
