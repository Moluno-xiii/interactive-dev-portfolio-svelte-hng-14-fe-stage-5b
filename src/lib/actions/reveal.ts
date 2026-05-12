import type { Action } from 'svelte/action';

interface RevealOptions {
	threshold?: number;
	rootMargin?: string;
	delay?: number;
	once?: boolean;
}

export const reveal: Action<HTMLElement, RevealOptions | undefined> = (node, options = {}) => {
	const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	const show = () => {
		node.classList.add('in', 'is-visible', 'show');
	};
	const hide = () => {
		node.classList.remove('in', 'is-visible', 'show');
	};

	if (reduced) {
		show();
		return {};
	}

	if (options.delay) node.style.setProperty('--reveal-delay', `${options.delay}ms`);

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					show();
					if (options.once !== false) observer.unobserve(node);
				} else if (options.once === false) {
					hide();
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
