import { browser } from '$app/environment';

export type Theme = 'light' | 'dark';
export type Palette = 'lime' | 'cyan' | 'magenta' | 'amber' | 'ice';

const THEME_KEY = 'theme';
const PALETTE_KEY = 'palette';
const CURSOR_KEY = 'cursor';

function initialTheme(): Theme {
	if (!browser) return 'dark';
	const attr = document.documentElement.getAttribute('data-theme');
	if (attr === 'light' || attr === 'dark') return attr;
	const stored = localStorage.getItem(THEME_KEY);
	if (stored === 'light' || stored === 'dark') return stored;
	return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function initialPalette(): Palette {
	if (!browser) return 'ice';
	const attr = document.documentElement.getAttribute('data-palette');
	const valid: Palette[] = ['lime', 'cyan', 'magenta', 'amber', 'ice'];
	if (attr && valid.includes(attr as Palette)) return attr as Palette;
	const stored = localStorage.getItem(PALETTE_KEY);
	if (stored && valid.includes(stored as Palette)) return stored as Palette;
	return 'ice';
}

function initialCursor(): boolean {
	if (!browser) return false;
	const stored = localStorage.getItem(CURSOR_KEY);
	if (stored === 'true') return true;
	if (stored === 'false') return false;
	return false;
}

class ThemeStore {
	current = $state<Theme>(initialTheme());
	palette = $state<Palette>(initialPalette());
	cursor = $state<boolean>(initialCursor());

	setTheme(value: Theme) {
		this.current = value;
		if (browser) {
			localStorage.setItem(THEME_KEY, value);
			document.documentElement.setAttribute('data-theme', value);
		}
	}

	toggle() {
		this.setTheme(this.current === 'dark' ? 'light' : 'dark');
	}

	setPalette(value: Palette) {
		this.palette = value;
		if (browser) {
			localStorage.setItem(PALETTE_KEY, value);
			document.documentElement.setAttribute('data-palette', value);
		}
	}

	setCursor(value: boolean) {
		this.cursor = value;
		if (browser) {
			localStorage.setItem(CURSOR_KEY, String(value));
		}
	}
}

export const theme = new ThemeStore();
