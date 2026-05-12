<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { skills } from '$lib/data/skills';
</script>

<section id="skills" class="block">
	<div class="block-inner">
		<div class="section-head">
			<div class="lbl">
				<span class="dot"></span>
				<span>§03 · Stack & practice</span>
			</div>
			<div use:reveal>
				<h2 class="m-0 text-display">
					Tools, languages,<br />
					<span class="italic">and disciplines.</span>
				</h2>
			</div>
		</div>
		<div class="skills-grid">
			{#each skills as s, i (s.title)}
				<div class="skill r-up" use:reveal style="transition-delay: {i * 80}ms;">
					<div class="h">
						<span class="ix mono">{s.ix}</span>
						<h3>{s.title}</h3>
					</div>
					<ul>
						{#each s.items as [k, v], j (k)}
							<li class="r-up" use:reveal style="transition-delay: {i * 80 + 200 + j * 50}ms;">
								<span>{k}</span><span>{v.toUpperCase()}</span>
							</li>
						{/each}
					</ul>
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
	.skills-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1px;
		background: var(--line);
		border: 1px solid var(--line);
	}
	.skill {
		padding: 28px;
		background: var(--bg);
		position: relative;
		overflow: hidden;
		transition: background 0.4s;
	}
	.skill:hover {
		background: var(--bg-soft);
	}
	.skill .h {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-bottom: 14px;
	}
	.skill .ix {
		font-size: 10px;
		color: var(--muted);
		letter-spacing: 0.18em;
	}
	.skill h3 {
		margin: 0;
		font-family: var(--font-display);
		font-weight: 500;
		font-size: 22px;
		letter-spacing: -0.01em;
	}
	.skill ul {
		margin: 0;
		padding: 0;
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.skill li {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.06em;
		color: var(--fg-soft);
		display: flex;
		justify-content: space-between;
		border-bottom: 1px dashed var(--line);
		padding: 6px 0;
	}
	.skill li span:last-child {
		color: var(--accent);
	}
	@media (max-width: 980px) {
		.section-head {
			grid-template-columns: 1fr;
			gap: 18px;
			margin-bottom: 42px;
		}
		.skills-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@media (max-width: 560px) {
		.skills-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
