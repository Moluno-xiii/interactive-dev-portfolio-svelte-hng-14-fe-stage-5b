<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { profile, nav } from '$lib/data/profile';
	import { activeSection } from '$lib/stores/activeSection.svelte';

	let time = $state('');
	let sidebarOpen = $state(false);

	onMount(() => {
		const tick = () => {
			const d = new Date(Date.now() + 60 * 60 * 1000);
			const pad = (n: number) => String(n).padStart(2, '0');
			time = `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())} WAT`;
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

	const activeLabel = $derived(
		(nav.find((n) => n.id === activeSection.current)?.label ?? activeSection.current).toUpperCase()
	);

	$effect(() => {
		if (!browser) return;
		if (sidebarOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	});

	function closeSidebar() {
		sidebarOpen = false;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && sidebarOpen) closeSidebar();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="hud">
	<a href="/" class="brand inline-flex items-center gap-2.5" onclick={closeSidebar}>
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
		<span class="live hidden items-center gap-2 md:inline-flex" style="color:var(--fg);">
			<span class="live-dot"></span>
			Live · {time}
		</span>
		<button
			type="button"
			class="hamburger md:hidden"
			aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
			aria-expanded={sidebarOpen}
			aria-controls="mobile-sidebar"
			onclick={() => (sidebarOpen = !sidebarOpen)}
		>
			<span class="bar" class:rot1={sidebarOpen}></span>
			<span class="bar" class:hide={sidebarOpen}></span>
			<span class="bar" class:rot2={sidebarOpen}></span>
		</button>
	</div>
</div>

<div class="hud-bottom">
	<div class="ticker hidden gap-6 md:flex">
		<span>SECTION · {activeLabel}</span>
		<span>LAT 6.5244 N</span>
		<span>LON 3.3792 E</span>
	</div>
	<div class="scroll-cue inline-flex items-center gap-2.5" style="color:var(--fg-soft);">
		<span>Scroll</span>
		<span class="cue-line" aria-hidden="true"></span>
	</div>
</div>

<button
	type="button"
	class="sidebar-backdrop"
	class:open={sidebarOpen}
	aria-label="Close menu"
	tabindex={sidebarOpen ? 0 : -1}
	onclick={closeSidebar}
></button>

<div
	id="mobile-sidebar"
	class="sidebar"
	class:open={sidebarOpen}
	role="dialog"
	aria-modal="true"
	aria-label="Site navigation"
	inert={!sidebarOpen}
>
	<div class="sidebar-head">
		<span class="sidebar-tag mono">
			<span class="live-dot"></span>
			MENU · {time}
		</span>
	</div>

	<nav class="sidebar-nav" aria-label="Primary">
		<ol class="sidebar-list">
			{#each nav as item, i (item.id)}
				<li>
					<a
						href="/#{item.id}"
						class="sidebar-link"
						class:active={activeSection.current === item.id}
						onclick={closeSidebar}
					>
						<span class="num mono">0{i + 1}</span>
						<span class="lbl">{item.label}</span>
						<span class="arrow" aria-hidden="true">↗</span>
					</a>
				</li>
			{/each}
		</ol>
	</nav>

	<div class="sidebar-socials">
		<div class="sidebar-meta mono">Elsewhere</div>
		<div class="socials-row">
			{#each profile.socials as s (s.label)}
				<a
					href={s.href}
					class="social"
					target={s.platform === 'email' ? '_self' : '_blank'}
					rel={s.platform === 'email' ? undefined : 'noopener noreferrer'}
					onclick={closeSidebar}
				>
					<span class="dot"></span>
					<span>{s.label}</span>
				</a>
			{/each}
		</div>
	</div>

	<div class="sidebar-foot mono">
		<span>{profile.handle}</span>
		<span>v2.04.026</span>
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

	.hamburger {
		display: inline-flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 4px;
		width: 38px;
		height: 38px;
		border: 1px solid var(--line-strong);
		border-radius: 999px;
		background: transparent;
		color: var(--fg);
		cursor: pointer;
		transition:
			border-color 0.25s,
			background 0.25s;
	}

	@media (min-width: 768px) {
		.hamburger,
		.sidebar,
		.sidebar-backdrop {
			display: none !important;
		}
	}
	.hamburger:hover {
		border-color: var(--accent);
	}
	.hamburger .bar {
		display: block;
		width: 14px;
		height: 1.5px;
		background: var(--fg);
		transition:
			transform 0.3s var(--ease-out),
			opacity 0.2s var(--ease-out);
	}
	.hamburger .bar.hide {
		opacity: 0;
	}
	.hamburger .bar.rot1 {
		transform: translateY(5.5px) rotate(45deg);
	}
	.hamburger .bar.rot2 {
		transform: translateY(-5.5px) rotate(-45deg);
	}

	.sidebar-backdrop {
		position: fixed;
		inset: 0;
		z-index: 80;
		background: color-mix(in srgb, var(--bg) 70%, transparent);
		backdrop-filter: blur(6px);
		-webkit-backdrop-filter: blur(6px);
		border: 0;
		padding: 0;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.3s var(--ease-out);
		cursor: pointer;
	}
	.sidebar-backdrop.open {
		opacity: 1;
		pointer-events: auto;
	}

	.sidebar {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		width: min(86vw, 360px);
		z-index: 90;
		display: flex;
		flex-direction: column;
		gap: 28px;
		padding: 28px 24px 24px;
		background: var(--surface);
		border-left: 1px solid var(--line-strong);
		transform: translateX(100%);
		transition: transform 0.42s var(--ease-out);
		overflow-y: auto;
		overscroll-behavior: contain;
	}
	.sidebar.open {
		transform: translateX(0);
	}

	.sidebar-head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 36px;
		border-bottom: 1px solid var(--line);
		padding-bottom: 14px;
	}
	.sidebar-tag {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		font-size: 10px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--fg-soft);
	}

	.sidebar-nav {
		flex: 1;
	}
	.sidebar-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0;
	}
	.sidebar-link {
		display: grid;
		grid-template-columns: 32px 1fr 18px;
		align-items: baseline;
		gap: 14px;
		padding: 18px 4px;
		color: var(--fg);
		border-bottom: 1px solid var(--line);
		transition:
			padding 0.3s var(--ease-out),
			color 0.25s;
	}
	.sidebar-link:hover,
	.sidebar-link:focus-visible {
		padding-left: 10px;
		color: var(--accent);
	}
	.sidebar-link.active .num,
	.sidebar-link.active .lbl {
		color: var(--accent);
	}
	.sidebar-link .num {
		font-size: 11px;
		letter-spacing: 0.16em;
		color: var(--muted);
	}
	.sidebar-link .lbl {
		font-family: var(--font-display);
		font-size: 26px;
		font-weight: 500;
		letter-spacing: -0.02em;
	}
	.sidebar-link .arrow {
		color: var(--muted);
		text-align: right;
		transition: color 0.25s;
	}
	.sidebar-link:hover .arrow {
		color: var(--accent);
	}

	.sidebar-socials {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	.sidebar-meta {
		font-size: 10px;
		letter-spacing: 0.22em;
		text-transform: uppercase;
		color: var(--muted);
	}
	.socials-row {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.sidebar-foot {
		display: flex;
		justify-content: space-between;
		font-size: 10px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--muted);
		padding-top: 16px;
		border-top: 1px solid var(--line);
	}
</style>
