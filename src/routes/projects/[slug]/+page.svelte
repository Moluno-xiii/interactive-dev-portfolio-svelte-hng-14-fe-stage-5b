<script lang="ts">
	import { onMount } from 'svelte';
	import { reveal } from '$lib/actions/reveal';
	import { magnetic } from '$lib/actions/magnetic';
	import ParticleField from '$lib/components/ParticleField.svelte';
	import Scramble from '$lib/components/Scramble.svelte';
	import { getAdjacentProjects, projects } from '$lib/data/projects';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const project = $derived(data.project);
	const adjacent = $derived(getAdjacentProjects(project.slug));

	let show = $state(false);
	let railEl: HTMLElement;

	$effect(() => {
		const _ = project.slug;
		void _;
		show = false;
		const t = setTimeout(() => (show = true), 60);
		if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'instant' });
		return () => clearTimeout(t);
	});

	onMount(() => {
		const onScroll = () => {
			if (!railEl) return;
			const h = document.documentElement;
			const s = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
			railEl.style.transform = `scaleX(${s})`;
		};
		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

<svelte:head>
	<title>{project.title} — Case study</title>
	<meta name="description" content={project.summary} />
</svelte:head>

<div class="proj-shell">
	<div class="proj-rail"><i bind:this={railEl}></i></div>

	{#if adjacent.prev && adjacent.next}
		<div class="proj-side left">
			<a href="/projects/{adjacent.prev.slug}" aria-label="Previous: {adjacent.prev.title}">
				<span class="ic"><span class="arr">←</span></span>
				<span class="num mono">{adjacent.prev.n}</span>
				<span class="lbl mono">Prev<br />{adjacent.prev.title}</span>
			</a>
		</div>
		<div class="proj-side right">
			<a href="/projects/{adjacent.next.slug}" aria-label="Next: {adjacent.next.title}">
				<span class="ic"><span class="arr">→</span></span>
				<span class="num mono">{adjacent.next.n}</span>
				<span class="lbl mono">Next<br />{adjacent.next.title}</span>
			</a>
		</div>
	{/if}

	<section class="proj-hero">
		<ParticleField />
		<div class="bg-tint"></div>
		<div class="proj-hero-inner">
			<div class="proj-crumbs mono">
				<a href="/"><span class="dot"></span> Index</a>
				<span class="sep">/</span>
				<a href="/#work">Work</a>
				<span class="sep">/</span>
				<span>{project.n} · {project.title}</span>
			</div>

			<div class="proj-meta-row fade-up {show ? 'show' : ''}">
				<span class="pill accent-pill">{project.year}</span>
				<span class="pill">{project.client}</span>
				<span class="pill">{project.role}</span>
				{#each project.tags as t (t)}
					<span class="pill">{t}</span>
				{/each}
			</div>

			<h1 class="proj-title m-0 text-project-title">
				<Scramble text={project.title} duration={900} delay={120} />
				<span> </span>
				<span class="italic"><Scramble text={project.ital} duration={700} delay={420} /></span>
			</h1>

			<p class="proj-sub fade-up {show ? 'show' : ''}" style="transition-delay: 900ms;">
				{project.summary}
			</p>

			<div class="proj-key fade-up {show ? 'show' : ''}" style="transition-delay: 1100ms;">
				<div class="cell">
					<div class="k mono">Client</div>
					<div class="v">{project.client}</div>
				</div>
				<div class="cell">
					<div class="k mono">Role</div>
					<div class="v">{project.role}</div>
				</div>
				<div class="cell">
					<div class="k mono">Duration</div>
					<div class="v mono">{project.duration}</div>
				</div>
				<div class="cell">
					<div class="k mono">Stack</div>
					<div class="v mono">{project.stack.join(' · ')}</div>
				</div>
			</div>
		</div>
	</section>

	<div class="proj-banner">
		<div class="ph"></div>
		<div class="corners"><i class="a"></i><i class="b"></i><i class="c"></i><i class="d"></i></div>
		<div class="label mono">
			<span class="accent">●</span>
			{project.title.toUpperCase()} · {project.year} · COVER PLATE
		</div>
		<div class="ix mono">{project.n} / {String(projects.length).padStart(2, '0')}</div>
	</div>

	<section class="proj-body">
		<div class="proj-body-inner">
			{#each project.bodySections as section, i (i)}
				{#if section.kind === 'stat-row'}
					<div class="r-up" use:reveal>
						<div class="proj-stat-row">
							{#each section.items as [v, k] (k)}
								<div class="cell">
									<div class="v">{v}</div>
									<div class="k mono">{k}</div>
								</div>
							{/each}
						</div>
					</div>
				{:else if section.kind === 'image'}
					<div class="r-up" use:reveal>
						<div class="proj-figure" style="aspect-ratio: {section.aspect};">
							<div class="ph"></div>
							<div class="corners">
								<i class="a"></i><i class="b"></i><i class="c"></i><i class="d"></i>
							</div>
							<div class="label mono">{section.label}</div>
						</div>
					</div>
				{:else if section.kind === 'prose'}
					<div class="r-up" use:reveal>
						<div class="proj-prose">
							<div class="head mono">
								<span class="dot"></span>
								<span>§ {String(i + 1).padStart(2, '0')} · Chapter</span>
							</div>
							<div>
								<h3>{section.h}</h3>
								<p>{section.body}</p>
							</div>
						</div>
					</div>
				{/if}
			{/each}
		</div>
	</section>

	{#if adjacent.prev && adjacent.next}
		<nav class="proj-nav" aria-label="Project navigation">
			<a class="prev" href="/projects/{adjacent.prev.slug}">
				<div class="lbl mono"><span>← Prev project</span><span>{adjacent.prev.n}</span></div>
				<div class="ttl">{adjacent.prev.title} <em>{adjacent.prev.ital}</em></div>
			</a>
			<a class="next" href="/projects/{adjacent.next.slug}">
				<div class="lbl mono"><span>{adjacent.next.n}</span><span>Next project →</span></div>
				<div class="ttl">{adjacent.next.title} <em>{adjacent.next.ital}</em></div>
			</a>
		</nav>
	{/if}

	<section class="proj-cta">
		<div class="eyebrow">
			<span class="dot"></span>
			<span>§99 · Continue</span>
		</div>
		<h2>
			Have a brief?<br />
			<span class="italic">Let's talk.</span>
		</h2>
		<div class="actions">
			<a href="mailto:hello@moluno.dev" class="btn primary" use:magnetic={0.18}>
				<i class="tick tl"></i><i class="tick br"></i>
				<span class="lbl"><span>Start a project</span><span>Start a project</span></span>
				<span class="arr"><i>↗</i><i>↗</i></span>
			</a>
			<a href="/#work" class="btn ghost" use:magnetic={0.18}>
				<i class="tick tl"></i><i class="tick br"></i>
				<span class="lbl"><span>All projects</span><span>All projects</span></span>
				<span class="arr"><i>→</i><i>→</i></span>
			</a>
		</div>
		<footer class="foot mono">
			<div>© {new Date().getFullYear()} · Moluno · Powered by sapa</div>
			<div>v2.04.026 · 60Hz · 6.5244 N · 3.3792 E</div>
		</footer>
	</section>
</div>

<style>
	.proj-rail {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		height: 2px;
		z-index: 60;
		pointer-events: none;
	}
	.proj-rail i {
		display: block;
		height: 100%;
		background: var(--accent);
		transform-origin: left;
		transform: scaleX(0);
		transition: transform 0.15s linear;
	}

	.proj-side {
		position: fixed;
		top: 50%;
		transform: translateY(-50%);
		z-index: 55;
		pointer-events: none;
		mix-blend-mode: difference;
	}
	:global([data-theme='light']) .proj-side {
		mix-blend-mode: normal;
	}
	.proj-side.left {
		left: 18px;
	}
	.proj-side.right {
		right: 18px;
	}
	.proj-side a {
		pointer-events: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		width: 52px;
		color: var(--fg);
	}
	.proj-side .ic {
		width: 52px;
		height: 52px;
		border: 1px solid var(--line-strong);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-mono);
		font-size: 18px;
		color: var(--fg);
		background: color-mix(in srgb, var(--bg) 55%, transparent);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		transition: all 0.35s var(--ease-out);
		position: relative;
		overflow: hidden;
		isolation: isolate;
	}
	.proj-side .ic::before {
		content: '';
		position: absolute;
		inset: 0;
		z-index: -1;
		background: var(--accent);
		transform: scale(0);
		border-radius: 50%;
		transition: transform 0.45s var(--ease-out);
	}
	.proj-side a:hover .ic {
		color: var(--bg);
		border-color: var(--accent);
		transform: scale(1.08);
	}
	.proj-side a:hover .ic::before {
		transform: scale(1);
	}
	.proj-side .lbl {
		font-size: 9px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--fg-soft);
		opacity: 0;
		transform: translateY(-4px);
		transition:
			opacity 0.3s,
			transform 0.3s var(--ease-out);
		text-align: center;
		line-height: 1.3;
		max-width: 120px;
	}
	.proj-side a:hover .lbl {
		opacity: 1;
		transform: translateY(0);
	}
	.proj-side .arr {
		display: block;
		transition: transform 0.45s var(--ease-out);
	}
	.proj-side.left a:hover .arr {
		transform: translateX(-3px);
	}
	.proj-side.right a:hover .arr {
		transform: translateX(3px);
	}
	.proj-side .num {
		font-size: 10px;
		letter-spacing: 0.18em;
		color: var(--fg-soft);
	}

	.proj-hero {
		position: relative;
		padding: 140px var(--pad-x) 80px;
		min-height: 90vh;
		display: flex;
		align-items: flex-end;
		overflow: hidden;
	}
	.bg-tint {
		position: absolute;
		inset: 0;
		background: radial-gradient(
			60% 60% at 80% 30%,
			color-mix(in srgb, var(--accent) 12%, transparent),
			transparent 60%
		);
		z-index: 0;
		pointer-events: none;
	}
	.proj-hero-inner {
		position: relative;
		z-index: 3;
		max-width: var(--container-max);
		margin: 0 auto;
		width: 100%;
		display: grid;
		grid-template-columns: 1fr;
		gap: 48px;
	}
	.proj-crumbs {
		display: flex;
		align-items: center;
		gap: 14px;
		font-size: 11px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--fg-soft);
	}
	.proj-crumbs a {
		color: var(--fg-soft);
		display: inline-flex;
		align-items: center;
		gap: 8px;
		transition: color 0.25s;
	}
	.proj-crumbs a:hover {
		color: var(--accent);
	}
	.proj-crumbs a .dot {
		display: inline-block;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--accent);
		box-shadow: 0 0 8px var(--accent);
	}
	.proj-crumbs .sep {
		color: var(--dim);
	}
	.proj-meta-row {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		align-items: center;
	}
	.proj-title :global(.italic) {
		font-family: var(--font-serif);
		font-style: italic;
		font-weight: 400;
		color: var(--fg-soft);
	}
	.proj-sub {
		max-width: 760px;
		font-size: 22px;
		line-height: 1.45;
		color: var(--fg);
		text-wrap: pretty;
	}
	.proj-key {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1px;
		background: var(--line);
		border: 1px solid var(--line);
		margin-top: 32px;
	}
	.proj-key .cell {
		padding: 22px;
		background: var(--bg);
	}
	.proj-key .k {
		font-size: 10px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--muted);
	}
	.proj-key .v {
		font-family: var(--font-display);
		font-size: 18px;
		font-weight: 500;
		letter-spacing: -0.01em;
		margin-top: 8px;
		color: var(--fg);
	}
	.proj-key .v.mono {
		font-family: var(--font-mono);
		font-size: 14px;
		font-weight: 400;
		color: var(--fg-soft);
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.proj-banner {
		position: relative;
		height: 62vh;
		min-height: 420px;
		margin: 0 var(--pad-x);
		border: 1px solid var(--line-strong);
		border-radius: 14px;
		overflow: hidden;
		background: var(--surface);
	}
	.proj-banner .ph {
		position: absolute;
		inset: 0;
		background-image:
			repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.04) 0 14px, transparent 14px 28px),
			linear-gradient(135deg, var(--surface), var(--surface-2));
	}
	.proj-banner .corners i {
		position: absolute;
		width: 18px;
		height: 18px;
		border: 1px solid var(--accent);
	}
	.proj-banner .corners i.a {
		top: 14px;
		left: 14px;
		border-right: none;
		border-bottom: none;
	}
	.proj-banner .corners i.b {
		top: 14px;
		right: 14px;
		border-left: none;
		border-bottom: none;
	}
	.proj-banner .corners i.c {
		bottom: 14px;
		left: 14px;
		border-right: none;
		border-top: none;
	}
	.proj-banner .corners i.d {
		bottom: 14px;
		right: 14px;
		border-left: none;
		border-top: none;
	}
	.proj-banner .label {
		position: absolute;
		left: 24px;
		bottom: 20px;
		font-size: 11px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--fg-soft);
	}
	.proj-banner .label .accent {
		color: var(--accent);
	}
	.proj-banner .ix {
		position: absolute;
		right: 24px;
		top: 24px;
		font-size: 11px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--fg-soft);
	}

	.proj-body {
		padding: 120px var(--pad-x);
	}
	.proj-body-inner {
		max-width: 1080px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 96px;
	}
	.proj-stat-row {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1px;
		background: var(--line);
		border: 1px solid var(--line);
	}
	.proj-stat-row .cell {
		padding: 36px;
		background: var(--bg);
	}
	.proj-stat-row .cell .v {
		font-family: var(--font-display);
		font-weight: 500;
		font-size: clamp(48px, 7vw, 96px);
		letter-spacing: -0.04em;
		line-height: 1;
		color: var(--fg);
	}
	.proj-stat-row .cell .k {
		font-size: 11px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--fg-soft);
		margin-top: 14px;
	}
	.proj-prose {
		display: grid;
		grid-template-columns: 280px 1fr;
		gap: 64px;
		align-items: start;
	}
	.proj-prose .head {
		font-size: 11px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--fg-soft);
		display: flex;
		align-items: flex-start;
		gap: 10px;
		position: sticky;
		top: 90px;
	}
	.proj-prose .head .dot {
		display: inline-block;
		margin-top: 5px;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--accent);
		box-shadow: 0 0 12px var(--accent);
	}
	.proj-prose h3 {
		font-family: var(--font-display);
		font-weight: 500;
		font-size: clamp(28px, 3.6vw, 44px);
		line-height: 1.1;
		letter-spacing: -0.02em;
		margin: 0 0 18px;
		color: var(--fg);
	}
	.proj-prose p {
		font-size: 19px;
		line-height: 1.55;
		color: var(--fg-soft);
		margin: 0;
		text-wrap: pretty;
		max-width: 720px;
	}

	.proj-figure {
		position: relative;
		border: 1px solid var(--line-strong);
		border-radius: 12px;
		overflow: hidden;
		background: var(--surface);
	}
	.proj-figure .ph {
		position: absolute;
		inset: 0;
		background-image:
			repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.04) 0 12px, transparent 12px 24px),
			linear-gradient(135deg, var(--surface), var(--surface-2));
	}
	.proj-figure .label {
		position: absolute;
		left: 18px;
		bottom: 14px;
		font-size: 10px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--fg-soft);
	}
	.proj-figure .corners i {
		position: absolute;
		width: 12px;
		height: 12px;
		border: 1px solid var(--accent);
	}
	.proj-figure .corners i.a {
		top: 10px;
		left: 10px;
		border-right: none;
		border-bottom: none;
	}
	.proj-figure .corners i.b {
		top: 10px;
		right: 10px;
		border-left: none;
		border-bottom: none;
	}
	.proj-figure .corners i.c {
		bottom: 10px;
		left: 10px;
		border-right: none;
		border-top: none;
	}
	.proj-figure .corners i.d {
		bottom: 10px;
		right: 10px;
		border-left: none;
		border-top: none;
	}

	.proj-nav {
		display: grid;
		grid-template-columns: 1fr 1fr;
		border-top: 1px solid var(--line);
		border-bottom: 1px solid var(--line);
		margin: 0 var(--pad-x);
	}
	.proj-nav a {
		padding: 48px 32px;
		display: flex;
		flex-direction: column;
		gap: 18px;
		position: relative;
		overflow: hidden;
		isolation: isolate;
		transition:
			color 0.35s,
			background 0.35s;
	}
	.proj-nav a.next {
		text-align: right;
		align-items: flex-end;
		border-left: 1px solid var(--line);
	}
	.proj-nav .lbl {
		font-size: 11px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--fg-soft);
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.proj-nav .ttl {
		font-family: var(--font-display);
		font-weight: 500;
		font-size: clamp(36px, 6vw, 80px);
		line-height: 0.95;
		letter-spacing: -0.03em;
		color: var(--fg);
		transition:
			transform 0.5s var(--ease-out),
			color 0.35s;
	}
	.proj-nav .ttl em {
		font-family: var(--font-serif);
		font-style: italic;
		font-weight: 400;
		color: var(--fg-soft);
	}
	.proj-nav a::before {
		content: '';
		position: absolute;
		inset: 0;
		z-index: -1;
		background: linear-gradient(
			120deg,
			transparent,
			color-mix(in srgb, var(--accent) 8%, transparent),
			transparent
		);
		transform: translateX(-101%);
		transition: transform 0.7s var(--ease-out);
	}
	.proj-nav a:hover::before {
		transform: translateX(0);
	}
	.proj-nav a:hover .ttl {
		transform: translateX(8px);
		color: var(--accent);
	}
	.proj-nav a.next:hover .ttl {
		transform: translateX(-8px);
	}

	.proj-cta {
		padding: 120px var(--pad-x) 160px;
		text-align: center;
		border-top: 1px solid var(--line);
	}
	.proj-cta .eyebrow {
		display: inline-flex;
		gap: 10px;
		align-items: center;
		margin-bottom: 22px;
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--fg-soft);
	}
	.proj-cta .eyebrow .dot {
		display: inline-block;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--accent);
		box-shadow: 0 0 12px var(--accent);
	}
	.proj-cta h2 {
		font-family: var(--font-display);
		font-weight: 500;
		font-size: clamp(48px, 8vw, 128px);
		line-height: 0.95;
		letter-spacing: -0.04em;
		margin: 0 auto;
		max-width: 14ch;
	}
	.proj-cta h2 .italic {
		font-family: var(--font-serif);
		font-style: italic;
		font-weight: 400;
		color: var(--fg-soft);
	}
	.proj-cta .actions {
		margin-top: 40px;
		display: flex;
		flex-wrap: wrap;
		gap: 14px;
		justify-content: center;
	}
	.proj-cta .foot {
		margin-top: 80px;
		padding: 28px var(--pad-x);
		border-top: 1px solid var(--line);
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 10px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--muted);
		flex-wrap: wrap;
		gap: 14px;
	}

	@media (max-width: 900px) {
		.proj-hero {
			padding: 100px var(--pad-x) 60px;
		}
		.proj-banner {
			height: 46vh;
			min-height: 280px;
		}
		.proj-body {
			padding: 80px var(--pad-x);
		}
		.proj-body-inner {
			gap: 64px;
		}
		.proj-prose {
			grid-template-columns: 1fr;
			gap: 18px;
		}
		.proj-prose .head {
			position: static;
		}
		.proj-key {
			grid-template-columns: repeat(2, 1fr);
		}
		.proj-stat-row {
			grid-template-columns: 1fr;
		}
		.proj-nav {
			grid-template-columns: 1fr;
		}
		.proj-nav a.next {
			border-left: none;
			border-top: 1px solid var(--line);
			text-align: left;
			align-items: flex-start;
		}
		.proj-nav a.next:hover .ttl {
			transform: translateX(8px);
		}
		.proj-cta {
			padding: 80px var(--pad-x) 120px;
		}
		.proj-side {
			position: static;
			transform: none;
			margin: 0 18px 32px;
			display: flex;
			justify-content: space-between;
			mix-blend-mode: normal;
		}
		.proj-side.left,
		.proj-side.right {
			left: auto;
			right: auto;
		}
		.proj-side a {
			flex-direction: row;
			width: auto;
		}
		.proj-side .lbl {
			opacity: 1;
			transform: none;
		}
	}
</style>
