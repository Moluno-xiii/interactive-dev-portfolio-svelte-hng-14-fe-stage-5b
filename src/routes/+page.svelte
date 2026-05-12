<script lang="ts">
	import { onMount } from 'svelte';
	import About from '$lib/components/About.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Experience from '$lib/components/Experience.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import ProjectGrid from '$lib/components/ProjectGrid.svelte';
	import SkillsGrid from '$lib/components/SkillsGrid.svelte';
	import { activeSection } from '$lib/stores/activeSection.svelte';
	import { profile } from '$lib/data/profile';

	onMount(() => {
		activeSection.init(['hero', 'about', 'work', 'skills', 'experience', 'contact']);
		return () => activeSection.destroy();
	});
</script>

<svelte:head>
	<title>{profile.name} — {profile.title}</title>
	<meta name="description" content={profile.tagline} />
</svelte:head>

<Hero />
<ProjectGrid />
<About />
<SkillsGrid />
<Experience />
<Contact />
