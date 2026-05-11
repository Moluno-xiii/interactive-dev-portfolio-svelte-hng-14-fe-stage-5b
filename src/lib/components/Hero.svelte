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
	class="relative overflow-hidden pt-[clamp(3rem,7vw,5rem)] pb-[clamp(4rem,8vw,6rem)]"
	aria-labelledby="hero-title"
>
	<div class="hero-bg" aria-hidden="true">
		<div class="hero-grid"></div>
		<div class="hero-stars">
			<span class="star" style="--x: 12%; --y: 22%; --d: 0s; --dur: 21s;"></span>
			<span class="star" style="--x: 78%; --y: 15%; --d: -3s; --dur: 28s;"></span>
			<span class="star" style="--x: 35%; --y: 65%; --d: -6s; --dur: 24s;"></span>
			<span class="star" style="--x: 62%; --y: 40%; --d: -9s; --dur: 32s;"></span>
			<span class="star" style="--x: 88%; --y: 72%; --d: -12s; --dur: 26s;"></span>
			<span class="star" style="--x: 22%; --y: 88%; --d: -15s; --dur: 30s;"></span>
			<span
				class="star star-large star-pulse"
				style="--x: 48%; --y: 28%; --d: -2s; --dur: 36s; --pulse-d: 0s;"
			></span>
			<span
				class="star star-large star-pulse"
				style="--x: 8%; --y: 55%; --d: -18s; --dur: 34s; --pulse-d: -2.4s;"
			></span>
		</div>
		<div class="hud-frame">
			<span class="hud hud-tl" style="--hud-d: 0s;"></span>
			<span class="hud hud-tr" style="--hud-d: -1.2s;"></span>
			<span class="hud hud-bl" style="--hud-d: -2.4s;"></span>
			<span class="hud hud-br" style="--hud-d: -3.6s;"></span>
		</div>
		<div class="hero-fade"></div>
	</div>

	<div class="container-page relative">
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

	.hero-bg {
		position: absolute;
		inset: 0;
		z-index: 0;
		overflow: hidden;
		pointer-events: none;
	}

	.hero-grid {
		position: absolute;
		inset: -10%;
		background-image: radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0);
		background-size: 28px 28px;
		opacity: 0.55;
		mask-image: radial-gradient(ellipse 80% 70% at 50% 35%, black 40%, transparent 95%);
		-webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 35%, black 40%, transparent 95%);
		animation: gridPan 32s linear infinite;
	}

	@keyframes gridPan {
		from {
			background-position: 0 0;
		}
		to {
			background-position: 56px 56px;
		}
	}

	.hero-stars {
		position: absolute;
		inset: 0;
	}

	.star {
		position: absolute;
		left: var(--x);
		top: var(--y);
		width: 3px;
		height: 3px;
		border-radius: 50%;
		background: var(--accent);
		box-shadow:
			0 0 6px color-mix(in srgb, var(--accent) 70%, transparent),
			0 0 12px color-mix(in srgb, var(--accent) 35%, transparent);
		opacity: 0;
		animation:
			starDrift var(--dur, 24s) ease-in-out var(--d, 0s) infinite,
			starTwinkle 5s ease-in-out var(--d, 0s) infinite;
	}

	.star-large {
		width: 5px;
		height: 5px;
		box-shadow:
			0 0 10px color-mix(in srgb, var(--accent) 80%, transparent),
			0 0 24px color-mix(in srgb, var(--accent) 30%, transparent);
	}

	@keyframes starDrift {
		0%,
		100% {
			transform: translate(0, 0);
		}
		25% {
			transform: translate(28px, -16px);
		}
		50% {
			transform: translate(-22px, 36px);
		}
		75% {
			transform: translate(18px, -28px);
		}
	}

	@keyframes starTwinkle {
		0%,
		100% {
			opacity: 0;
		}
		50% {
			opacity: 0.85;
		}
	}

	.star-pulse::before,
	.star-pulse::after {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		border: 1px solid var(--accent);
		opacity: 0;
		transform: translate(-50%, -50%) scale(1);
		animation: pulseRing 5.4s cubic-bezier(0.2, 0.6, 0.2, 1) infinite;
		animation-delay: var(--pulse-d, 0s);
	}

	.star-pulse::after {
		animation-delay: calc(var(--pulse-d, 0s) + 2.7s);
	}

	@keyframes pulseRing {
		0% {
			opacity: 0.55;
			transform: translate(-50%, -50%) scale(1);
		}
		70% {
			opacity: 0.12;
		}
		100% {
			opacity: 0;
			transform: translate(-50%, -50%) scale(14);
		}
	}

	.hud-frame {
		position: absolute;
		inset: 0;
	}

	.hud {
		position: absolute;
		width: 28px;
		height: 28px;
		border-color: var(--accent);
		border-style: solid;
		border-width: 0;
		opacity: 0.35;
		animation: hudPulse 4.8s ease-in-out infinite;
		animation-delay: var(--hud-d, 0s);
	}

	.hud-tl {
		top: 20px;
		left: 20px;
		border-top-width: 1.5px;
		border-left-width: 1.5px;
	}

	.hud-tr {
		top: 20px;
		right: 20px;
		border-top-width: 1.5px;
		border-right-width: 1.5px;
	}

	.hud-bl {
		bottom: 20px;
		left: 20px;
		border-bottom-width: 1.5px;
		border-left-width: 1.5px;
	}

	.hud-br {
		bottom: 20px;
		right: 20px;
		border-bottom-width: 1.5px;
		border-right-width: 1.5px;
	}

	@keyframes hudPulse {
		0%,
		100% {
			opacity: 0.28;
			transform: scale(1);
		}
		50% {
			opacity: 0.85;
			transform: scale(1.08);
		}
	}

	.hero-fade {
		position: absolute;
		inset: auto 0 0 0;
		height: 35%;
		background: linear-gradient(to bottom, transparent, var(--bg));
		pointer-events: none;
	}

	@media (prefers-reduced-motion: reduce) {
		.hero-grid,
		.star,
		.star-pulse::before,
		.star-pulse::after,
		.hud {
			animation: none;
		}
		.star {
			opacity: 0.55;
		}
		.star-pulse::before,
		.star-pulse::after {
			display: none;
		}
		.hud {
			opacity: 0.5;
		}
	}
</style>
