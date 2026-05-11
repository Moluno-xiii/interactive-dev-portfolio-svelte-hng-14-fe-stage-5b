import { browser } from '$app/environment';
import { projects } from '$lib/data/projects';
import type { Project } from '$lib/types';

const STORAGE_KEY = 'project-order';
const defaultSlugs = () => projects.map((p) => p.slug);

function loadOrder(): string[] {
	if (!browser) return defaultSlugs();
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return defaultSlugs();
		const arr = JSON.parse(raw);
		if (!Array.isArray(arr)) return defaultSlugs();
		// Validate: only keep slugs that still exist, append any missing ones at the end
		const known = new Set(projects.map((p) => p.slug));
		const valid = arr.filter((s): s is string => typeof s === 'string' && known.has(s));
		const missing = defaultSlugs().filter((s) => !valid.includes(s));
		return [...valid, ...missing];
	} catch {
		return defaultSlugs();
	}
}

class ProjectOrder {
	slugs = $state<string[]>(loadOrder());
	customised = $derived(this.slugs.join('|') !== defaultSlugs().join('|'));

	get items(): Project[] {
		const lookup = new Map(projects.map((p) => [p.slug, p]));
		return this.slugs.map((slug) => lookup.get(slug)).filter((p): p is Project => p !== undefined);
	}

	move(from: number, to: number) {
		if (from === to) return;
		if (from < 0 || to < 0 || from >= this.slugs.length || to >= this.slugs.length) return;
		const next = [...this.slugs];
		const [moved] = next.splice(from, 1);
		next.splice(to, 0, moved);
		this.slugs = next;
	}

	reset() {
		this.slugs = defaultSlugs();
		this.persist();
	}

	persist() {
		if (!browser) return;
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(this.slugs));
		} catch {
			/* storage blocked */
		}
	}
}

export const projectOrder = new ProjectOrder();
