<script lang="ts">
	import { onMount } from 'svelte';
	import { profile, ticker } from '$lib/data/profile';
	import { magnetic } from '$lib/actions/magnetic';
	import ParticleField from './ParticleField.svelte';
	import Scramble from './Scramble.svelte';

	let show = $state(false);
	let time = $state('');

	onMount(() => {
		const t = setTimeout(() => (show = true), 50);
		const tick = () => {
			const d = new Date();
			const pad = (n: number) => String(n).padStart(2, '0');
			time = `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())} UTC`;
		};
		tick();
		const id = setInterval(tick, 1000);
		return () => {
			clearTimeout(t);
			clearInterval(id);
		};
	});

	const tickerLoop = [...ticker, ...ticker, ...ticker];
</script>

<section id="hero" class="hero relative" aria-labelledby="hero-title">
	<ParticleField />

	<div class="hero-inner content">
		<div class="meta fade-up {show ? 'show' : ''}" style="transition-delay: 0ms;">
			<span class="pill">
				<span class="dot"></span>
				Available · Q3 2026
			</span>
			<span>{profile.location}</span>
			<span class="mono">{time}</span>
		</div>

		<h1 id="hero-title" class="m-0 text-hero">
			<Scramble text="Interfaces" duration={900} delay={150} />
			<span> </span>
			<span class="italic"><Scramble text="that" duration={700} delay={500} /></span>
			<span> </span>
			<span class="stroke"><Scramble text="move" duration={800} delay={780} /></span>
			<br />
			<Scramble text="like " duration={500} delay={1080} />
			<span class="accent-word"><Scramble text="cinema." duration={900} delay={1240} /></span>
		</h1>

		<p class="intro fade-up {show ? 'show' : ''}" style="transition-delay: 1400ms;">
			I design <b>immersive interfaces</b> and motion systems at the seam between software and storytelling
			— currently shaping the next generation of spatial tools for a stealth lab.
		</p>

		<div class="actions fade-up {show ? 'show' : ''}" style="transition-delay: 1600ms;">
			<a href={profile.resumeUrl} class="btn primary" use:magnetic={0.18} download>
				<i class="tick tl"></i>
				<i class="tick br"></i>
				<span class="lbl"><span>Download résumé</span><span>Download résumé</span></span>
				<span class="arr"><i>→</i><i>→</i></span>
			</a>
			<a href="mailto:{profile.email}" class="btn ghost" use:magnetic={0.18}>
				<i class="tick tl"></i>
				<i class="tick br"></i>
				<span class="lbl"><span>Get in touch</span><span>Get in touch</span></span>
				<span class="arr"><i>↗</i><i>↗</i></span>
			</a>
		</div>

		<div class="socials fade-up {show ? 'show' : ''}" style="transition-delay: 1800ms;">
			{#each profile.socials as s (s.label)}
				<a
					href={s.href}
					class="social"
					target={s.platform === 'email' ? '_self' : '_blank'}
					rel={s.platform === 'email' ? undefined : 'noopener noreferrer'}
				>
					<span class="dot"></span>
					<span>{s.label}</span>
				</a>
			{/each}
		</div>
	</div>

	<div class="marquee-row">
		<div class="marquee">
			{#each tickerLoop as t, i (i)}
				<span>{t}</span>
			{/each}
		</div>
	</div>
</section>

<style>
	.hero {
		min-height: 100vh;
		display: flex;
		align-items: center;
		padding: 0 var(--pad-x);
	}
	.hero-inner {
		max-width: var(--container-max);
		width: 100%;
		margin: 0 auto;
		padding-top: 140px;
		padding-bottom: 140px;
		display: grid;
		grid-template-columns: 1fr;
		gap: 36px;
	}
	.meta {
		display: flex;
		gap: 18px;
		align-items: center;
		flex-wrap: wrap;
		color: var(--fg-soft);
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
	}
	h1 .accent-word {
		color: var(--accent);
	}
	h1 .italic {
		font-family: var(--font-serif);
		font-style: italic;
		font-weight: 400;
	}
	h1 .stroke {
		color: transparent;
		-webkit-text-stroke: 1px var(--fg-soft);
	}
	.intro {
		max-width: 540px;
		font-size: 18px;
		line-height: 1.55;
		color: var(--fg-soft);
		text-wrap: pretty;
	}
	.intro :global(b) {
		color: var(--fg);
		font-weight: 500;
	}
	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 14px;
		align-items: center;
	}
	.socials {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		align-items: center;
		margin-top: 6px;
	}
	.marquee-row {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 80px;
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--muted);
		pointer-events: none;
		overflow: hidden;
	}
	.marquee {
		display: flex;
		gap: 48px;
		white-space: nowrap;
		animation: marquee 40s linear infinite;
	}
	.marquee span {
		display: inline-flex;
		align-items: center;
		gap: 14px;
	}
	.marquee span::after {
		content: '◇';
		color: var(--accent);
		font-size: 10px;
	}
	@media (max-width: 560px) {
		.marquee-row {
			display: none;
		}
	}
</style>
