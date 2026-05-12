import type { Action } from 'svelte/action';

export const magnetic: Action<HTMLElement, number | undefined> = (node, strength = 0.18) => {
	const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (reduced) return {};

	const onMove = (e: PointerEvent) => {
		const r = node.getBoundingClientRect();
		const x = e.clientX - (r.left + r.width / 2);
		const y = e.clientY - (r.top + r.height / 2);
		const s = (node as HTMLElement & { __magStrength?: number }).__magStrength ?? strength;
		node.style.transform = `translate(${x * s}px, ${y * s}px)`;
	};
	const onLeave = () => {
		node.style.transform = '';
	};

	node.addEventListener('pointermove', onMove);
	node.addEventListener('pointerleave', onLeave);

	return {
		update(newStrength) {
			(node as HTMLElement & { __magStrength?: number }).__magStrength = newStrength ?? strength;
		},
		destroy() {
			node.removeEventListener('pointermove', onMove);
			node.removeEventListener('pointerleave', onLeave);
		}
	};
};
