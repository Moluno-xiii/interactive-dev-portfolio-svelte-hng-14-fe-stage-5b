import { browser } from '$app/environment';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

function initialTheme(): Theme {
	if (!browser) return 'dark';
	const attr = document.documentElement.getAttribute('data-theme');
	if (attr === 'light' || attr === 'dark') return attr;
	const stored = localStorage.getItem(STORAGE_KEY);
	if (stored === 'light' || stored === 'dark') return stored;
	return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

class ThemeStore {
	current = $state<Theme>(initialTheme());

	set(value: Theme) {
		this.current = value;
		if (browser) {
			localStorage.setItem(STORAGE_KEY, value);
			document.documentElement.setAttribute('data-theme', value);
		}
	}

	toggle() {
		this.set(this.current === 'dark' ? 'light' : 'dark');
	}
}

export const theme = new ThemeStore();
