<script lang="ts">
	import { theme, type Palette } from '$lib/stores/theme.svelte';

	let open = $state(false);

	const palettes: { value: Palette; label: string; swatch: string }[] = [
		{ value: 'ice', label: 'Ice', swatch: '#e6eefb' },
		{ value: 'lime', label: 'Lime', swatch: '#c8ff3a' },
		{ value: 'cyan', label: 'Cyan', swatch: '#4dd8ff' },
		{ value: 'magenta', label: 'Magenta', swatch: '#ff3ad8' },
		{ value: 'amber', label: 'Amber', swatch: '#ffb53a' }
	];
</script>

<div class="twk-wrap">
	<button class="twk-toggle mono" onclick={() => (open = !open)} aria-expanded={open}>
		<span class="dot"></span>
		{open ? 'Close' : 'Tweaks'}
	</button>

	{#if open}
		<div class="twk" role="dialog" aria-label="Tweaks panel">
			<div class="twk-section">
				<div class="twk-label mono">Mode</div>
				<div class="twk-radios">
					<button
						class="twk-radio mono"
						class:active={theme.current === 'dark'}
						onclick={() => theme.setTheme('dark')}
					>
						Dark
					</button>
					<button
						class="twk-radio mono"
						class:active={theme.current === 'light'}
						onclick={() => theme.setTheme('light')}
					>
						Light
					</button>
				</div>
			</div>

			<div class="twk-section">
				<div class="twk-label mono">Accent</div>
				<div class="twk-swatches">
					{#each palettes as p (p.value)}
						<button
							class="twk-swatch"
							class:active={theme.palette === p.value}
							onclick={() => theme.setPalette(p.value)}
							style="--sw: {p.swatch};"
							aria-label="Set palette: {p.label}"
							title={p.label}
						>
							<span class="sw"></span>
							<span class="lbl mono">{p.label}</span>
						</button>
					{/each}
				</div>
			</div>

			<div class="twk-section">
				<div class="twk-label mono">Feel</div>
				<button
					class="twk-toggle-row mono"
					onclick={() => theme.setCursor(!theme.cursor)}
					aria-pressed={theme.cursor}
				>
					<span>Custom cursor</span>
					<span class="twk-pill" class:on={theme.cursor}>{theme.cursor ? 'On' : 'Off'}</span>
				</button>
			</div>
		</div>
	{/if}
</div>

<style>
	.twk-wrap {
		position: fixed;
		bottom: 32px;
		right: 22px;
		z-index: 60;
		pointer-events: none;
	}
	.twk-toggle,
	.twk {
		pointer-events: auto;
	}
	.twk-toggle {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 10px 14px;
		border-radius: 999px;
		border: 1px solid var(--line-strong);
		background: color-mix(in srgb, var(--bg) 80%, transparent);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		font-size: 10px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--fg);
		transition:
			border-color 0.25s,
			color 0.25s;
	}
	.twk-toggle:hover {
		border-color: var(--accent);
		color: var(--accent);
	}
	.twk-toggle .dot {
		display: inline-block;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--accent);
		box-shadow: 0 0 8px var(--accent);
	}
	.twk {
		position: absolute;
		bottom: calc(100% + 12px);
		right: 0;
		width: 260px;
		padding: 14px;
		border-radius: 12px;
		border: 1px solid var(--line-strong);
		background: color-mix(in srgb, var(--bg) 92%, transparent);
		backdrop-filter: blur(14px);
		-webkit-backdrop-filter: blur(14px);
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
	.twk-section {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.twk-label {
		font-size: 10px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--fg-soft);
	}
	.twk-radios {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4px;
		padding: 4px;
		border: 1px solid var(--line);
		border-radius: 999px;
	}
	.twk-radio {
		padding: 7px 10px;
		border-radius: 999px;
		font-size: 10px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--fg-soft);
		transition:
			color 0.2s,
			background 0.2s;
	}
	.twk-radio.active {
		color: var(--bg);
		background: var(--accent);
	}
	.twk-swatches {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 6px;
	}
	.twk-swatch {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
		padding: 6px 4px;
		border: 1px solid var(--line);
		border-radius: 8px;
		transition:
			border-color 0.2s,
			transform 0.25s var(--ease-out);
	}
	.twk-swatch:hover {
		border-color: var(--accent);
		transform: translateY(-1px);
	}
	.twk-swatch.active {
		border-color: var(--accent);
	}
	.twk-swatch .sw {
		width: 18px;
		height: 18px;
		border-radius: 50%;
		background: var(--sw);
		box-shadow: 0 0 8px var(--sw);
	}
	.twk-swatch .lbl {
		font-size: 8px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--fg-soft);
	}
	.twk-swatch.active .lbl {
		color: var(--fg);
	}
	.twk-toggle-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px 12px;
		border: 1px solid var(--line);
		border-radius: 999px;
		font-size: 10px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--fg);
	}
	.twk-pill {
		font-size: 9px;
		padding: 2px 8px;
		border: 1px solid var(--line-strong);
		border-radius: 999px;
		color: var(--fg-soft);
	}
	.twk-pill.on {
		background: var(--accent);
		color: var(--bg);
		border-color: var(--accent);
	}
</style>
