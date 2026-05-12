import type { Profile, AboutData } from '$lib/types';

export const profile: Profile = {
	name: 'Moluno',
	handle: '@moluno',
	title: 'Interaction Designer · Creative Engineer',
	tagline: 'I build interactive, performant interfaces on the web.',
	bio: 'I design immersive interfaces and motion systems at the seam between software and storytelling — currently shaping the next generation of spatial tools for a stealth lab.',
	intro:
		'I design immersive interfaces and motion systems at the seam between software and storytelling — currently shaping the next generation of spatial tools for a stealth lab.',
	location: 'Lagos · GMT+1',
	timezone: 'WAT · UTC+1',
	email: 'hello@moluno.dev',
	resumeUrl: '/resume.pdf',
	available: true,
	now: [
		{ label: 'Building', value: 'Halcyon', meta: 'Spatial workspace shell' },
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
		{ platform: 'dribbble', label: 'Dribbble', href: 'https://dribbble.com/Moluno' },
		{ platform: 'readcv', label: 'Read.cv', href: 'https://read.cv/Moluno' },
		{ platform: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/Moluno' },
		{ platform: 'email', label: 'Email', href: 'mailto:hello@moluno.dev' }
	]
};

export const about: AboutData = {
	paragraphs: [
		"I've spent the last eight years designing products that sit at the edge of what feels possible — building interaction primitives for spatial computing, generative tools, and live performance software.",
		'My work lives in the handoff between concept and craft: prototyping micro-interactions in code, owning the motion vocabulary of a brand, and collaborating closely with engineers to ship the difficult details.',
		"When I'm not at a screen I'm building modular synths, running a small letterpress, or chasing thunderstorms across the Iberian peninsula."
	],
	stats: [
		{ k: 'Years shipping', v: '08', s: 'yrs' },
		{ k: 'Projects shipped', v: '47', s: '/ public' },
		{ k: 'Team size lead', v: '12', s: 'ppl' },
		{ k: 'Awards', v: '06', s: 'FWA · Awwwards' }
	]
};

export const ticker = [
	'STATUS · AVAILABLE Q3 2026',
	'LAT 6.5244° N',
	'LON 3.3792° E',
	'BUILD 04.11.026',
	'FRAME 60Hz',
	'SIGNAL · STRONG'
];

export const nav = [
	{ id: 'work', label: 'Work' },
	{ id: 'about', label: 'About' },
	{ id: 'skills', label: 'Stack' },
	{ id: 'experience', label: 'Index' },
	{ id: 'contact', label: 'Contact' }
];
