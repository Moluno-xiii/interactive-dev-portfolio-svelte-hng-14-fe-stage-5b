<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	interface Props {
		density?: number;
		mouse?: boolean;
	}
	let { density = 1, mouse = true }: Props = $props();

	let canvas: HTMLCanvasElement;
	let raf = 0;
	let resizeHandler: () => void;
	let mouseHandler: (e: MouseEvent) => void;

	onMount(() => {
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const DPR = Math.min(window.devicePixelRatio || 1, 2);
		let W = 0;
		let H = 0;
		type Particle = {
			x: number;
			y: number;
			vx: number;
			vy: number;
			r: number;
			z: number;
			tw: number;
			ts: number;
		};
		let particles: Particle[] = [];
		let mouseX = -9999;
		let mouseY = -9999;

		const resize = () => {
			W = canvas.clientWidth;
			H = canvas.clientHeight;
			canvas.width = W * DPR;
			canvas.height = H * DPR;
			ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
			const count = Math.floor(((W * H) / 3200) * density);
			particles = new Array(count).fill(0).map(() => ({
				x: Math.random() * W,
				y: Math.random() * H,
				vx: (Math.random() - 0.5) * 0.22,
				vy: (Math.random() - 0.5) * 0.22,
				r: Math.random() * 1.1 + 0.35,
				z: Math.random(),
				tw: Math.random() * Math.PI * 2,
				ts: 0.02 + Math.random() * 0.04
			}));
		};

		const onMouse = (e: MouseEvent) => {
			if (!mouse) return;
			mouseX = e.clientX;
			mouseY = e.clientY;
		};

		const draw = () => {
			ctx.clearRect(0, 0, W, H);
			const styles = getComputedStyle(document.body);
			const accent = styles.getPropertyValue('--accent').trim() || '#e6eefb';
			const particleRgb = styles.getPropertyValue('--particle-rgb').trim() || '168, 176, 189';
			for (const p of particles) {
				p.x += p.vx;
				p.y += p.vy;
				if (p.x < 0) p.x = W;
				if (p.x > W) p.x = 0;
				if (p.y < 0) p.y = H;
				if (p.y > H) p.y = 0;
				const dx = p.x - mouseX;
				const dy = p.y - mouseY;
				const d2 = dx * dx + dy * dy;
				if (d2 < 18000) {
					const f = (18000 - d2) / 18000;
					p.x += (dx / Math.sqrt(d2 + 1)) * f * 1.6;
					p.y += (dy / Math.sqrt(d2 + 1)) * f * 1.6;
				}
				p.tw += p.ts;
				const tw = 0.55 + 0.45 * Math.sin(p.tw);
				ctx.globalAlpha = (0.32 + p.z * 0.55) * tw;
				ctx.fillStyle = p.z > 0.86 ? accent : `rgba(${particleRgb}, ${0.4 + p.z * 0.45})`;
				ctx.beginPath();
				ctx.arc(p.x, p.y, p.r * (0.6 + p.z), 0, Math.PI * 2);
				ctx.fill();
			}
			ctx.globalAlpha = 1;
			for (let i = 0; i < particles.length; i++) {
				const a = particles[i];
				for (let j = i + 1; j < Math.min(particles.length, i + 12); j++) {
					const b = particles[j];
					const dx = a.x - b.x;
					const dy = a.y - b.y;
					const d2 = dx * dx + dy * dy;
					if (d2 < 7000) {
						const o = (1 - d2 / 7000) * 0.22;
						ctx.strokeStyle = `rgba(${particleRgb}, ${o})`;
						ctx.lineWidth = 0.5;
						ctx.beginPath();
						ctx.moveTo(a.x, a.y);
						ctx.lineTo(b.x, b.y);
						ctx.stroke();
					}
				}
			}
			raf = requestAnimationFrame(draw);
		};

		resize();
		if (reduced) {
			draw();
		} else {
			draw();
		}
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
