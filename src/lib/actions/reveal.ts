import type { Action } from 'svelte/action';

interface RevealOptions {
	threshold?: number;
	rootMargin?: string;
	delay?: number;
	once?: boolean;
}

export const reveal: Action<HTMLElement, RevealOptions | undefined> = (node, options = {}) => {
	const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (reduced) {
		node.classList.add('reveal', 'is-visible');
		return {};
	}

	node.classList.add('reveal');
	if (options.delay) node.style.setProperty('--reveal-delay', `${options.delay}ms`);

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.classList.add('is-visible');
					if (options.once !== false) observer.unobserve(node);
				} else if (options.once === false) {
					node.classList.remove('is-visible');
				}
			}
		},
		{
			threshold: options.threshold ?? 0.12,
			rootMargin: options.rootMargin ?? '0px 0px -8% 0px'
		}
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
};
