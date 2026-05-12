<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	interface Props {
		density?: number;
	}
	let { density = 1 }: Props = $props();

	let canvas: HTMLCanvasElement;
	let raf = 0;
	let resizeHandler: () => void;

	onMount(() => {
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		const DPR = Math.min(window.devicePixelRatio || 1, 2);
		let W = 0;
		let H = 0;
		let t = 0;

		const resize = () => {
			W = canvas.clientWidth;
			H = canvas.clientHeight;
			canvas.width = W * DPR;
			canvas.height = H * DPR;
			ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
		};

		const hexA = (hex: string, a: number) => {
			const h = hex.replace('#', '');
			const r = parseInt(h.length === 3 ? h[0] + h[0] : h.slice(0, 2), 16);
			const g = parseInt(h.length === 3 ? h[1] + h[1] : h.slice(2, 4), 16);
			const b = parseInt(h.length === 3 ? h[2] + h[2] : h.slice(4, 6), 16);
			return `rgba(${r},${g},${b},${a})`;
		};

		const draw = () => {
			t += 0.004 * density;
			ctx.clearRect(0, 0, W, H);
			const accent =
				getComputedStyle(document.body).getPropertyValue('--accent').trim() || '#e6eefb';
			const acc2 =
				getComputedStyle(document.body).getPropertyValue('--accent-2').trim() || '#7c9cff';
			const blobs = [
				{
					x: W * (0.3 + Math.sin(t) * 0.18),
					y: H * (0.4 + Math.cos(t * 0.7) * 0.2),
					r: Math.max(W, H) * 0.55,
					c: accent,
					a: 0.18
				},
				{
					x: W * (0.7 + Math.cos(t * 0.5) * 0.2),
					y: H * (0.65 + Math.sin(t * 0.9) * 0.18),
					r: Math.max(W, H) * 0.5,
					c: acc2,
					a: 0.14
				},
				{
					x: W * (0.5 + Math.sin(t * 1.3) * 0.25),
					y: H * (0.3 + Math.cos(t * 1.1) * 0.15),
					r: Math.max(W, H) * 0.4,
					c: '#7c4dff',
					a: 0.12
				}
			];
			for (const b of blobs) {
				const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
				g.addColorStop(0, hexA(b.c, b.a));
				g.addColorStop(1, hexA(b.c, 0));
				ctx.fillStyle = g;
				ctx.fillRect(0, 0, W, H);
			}
			raf = requestAnimationFrame(draw);
		};

		resize();
		draw();
		window.addEventListener('resize', resize);
		resizeHandler = resize;
	});

	onDestroy(() => {
		if (raf) cancelAnimationFrame(raf);
		if (resizeHandler) window.removeEventListener('resize', resizeHandler);
	});
</script>

<canvas bind:this={canvas} class="bg-canvas"></canvas>
