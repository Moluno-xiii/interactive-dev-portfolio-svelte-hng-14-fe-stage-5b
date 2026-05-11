import type { Profile } from '$lib/types';

export const profile: Profile = {
	name: 'Moluno Progress',
	title: 'Frontend engineer',
	tagline: 'I build interactive, performant interfaces on the web.',
	bio: "I'm a frontend engineer focused on interaction design, motion, and performance. I care about the small things — the way a button presses, the rhythm of a layout, the milliseconds you don't notice. Currently exploring Svelte 5, WebGL, and realtime collaboration.",
	location: 'Lagos, NG',
	timezone: 'WAT · UTC+1',
	email: 'molunoprogress@gmail.com',
	resumeUrl: '/resume.pdf',
	available: true,
	now: [
		{ label: 'Building', value: 'Orbit Analytics', meta: 'Motion-driven dashboards' },
		{
			label: 'Reading',
			value: 'The Visual Display of Quantitative Information',
			meta: 'Edward Tufte'
		},
		{ label: 'Listening', value: 'All My Heroes Are Cornballs', meta: 'JPEGMAFIA' },
		{ label: 'Learning', value: 'CRDTs', meta: 'Realtime collab internals' }
	],
	socials: [
		{ platform: 'github', label: 'GitHub', href: 'https://github.com/Moluno' },
		{ platform: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/Moluno' },
		{ platform: 'twitter', label: 'X / Twitter', href: 'https://x.com/Moluno' },
		{ platform: 'email', label: 'Email', href: 'mailto:hello@example.com' }
	]
};
