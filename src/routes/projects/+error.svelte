<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import ParticleField from '$lib/components/ParticleField.svelte';
	import Scramble from '$lib/components/Scramble.svelte';
	import { magnetic } from '$lib/actions/magnetic';
	import { projects } from '$lib/data/projects';

	let show = $state(false);
	onMount(() => {
		const t = setTimeout(() => (show = true), 50);
		return () => clearTimeout(t);
	});

	const status = $derived(page.status);
	const requestedSlug = $derived(page.params?.slug ?? '');
	const message = $derived(page.error?.message ?? 'Project not found');
</script>

<svelte:head>
	<title>{status} · Case study missing — Moluno</title>
	<meta name="description" content="We can't find that case study." />
</svelte:head>

<section class="err relative">
	<ParticleField />

	<div class="err-inner content">
		<div class="meta fade-up {show ? 'show' : ''}" style="transition-delay: 0ms;">
			<span class="pill">
				<span class="dot"></span>
				ERR_{status} · CASE STUDY NOT FOUND
			</span>
			<span class="mono">SLUG · {requestedSlug || '—'}</span>
			<span class="err-tag mono">ARCHIVE EMPTY</span>
		</div>

		<h1 id="err-title" class="err-title m-0 text-hero">
			<Scramble text="We can't find" duration={900} delay={150} />
			<br />
			<span class="italic"><Scramble text="that case" duration={900} delay={500} /></span>
			<span> </span>
			<Scramble text="study." duration={700} delay={900} />
		</h1>

		<div class="msg fade-up {show ? 'show' : ''}" style="transition-delay: 1100ms;">
			<div class="msg-line">
				<span class="msg-k mono">Looked up</span>
				<span class="msg-v mono">/projects/{requestedSlug || '<empty>'}</span>
			</div>
			<div class="msg-line">
				<span class="msg-k mono">Status</span>
				<span class="msg-v mono">{status} — {message}</span>
			</div>
			<div class="msg-line">
				<span class="msg-k mono">Available</span>
				<span class="msg-v mono">{projects.length} case studies in the index.</span>
			</div>
		</div>

		<div class="actions fade-up {show ? 'show' : ''}" style="transition-delay: 1300ms;">
			<a href="/#work" class="btn primary" use:magnetic={0.18}>
				<i class="tick tl"></i>
				<i class="tick br"></i>
				<span class="lbl"><span>Back to all work</span><span>Back to all work</span></span>
				<span class="arr"><i>→</i><i>→</i></span>
			</a>
			<a href="/" class="btn ghost" use:magnetic={0.18}>
				<i class="tick tl"></i>
				<i class="tick br"></i>
				<span class="lbl"><span>Home</span><span>Home</span></span>
				<span class="arr"><i>↗</i><i>↗</i></span>
			</a>
		</div>

		<div class="suggested fade-up {show ? 'show' : ''}" style="transition-delay: 1500ms;">
			<div class="suggested-label mono">
				<span class="suggested-dot"></span>
				Try one of these instead
			</div>
			<ul class="suggested-list">
				{#each projects.slice(0, 4) as p (p.slug)}
					<li>
						<a class="suggested-link" href="/projects/{p.slug}">
							<span class="num mono">{p.n}</span>
							<span class="ttl">{p.title} <em>{p.ital}</em></span>
							<span class="arrow">↗</span>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>

<style>
	.err {
		min-height: 100vh;
		display: flex;
		align-items: center;
		padding: 0 var(--pad-x);
		overflow: hidden;
	}
	.err-inner {
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
	.err-tag {
		color: var(--accent);
	}
	.err-title :global(.italic) {
		font-family: var(--font-serif);
		font-style: italic;
		font-weight: 400;
		color: var(--fg-soft);
	}
	.msg {
		display: flex;
		flex-direction: column;
		gap: 6px;
		max-width: 640px;
		padding: 18px 20px;
		border: 1px solid var(--line);
		border-radius: 12px;
		background: color-mix(in srgb, var(--surface) 50%, transparent);
		backdrop-filter: blur(6px);
		-webkit-backdrop-filter: blur(6px);
	}
	.msg-line {
		display: grid;
		grid-template-columns: 110px 1fr;
		gap: 12px;
		font-size: 12px;
		letter-spacing: 0.08em;
	}
	.msg-k {
		text-transform: uppercase;
		color: var(--muted);
	}
	.msg-v {
		color: var(--fg-soft);
		word-break: break-word;
	}
	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 14px;
	}
	.suggested {
		max-width: 640px;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	.suggested-label {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		font-size: 11px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--fg-soft);
	}
	.suggested-dot {
		display: inline-block;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--accent);
		box-shadow: 0 0 10px var(--accent);
	}
	.suggested-list {
		list-style: none;
		margin: 0;
		padding: 0;
		border-top: 1px solid var(--line);
	}
	.suggested-link {
		display: grid;
		grid-template-columns: 60px 1fr 24px;
		align-items: center;
		gap: 16px;
		padding: 14px 4px;
		color: var(--fg-soft);
		border-bottom: 1px solid var(--line);
		transition:
			color 0.3s,
			padding 0.3s var(--ease-out);
	}
	.suggested-link:hover {
		color: var(--fg);
		padding-left: 12px;
	}
	.suggested-link .num {
		font-size: 11px;
		letter-spacing: 0.16em;
		color: var(--muted);
	}
	.suggested-link .ttl {
		font-family: var(--font-display);
		font-weight: 500;
		font-size: 18px;
		letter-spacing: -0.01em;
		color: var(--fg);
	}
	.suggested-link .ttl em {
		font-family: var(--font-serif);
		font-style: italic;
		font-weight: 400;
		color: var(--fg-soft);
		transition: color 0.3s;
	}
	.suggested-link:hover .ttl em {
		color: var(--accent);
	}
	.suggested-link .arrow {
		color: var(--muted);
		text-align: right;
		transition:
			color 0.3s,
			transform 0.3s var(--ease-out);
	}
	.suggested-link:hover .arrow {
		color: var(--accent);
		transform: translate(2px, -2px);
	}
	@media (max-width: 720px) {
		.msg-line {
			grid-template-columns: 1fr;
			gap: 2px;
		}
	}
</style>
