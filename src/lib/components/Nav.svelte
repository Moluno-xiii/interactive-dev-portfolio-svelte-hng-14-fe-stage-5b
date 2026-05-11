<script lang="ts">
	import { profile } from '$lib/data/profile';
	import ThemeToggle from './ThemeToggle.svelte';

	interface NavItem {
		href: string;
		label: string;
	}

	const items: NavItem[] = [
		{ href: '/#about', label: 'About' },
		{ href: '/#work', label: 'Work' },
		{ href: '/#stack', label: 'Stack' },
		{ href: '/#contact', label: 'Contact' }
	];

	let mobileOpen = $state(false);

	const initials = (() => {
		const parts = profile.name.trim().split(/\s+/).filter(Boolean);
		if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
		return profile.name.slice(0, 2).toUpperCase();
	})();
</script>

<header class="masthead sticky top-0 z-50" aria-label="Site header">
	<div class="container-page flex min-h-[64px] items-center justify-between gap-4">
		<a href="/" class="group inline-flex items-center gap-2.5 py-2" aria-label="Home">
			<span
				class="inline-flex size-7 items-center justify-center rounded-full bg-accent text-[0.65rem] font-semibold text-accent-contrast transition-transform duration-200 group-hover:scale-105"
				style="font-family: var(--font-mono);"
			>
				{initials}
			</span>
			<span class="font-body text-[0.95rem] font-medium text-fg">{profile.name}</span>
		</a>

		<nav class="hidden md:block" aria-label="Primary">
			<ul class="m-0 flex list-none items-center gap-1 p-0">
				{#each items as item (item.href)}
					<li>
						<a
							href={item.href}
							class="inline-flex items-center px-3 py-2 text-[0.92rem] text-soft transition-colors duration-200 hover:text-fg"
						>
							{item.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>

		<div class="inline-flex items-center gap-2">
			<a
				href="/#contact"
				class="hidden text-[0.85rem] font-medium text-soft transition-colors duration-200 hover:text-accent md:inline-flex"
			>
				<span class="mr-1.5 inline-block size-2 rounded-full bg-accent" aria-hidden="true"></span>
				Available
			</a>
			<ThemeToggle />
			<button
				type="button"
				class="icon-btn md:hidden"
				aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
				aria-expanded={mobileOpen}
				aria-controls="mobile-menu"
				onclick={() => (mobileOpen = !mobileOpen)}
			>
				{#if mobileOpen}
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.7"
						aria-hidden="true"
					>
						<path d="M18 6 6 18" /><path d="m6 6 12 12" />
					</svg>
				{:else}
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.7"
						aria-hidden="true"
					>
						<path d="M4 7h16" /><path d="M4 17h16" />
					</svg>
				{/if}
			</button>
		</div>
	</div>

	{#if mobileOpen}
		<div
			id="mobile-menu"
			class="border-t border-border bg-bg px-[var(--container-pad)] py-3"
			role="dialog"
			aria-modal="true"
			aria-label="Site navigation"
		>
			<ul class="m-0 flex list-none flex-col p-0">
				{#each items as item, i (item.href)}
					<li class={i > 0 ? 'border-t border-border' : ''}>
						<a
							href={item.href}
							onclick={() => (mobileOpen = false)}
							class="block px-1 py-3.5 font-display text-2xl font-medium text-fg transition-colors hover:text-accent"
							style="font-variation-settings: 'opsz' 48, 'wdth' 95;"
						>
							{item.label}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</header>

<style>
	/* Frosted backdrop — Tailwind has backdrop-blur but not the saturation knob */
	.masthead {
		background: color-mix(in srgb, var(--bg) 80%, transparent);
		backdrop-filter: saturate(180%) blur(14px);
		-webkit-backdrop-filter: saturate(180%) blur(14px);
		border-bottom: 1px solid var(--border);
	}
</style>
