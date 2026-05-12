<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	interface Props {
		text: string;
		duration?: number;
		delay?: number;
		className?: string;
	}
	let { text, duration = 900, delay = 0, className = '' }: Props = $props();

	const SCRAMBLE_CHARS = '▓▒░ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+=<>?/\\';
	let out = $state(' ');
	let raf = 0;
	let t0: number | undefined;

	function step(now: number) {
		const startAt = performance.timeOrigin + delay;
		const realStart = startAt;
		void realStart;
		if (t0 === undefined) t0 = now + delay;
		const elapsed = now - t0;
		if (elapsed < 0) {
			raf = requestAnimationFrame(step);
			return;
		}
		const p = Math.min(1, elapsed / duration);
		const len = text.length;
		let s = '';
		for (let i = 0; i < len; i++) {
			const settleAt = (i / len) * 0.7;
			if (p > settleAt + (1 - 0.7) * (i / len) || p >= 1) {
				s += text[i];
			} else {
				const c = text[i];
				if (c === ' ' || c === '\n') s += c;
				else s += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
			}
		}
		out = s;
		if (p < 1) raf = requestAnimationFrame(step);
		else out = text;
	}

	onMount(() => {
		out = text.replace(/[^\s]/g, ' ');
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduced) {
			out = text;
			return;
		}
		raf = requestAnimationFrame(step);
	});

	onDestroy(() => {
		if (raf) cancelAnimationFrame(raf);
	});
</script>

<span class={className}>{out}</span>
