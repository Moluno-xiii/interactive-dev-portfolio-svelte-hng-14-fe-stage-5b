import { browser } from '$app/environment';

class ActiveSection {
	current = $state<string>('hero');
	private observer: IntersectionObserver | null = null;

	init(ids: string[]) {
		if (!browser) return;
		this.destroy();

		this.observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((e) => e.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
				if (visible[0]) {
					this.current = visible[0].target.id;
				}
			},
			{
				threshold: [0.2, 0.5, 0.8],
				rootMargin: '-80px 0px -45% 0px'
			}
		);

		for (const id of ids) {
			const el = document.getElementById(id);
			if (el) this.observer.observe(el);
		}
	}

	destroy() {
		this.observer?.disconnect();
		this.observer = null;
	}
}

export const activeSection = new ActiveSection();
