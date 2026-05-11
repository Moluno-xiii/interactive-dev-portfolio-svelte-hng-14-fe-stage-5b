<script lang="ts">
	import { profile } from '$lib/data/profile';
	import SocialLinks from './SocialLinks.svelte';

	const year = new Date().getFullYear();
</script>

<footer class="relative border-t border-border bg-bg">
	<div class="container-page flex flex-col gap-8 py-10">
		<div class="grid grid-cols-1 gap-8 md:grid-cols-[1.4fr_1fr_1fr]">
			<div class="flex flex-col gap-3">
				<div
					class="font-display text-2xl font-medium text-fg"
					style="font-variation-settings: 'opsz' 32, 'wdth' 92;"
				>
					{profile.name}
				</div>
				<p class="m-0 max-w-[36ch] text-[0.92rem] leading-[1.55] text-soft">{profile.tagline}</p>
				<div class="mt-1">
					<SocialLinks socials={profile.socials} />
				</div>
			</div>

			<div class="flex flex-col gap-2.5">
				<span class="mono text-[0.65rem] tracking-wider text-muted uppercase">Sitemap</span>
				<a class="text-[0.92rem] text-soft transition-colors hover:text-accent" href="/#about"
					>About</a
				>
				<a class="text-[0.92rem] text-soft transition-colors hover:text-accent" href="/#work"
					>Work</a
				>
				<a class="text-[0.92rem] text-soft transition-colors hover:text-accent" href="/#stack"
					>Stack</a
				>
				<a class="text-[0.92rem] text-soft transition-colors hover:text-accent" href="/#contact"
					>Contact</a
				>
			</div>

			<div class="flex flex-col gap-2.5">
				<span class="mono text-[0.65rem] tracking-wider text-muted uppercase">Contact</span>
				<a
					class="text-[0.92rem] text-soft transition-colors hover:text-accent"
					href="mailto:{profile.email}">{profile.email}</a
				>
				<span class="text-[0.92rem] text-soft">{profile.location}</span>
				<span class="text-[0.92rem] text-soft">{profile.timezone}</span>
			</div>
		</div>

		<div class="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
			<span class="mono text-[0.78rem] text-muted"
				>© {year} {profile.name}. All rights reserved.</span
			>
			<a
				href="/#hero"
				class="inline-flex items-center gap-1.5 mono text-[0.78rem] text-soft transition-colors hover:text-accent"
			>
				Back to top
				<svg
					width="13"
					height="13"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					aria-hidden="true"
				>
					<path d="m18 15-6-6-6 6" />
				</svg>
			</a>
		</div>
	</div>
</footer>
