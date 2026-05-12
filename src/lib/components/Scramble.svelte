<script lang="ts">
	import { onDestroy } from 'svelte';

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

	$effect(() => {
		const currentText = text;
		const currentDuration = duration;
		const currentDelay = delay;

		if (raf) cancelAnimationFrame(raf);
		out = currentText.replace(/[^\s]/g, ' ');

		if (typeof window === 'undefined') {
			out = currentText;
			return;
		}

		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduced) {
			out = currentText;
			return;
		}

		let t0: number | undefined;
		const step = (now: number) => {
			if (t0 === undefined) t0 = now + currentDelay;
			const elapsed = now - t0;
			if (elapsed < 0) {
				raf = requestAnimationFrame(step);
				return;
			}
			const p = Math.min(1, elapsed / currentDuration);
			const len = currentText.length;
			let s = '';
			for (let i = 0; i < len; i++) {
				const settleAt = (i / len) * 0.7;
				if (p > settleAt + (1 - 0.7) * (i / len) || p >= 1) {
					s += currentText[i];
				} else {
					const c = currentText[i];
					if (c === ' ' || c === '\n') s += c;
					else s += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
				}
			}
			out = s;
			if (p < 1) raf = requestAnimationFrame(step);
			else out = currentText;
		};

		raf = requestAnimationFrame(step);

		return () => {
			if (raf) cancelAnimationFrame(raf);
		};
	});

	onDestroy(() => {
		if (raf) cancelAnimationFrame(raf);
	});
</script>

<span class={className}>{out}</span>
