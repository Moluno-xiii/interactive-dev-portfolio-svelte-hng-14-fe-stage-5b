<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { profile } from '$lib/data/profile';
</script>

<section id="contact" class="contact">
	<div class="block-inner">
		<div class="r-up" use:reveal>
			<div class="eyebrow">
				<span class="dot"></span>
				<span>§05 · Outbound</span>
			</div>
		</div>
		<div class="r-up" use:reveal style="transition-delay: 80ms;">
			<h2>
				Let's build<br />
				<span class="italic">something good</span><br />
				together.
			</h2>
		</div>
		<div class="r-up" use:reveal style="transition-delay: 160ms;">
			<a href="mailto:{profile.email}" class="mailto">
				<span>{profile.email}</span>
				<span>↗</span>
			</a>
		</div>
		<div class="links">
			{#each profile.socials as s, i (s.label)}
				<a
					href={s.href}
					class="social r-up"
					target={s.platform === 'email' ? '_self' : '_blank'}
					rel={s.platform === 'email' ? undefined : 'noopener noreferrer'}
					style="transition-delay: {240 + i * 60}ms;"
					use:reveal
				>
					<span class="dot"></span>
					<span>{s.label}</span>
				</a>
			{/each}
		</div>
	</div>
	<footer class="foot mono">
		<div>© {new Date().getFullYear()} · {profile.name} · Crafted in Lagos</div>
		<div>v2.04.026 · 60Hz · 6.5244 N · 3.3792 E</div>
	</footer>
</section>

<style>
	.contact {
		position: relative;
		padding: 160px var(--pad-x) 200px;
		border-top: 1px solid var(--line);
		text-align: center;
		overflow: hidden;
	}
	.block-inner {
		max-width: var(--container-max);
		margin: 0 auto;
	}
	.eyebrow {
		display: inline-flex;
		gap: 10px;
		align-items: center;
		margin-bottom: 24px;
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--fg-soft);
	}
	.eyebrow .dot {
		display: inline-block;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--accent);
		box-shadow: 0 0 12px var(--accent);
	}
	h2 {
		font-family: var(--font-display);
		font-weight: 500;
		font-size: clamp(48px, 10vw, 160px);
		line-height: 0.95;
		letter-spacing: -0.04em;
		margin: 0 auto;
		max-width: 14ch;
	}
	h2 .italic {
		font-family: var(--font-serif);
		font-style: italic;
		font-weight: 400;
		color: var(--fg-soft);
	}
	.mailto {
		display: inline-flex;
		align-items: center;
		gap: 14px;
		margin-top: 36px;
		font-family: var(--font-mono);
		font-size: 13px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--fg);
		border-bottom: 1px solid var(--line-strong);
		padding-bottom: 6px;
		transition:
			color 0.25s,
			border-color 0.25s;
	}
	.mailto:hover {
		color: var(--accent);
		border-color: var(--accent);
	}
	.links {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		justify-content: center;
		margin-top: 40px;
	}
	.foot {
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
		margin-top: 80px;
	}
	@media (max-width: 980px) {
		.contact {
			padding: 120px var(--pad-x) 160px;
		}
	}
</style>
