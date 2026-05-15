export type SocialPlatform =
	| 'github'
	| 'linkedin'
	| 'twitter'
	| 'email'
	| 'website'
	| 'dribbble'
	| 'readcv';

export interface Social {
	platform: SocialPlatform;
	label: string;
	href: string;
}

export interface NowEntry {
	label: string;
	value: string;
	meta?: string;
}

export interface Profile {
	name: string;
	handle: string;
	title: string;
	tagline: string;
	bio: string;
	intro: string;
	location: string;
	timezone: string;
	email: string;
	resumeUrl: string;
	avatarUrl?: string;
	available: boolean;
	now: NowEntry[];
	socials: Social[];
}

export interface AboutStat {
	k: string;
	v: string;
	s: string;
}

export interface AboutData {
	paragraphs: string[];
	stats: AboutStat[];
}

export type BodySection =
	| { kind: 'stat-row'; items: Array<[string, string]> }
	| { kind: 'image'; label: string; aspect: number; src?: string }
	| { kind: 'prose'; h: string; body: string };

export type ProjectTrack = 'frontend' | 'backend' | 'mobile';

export interface Project {
	n: string;
	year: string;
	slug: string;
	title: string;
	ital: string;
	tags: string[];
	tracks: ProjectTrack[];
	desc: string;
	client: string;
	role: string;
	duration: string;
	stack: string[];
	summary: string;
	bodySections: BodySection[];
	coverUrl?: string;
	liveUrl?: string;
	repoUrl?: string;
	featured?: boolean;
}

export type SkillLevel = 'lead' | 'ship' | 'fluent' | 'learn' | 'always';

export interface SkillCategory {
	ix: string;
	title: string;
	items: Array<[string, SkillLevel]>;
}

export interface ExperienceEntry {
	yr: string;
	role: string;
	co: string;
	note: string;
}
