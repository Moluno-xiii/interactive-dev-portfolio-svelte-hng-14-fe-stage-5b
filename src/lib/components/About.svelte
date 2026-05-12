<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { about } from '$lib/data/profile';
</script>

<section id="about" class="block">
	<div class="block-inner">
		<div class="section-head">
			<div class="lbl">
				<span class="dot"></span>
				<span>§01 · About</span>
			</div>
			<div use:reveal>
				<h2 class="m-0 text-display">
					Frontend by trade,<br />
					<span class="italic">fullstack</span> when it counts.
				</h2>
			</div>
		</div>

		<div class="about-grid">
			<div class="r-up" use:reveal>
				<div class="copy">
					{#each about.paragraphs as p, i (i)}
						<p>{p}</p>
					{/each}
				</div>
			</div>
			<div class="about-stats">
				{#each about.stats as s, i (s.k)}
					<div class="stat r-up" use:reveal style="transition-delay: {i * 80}ms;">
						<div class="k">{s.k}</div>
						<div class="v">{s.v}<small>{s.s}</small></div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.block {
		position: relative;
		padding: var(--pad-y-section) var(--pad-x);
		border-top: 1px solid var(--line);
	}
	.block-inner {
		max-width: var(--container-max);
		margin: 0 auto;
	}
	.section-head {
		display: grid;
		grid-template-columns: 240px 1fr;
		gap: 48px;
		margin-bottom: 64px;
		align-items: end;
	}
	.section-head .lbl {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--fg-soft);
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.section-head .lbl .dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--accent);
		box-shadow: 0 0 12px var(--accent);
		display: inline-block;
	}
	.section-head h2 :global(.italic) {
		font-family: var(--font-serif);
		font-style: italic;
		font-weight: 400;
		color: var(--fg-soft);
	}
	.about-grid {
		display: grid;
		grid-template-columns: 1.2fr 1fr;
		gap: 64px;
		align-items: start;
	}
	.copy {
		font-size: 20px;
		line-height: 1.55;
		color: var(--fg);
		max-width: 620px;
		text-wrap: pretty;
	}
	.copy p {
		margin: 0 0 22px;
	}
	.about-stats {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1px;
		background: var(--line);
		border: 1px solid var(--line);
	}
	.stat {
		padding: 24px;
		background: var(--bg);
	}
	.stat .k {
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--muted);
	}
	.stat .v {
		font-family: var(--font-display);
		font-size: 42px;
		font-weight: 500;
		letter-spacing: -0.02em;
		margin-top: 6px;
		display: flex;
		align-items: baseline;
		gap: 6px;
	}
	.stat .v small {
		font-size: 14px;
		color: var(--fg-soft);
		font-weight: 400;
	}
	@media (max-width: 980px) {
		.section-head {
			grid-template-columns: 1fr;
			gap: 18px;
			margin-bottom: 42px;
		}
		.about-grid {
			grid-template-columns: 1fr;
			gap: 40px;
		}
	}
	@media (max-width: 560px) {
		.about-stats {
			grid-template-columns: 1fr;
		}
	}
</style>
