<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		onDone?: () => void;
	}
	let { onDone }: Props = $props();

	const steps = [
		'INIT · graphics pipeline',
		'LOAD · typography atlas',
		'MOUNT · interaction layer',
		'SYNC · portfolio.001',
		'READY · moluno'
	];

	let progress = $state(0);
	let rows = $state<string[]>([]);
	let done = $state(false);

	onMount(() => {
		let p = 0;
		const id = setInterval(() => {
			p += Math.random() * 18 + 8;
			if (p >= 100) {
				p = 100;
				progress = 100;
				clearInterval(id);
				setTimeout(() => {
					done = true;
					setTimeout(() => onDone?.(), 600);
				}, 300);
				return;
			}
			progress = p;
			const idx = Math.min(steps.length - 1, Math.floor((p / 100) * steps.length));
			rows = steps.slice(0, idx + 1);
		}, 130);
		return () => clearInterval(id);
	});
</script>

<div class="boot {done ? 'fade' : ''}">
	<div class="box">
		<div class="row"><span>SYS / MOLUNO</span><span>v2.04.026</span></div>
		{#each rows as r, i (i)}
			<div class="row {i < rows.length - 1 || progress >= 100 ? 'done' : ''}">
				<span>{r}</span>
				<span>{i < rows.length - 1 || progress >= 100 ? 'OK' : '…'}</span>
			</div>
		{/each}
		<div class="bar"><i style="width: {progress}%;"></i></div>
		<div class="row" style="margin-top: 14px; border: none;">
			<span>LOADING</span><span>{Math.floor(progress)}%</span>
		</div>
	</div>
</div>

<style>
	.boot {
		position: fixed;
		inset: 0;
		z-index: 200;
		background: var(--bg);
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-mono);
		color: var(--fg-soft);
		font-size: 12px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
	}
	.box {
		width: min(440px, 80vw);
	}
	.row {
		display: flex;
		justify-content: space-between;
		padding: 6px 0;
		border-bottom: 1px dashed var(--line);
	}
	.row.done {
		color: var(--accent);
	}
	.bar {
		height: 2px;
		background: var(--line);
		margin-top: 14px;
		overflow: hidden;
		position: relative;
	}
	.bar i {
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 0;
		background: var(--accent);
		transition: width 0.25s linear;
	}
	.boot.fade {
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.6s var(--ease-out);
	}
</style>
