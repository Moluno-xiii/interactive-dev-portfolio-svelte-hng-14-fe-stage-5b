<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import ParticleField from '$lib/components/ParticleField.svelte';
	import Scramble from '$lib/components/Scramble.svelte';
	import { magnetic } from '$lib/actions/magnetic';

	let show = $state(false);
	onMount(() => {
		const t = setTimeout(() => (show = true), 50);
		return () => clearTimeout(t);
	});

	const status = $derived(page.status);
	const message = $derived(page.error?.message ?? 'Page not found');
	const path = $derived(page.url?.pathname ?? '/');
</script>

<svelte:head>
	<title>{status} · Signal lost — Moluno</title>
	<meta name="description" content="That page isn't reaching us." />
</svelte:head>

<section class="err relative">
	<ParticleField />

	<div class="err-inner content">
		<div class="meta fade-up {show ? 'show' : ''}" style="transition-delay: 0ms;">
			<span class="pill">
				<span class="dot"></span>
				ERR_{status} · NOT_FOUND
			</span>
			<span class="mono">PATH · {path}</span>
			<span class="err-tag mono">REQUEST UNANSWERED</span>
		</div>

		<h1 id="err-title" class="err-title m-0 text-hero">
			<Scramble text="That signal" duration={900} delay={150} />
			<br />
			<span class="italic"><Scramble text="isn't reaching" duration={900} delay={500} /></span>
			<br />
			<Scramble text="us." duration={500} delay={950} />
		</h1>

		<div class="msg fade-up {show ? 'show' : ''}" style="transition-delay: 1200ms;">
			<div class="msg-line">
				<span class="msg-k mono">Status</span>
				<span class="msg-v mono">{status} — {message}</span>
			</div>
			<div class="msg-line">
				<span class="msg-k mono">Resource</span>
				<span class="msg-v mono">{path}</span>
			</div>
			<div class="msg-line">
				<span class="msg-k mono">Diagnosis</span>
				<span class="msg-v mono">No route is wired for this address.</span>
			</div>
		</div>

		<div class="actions fade-up {show ? 'show' : ''}" style="transition-delay: 1400ms;">
			<a href="/" class="btn primary" use:magnetic={0.18}>
				<i class="tick tl"></i>
				<i class="tick br"></i>
				<span class="lbl"><span>Back to home</span><span>Back to home</span></span>
				<span class="arr"><i>→</i><i>→</i></span>
			</a>
			<a href="/#work" class="btn ghost" use:magnetic={0.18}>
				<i class="tick tl"></i>
				<i class="tick br"></i>
				<span class="lbl"><span>Browse work</span><span>Browse work</span></span>
				<span class="arr"><i>↗</i><i>↗</i></span>
			</a>
		</div>

		<div
			class="ascii fade-up mono {show ? 'show' : ''}"
			style="transition-delay: 1600ms;"
			aria-hidden="true"
		>
			<pre>
┌───────────────────────────────────────────────┐
│  &lt;/&gt;  attempted route resolution             │
│       ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ✕      │
│  &gt;    no manifest entry. returning home.      │
└───────────────────────────────────────────────┘</pre>
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
	.ascii {
		font-size: 11px;
		color: var(--muted);
		line-height: 1.45;
		opacity: 0.55;
	}
	.ascii pre {
		margin: 0;
		white-space: pre;
		overflow-x: auto;
	}
	@media (max-width: 720px) {
		.ascii {
			display: none;
		}
		.msg-line {
			grid-template-columns: 1fr;
			gap: 2px;
		}
	}
</style>
