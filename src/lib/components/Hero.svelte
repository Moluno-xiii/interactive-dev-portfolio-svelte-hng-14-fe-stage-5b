<script lang="ts">
	import { profile } from '$lib/data/profile';
	import SocialLinks from './SocialLinks.svelte';

	const time = new Date().toLocaleTimeString('en-GB', {
		hour: '2-digit',
		minute: '2-digit',
		timeZone: 'Africa/Lagos'
	});

	const initials = (() => {
		const parts = profile.name.trim().split(/\s+/).filter(Boolean);
		if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
		return profile.name.slice(0, 2).toUpperCase();
	})();
</script>

<section
	id="hero"
	class="relative pt-[clamp(3rem,7vw,5rem)] pb-[clamp(4rem,8vw,6rem)]"
	aria-labelledby="hero-title"
>
	<div class="container-page">
		<!-- Status row -->
		<div
			class="fx-rise mb-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.78rem] text-muted"
			style="--fx-delay: 0ms;"
		>
			<span class="inline-flex items-center gap-2">
				<span class="live-dot" aria-hidden="true"></span>
				<span class="font-medium text-fg">Available for work</span>
			</span>
			<span class="inline-flex items-center gap-1.5 mono">
				<svg
					width="13"
					height="13"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="1.7"
					aria-hidden="true"
				>
					<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" /><path d="M2 12h20" /><path
						d="M12 2a15 15 0 0 1 0 20"
					/><path d="M12 2a15 15 0 0 0 0 20" />
				</svg>
				{profile.location}
			</span>
			<span class="inline-flex items-center gap-1.5 mono">
				<svg
					width="13"
					height="13"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="1.7"
					aria-hidden="true"
				>
					<circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
				</svg>
				{time} <span class="text-muted-2">local</span>
			</span>
		</div>

		<div class="grid grid-cols-1 items-end gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
			<div class="flex flex-col gap-7">
				<h1 id="hero-title" class="m-0 text-hero text-fg">
					<span class="fx-rise block" style="--fx-delay: 120ms;">{profile.name}.</span>
					<span class="fx-rise block text-muted" style="--fx-delay: 220ms;">
						{profile.title.toLowerCase()}
						<span class="text-accent">&nbsp;based in {profile.location.split(',')[0]}.</span>
					</span>
				</h1>

				<p
					class="fx-rise m-0 max-w-[44ch] font-body text-[clamp(1.05rem,1.4vw,1.2rem)] leading-[1.55] text-soft"
					style="--fx-delay: 340ms;"
				>
					{profile.tagline} I focus on the small things — motion that feels inevitable, layouts with rhythm,
					and the milliseconds you don't notice.
				</p>

				<div class="fx-rise flex flex-wrap items-center gap-2.5" style="--fx-delay: 440ms;">
					<a class="btn btn-primary" href="/#work">
						View work
						<svg
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2.4"
							aria-hidden="true"
						>
							<path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
						</svg>
					</a>
					<a class="btn" href={profile.resumeUrl} download>Resume</a>
					<a class="btn btn-ghost" href="mailto:{profile.email}">
						<svg
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="1.7"
							aria-hidden="true"
						>
							<rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" />
						</svg>
						{profile.email}
					</a>
				</div>

				<div class="fx-rise pt-2" style="--fx-delay: 540ms;">
					<SocialLinks socials={profile.socials} />
				</div>
			</div>

			<!-- Avatar card — modern, simple. Big initials in accent on a card with a faint dot grid. -->
			<aside
				class="fx-rise relative w-full max-w-[20rem] justify-self-start overflow-hidden rounded-2xl border border-border bg-surface p-5 lg:justify-self-end"
				style="--fx-delay: 620ms;"
				aria-hidden="true"
			>
				<div
					class="avatar-grid pointer-events-none absolute inset-0 opacity-30"
					aria-hidden="true"
				></div>
				<div class="relative flex flex-col gap-5">
					<div class="flex items-start justify-between">
						<span
							class="inline-flex size-14 items-center justify-center rounded-full bg-accent font-display text-xl font-semibold text-accent-contrast"
							style="font-variation-settings: 'opsz' 24, 'wdth' 100;"
						>
							{initials}
						</span>
						<span class="mono text-[0.65rem] tracking-wider text-muted uppercase">v1 · 2026</span>
					</div>

					<div class="flex flex-col gap-1">
						<div
							class="font-display text-xl font-medium"
							style="font-variation-settings: 'opsz' 24, 'wdth' 95;"
						>
							{profile.name}
						</div>
						<div class="text-[0.88rem] text-muted">{profile.title} · {profile.timezone}</div>
					</div>

					<dl class="m-0 grid grid-cols-2 gap-3 border-t border-border pt-4 text-[0.78rem]">
						<div>
							<dt class="mono text-[0.62rem] tracking-wider text-muted uppercase">Surface</dt>
							<dd class="m-0 mt-0.5 text-fg">Web, native, terminal</dd>
						</div>
						<div>
							<dt class="mono text-[0.62rem] tracking-wider text-muted uppercase">Years</dt>
							<dd class="m-0 mt-0.5 text-fg">5+ shipping</dd>
						</div>
					</dl>
				</div>
			</aside>
		</div>
	</div>
</section>

<style>
	.avatar-grid {
		background-image: radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0);
		background-size: 14px 14px;
	}
</style>
