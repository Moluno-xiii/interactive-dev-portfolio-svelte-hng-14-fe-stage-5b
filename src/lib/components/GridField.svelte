<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	interface Props {
		density?: number;
	}
	let { density = 1 }: Props = $props();

	let canvas: HTMLCanvasElement;
	let raf = 0;
	let resizeHandler: () => void;
	let mouseHandler: (e: MouseEvent) => void;

	onMount(() => {
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		const DPR = Math.min(window.devicePixelRatio || 1, 2);
		let W = 0;
		let H = 0;
		let t = 0;
		let mouseX = -9999;
		let mouseY = -9999;

		const resize = () => {
			W = canvas.clientWidth;
			H = canvas.clientHeight;
			canvas.width = W * DPR;
			canvas.height = H * DPR;
			ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
		};
		const onMouse = (e: MouseEvent) => {
			mouseX = e.clientX;
			mouseY = e.clientY;
		};

		const draw = () => {
			t += 0.006 * density;
			ctx.clearRect(0, 0, W, H);
			const accent =
				getComputedStyle(document.body).getPropertyValue('--accent').trim() || '#e6eefb';
			const step = 42;
			const cols = Math.ceil(W / step) + 1;
			const rows = Math.ceil(H / step) + 1;
			for (let i = 0; i < cols; i++) {
				for (let j = 0; j < rows; j++) {
					const x = i * step;
					const y = j * step;
					const dx = x - mouseX;
					const dy = y - mouseY;
					const d = Math.sqrt(dx * dx + dy * dy);
					const wave = Math.sin(t + (i + j) * 0.4) * 0.5 + 0.5;
					const mouseEffect = Math.max(0, 1 - d / 220);
					const size = 1 + wave * 1.6 + mouseEffect * 3.5;
					const useAccent = mouseEffect > 0.4 || (wave > 0.92 && (i * 7 + j) % 13 === 0);
					ctx.fillStyle = useAccent
						? accent
						: `rgba(168, 176, 189, ${0.1 + wave * 0.2 + mouseEffect * 0.4})`;
					ctx.beginPath();
					ctx.arc(x, y, size * 0.5, 0, Math.PI * 2);
					ctx.fill();
				}
			}
			raf = requestAnimationFrame(draw);
		};

		resize();
		draw();
		window.addEventListener('resize', resize);
		window.addEventListener('mousemove', onMouse);
		resizeHandler = resize;
		mouseHandler = onMouse;
	});

	onDestroy(() => {
		if (raf) cancelAnimationFrame(raf);
		if (resizeHandler) window.removeEventListener('resize', resizeHandler);
		if (mouseHandler) window.removeEventListener('mousemove', mouseHandler);
	});
</script>

<canvas bind:this={canvas} class="bg-canvas"></canvas>
