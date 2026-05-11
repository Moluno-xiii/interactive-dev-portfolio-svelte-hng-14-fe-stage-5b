export type SocialPlatform = 'github' | 'linkedin' | 'twitter' | 'email' | 'website';

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
	title: string;
	tagline: string;
	bio: string;
	location: string;
	timezone: string;
	email: string;
	resumeUrl: string;
	avatarUrl?: string;
	available: boolean;
	now: NowEntry[];
	socials: Social[];
}

export interface Highlight {
	metric: string;
	label: string;
	meta?: string;
}

export interface CaseStudySection {
	num: string;
	heading: string;
	body: string;
}

export type ProjectStatus = 'live' | 'archived' | 'sunset' | 'in-progress';

export interface CaseStudy {
	role: string;
	duration: string;
	team: string;
	status: ProjectStatus;
	context: string;
	highlights: Highlight[];
	sections: CaseStudySection[];
	outcomes: string[];
	reflection: string;
	domain?: string;
}

export interface Project {
	slug: string;
	title: string;
	summary: string;
	description: string;
	tech: string[];
	screenshot: string;
	liveUrl?: string;
	repoUrl?: string;
	featured?: boolean;
	year: number;
	caseStudy?: CaseStudy;
}

export interface Skill {
	label: string;
	icon?: string;
}

export interface SkillCategory {
	name: string;
	items: Skill[];
}
