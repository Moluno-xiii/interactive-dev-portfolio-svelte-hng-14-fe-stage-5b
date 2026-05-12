import type { SkillCategory } from '$lib/types';

export const skills: SkillCategory[] = [
	{
		ix: 'S/01',
		title: 'Design',
		items: [
			['Interaction design', 'lead'],
			['Motion choreography', 'lead'],
			['Brand & identity', 'ship'],
			['Typography systems', 'ship']
		]
	},
	{
		ix: 'S/02',
		title: 'Engineering',
		items: [
			['TypeScript / React', 'ship'],
			['WebGL · GLSL', 'ship'],
			['Three.js · R3F', 'ship'],
			['Swift · SwiftUI', 'learn']
		]
	},
	{
		ix: 'S/03',
		title: 'Tooling',
		items: [
			['Figma · variables', 'fluent'],
			['Rive · Lottie', 'fluent'],
			['Cinema 4D · Octane', 'ship'],
			['TouchDesigner', 'ship']
		]
	},
	{
		ix: 'S/04',
		title: 'Practice',
		items: [
			['Prototyping in code', 'always'],
			['Workshop facilitation', 'ship'],
			['Design critique', 'ship'],
			['Public speaking', 'ship']
		]
	}
];
