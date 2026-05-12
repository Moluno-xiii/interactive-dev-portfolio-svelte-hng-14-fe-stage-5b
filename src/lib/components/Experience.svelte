<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { experience } from '$lib/data/experience';
</script>

<section id="experience" class="block">
	<div class="block-inner">
		<div class="section-head">
			<div class="lbl">
				<span class="dot"></span>
				<span>§04 · Index</span>
			</div>
			<div use:reveal>
				<h2 class="m-0 text-display">
					An index of<br />
					<span class="italic">past collaborations.</span>
				</h2>
			</div>
		</div>
		<div class="timeline">
			{#each experience as e, i (e.co + e.yr)}
				<div class="r-up" use:reveal style="transition-delay: {i * 80}ms;">
					<div class="tl-item">
						<div class="yr mono">{e.yr}</div>
						<h4>{e.co}</h4>
						<div class="role mono">{e.role}</div>
						<p>{e.note}</p>
					</div>
				</div>
			{/each}
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
	.timeline {
		position: relative;
		padding-left: 32px;
		border-left: 1px solid var(--line);
	}
	.tl-item {
		position: relative;
		padding: 22px 0 28px 28px;
	}
	.tl-item::before {
		content: '';
		position: absolute;
		left: -37px;
		top: 30px;
		width: 11px;
		height: 11px;
		background: var(--bg);
		border: 1px solid var(--accent);
		border-radius: 50%;
	}
	.tl-item::after {
		content: '';
		position: absolute;
		left: -32px;
		top: 35px;
		width: 30px;
		height: 1px;
		background: var(--line);
	}
	.yr {
		font-size: 11px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--accent);
	}
	h4 {
		margin: 6px 0 4px;
		font-family: var(--font-display);
		font-weight: 500;
		font-size: 24px;
		letter-spacing: -0.01em;
	}
	.role {
		font-size: 11px;
		color: var(--fg-soft);
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}
	p {
		margin: 10px 0 0;
		color: var(--fg-soft);
		font-size: 15px;
		line-height: 1.55;
		max-width: 600px;
	}
	@media (max-width: 980px) {
		.section-head {
			grid-template-columns: 1fr;
			gap: 18px;
			margin-bottom: 42px;
		}
	}
</style>
